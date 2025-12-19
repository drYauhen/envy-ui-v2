const path = require('path');
const StyleDictionary = require('style-dictionary').default;
const repoRoot = path.resolve(__dirname, '..');
const systemMeta = require('../system.meta.json');
const registerStorybookColorsFormat = require('./formats/storybookColors');
const registerFigmaAdapterFormat = require('./formats/figmaAdapter');
const registerTokenStudioFormat = require('./formats/tokenStudio');
const registerFullVariablesFormat = require('./formats/variablesFull');
const registerScopedFigmaVariablesFormat = require('./formats/figmaVariablesScoped');

registerStorybookColorsFormat(StyleDictionary);
registerFigmaAdapterFormat(StyleDictionary);
registerTokenStudioFormat(StyleDictionary);
registerFullVariablesFormat(StyleDictionary);
registerScopedFigmaVariablesFormat(StyleDictionary);

module.exports = {
  usesDtcg: true,

  source: [
    path.join(repoRoot, 'tokens', '**', '*.json')
  ],

  log: {
    verbosity: 'verbose'
  },

  platforms: {
    css: {
      transformGroup: 'css',
      buildPath: path.join(repoRoot, 'build', 'css') + path.sep,
      prefix: systemMeta?.tokens?.prefix,
      files: [
        {
          destination: 'tokens.css',
          format: 'css/variables'
        }
      ]
    },

    js: {
      transformGroup: 'js',
      buildPath: path.join(repoRoot, 'build', 'js') + path.sep,
      prefix: systemMeta?.tokens?.prefix,
      files: [
        {
          destination: 'tokens.js',
          format: 'javascript/es6'
        }
      ]
    },

    storybook: {
      transformGroup: 'css',
      buildPath: path.join(repoRoot, 'build', 'storybook') + path.sep,
      files: [
        {
          destination: 'colors.json',
          format: 'json/storybook-colors'
        }
      ]
    },

    figma: {
      transformGroup: 'js',
      buildPath: path.join(repoRoot, 'build', 'figma') + path.sep,
      files: [
        {
          destination: 'variables.adapter.json',
          format: 'figma/adapter'
        }
      ]
    },

    tokenstudio: {
      transformGroup: 'js',
      buildPath: path.join(repoRoot, 'build') + path.sep,
      files: [
        {
          destination: 'tokenstudio.json',
          format: 'json/token-studio'
        }
      ]
    },

    pluginVariables: {
      transformGroup: 'js',
      buildPath: path.join(repoRoot, 'build') + path.sep,
      files: [
        {
          destination: 'variables.tokens.json',
          format: 'figma/variables-full'
        }
      ]
    },

    figmaScoped: {
      transformGroup: 'js',
      buildPath: path.join(repoRoot, 'build', 'figma') + path.sep,
      files: [
        {
          destination: 'variables.tokens.json',
          format: 'figma/variables-scoped'
        }
      ]
    }
  }
};
