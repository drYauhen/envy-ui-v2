import path from 'path';
import { fileURLToPath } from 'url';
import { globSync } from 'glob';
import { existsSync } from 'fs';
import StyleDictionary from 'style-dictionary';
import registerStorybookColorsFormat from './formats/storybookColors.js';
import registerFigmaAdapterFormat from './formats/figmaAdapter.js';
import registerTokenStudioFormat from './formats/tokenStudio.js';
import registerFullVariablesFormat from './formats/variablesFull.js';
import registerScopedFigmaVariablesFormat from './formats/figmaVariablesScoped.js';
import registerCssVariablesThemedFormat from './formats/cssVariablesThemed.js';
import { normalizeResolverSources } from './utils/resolver-normalization.js';
import {
  flattenResolverSources,
  loadResolverFile,
  resolveSourceRefs
} from '../scripts/utils/resolver-order.mjs';

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
      resolveSourceRefs(
        resolverDir,
        flattened.entries.map((entry) => entry.sourceRef),
        {
          label: 'resolver source',
          onMissing: (absolutePath) => {
            console.warn(`Warning: Missing resolver source file: ${absolutePath}`);
          }
        }
      )
    );

    const {
      orderedSourceFiles: ordered,
      normalizationApplied,
      normalizedAliasCount
    } = normalizeResolverSources(orderedSourceFiles, { repoRoot });

    console.log(`🧭 Style Dictionary resolver mode enabled: ${resolverAbsolutePath}`);
    if (normalizationApplied) {
      console.log(`🧭 Raw aliases normalized and inlined for resolver mode: ${normalizedAliasCount}`);
    }
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
          // Keep themed output separate from canonical entrypoint (tokens.css)
          // to avoid cross-build overwrite when running tokens:build:sd directly.
          destination: 'tokens.themed.css',
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
