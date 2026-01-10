/**
 * CSS Variables format with theme support
 * Generates CSS with selectors for themes
 * 
 * Structure:
 * - Base tokens go to :root
 * - Theme tokens go to [data-eui-context="..."][data-eui-theme="..."] selectors
 */

import fs from 'fs';
import path from 'path';
import { fileURLToPath } from 'url';
import { isVisualToken } from '../utils/token-filters.js';

const __dirname = fileURLToPath(new URL('.', import.meta.url));

export default function registerCssVariablesThemedFormat(StyleDictionary, options = {}) {
  const { allowedContexts = ['app', 'website', 'report', 'storybook'], contextMirrors = {} } = options;

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
      
      // Read context semantic and theme JSON files directly to get all values (bypassing Style Dictionary collision resolution)
      // New structure: tokens/primitives/*.json, tokens/contexts/{context}/semantics/*.json, tokens/contexts/{context}/themes/{theme}.json
      const contextFiles = new Map(); // Map<selector, {filePath, data, type}>

      // Find all context directories (filter by allowed contexts)
      // Mirrored contexts (like storybook mirroring app) should not generate their own CSS rules
      // They inherit styles through CSS attribute inheritance
      const contextDirs = allowedContexts.filter(context => !Object.keys(contextMirrors).includes(context));

      console.log(`Generating CSS for contexts: ${contextDirs.join(', ')}`);

      contextDirs.forEach(context => {
        // Process semantic tokens (new structure: tokens/contexts/{context}/semantics/)
        const contextSemanticsDir = path.join(tokensRoot, 'contexts', context, 'semantics');
        if (fs.existsSync(contextSemanticsDir)) {
          const semanticFilesList = fs.readdirSync(contextSemanticsDir).filter(f => f.endsWith('.json'));
          semanticFilesList.forEach(semanticFile => {
            const semanticName = path.basename(semanticFile, '.json');
            const selector = `[data-eui-context="${context}"]`;
            const semanticFilePath = path.join(contextSemanticsDir, semanticFile);
            try {
              const data = JSON.parse(fs.readFileSync(semanticFilePath, 'utf8'));
              const key = `${selector}:${semanticName}`;
              contextFiles.set(key, { filePath: semanticFilePath, data, type: 'semantic', context, name: semanticName });
            } catch (e) {
              console.warn(`Warning: Could not read semantic file ${semanticFilePath}:`, e.message);
            }
          });
        }

        // Process themes (new structure: tokens/contexts/{context}/themes/)
        const contextThemesDir = path.join(tokensRoot, 'contexts', context, 'themes');
        if (fs.existsSync(contextThemesDir)) {
          const themeFilesList = fs.readdirSync(contextThemesDir).filter(f => f.endsWith('.json'));
          themeFilesList.forEach(themeFile => {
            const theme = path.basename(themeFile, '.json');
            const selector = `[data-eui-context="${context}"][data-eui-theme="${theme}"]`;
            const themeFilePath = path.join(contextThemesDir, themeFile);
            try {
              const data = JSON.parse(fs.readFileSync(themeFilePath, 'utf8'));
              contextFiles.set(selector, { filePath: themeFilePath, data, type: 'theme', context, theme });
            } catch (e) {
              console.warn(`Warning: Could not read theme file ${themeFilePath}:`, e.message);
            }
          });
        }
      });
      const baseTokens = [];
      const themeTokens = new Map(); // Map<selector, tokens[]>

      // First pass: collect theme/context tokens
      // Note: Style Dictionary resolves token collisions, keeping only one value per path
      // We need to read theme JSON files directly to get all theme-specific values
      const themeTokenNames = new Set();
      
      dictionary.allTokens.forEach((token) => {
        const filePath = token.filePath || '';
        
        // Skip non-visual tokens (behavior/, metadata/, etc.)
        if (!isVisualToken(filePath)) {
          return;
        }
        
        const tokenName = token.name || (token.path || []).join('.');

        // Detect if token is from a theme file
        // New structure: tokens/contexts/{context}/themes/{theme}.json
        const isThemeToken = /\/contexts\/[^/]+\/themes\/[^/]+\.json$/.test(filePath);

        if (isThemeToken) {
          // Parse theme path: tokens/contexts/app/themes/accessibility.json
          const themeMatch = filePath.match(/\/contexts\/(app|website|report)\/themes\/([^/]+)\.json$/);
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
        }
      });

      // Map to store semantic base values for reference resolution
      const semanticBaseValues = new Map(); // Map<tokenPath, value>

      // Helper function to resolve a token value using semantic base values first, then Style Dictionary's resolved tokens
      const resolveTokenValue = (tokenPath, rawValue) => {
        // If it's already a resolved value (not a reference), return as-is
        if (typeof rawValue === 'string' && !rawValue.startsWith('{') && !rawValue.endsWith('}')) {
          return rawValue;
        }

        // If it's a reference (e.g., {eui.radius.pill}), extract the path and resolve
        if (typeof rawValue === 'string' && rawValue.startsWith('{') && rawValue.endsWith('}')) {
          const referenceStr = rawValue.slice(1, -1); // eui.radius.pill
          const referencePath = referenceStr.split('.'); // ['eui', 'radius', 'pill']
          const referencePathStr = referencePath.join('.');

          // FIRST: Check if this reference exists in semanticBaseValues (semantic base value)
          if (semanticBaseValues.has(referencePathStr)) {
            return semanticBaseValues.get(referencePathStr);
          }

          // SECOND: Try to find the token in dictionary by path (exact match)
          // First, try to find by path array
          let resolvedToken = dictionary.allTokens.find(t => {
            const tPath = t.path || [];
            if (tPath.length !== referencePath.length) return false;
            return tPath.every((seg, i) => seg === referencePath[i]);
          });

          // If not found by path, try to find by name (for resolved tokens)
          if (!resolvedToken) {
            const tokenName = referencePath.map(s => s.replace(/\./g, '-')).join('-');
            resolvedToken = dictionary.allTokens.find(t => {
              const tName = t.name || (t.path || []).map(s => s.replace(/\./g, '-')).join('-');
              return tName === tokenName;
            });
          }

          if (resolvedToken) {
            // Get the resolved value (Style Dictionary resolves references)
            const resolvedValue = resolvedToken.value || resolvedToken.$value;
            // If the resolved value is still a reference, recursively resolve it
            if (typeof resolvedValue === 'string' && resolvedValue.startsWith('{') && resolvedValue.endsWith('}')) {
              return resolveTokenValue([], resolvedValue);
            }
            return resolvedValue;
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

        // Skip tokens from themes files - they're already in themeTokens
        // New structure: tokens/{context}/themes/{theme}.json
        if (/\/themes\/[^/]+\.json$/.test(filePath)) {
          return;
        }

        // Skip non-visual tokens (behavior/, metadata/, etc.)
        if (!isVisualToken(filePath)) {
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
      
      // Ensure primitives, semantic and component tokens are included in base tokens with original values
      // Read JSON files directly to get original values (before collision resolution)
      // This ensures base values are in :root even if themes override them
      // Structure: tokens/primitives/*.json, tokens/contexts/{context}/semantics/... and tokens/app/components/.../

      // FIRST PASS: Process primitives files to populate base tokens
      const primitivesDir = path.join(tokensRoot, 'primitives');
      if (fs.existsSync(primitivesDir)) {
        const primitivesFiles = fs.readdirSync(primitivesDir).filter(f => f.endsWith('.json'));
        primitivesFiles.forEach(primitivesFile => {
          const primitivesFilePath = path.join(primitivesDir, primitivesFile);
          try {
            const primitivesData = JSON.parse(fs.readFileSync(primitivesFilePath, 'utf8'));
            const primitivesTokens = extractTokensFromJson(primitivesData);
            primitivesTokens.forEach(({ name, path: tokenPath, value }) => {
              const tokenPathStr = tokenPath.join('.');
              // Add primitive token to base tokens
              baseTokens.push({ name, value, path: tokenPath });
              if (!baseTokenPaths.has(tokenPathStr)) {
                baseTokenPaths.add(tokenPathStr);
              }
            });
          } catch (e) {
            console.warn(`Warning: Could not read primitives file ${primitivesFile}: ${e.message}`);
          }
        });
      }

      // SECOND PASS: Process only semantic files to populate semanticBaseValues map
      const semanticOnlyFiles = [
        { file: 'contexts/app/semantics/shape.json', pathPrefix: ['eui', 'radius'] },
        { file: 'contexts/app/semantics/colors/border.json', pathPrefix: ['eui', 'color', 'border'] },
        { file: 'contexts/app/semantics/colors/text.json', pathPrefix: ['eui', 'color', 'text'] },
        { file: 'contexts/app/semantics/colors/background.json', pathPrefix: ['eui', 'color', 'background'] }
      ];

      semanticOnlyFiles.forEach(({ file, pathPrefix }) => {
        const semanticFilePath = path.join(tokensRoot, file);
        if (fs.existsSync(semanticFilePath)) {
          try {
            const semanticData = JSON.parse(fs.readFileSync(semanticFilePath, 'utf8'));
            const euiData = semanticData.eui || semanticData;
            let targetData = euiData;
            for (let i = 1; i < pathPrefix.length; i++) {
              targetData = targetData?.[pathPrefix[i]];
            }
            if (targetData) {
              // Extract tokens and store in semanticBaseValues map (before resolving references)
              const extractAndStore = (obj, prefix = []) => {
                for (const [key, value] of Object.entries(obj)) {
                  const path = [...prefix, key];
                  if (value && typeof value === 'object' && '$value' in value) {
                    const pathStr = path.join('.');
                    // Store raw value (may contain references)
                    semanticBaseValues.set(pathStr, value.$value);
                  } else if (value && typeof value === 'object' && !Array.isArray(value)) {
                    extractAndStore(value, path);
                  }
                }
              };
              extractAndStore(targetData, pathPrefix);
            }
          } catch (e) {
            console.warn(`Warning: Could not read semantic file ${file}: ${e.message}`);
          }
        }
      });

      // SECOND PASS: Process all files (semantic + component) to add to baseTokens
      const semanticFilesToProcess = [
        { file: 'contexts/app/semantics/shape.json', pathPrefix: ['eui', 'radius'] },
        { file: 'contexts/app/semantics/colors/border.json', pathPrefix: ['eui', 'color', 'border'] },
        { file: 'contexts/app/semantics/colors/text.json', pathPrefix: ['eui', 'color', 'text'] },
        { file: 'contexts/app/semantics/colors/background.json', pathPrefix: ['eui', 'color', 'background'] },
        { file: 'app/components/badge/shape.json', pathPrefix: ['eui', 'badge', 'shape'] }
      ];

      semanticFilesToProcess.forEach(({ file, pathPrefix }) => {
        const semanticFilePath = path.join(tokensRoot, file);
        if (fs.existsSync(semanticFilePath)) {
          try {
            const semanticData = JSON.parse(fs.readFileSync(semanticFilePath, 'utf8'));
            const euiData = semanticData.eui || semanticData;
            // Navigate to the nested structure (e.g., eui.color.border or eui.radius)
            let targetData = euiData;
            for (let i = 1; i < pathPrefix.length; i++) {
              targetData = targetData?.[pathPrefix[i]];
            }
            if (targetData) {
              const semanticTokens = extractTokensFromJson(targetData, pathPrefix);
              semanticTokens.forEach(({ name, path: tokenPath, value }) => {
                const tokenPathStr = tokenPath.join('.');
                // Remove existing token from baseTokens if it exists (may have wrong value due to collisions)
                const existingIndex = baseTokens.findIndex(t => (t.path || []).join('.') === tokenPathStr);
                if (existingIndex >= 0) {
                  baseTokens.splice(existingIndex, 1);
                }
                // Add token with original value from semantic file
                baseTokens.push({ name, value, path: tokenPath });
                if (!baseTokenPaths.has(tokenPathStr)) {
                  baseTokenPaths.add(tokenPathStr);
                }
              });
            }
          } catch (e) {
            console.warn(`Warning: Could not read ${file}: ${e.message}`);
          }
        }
      });

      let output = '/**\n * Do not edit directly, this file was auto-generated.\n */\n\n';

      // CSS Cascade Layers - ADR-0024
      output += '/* CSS Cascade Layers - ADR-0024 */\n';
      output += '@layer third-party, context-app, context-website, context-report, components, theme;\n\n';

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

      // Context tokens are now in foundations/semantic within each context
      // They are handled as base tokens and don't need separate context selectors

      // Generate context-specific tokens from directly read JSON files (bypassing collision resolution)
      // Group tokens by selector for efficient CSS generation
      const selectorTokens = new Map(); // Map<selector, tokens[]>

      contextFiles.forEach((fileInfo, key) => {
        const { data, type } = fileInfo;
        let selector;

        if (type === 'theme') {
          selector = key; // key is already the selector for themes
        } else {
          // For foundations and semantic, extract selector from key
          const colonIndex = key.indexOf(':');
          selector = key.substring(0, colonIndex);
        }

        if (!selectorTokens.has(selector)) {
          selectorTokens.set(selector, []);
        }

        const tokenList = extractTokensFromJson(data);
        selectorTokens.get(selector).push(...tokenList);
      });

      // Check if we have any context tokens
      const hasContextTokens = Array.from(selectorTokens.values()).some(tokens => tokens.length > 0);

      // Check if there are any secondary theme tokens (from dictionary)
      const hasSecondaryThemeTokens = Array.from(themeTokens.keys()).some(selector =>
        !selectorTokens.has(selector) && themeTokens.get(selector).length > 0
      );

      // If we have any context tokens, wrap them in @layer theme
      if (hasContextTokens || hasSecondaryThemeTokens) {
        output += '@layer theme {\n';

        // Generate context tokens grouped by selector
        selectorTokens.forEach((tokens, selector) => {
          if (tokens.length > 0) {
            output += `  ${selector} {\n`;
            tokens.sort((a, b) => a.name.localeCompare(b.name));
            tokens.forEach(({ name, value }) => {
              if (value) {
                output += `    --${name}: ${value};\n`;
              }
            });
            output += '  }\n\n';
          }
        });



        output += '}\n\n';
      }

      return output;
    }
  });
}
