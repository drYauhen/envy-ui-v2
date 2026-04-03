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
import { loadResolverFile } from '../scripts/utils/resolver-order.mjs';

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);
const repoRoot = path.resolve(__dirname, '..');

// Target-based context filtering
const TARGET_CONFIGS = {
  storybook: ['app', 'website', 'report'],
  'dev-app': ['app'],
  'website-app': ['website'],
  'report-app': ['report']
};

// Context mirroring - contexts that share CSS rules
const CONTEXT_MIRRORS = {};

const target = process.env.STYLE_DICTIONARY_TARGET || 'storybook';
const allowedContexts = TARGET_CONFIGS[target] || TARGET_CONFIGS.storybook;
const useResolverApp = process.env.STYLE_DICTIONARY_USE_RESOLVER_APP === 'true';
const appResolverPath = process.env.STYLE_DICTIONARY_APP_RESOLVER_PATH
  || path.join(repoRoot, 'tokens', 'knowledge', 'resolver', 'app-core.resolver.json');

// Fail-soft mode for build recovery after token refactor
const failSoft = process.env.STYLE_DICTIONARY_FAIL_SOFT === 'true';

console.log(`Building CSS for target: ${target}`);
console.log(`Allowed contexts: ${allowedContexts.join(', ')}`);
if (failSoft) {
  console.log(`🛠️  Fail-soft mode enabled: Using safe fallbacks for missing references`);
}

registerStorybookColorsFormat(StyleDictionary);
registerFigmaAdapterFormat(StyleDictionary);
registerTokenStudioFormat(StyleDictionary);
registerFullVariablesFormat(StyleDictionary);
registerScopedFigmaVariablesFormat(StyleDictionary);
registerCssVariablesThemedFormat(StyleDictionary, { allowedContexts, contextMirrors: CONTEXT_MIRRORS });

const normalizeSourceRef = (source) => {
  if (typeof source === 'string') return source;
  if (source && typeof source === 'object' && typeof source.$ref === 'string') return source.$ref;
  return null;
};

function refsToAbsoluteFiles(resolverDir, sources = [], label = 'resolver source') {
  return sources
    .map(normalizeSourceRef)
    .filter(Boolean)
    .map((sourceRef) => path.resolve(resolverDir, sourceRef))
    .filter((absolutePath) => {
      if (existsSync(absolutePath)) return true;
      console.warn(`Warning: Missing ${label} file: ${absolutePath}`);
      return false;
    });
}

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

function getResolverAppSourceList() {
  try {
    const { dir, path: resolverAbsolutePath, resolver } = loadResolverFile(appResolverPath);
    const primitives = refsToAbsoluteFiles(dir, resolver?.sets?.primitives?.sources, 'resolver primitives');
    const appRaw = refsToAbsoluteFiles(dir, resolver?.sets?.appRaw?.sources, 'resolver appRaw');
    const appSemantics = refsToAbsoluteFiles(dir, resolver?.sets?.appSemantics?.sources, 'resolver appSemantics');
    const appComponents = refsToAbsoluteFiles(dir, resolver?.sets?.appComponents?.sources, 'resolver appComponents');

    const themeContextSources = resolver?.modifiers?.appTheme?.contexts || {};
    const appThemes = Object.values(themeContextSources).flatMap((sources) => (
      refsToAbsoluteFiles(dir, sources, 'resolver appTheme')
    ));

    const ordered = uniqueInOrder([
      ...primitives,
      ...(failSoft ? [] : appRaw),
      ...appSemantics,
      ...appThemes,
      ...appComponents
    ]);

    console.log(`🧭 Style Dictionary resolver mode enabled: ${resolverAbsolutePath}`);
    console.log(`🧭 Resolver source files for dev-app: ${ordered.length}`);

    return ordered;
  } catch (error) {
    console.warn(`Warning: Failed to load app resolver for Style Dictionary (${appResolverPath})`);
    console.warn(`  ${error.message}`);
    return null;
  }
}

export default {
  usesDtcg: true,

  source: (() => {
    if (useResolverApp && target === 'dev-app') {
      const resolverSource = getResolverAppSourceList();
      if (resolverSource && resolverSource.length > 0) {
        return resolverSource;
      }
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
          format: 'css/variables-themed'
        }
      ]
    },

    js: {
      transformGroup: 'js',
      buildPath: path.join(repoRoot, 'generated', 'js') + path.sep,
      files: [
        {
          destination: 'tokens.js',
          format: 'javascript/es6'
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
    }
  }
};
