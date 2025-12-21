/**
 * CSS Variables format with theme support
 * Generates CSS with selectors for themes
 * 
 * Structure:
 * - Base tokens go to :root
 * - Theme tokens go to [data-eui-context="..."][data-eui-theme="..."] selectors
 */

const fs = require('fs');
const path = require('path');

module.exports = function registerCssVariablesThemedFormat(StyleDictionary) {
  StyleDictionary.registerFormat({
    name: 'css/variables-themed',
    format({ dictionary, file }) {
      // Find tokens root directory
      // file.destination is like: /path/to/generated/css/tokens.css
      // tokens should be at: /path/to/tokens
      const buildPath = file.destination ? path.dirname(file.destination) : process.cwd();
      let tokensRoot = path.resolve(buildPath, '../../tokens');
      
      // Fallback: try relative to style-dictionary directory (__dirname points to formats/)
      if (!fs.existsSync(tokensRoot)) {
        const altTokensRoot = path.resolve(__dirname, '../../tokens');
        if (fs.existsSync(altTokensRoot)) {
          tokensRoot = altTokensRoot;
        }
      }
      
      // Read theme JSON files directly to get all values (bypassing Style Dictionary collision resolution)
      const themeFiles = new Map(); // Map<selector, {filePath, data}>
      
      // Find all theme files
      const themesDir = path.join(tokensRoot, 'themes');
      if (fs.existsSync(themesDir)) {
        const contexts = fs.readdirSync(themesDir, { withFileTypes: true }).filter(d => d.isDirectory());
        contexts.forEach(contextDir => {
          const context = contextDir.name;
          const contextPath = path.join(themesDir, context);
          const themeFilesList = fs.readdirSync(contextPath).filter(f => f.endsWith('.json'));
          themeFilesList.forEach(themeFile => {
            const theme = path.basename(themeFile, '.json');
            const selector = `[data-eui-context="${context}"][data-eui-theme="${theme}"]`;
            const filePath = path.join(contextPath, themeFile);
            try {
              const data = JSON.parse(fs.readFileSync(filePath, 'utf8'));
              themeFiles.set(selector, { filePath, data });
            } catch (e) {
              console.warn(`Warning: Could not read theme file ${filePath}:`, e.message);
            }
          });
        });
      }
      const baseTokens = [];
      const themeTokens = new Map(); // Map<selector, tokens[]>

      // First pass: collect theme/context tokens
      // Note: Style Dictionary resolves token collisions, keeping only one value per path
      // We need to read theme JSON files directly to get all theme-specific values
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

      // Helper function to resolve a token value using Style Dictionary's resolved tokens
      const resolveTokenValue = (tokenPath, rawValue) => {
        // If it's already a resolved value (not a reference), return as-is
        if (typeof rawValue === 'string' && !rawValue.startsWith('{') && !rawValue.endsWith('}')) {
          return rawValue;
        }
        
        // If it's a reference (e.g., {eui.radius.pill}), extract the path and resolve
        if (typeof rawValue === 'string' && rawValue.startsWith('{') && rawValue.endsWith('}')) {
          const referenceStr = rawValue.slice(1, -1); // eui.radius.pill
          const referencePath = referenceStr.split('.'); // ['eui', 'radius', 'pill']
          
          // Try to find the token in dictionary by path (exact match)
          const resolvedToken = dictionary.allTokens.find(t => {
            const tPath = t.path || [];
            if (tPath.length !== referencePath.length) return false;
            return tPath.every((seg, i) => seg === referencePath[i]);
          });
          
          if (resolvedToken && (resolvedToken.value || resolvedToken.$value)) {
            return resolvedToken.value || resolvedToken.$value;
          }
        }
        
        // Fallback to raw value
        return rawValue;
      };
      
      // Helper function to recursively extract tokens from JSON object
      const extractTokensFromJson = (obj, prefix = []) => {
        const tokens = [];
        for (const [key, value] of Object.entries(obj)) {
          const path = [...prefix, key];
          if (value && typeof value === 'object' && '$value' in value) {
            // This is a token definition
            // Build token name from full path, ensuring eui prefix is preserved
            const tokenName = path.map(s => s.replace(/\./g, '-')).join('-');
            const resolvedValue = resolveTokenValue(path, value.$value);
            tokens.push({ name: tokenName, path: path, value: resolvedValue });
          } else if (value && typeof value === 'object' && !Array.isArray(value)) {
            // Recurse into nested objects (skip arrays)
            tokens.push(...extractTokensFromJson(value, path));
          }
        }
        return tokens;
      };
      
      // Second pass: collect base tokens (excluding those from themes/contexts)
      // Collect token names that are defined in themes/contexts to avoid duplicates
      const themeDefinedTokenNames = new Set();
      themeTokens.forEach((tokens) => {
        tokens.forEach((token) => {
          themeDefinedTokenNames.add(token.name || (token.path || []).join('.'));
        });
      });
      
      // Track which base tokens we've added (by path) to avoid duplicates
      const baseTokenPaths = new Set();
      
      dictionary.allTokens.forEach((token) => {
        const filePath = token.filePath || '';
        const tokenName = token.name || (token.path || []).join('.');
        const tokenPath = (token.path || []).join('.');

        // Skip tokens from themes/contexts files - they're already in themeTokens
        if (filePath.includes('/themes/') || filePath.includes('/contexts/')) {
          return;
        }

        // Add to base tokens (these are foundations, semantic base, components)
        // Important: Include semantic tokens in :root even if they're overridden in themes
        // Themes will override them in their selectors, providing CSS cascade fallback
        // Use token path to avoid duplicates (Style Dictionary may have multiple entries for same path due to collisions)
        if (!baseTokenPaths.has(tokenPath)) {
          baseTokens.push(token);
          baseTokenPaths.add(tokenPath);
        }
      });
      
      // Ensure semantic/shape.json tokens are included in base tokens with original values
      // Read semantic/shape.json directly to get original values (before collision resolution)
      // This ensures base values are in :root even if themes override them
      const semanticShapePath = path.join(tokensRoot, 'semantic', 'shape.json');
      if (fs.existsSync(semanticShapePath)) {
        try {
          const semanticShapeData = JSON.parse(fs.readFileSync(semanticShapePath, 'utf8'));
          // Extract tokens starting from eui.radius path to get correct names with eui- prefix
          const euiData = semanticShapeData.eui || semanticShapeData;
          if (euiData.radius) {
            const shapeTokens = extractTokensFromJson(euiData.radius, ['eui', 'radius']);
            shapeTokens.forEach(({ name, path: tokenPath, value }) => {
              const tokenPathStr = tokenPath.join('.');
              // Remove existing token from baseTokens if it exists (may have wrong value due to collisions)
              const existingIndex = baseTokens.findIndex(t => (t.path || []).join('.') === tokenPathStr);
              if (existingIndex >= 0) {
                baseTokens.splice(existingIndex, 1);
              }
              // Add token with original value from semantic/shape.json
              baseTokens.push({ name, value, path: tokenPath });
              if (!baseTokenPaths.has(tokenPathStr)) {
                baseTokenPaths.add(tokenPathStr);
              }
            });
          }
        } catch (e) {
          console.warn(`Warning: Could not read semantic/shape.json: ${e.message}`);
        }
      }

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

      // Generate theme tokens from directly read JSON files (bypassing collision resolution)
      themeFiles.forEach(({ data }, selector) => {
        const themeTokenList = extractTokensFromJson(data);
        if (themeTokenList.length > 0) {
          output += `${selector} {\n`;
          themeTokenList.sort((a, b) => a.name.localeCompare(b.name));
          themeTokenList.forEach(({ name, value }) => {
            if (value) {
              output += `  --${name}: ${value};\n`;
            }
          });
          output += '}\n\n';
        }
      });

      // Also generate tokens from dictionary (for context tokens and any theme tokens that made it through)
      themeTokens.forEach((tokens, selector) => {
        // Skip if we already processed this selector from themeFiles
        if (themeFiles.has(selector)) {
          return;
        }
        output += `${selector} {\n`;
        const sortedTokens = [...tokens].sort((a, b) => {
          const nameA = a.name || (a.path || []).join('.');
          const nameB = b.name || (b.path || []).join('.');
          return nameA.localeCompare(nameB);
        });
        sortedTokens.forEach((token) => {
          const name = token.name || (token.path || []).map(s => s.replace(/\./g, '-')).join('-');
          const cssName = `--${name}`;
          const value = token.value || token.original?.value || token.$value || '';
          if (value && name) {
            output += `  ${cssName}: ${value};\n`;
          }
        });
        output += '}\n\n';
      });

      return output;
    }
  });
};

