/**
 * CSS Variables format with theme support
 * Generates CSS with selectors for themes
 * 
 * Structure:
 * - Base tokens go to :root
 * - Theme tokens go to [data-eui-context="..."][data-eui-theme="..."] selectors
 */

module.exports = function registerCssVariablesThemedFormat(StyleDictionary) {
  StyleDictionary.registerFormat({
    name: 'css/variables-themed',
    format({ dictionary, file }) {
      const baseTokens = [];
      const themeTokens = new Map(); // Map<selector, tokens[]>

      // First pass: collect theme/context tokens
      const themeTokenNames = new Set();
      
      dictionary.allTokens.forEach((token) => {
        const filePath = token.filePath || '';
        const tokenName = token.name || (token.path || []).join('.');

        // Detect if token is from a theme file
        const isThemeToken = filePath.includes('/themes/');
        const isContextToken = filePath.includes('/contexts/');

        if (isThemeToken) {
          // Parse theme path: tokens/themes/app/accessibility.json
          const themeMatch = filePath.match(/themes\/([^/]+)\/([^/]+)\.json$/);
          if (themeMatch) {
            const context = themeMatch[1];
            const theme = themeMatch[2];
            const selector = `[data-eui-context="${context}"][data-eui-theme="${theme}"]`;
            
            if (!themeTokens.has(selector)) {
              themeTokens.set(selector, []);
            }
            themeTokens.get(selector).push(token);
            themeTokenNames.add(tokenName);
          }
        } else if (isContextToken) {
          // Parse context path: tokens/contexts/app/semantic.json
          const contextMatch = filePath.match(/contexts\/([^/]+)\/semantic\.json$/);
          if (contextMatch) {
            const context = contextMatch[1];
            const selector = `[data-eui-context="${context}"]`;
            
            if (!themeTokens.has(selector)) {
              themeTokens.set(selector, []);
            }
            themeTokens.get(selector).push(token);
            themeTokenNames.add(tokenName);
          }
        }
      });

      // Second pass: collect base tokens (excluding those from themes/contexts)
      dictionary.allTokens.forEach((token) => {
        const filePath = token.filePath || '';
        const tokenName = token.name || (token.path || []).join('.');

        // Skip tokens from themes/contexts files - they're already in themeTokens
        if (filePath.includes('/themes/') || filePath.includes('/contexts/')) {
          return;
        }

        // Add to base tokens (these are foundations, semantic base, components)
        baseTokens.push(token);
      });

      let output = '/**\n * Do not edit directly, this file was auto-generated.\n */\n\n';

      // Generate base tokens in :root
      if (baseTokens.length > 0) {
        output += ':root {\n';
        baseTokens.forEach((token) => {
          const name = `--${token.name}`;
          const value = token.value || token.$value || '';
          output += `  ${name}: ${value};\n`;
        });
        output += '}\n\n';
      }

      // Generate theme tokens in selectors
      themeTokens.forEach((tokens, selector) => {
        output += `${selector} {\n`;
        tokens.forEach((token) => {
          const name = `--${token.name}`;
          const value = token.value || token.$value || '';
          output += `  ${name}: ${value};\n`;
        });
        output += '}\n\n';
      });

      return output;
    }
  });
};

