const fs = require('fs');
const path = require('path');
const systemMeta = require('../../system.meta.json');
const { deriveFigmaScopes } = require('../figma/figma-scope-rules');

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
  return typeof raw === 'string' ? raw : null;
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

module.exports = function registerScopedFigmaVariablesFormat(StyleDictionary) {
  StyleDictionary.registerFormat({
    name: 'figma/variables-scoped',
    format({ dictionary, file }) {
      const tokensRoot = findTokensRoot();
      const contextThemeCombinations = tokensRoot 
        ? collectContextThemeCombinations(tokensRoot)
        : ['default'];
      
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

      return JSON.stringify(
        {
          system: {
            id: systemMeta?.system?.id ?? 'envy-ui',
            version: systemMeta?.system?.version ?? '0.0.0'
          },
          collections
        },
        null,
        2
      );
    }
  });
};
