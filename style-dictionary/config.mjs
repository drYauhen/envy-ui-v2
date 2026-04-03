import path from 'path';
import os from 'os';
import { fileURLToPath } from 'url';
import { globSync } from 'glob';
import { existsSync, mkdirSync, mkdtempSync, readFileSync, writeFileSync } from 'fs';
import StyleDictionary from 'style-dictionary';
import registerStorybookColorsFormat from './formats/storybookColors.js';
import registerFigmaAdapterFormat from './formats/figmaAdapter.js';
import registerTokenStudioFormat from './formats/tokenStudio.js';
import registerFullVariablesFormat from './formats/variablesFull.js';
import registerScopedFigmaVariablesFormat from './formats/figmaVariablesScoped.js';
import registerCssVariablesThemedFormat from './formats/cssVariablesThemed.js';
import { flattenResolverSources, loadResolverFile, resolveSourcePathFromRef } from '../scripts/utils/resolver-order.mjs';

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);
const repoRoot = path.resolve(__dirname, '..');

// Target-based context filtering
const TARGET_CONFIGS = {
  storybook: ['app', 'website', 'report'],
  'dev-app': ['app'],
  canonical: ['app'],
  'website-app': ['website'],
  'report-app': ['report']
};

// Context mirroring - contexts that share CSS rules
const CONTEXT_MIRRORS = {};

const target = process.env.STYLE_DICTIONARY_TARGET || 'storybook';
const allowedContexts = TARGET_CONFIGS[target] || TARGET_CONFIGS.storybook;
const RESOLVER_TARGETS = new Set(['storybook', 'dev-app', 'website-app', 'report-app']);
const resolverRequiredForTarget = RESOLVER_TARGETS.has(target);
const appResolverPath = process.env.STYLE_DICTIONARY_APP_RESOLVER_PATH
  || path.join(repoRoot, 'tokens', 'knowledge', 'resolver', 'app-core.resolver.json');
const websiteResolverPath = process.env.STYLE_DICTIONARY_WEBSITE_RESOLVER_PATH
  || path.join(repoRoot, 'tokens', 'knowledge', 'resolver', 'website-core.resolver.json');
const reportResolverPath = process.env.STYLE_DICTIONARY_REPORT_RESOLVER_PATH
  || path.join(repoRoot, 'tokens', 'knowledge', 'resolver', 'report-core.resolver.json');
const storybookResolverPath = process.env.STYLE_DICTIONARY_STORYBOOK_RESOLVER_PATH
  || path.join(repoRoot, 'tokens', 'knowledge', 'resolver', 'storybook.resolver.json');
const canonicalNoopSourcePath = path.join(repoRoot, 'style-dictionary', 'fixtures', 'canonical.noop.tokens.json');

// Fail-soft mode for build recovery after token refactor
const failSoft = process.env.STYLE_DICTIONARY_FAIL_SOFT === 'true';

console.log(`Building CSS for target: ${target}`);
console.log(`Allowed contexts: ${allowedContexts.join(', ')}`);
if (target === 'dev-app') {
  console.log('🧭 Resolver-driven source selection for dev-app: enabled (required path)');
}
if (failSoft) {
  console.log(`🛠️  Fail-soft mode enabled: Using safe fallbacks for missing references`);
}

registerStorybookColorsFormat(StyleDictionary);
registerFigmaAdapterFormat(StyleDictionary);
registerTokenStudioFormat(StyleDictionary);
registerFullVariablesFormat(StyleDictionary);
registerScopedFigmaVariablesFormat(StyleDictionary);
registerCssVariablesThemedFormat(StyleDictionary, { allowedContexts, contextMirrors: CONTEXT_MIRRORS });

function uniqueInOrder(items) {
  const seen = new Set();
  const output = [];
  items.forEach((item) => {
    if (seen.has(item)) return;
    seen.add(item);
    output.push(item);
  });
  return output;
}

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

function materializeNormalizedFiles(inputFiles, normalizePayload) {
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

function getResolverPathForTarget() {
  if (target === 'dev-app') return appResolverPath;
  if (target === 'website-app') return websiteResolverPath;
  if (target === 'report-app') return reportResolverPath;
  if (target === 'storybook') return storybookResolverPath;
  return null;
}

function getResolverSourceListForTarget() {
  const resolverPath = getResolverPathForTarget();
  if (!resolverPath) return null;

  try {
    const { path: resolverAbsolutePath, dir: resolverDir, resolver } = loadResolverFile(resolverPath);
    const flattened = flattenResolverSources(resolver);

    const orderedSourceFiles = uniqueInOrder(
      flattened.entries
        .map((entry) => resolveSourcePathFromRef(resolverDir, entry.sourceRef))
        .filter((absolutePath) => {
          if (existsSync(absolutePath)) return true;
          console.warn(`Warning: Missing resolver source file: ${absolutePath}`);
          return false;
        })
    );

    const appRawFiles = orderedSourceFiles.filter((filePath) => isAppRawFile(filePath));
    const appNormalizeFiles = orderedSourceFiles.filter((filePath) => isAppFileForNormalization(filePath));

    if (appRawFiles.length === 0 || appNormalizeFiles.length === 0) {
      console.log(`🧭 Style Dictionary resolver mode enabled: ${resolverAbsolutePath}`);
      console.log(`🧭 Resolver source files for ${target}: ${orderedSourceFiles.length}`);
      return orderedSourceFiles;
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

    const normalizedFiles = materializeNormalizedFiles(appNormalizeFiles, normalizePayload);
    const normalizedByOriginal = new Map();
    appNormalizeFiles.forEach((originalPath, index) => {
      normalizedByOriginal.set(originalPath, normalizedFiles[index]);
    });

    const appRawSet = new Set(appRawFiles);
    const ordered = orderedSourceFiles.flatMap((filePath) => {
      if (appRawSet.has(filePath)) return [];
      if (normalizedByOriginal.has(filePath)) return [normalizedByOriginal.get(filePath)];
      return [filePath];
    });

    console.log(`🧭 Style Dictionary resolver mode enabled: ${resolverAbsolutePath}`);
    console.log(`🧭 App raw aliases normalized and inlined for resolver mode: ${rawResolvedValueByPath.size}`);
    console.log(`🧭 Resolver source files for ${target}: ${ordered.length}`);
    return ordered;
  } catch (error) {
    if (resolverRequiredForTarget) {
      throw new Error(`Failed to load resolver for target "${target}" (${resolverPath}): ${error.message}`);
    }
    console.warn(`Warning: Failed to load resolver for target "${target}" (${resolverPath})`);
    console.warn(`  ${error.message}`);
    return null;
  }
}

export default {
  usesDtcg: true,

  source: (() => {
    if (target === 'canonical') {
      if (!existsSync(canonicalNoopSourcePath)) {
        throw new Error(`Missing canonical noop source file: ${canonicalNoopSourcePath}`);
      }
      return [canonicalNoopSourcePath];
    }

    const resolverSource = getResolverSourceListForTarget();
    if (resolverSource && resolverSource.length > 0) {
      return resolverSource;
    }

    if (resolverRequiredForTarget) {
      throw new Error(
        `Resolver source list is empty for target "${target}". Resolver is required for this target.`
      );
    }

    // Use glob to find all .json files, but exclude .meta.json and raw files
    const allJsonFiles = globSync(path.join(repoRoot, 'tokens', '**', '*.json'), {
      ignore: [
        path.join(repoRoot, 'tokens', '**', '*.meta.json'),
        path.join(repoRoot, 'tokens', 'legacy', '**', '*.json'), // Exclude legacy files
        path.join(repoRoot, 'tokens', 'knowledge', '**', '*.json'), // Exclude knowledge/workflow files
        path.join(repoRoot, 'tokens', 'components', '**', '*.json'), // Exclude component token files (processed separately)
        // FAIL-SOFT: Temporarily exclude raw files causing circular references and missing references
        ...(failSoft ? [
          path.join(repoRoot, 'tokens', 'contexts', '**', 'raw', '**', '*.json')
        ] : [])
      ]
    });
    return allJsonFiles;
  })(),
  // Note: .meta.json files are also excluded via filtering in custom formats
  // See style-dictionary/utils/token-filters.js and format files

  log: {
    verbosity: 'verbose'
  },

  platforms: {
    css: {
      transformGroup: 'css',
      buildPath: path.join(repoRoot, 'generated', 'css') + path.sep,
      files: [
        {
          destination: 'tokens.css',
          format: 'css/variables-themed',
          options: {
            // Keep deterministic ordering aligned with Style Dictionary native sort semantics.
            sort: 'name'
          }
        }
      ]
    },

    js: {
      transformGroup: 'js',
      buildPath: path.join(repoRoot, 'generated', 'js') + path.sep,
      files: [
        {
          destination: 'tokens.js',
          format: 'javascript/es6',
          options: {
            // Use native Style Dictionary sort support (v5.2+) for deterministic output.
            sort: 'name'
          }
        }
      ]
    },

    storybook: {
      transformGroup: 'css',
      buildPath: path.join(repoRoot, 'generated', 'storybook') + path.sep,
      files: [
        {
          destination: 'colors.json',
          format: 'json/storybook-colors'
        }
      ]
    },

    figma: {
      transformGroup: 'js',
      buildPath: path.join(repoRoot, 'generated', 'figma', 'adapter') + path.sep,
      files: [
        {
          destination: 'variables.adapter.json',
          format: 'figma/adapter'
        }
      ]
    },

    tokenstudio: {
      transformGroup: 'js',
      buildPath: path.join(repoRoot, 'generated', 'tokenstudio') + path.sep,
      files: [
        {
          destination: 'tokenstudio.json',
          format: 'json/token-studio'
        }
      ]
    },

    pluginVariables: {
      transformGroup: 'js',
      buildPath: path.join(repoRoot, 'generated', 'figma', 'tokens') + path.sep,
      files: [
        {
          destination: 'variables.tokens.full.json',
          format: 'figma/variables-full'
        }
      ]
    },

    figmaScoped: {
      transformGroup: 'js',
      buildPath: path.join(repoRoot, 'generated', 'figma', 'tokens') + path.sep,
      files: [
        {
          destination: 'variables.tokens.scoped.json',
          format: 'figma/variables-scoped'
        }
      ]
    },

    figmaApp: {
      transformGroup: 'js',
      buildPath: path.join(repoRoot, 'generated', 'figma', 'app') + path.sep,
      files: [
        {
          destination: 'variables.tokens.scoped.json',
          format: 'figma/variables-scoped',
          options: {
            context: 'app'
          }
        }
      ]
    },

    figmaWebsite: {
      transformGroup: 'js',
      buildPath: path.join(repoRoot, 'generated', 'figma', 'website') + path.sep,
      files: [
        {
          destination: 'variables.tokens.scoped.json',
          format: 'figma/variables-scoped',
          options: {
            context: 'website'
          }
        }
      ]
    },

    figmaReport: {
      transformGroup: 'js',
      buildPath: path.join(repoRoot, 'generated', 'figma', 'report') + path.sep,
      files: [
        {
          destination: 'variables.tokens.scoped.json',
          format: 'figma/variables-scoped',
          options: {
            context: 'report'
          }
        }
      ]
    },

    // NEW: Canonical CSS token generation - runs independently
    canonicalPrimitives: {
      // No transformGroup needed - canonical formats work directly with JSON
      buildPath: path.join(repoRoot, 'generated', 'css') + path.sep,
      files: [
        {
          destination: 'tokens.primitives.css',
          format: 'css/canonical-primitives'
        }
      ]
    },

    canonicalContexts: {
      // No transformGroup needed - canonical formats work directly with JSON
      buildPath: path.join(repoRoot, 'generated', 'css') + path.sep,
      files: [
        {
          destination: 'tokens.contexts.css',
          format: 'css/canonical-contexts'
        }
      ]
    },

    canonicalThemes: {
      // No transformGroup needed - canonical formats work directly with JSON
      buildPath: path.join(repoRoot, 'generated', 'css') + path.sep,
      files: [
        {
          destination: 'tokens.themes.css',
          format: 'css/canonical-themes'
        }
      ]
    },

    canonicalEntrypoint: {
      // No transformGroup needed - canonical formats work directly with JSON
      buildPath: path.join(repoRoot, 'generated', 'css') + path.sep,
      files: [
        {
          destination: 'tokens.css',
          format: 'css/canonical-entrypoint'
        }
      ]
    }
  }
};
