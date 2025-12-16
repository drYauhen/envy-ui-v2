const path = require('path');
const StyleDictionary = require('style-dictionary').default;
const repoRoot = path.resolve(__dirname, '..');
const systemMeta = require('../system.meta.json');
const registerStorybookColorsFormat = require('./formats/storybookColors');

registerStorybookColorsFormat(StyleDictionary);

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
    }
  }
};
