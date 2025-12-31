const fs = require('fs');
const path = require('path');
const { converter } = require('culori');
const systemMeta = require('../../system.meta.json');
const { deriveFigmaScopes } = require('../figma/figma-scope-rules');

// Setup culori converters
const toRgb = converter('rgb');

const toTitleCase = (value = '') =>
  value
    .replace(/[-_]/g, ' ')
    .replace(/\s+/g, ' ')
    .trim()
    .replace(/\b\w/g, (match) => match.toUpperCase());

function mapVariableType(token) {
  const t = token.$type || token.type || token.attributes?.category;
  if (!t) return null;
  if (t === 'color') return 'COLOR';
  if (['dimension', 'number', 'float', 'integer'].includes(t)) return 'FLOAT';
  return null;
}

function resolveNumericValue(token) {
  const raw = token.value ?? token.$value ?? token.original?.value;
  if (typeof raw === 'number') return raw;
  if (typeof raw === 'string') {
    const parsed = parseFloat(raw);
    if (!Number.isNaN(parsed)) return parsed;
  }
  return null;
}

function resolveColorValue(token) {
  const raw = token.value ?? token.$value ?? token.original?.value;
  if (typeof raw !== 'string') return null;
  
  // For Figma, convert OKLCH to RGB format
  // Figma Variables API requires RGB/RGBA format (values 0-1)
  if (raw.startsWith('oklch(') || raw.startsWith('OKLCH(')) {
    try {
      const rgb = toRgb(raw);
      if (rgb && typeof rgb.r === 'number' && typeof rgb.g === 'number' && typeof rgb.b === 'number') {
        // Clamp RGB values to [0, 1] range (some colors may be outside sRGB gamut)
        // Figma Variables API requires values in 0-1 range
        const r = Math.max(0, Math.min(1, rgb.r));
        const g = Math.max(0, Math.min(1, rgb.g));
        const b = Math.max(0, Math.min(1, rgb.b));
        const a = rgb.alpha !== undefined ? Math.max(0, Math.min(1, rgb.alpha)) : 1;
        
        // Return as RGBA object format for Figma Variables API (values 0-1)
        return {
          r,
          g,
          b,
          a
        };
      }
    } catch (error) {
      console.warn(`Failed to convert OKLCH to RGB for token ${token.path?.join('.')}: ${raw}`, error);
      // Fallback to original value (will be handled by plugin's convertColorToRGB)
      return raw;
    }
  }
  
  // If already RGB/HEX, return as-is (will be handled by convertColorToRGB in plugin as fallback)
  return raw;
}

function resolveCollectionName(token, variableType) {
  const systemId = systemMeta?.system?.id ?? 'envy-ui';
  if (variableType === 'COLOR') {
    const groupId = token.path[2] || token.path[1] || 'base';
    return `${systemId} • Colors / ${toTitleCase(groupId)}`;
  }

  const seg = token.path[1] || 'general';
  let category = 'Dimensions';
  if (seg.includes('radius') || seg.includes('shape')) category = 'Shape';
  else if (seg.includes('border')) category = 'Border';
  else if (seg.includes('focus')) category = 'Focus';
  else if (seg.includes('spacing') || seg.includes('gap') || seg.includes('padding') || seg.includes('size') || seg.includes('layout'))
    category = 'Size';

  return `${systemId} • ${category} / ${toTitleCase(seg || 'Base')}`;
}

// Helper to find tokens root
function findTokensRoot() {
  const possiblePaths = [
    path.resolve(__dirname, '../../tokens'),
    path.resolve(process.cwd(), 'tokens')
  ];
  for (const tokensRoot of possiblePaths) {
    if (fs.existsSync(tokensRoot)) {
      return tokensRoot;
    }
  }
  return null;
}

// Collect all context+theme combinations
function collectContextThemeCombinations(tokensRoot) {
  const combinations = [];
  
  // Read contexts
  const contextsDir = path.join(tokensRoot, 'contexts');
  const contexts = [];
  if (fs.existsSync(contextsDir)) {
    contexts.push(...fs.readdirSync(contextsDir)
      .filter(f => f.endsWith('.json'))
      .map(f => path.basename(f, '.json')));
  }
  
  // Read themes per context
  const themesDir = path.join(tokensRoot, 'themes');
  if (fs.existsSync(themesDir)) {
    const contextDirs = fs.readdirSync(themesDir, { withFileTypes: true })
      .filter(d => d.isDirectory());
    
    contextDirs.forEach(contextDir => {
      const context = contextDir.name;
      const contextPath = path.join(themesDir, context);
      const themes = fs.readdirSync(contextPath)
        .filter(f => f.endsWith('.json'))
        .map(f => path.basename(f, '.json'));
      
      themes.forEach(theme => {
        combinations.push(`${context}-${theme}`);
      });
    });
  }
  
  // If no themes found, create default modes for contexts
  if (combinations.length === 0 && contexts.length > 0) {
    contexts.forEach(context => {
      combinations.push(`${context}-default`);
    });
  }
  
  // Fallback to single default mode
  if (combinations.length === 0) {
    combinations.push('default');
  }
  
  return combinations;
}

// Detect context from modes array
function detectContextFromModes(modes) {
  if (!modes || modes.length === 0) return null;
  
  // Check if all modes start with the same context prefix
  const contexts = new Set();
  modes.forEach(mode => {
    const match = mode.match(/^([^-]+)-/);
    if (match) {
      contexts.add(match[1]);
    }
  });
  
  // If all modes are from the same context, return it
  if (contexts.size === 1) {
    return Array.from(contexts)[0];
  }
  
  // If mixed contexts or no prefix - return null (general file)
  return null;
}

module.exports = function registerScopedFigmaVariablesFormat(StyleDictionary) {
  StyleDictionary.registerFormat({
    name: 'figma/variables-scoped',
    format({ dictionary, file }) {
      const tokensRoot = findTokensRoot();
      const allCombinations = tokensRoot 
        ? collectContextThemeCombinations(tokensRoot)
        : ['default'];
      
      // Get context filter from file options
      const contextFilter = file.options?.context || null;
      
      // Filter combinations by context if filter is specified
      const contextThemeCombinations = contextFilter
        ? allCombinations.filter(mode => mode.startsWith(`${contextFilter}-`))
        : allCombinations;
      
      const collectionsMap = new Map();
      const variablesMap = new Map(); // Map<tokenPath, variable>

      // First pass: collect all tokens and create variable entries
      dictionary.allTokens.forEach((token) => {
        const variableType = mapVariableType(token);
        if (!variableType) return;

        const tokenPath = token.path.join('.');
        const scopes = deriveFigmaScopes(tokenPath);
        const collectionName = resolveCollectionName(token, variableType);
        
        if (!collectionsMap.has(collectionName)) {
          collectionsMap.set(collectionName, {
            name: collectionName,
            modes: contextThemeCombinations,
            variables: []
          });
        }

        // Create or get variable entry
        if (!variablesMap.has(tokenPath)) {
          const entry = {
            path: tokenPath,
            type: variableType,
            valuesByMode: {}
          };
          if (scopes.length) entry.scopes = scopes;
          variablesMap.set(tokenPath, entry);
          collectionsMap.get(collectionName).variables.push(entry);
        }

        // Determine which mode(s) this token belongs to
        const filePath = token.filePath || '';
        let modes = [];
        
        if (filePath.includes('/contexts/')) {
          // Context token: applies to all themes in that context
          const contextMatch = filePath.match(/contexts\/([^/]+)\.json$/);
          if (contextMatch) {
            const context = contextMatch[1];
            modes = contextThemeCombinations.filter(m => m.startsWith(`${context}-`));
          }
        } else if (filePath.includes('/themes/')) {
          // Theme token: applies to specific context+theme
          const themeMatch = filePath.match(/themes\/([^/]+)\/([^/]+)\.json$/);
          if (themeMatch) {
            const context = themeMatch[1];
            const theme = themeMatch[2];
            modes = [`${context}-${theme}`];
          }
        } else {
          // Base token (foundation/semantic/component): applies to all modes
          modes = contextThemeCombinations;
        }

        // Set value for applicable modes
        const value = variableType === 'COLOR'
          ? resolveColorValue(token)
          : resolveNumericValue(token);

        if (value !== null && value !== undefined) {
          const variable = variablesMap.get(tokenPath);
          modes.forEach(mode => {
            // Store value as-is (RGB object for colors, or string/number for others)
            variable.valuesByMode[mode] = value;
          });
        }
      });

      // Fill in missing mode values with base token values
      collectionsMap.forEach((collection) => {
        collection.variables.forEach((variable) => {
          contextThemeCombinations.forEach(mode => {
            if (!(mode in variable.valuesByMode)) {
              // Try to find a base token value for this path
              const baseToken = dictionary.allTokens.find(t => 
                t.path.join('.') === variable.path &&
                !t.filePath?.includes('/themes/') &&
                !t.filePath?.includes('/contexts/')
              );
              if (baseToken) {
                const value = variable.type === 'COLOR'
                  ? resolveColorValue(baseToken)
                  : resolveNumericValue(baseToken);
                if (value !== null && value !== undefined) {
                  variable.valuesByMode[mode] = value;
                }
              }
            }
          });
        });
      });

      const collections = Array.from(collectionsMap.values()).map((collection) => ({
        ...collection,
        variables: collection.variables
          .filter(v => Object.keys(v.valuesByMode).length > 0)
          .sort((a, b) => a.path.localeCompare(b.path))
      }));

      // Detect context from filtered modes
      const detectedContext = detectContextFromModes(contextThemeCombinations);

      return JSON.stringify(
        {
          system: {
            id: systemMeta?.system?.id ?? 'envy-ui',
            version: systemMeta?.system?.version ?? '0.0.0',
            context: detectedContext || undefined
          },
          collections
        },
        null,
        2
      );
    }
  });
};
