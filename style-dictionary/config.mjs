import path from 'path';
import { fileURLToPath } from 'url';
import { createRequire } from 'module';
import { globSync } from 'glob';
import StyleDictionary from 'style-dictionary';

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);
const require = createRequire(import.meta.url);
const repoRoot = path.resolve(__dirname, '..');

// Import CommonJS formats using createRequire
const registerStorybookColorsFormat = require('./formats/storybookColors.js');
const registerFigmaAdapterFormat = require('./formats/figmaAdapter.js');
const registerTokenStudioFormat = require('./formats/tokenStudio.js');
const registerFullVariablesFormat = require('./formats/variablesFull.js');
const registerScopedFigmaVariablesFormat = require('./formats/figmaVariablesScoped.js');
const registerCssVariablesThemedFormat = require('./formats/cssVariablesThemed.js');

registerStorybookColorsFormat(StyleDictionary);
registerFigmaAdapterFormat(StyleDictionary);
registerTokenStudioFormat(StyleDictionary);
registerFullVariablesFormat(StyleDictionary);
registerScopedFigmaVariablesFormat(StyleDictionary);
registerCssVariablesThemedFormat(StyleDictionary);

export default {
  usesDtcg: true,

  source: (() => {
    // Use glob to find all .json files, but exclude .meta.json
    const allJsonFiles = globSync(path.join(repoRoot, 'tokens', '**', '*.json'), {
      ignore: [path.join(repoRoot, 'tokens', '**', '*.meta.json')]
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
    }
  }
};

