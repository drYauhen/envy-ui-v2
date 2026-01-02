const { isVisualToken } = require('../utils/token-filters');

module.exports = function registerTokenStudioFormat(StyleDictionary) {
  StyleDictionary.registerFormat({
    name: 'json/token-studio',
    format({ dictionary }) {
      const output = {};

      dictionary.allTokens.forEach((token) => {
        const filePath = token.filePath || '';
        
        // Skip non-visual tokens (behavior/, metadata/, etc.)
        if (!isVisualToken(filePath)) {
          return;
        }
        
        const key = token.path.join('.');
        const type = token.$type || token.type || token.attributes?.category;
        const value = token.original?.value ?? token.$value ?? token.value;

        output[key] = {
          $value: value,
          $type: type
        };

        if (token.description) {
          output[key].$description = token.description;
        }
      });

      return JSON.stringify(output, null, 2);
    }
  });
};
