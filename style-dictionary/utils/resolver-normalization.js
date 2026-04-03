import path from 'path';
import os from 'os';
import { mkdirSync, mkdtempSync, readFileSync, writeFileSync } from 'fs';

function walkTokens(node, prefix = [], visit) {
  if (!node || typeof node !== 'object' || Array.isArray(node)) return;
  Object.entries(node).forEach(([key, value]) => {
    if (key.startsWith('$')) return;
    const nextPath = [...prefix, key];
    if (value && typeof value === 'object' && !Array.isArray(value) && '$value' in value) {
      visit(nextPath.join('.'), value);
      return;
    }
    walkTokens(value, nextPath, visit);
  });
}

function parseReference(value) {
  if (typeof value !== 'string') return null;
  if (!value.startsWith('{') || !value.endsWith('}')) return null;
  return value.slice(1, -1).trim();
}

function collectTokenPathIndex(files) {
  const paths = new Set();
  const flatToPath = new Map();

  files.forEach((filePath) => {
    const payload = JSON.parse(readFileSync(filePath, 'utf8'));
    walkTokens(payload, [], (tokenPath) => {
      paths.add(tokenPath);
      const flattened = tokenPath.split('.').join('-');
      if (!flatToPath.has(flattened)) {
        flatToPath.set(flattened, tokenPath);
      }
    });
  });

  return { paths, flatToPath };
}

function normalizeReferenceId(referenceId, tokenIndex) {
  if (!referenceId || typeof referenceId !== 'string') return referenceId;
  if (tokenIndex.paths.has(referenceId)) return referenceId;

  const fromDotted = tokenIndex.flatToPath.get(referenceId.split('.').join('-'));
  if (fromDotted) return fromDotted;

  return referenceId;
}

function collectPrimitiveRawValues(primitiveFiles) {
  const values = new Map();
  primitiveFiles.forEach((filePath) => {
    const payload = JSON.parse(readFileSync(filePath, 'utf8'));
    walkTokens(payload, [], (tokenPath, token) => {
      values.set(tokenPath, token.$value);
    });
  });
  return values;
}

function resolveValueFromMap(referenceId, rawValues, tokenIndex, cache, stack = new Set()) {
  if (cache.has(referenceId)) return cache.get(referenceId);
  if (stack.has(referenceId)) return null;
  if (!rawValues.has(referenceId)) return null;

  const rawValue = rawValues.get(referenceId);
  const nestedRef = parseReference(rawValue);
  if (!nestedRef) {
    cache.set(referenceId, rawValue);
    return rawValue;
  }

  const normalizedRef = normalizeReferenceId(nestedRef, tokenIndex);
  const resolved = resolveValueFromMap(normalizedRef, rawValues, tokenIndex, cache, new Set([...stack, referenceId]));
  if (resolved == null) return null;
  cache.set(referenceId, resolved);
  return resolved;
}

function collectRawAliasMaps(rawFiles, tokenIndex, primitiveRawValues) {
  const rawRefByPath = new Map();
  const rawResolvedValueByPath = new Map();
  const primitiveResolvedCache = new Map();

  rawFiles.forEach((filePath) => {
    const payload = JSON.parse(readFileSync(filePath, 'utf8'));
    walkTokens(payload, [], (tokenPath, token) => {
      const parsedRef = parseReference(token.$value);
      if (!parsedRef) {
        rawResolvedValueByPath.set(tokenPath, token.$value);
        return;
      }

      const normalizedRef = normalizeReferenceId(parsedRef, tokenIndex);
      rawRefByPath.set(tokenPath, normalizedRef);

      const resolvedLiteral = resolveValueFromMap(
        normalizedRef,
        primitiveRawValues,
        tokenIndex,
        primitiveResolvedCache
      );
      if (resolvedLiteral != null) {
        rawResolvedValueByPath.set(tokenPath, resolvedLiteral);
      }
    });
  });

  return { rawRefByPath, rawResolvedValueByPath };
}

function resolveRawReferencePath(rawPath, rawRefByPath) {
  let current = rawPath;
  const seen = new Set();

  while (typeof current === 'string' && current.startsWith('eui.app.raw.') && rawRefByPath.has(current)) {
    if (seen.has(current)) break;
    seen.add(current);
    current = rawRefByPath.get(current);
  }

  return current;
}

function normalizeTokenPayloadReferences(payload, {
  tokenIndex,
  primitiveRawValues,
  rawRefByPath,
  rawResolvedValueByPath
}) {
  const primitiveResolvedCache = new Map();

  const rewriteNode = (node, prefix = []) => {
    if (Array.isArray(node)) {
      return node.map((item) => rewriteNode(item, prefix));
    }
    if (!node || typeof node !== 'object') {
      return node;
    }

    const result = {};
    Object.entries(node).forEach(([key, value]) => {
      if (key === '$value' && typeof value === 'string') {
        const currentPath = prefix.join('.');
        const parsedRef = parseReference(value);
        if (!parsedRef) {
          result[key] = value;
          return;
        }

        let normalizedRef = normalizeReferenceId(parsedRef, tokenIndex);

        if (normalizedRef.startsWith('eui.app.raw.')) {
          if (rawResolvedValueByPath.has(normalizedRef)) {
            result[key] = rawResolvedValueByPath.get(normalizedRef);
            return;
          }

          const resolvedPath = resolveRawReferencePath(normalizedRef, rawRefByPath);
          const resolvedLiteral = resolveValueFromMap(
            resolvedPath,
            primitiveRawValues,
            tokenIndex,
            primitiveResolvedCache
          );
          if (resolvedLiteral != null) {
            result[key] = resolvedLiteral;
            return;
          }

          normalizedRef = resolvedPath;
        }

        if (normalizedRef === currentPath) {
          const selfResolved = resolveValueFromMap(
            currentPath,
            primitiveRawValues,
            tokenIndex,
            primitiveResolvedCache
          );
          if (selfResolved != null) {
            result[key] = selfResolved;
            return;
          }
        }

        result[key] = `{${normalizedRef}}`;
        return;
      }

      if (value && typeof value === 'object' && !Array.isArray(value)) {
        result[key] = rewriteNode(key.startsWith('$') ? value : value, key.startsWith('$') ? prefix : [...prefix, key]);
        return;
      }

      result[key] = value;
    });

    return result;
  };

  return rewriteNode(payload, []);
}

function materializeNormalizedFiles(inputFiles, normalizePayload, repoRoot) {
  const tempRoot = mkdtempSync(path.join(os.tmpdir(), 'envy-ui-sd-resolver-'));
  return inputFiles.map((inputPath) => {
    const payload = JSON.parse(readFileSync(inputPath, 'utf8'));
    const normalizedPayload = normalizePayload(payload, inputPath);
    const relativePath = path.relative(repoRoot, inputPath);
    const outputPath = path.join(tempRoot, relativePath);
    mkdirSync(path.dirname(outputPath), { recursive: true });
    writeFileSync(outputPath, `${JSON.stringify(normalizedPayload, null, 2)}\n`, 'utf8');
    return outputPath;
  });
}

function isAppRawFile(filePath) {
  return filePath.includes(`${path.sep}tokens${path.sep}contexts${path.sep}app${path.sep}raw${path.sep}`);
}

function isAppFileForNormalization(filePath) {
  if (filePath.includes(`${path.sep}tokens${path.sep}contexts${path.sep}app${path.sep}semantics${path.sep}`)) {
    return true;
  }
  if (filePath.includes(`${path.sep}tokens${path.sep}contexts${path.sep}app${path.sep}themes${path.sep}`)) {
    return true;
  }
  return filePath.endsWith(`${path.sep}tokens${path.sep}contexts${path.sep}app${path.sep}components.json`);
}

export function normalizeAppResolverSources(orderedSourceFiles, { repoRoot }) {
  const appRawFiles = orderedSourceFiles.filter((filePath) => isAppRawFile(filePath));
  const appNormalizeFiles = orderedSourceFiles.filter((filePath) => isAppFileForNormalization(filePath));

  if (appRawFiles.length === 0 || appNormalizeFiles.length === 0) {
    return {
      orderedSourceFiles,
      normalizationApplied: false,
      normalizedAliasCount: 0
    };
  }

  const tokenIndex = collectTokenPathIndex(orderedSourceFiles);
  const primitiveFiles = orderedSourceFiles.filter((filePath) => (
    filePath.includes(`${path.sep}tokens${path.sep}primitives${path.sep}`)
  ));
  const primitiveRawValues = collectPrimitiveRawValues(primitiveFiles);
  const { rawRefByPath, rawResolvedValueByPath } = collectRawAliasMaps(appRawFiles, tokenIndex, primitiveRawValues);
  const normalizePayload = (payload) => normalizeTokenPayloadReferences(payload, {
    tokenIndex,
    primitiveRawValues,
    rawRefByPath,
    rawResolvedValueByPath
  });

  const normalizedFiles = materializeNormalizedFiles(appNormalizeFiles, normalizePayload, repoRoot);
  const normalizedByOriginal = new Map();
  appNormalizeFiles.forEach((originalPath, index) => {
    normalizedByOriginal.set(originalPath, normalizedFiles[index]);
  });

  const appRawSet = new Set(appRawFiles);
  const normalizedOrderedSourceFiles = orderedSourceFiles.flatMap((filePath) => {
    if (appRawSet.has(filePath)) return [];
    if (normalizedByOriginal.has(filePath)) return [normalizedByOriginal.get(filePath)];
    return [filePath];
  });

  return {
    orderedSourceFiles: normalizedOrderedSourceFiles,
    normalizationApplied: true,
    normalizedAliasCount: rawResolvedValueByPath.size
  };
}
