import { converter } from 'culori';
import { deriveFigmaScopes } from '../figma/figma-scope-rules.js';
import { isVisualToken } from '../utils/token-filters.js';
import {
  getSystemMeta,
  mapVariableType,
  resolveCollectionName,
  resolveNumericValue,
  resolveRawColorValue
} from '../utils/figma-format-utils.js';

const systemMeta = getSystemMeta();

// Setup culori converters
const toRgb = converter('rgb');

function resolveColorValue(token) {
  const raw = resolveRawColorValue(token);
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

const THEME_FILE_RE = /\/contexts\/(app|website|report)\/themes\/([^/]+)\.json$/;
const CONTEXT_FILE_RE = /\/contexts\/(app|website|report)\//;
const toPosixPath = (value = '') => value.replace(/\\/g, '/');

function collectContextThemeCombinationsFromDictionary(dictionary) {
  const combinations = new Set();

  dictionary.allTokens.forEach((token) => {
    const filePath = toPosixPath(token.filePath || '');
    const match = filePath.match(THEME_FILE_RE);
    if (!match) return;
    const context = match[1];
    const theme = match[2];
    combinations.add(`${context}-${theme}`);
  });

  return [...combinations].sort((a, b) => a.localeCompare(b));
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

export default function registerScopedFigmaVariablesFormat(StyleDictionary) {
  StyleDictionary.registerFormat({
    name: 'figma/variables-scoped',
    format({ dictionary, file }) {
      // Get context filter from file options
      const contextFilter = file.options?.context || null;
      const allCombinations = collectContextThemeCombinationsFromDictionary(dictionary);
      
      // Filter combinations by context if filter is specified
      const contextThemeCombinations = (contextFilter
        ? allCombinations.filter(mode => mode.startsWith(`${contextFilter}-`))
        : allCombinations);
      const effectiveModes = contextThemeCombinations.length > 0
        ? contextThemeCombinations
        : (contextFilter ? [`${contextFilter}-default`] : ['default']);
      
      const collectionsMap = new Map();
      const variablesMap = new Map(); // Map<tokenPath, variable>
      const baseTokenByPath = new Map();

      dictionary.allTokens.forEach((token) => {
        const filePath = toPosixPath(token.filePath || '');
        if (filePath.includes('/contexts/') || filePath.includes('/themes/')) return;
        const tokenPath = token.path.join('.');
        if (!baseTokenByPath.has(tokenPath)) {
          baseTokenByPath.set(tokenPath, token);
        }
      });

      // First pass: collect all tokens and create variable entries
      dictionary.allTokens.forEach((token) => {
        const filePath = token.filePath || '';
        const normalizedFilePath = toPosixPath(filePath);
        
        // Skip non-visual tokens (behavior/, metadata/, etc.)
        if (!isVisualToken(filePath)) {
          return;
        }
        
        const variableType = mapVariableType(token);
        if (!variableType) return;

        const tokenPath = token.path.join('.');
        const scopes = deriveFigmaScopes(tokenPath);
        const collectionName = resolveCollectionName(token, variableType, {
          systemId: systemMeta?.system?.id ?? 'envy-ui'
        });
        
        if (!collectionsMap.has(collectionName)) {
          collectionsMap.set(collectionName, {
            name: collectionName,
            modes: effectiveModes,
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
        // New structure: tokens/{context}/themes/{theme}.json
        let modes = [];
        
        // Check if token is from a theme file: tokens/contexts/{context}/themes/{theme}.json
        const themeMatch = normalizedFilePath.match(THEME_FILE_RE);
        if (themeMatch) {
          // Theme token: applies to specific context+theme
          const context = themeMatch[1];
          const theme = themeMatch[2];
          modes = [`${context}-${theme}`];
        } else {
          // Base token (foundation/semantic/component): applies to all modes
          // Note: Context-specific tokens are now in foundations/semantic within each context
          // but they still apply to all themes in that context via the filter below
          const contextMatch = normalizedFilePath.match(CONTEXT_FILE_RE);
          if (contextMatch) {
            // Token is from a specific context, apply to all themes in that context
            const context = contextMatch[1];
            modes = effectiveModes.filter(m => m.startsWith(`${context}-`));
          } else {
            // Token is from shared location (shouldn't happen in new structure, but keep for safety)
            modes = effectiveModes;
          }
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
          effectiveModes.forEach(mode => {
            if (!(mode in variable.valuesByMode)) {
              const baseToken = baseTokenByPath.get(variable.path);
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
      const detectedContext = detectContextFromModes(effectiveModes);

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
}
