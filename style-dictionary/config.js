const path = require('path');

const repoRoot = path.resolve(__dirname, '..');

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
      prefix: 'env2',
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
      prefix: 'env2',
      files: [
        {
          destination: 'tokens.js',
          format: 'javascript/es6'
        }
      ]
    }
  }
};
