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

function resolveRawReferencePath(rawPath, rawRefByPath, rawPrefix) {
  let current = rawPath;
  const seen = new Set();

  while (typeof current === 'string' && current.startsWith(rawPrefix) && rawRefByPath.has(current)) {
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
  rawResolvedValueByPath,
  rawPrefix
}) {
  const primitiveResolvedCache = new Map();
  let changed = false;

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

        if (normalizedRef.startsWith(rawPrefix)) {
          if (rawResolvedValueByPath.has(normalizedRef)) {
            const nextValue = rawResolvedValueByPath.get(normalizedRef);
            if (nextValue !== value) changed = true;
            result[key] = nextValue;
            return;
          }

          const resolvedPath = resolveRawReferencePath(normalizedRef, rawRefByPath, rawPrefix);
          const resolvedLiteral = resolveValueFromMap(
            resolvedPath,
            primitiveRawValues,
            tokenIndex,
            primitiveResolvedCache
          );
          if (resolvedLiteral != null) {
            if (resolvedLiteral !== value) changed = true;
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
            if (selfResolved !== value) changed = true;
            result[key] = selfResolved;
            return;
          }
        }

        const nextValue = `{${normalizedRef}}`;
        if (nextValue !== value) changed = true;
        result[key] = nextValue;
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

  return { payload: rewriteNode(payload, []), changed };
}

function materializeChangedNormalizedFiles(inputFiles, normalizePayload, repoRoot) {
  let tempRoot = null;
  const normalizedByOriginal = new Map();
  let materializedFileCount = 0;

  inputFiles.forEach((inputPath) => {
    const payload = JSON.parse(readFileSync(inputPath, 'utf8'));
    const { payload: normalizedPayload, changed } = normalizePayload(payload, inputPath);
    if (!changed) return;

    if (!tempRoot) {
      tempRoot = mkdtempSync(path.join(os.tmpdir(), 'envy-ui-sd-resolver-'));
    }
    const relativePath = path.relative(repoRoot, inputPath);
    const outputPath = path.join(tempRoot, relativePath);
    mkdirSync(path.dirname(outputPath), { recursive: true });
    writeFileSync(outputPath, `${JSON.stringify(normalizedPayload, null, 2)}\n`, 'utf8');
    normalizedByOriginal.set(inputPath, outputPath);
    materializedFileCount += 1;
  });

  return { normalizedByOriginal, materializedFileCount };
}

function toPosix(filePath) {
  return filePath.replace(/\\/g, '/');
}

function isContextRawFile(filePath, context) {
  const normalizedPath = toPosix(filePath);
  return normalizedPath.includes(`/tokens/contexts/${context}/raw/`);
}

function isContextFileForNormalization(filePath, context) {
  const normalizedPath = toPosix(filePath);
  if (normalizedPath.includes(`/tokens/contexts/${context}/semantics/`)) {
    return true;
  }
  if (normalizedPath.includes(`/tokens/contexts/${context}/themes/`)) {
    return true;
  }
  return normalizedPath.endsWith(`/tokens/contexts/${context}/components.json`);
}

function discoverContextsWithRawFiles(orderedSourceFiles) {
  const contexts = new Set();
  orderedSourceFiles.forEach((filePath) => {
    const normalizedPath = toPosix(filePath);
    const match = normalizedPath.match(/\/tokens\/contexts\/([^/]+)\/raw\/.+\.json$/);
    if (match) {
      contexts.add(match[1]);
    }
  });
  return [...contexts];
}

export function normalizeResolverSources(orderedSourceFiles, { repoRoot, contexts } = {}) {
  const contextsToProcess = Array.isArray(contexts) && contexts.length > 0
    ? [...new Set(contexts)]
    : discoverContextsWithRawFiles(orderedSourceFiles);

  if (contextsToProcess.length === 0) {
    return {
      orderedSourceFiles,
      normalizationApplied: false,
      normalizedAliasCount: 0,
      normalizedFileCount: 0
    };
  }

  const tokenIndex = collectTokenPathIndex(orderedSourceFiles);
  const primitiveFiles = orderedSourceFiles.filter((filePath) => (
    filePath.includes(`${path.sep}tokens${path.sep}primitives${path.sep}`)
  ));
  const primitiveRawValues = collectPrimitiveRawValues(primitiveFiles);

  const normalizedByOriginal = new Map();
  const rawFilesToDrop = new Set();
  let normalizedAliasCount = 0;
  let normalizedFileCount = 0;
  let contextsApplied = 0;

  contextsToProcess.forEach((context) => {
    const contextRawFiles = orderedSourceFiles.filter((filePath) => isContextRawFile(filePath, context));
    const contextNormalizeFiles = orderedSourceFiles.filter((filePath) => (
      isContextFileForNormalization(filePath, context)
    ));

    if (contextRawFiles.length === 0 || contextNormalizeFiles.length === 0) {
      return;
    }

    const { rawRefByPath, rawResolvedValueByPath } = collectRawAliasMaps(
      contextRawFiles,
      tokenIndex,
      primitiveRawValues
    );
    const rawPrefix = `eui.${context}.raw.`;
    const normalizePayload = (payload) => normalizeTokenPayloadReferences(payload, {
      tokenIndex,
      primitiveRawValues,
      rawRefByPath,
      rawResolvedValueByPath,
      rawPrefix
    });

    const normalizedResult = materializeChangedNormalizedFiles(contextNormalizeFiles, normalizePayload, repoRoot);
    normalizedResult.normalizedByOriginal.forEach((normalizedPath, originalPath) => {
      normalizedByOriginal.set(originalPath, normalizedPath);
    });
    contextRawFiles.forEach((filePath) => {
      rawFilesToDrop.add(filePath);
    });

    normalizedAliasCount += rawResolvedValueByPath.size;
    normalizedFileCount += normalizedResult.materializedFileCount;
    contextsApplied += 1;
  });

  if (contextsApplied === 0) {
    return {
      orderedSourceFiles,
      normalizationApplied: false,
      normalizedAliasCount: 0,
      normalizedFileCount: 0
    };
  }

  const normalizedOrderedSourceFiles = orderedSourceFiles.flatMap((filePath) => {
    if (rawFilesToDrop.has(filePath)) return [];
    if (normalizedByOriginal.has(filePath)) return [normalizedByOriginal.get(filePath)];
    return [filePath];
  });

  return {
    orderedSourceFiles: normalizedOrderedSourceFiles,
    normalizationApplied: true,
    normalizedAliasCount,
    normalizedFileCount
  };
}

export function normalizeAppResolverSources(orderedSourceFiles, { repoRoot } = {}) {
  return normalizeResolverSources(orderedSourceFiles, { repoRoot, contexts: ['app'] });
}
