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
import { sortByName } from 'style-dictionary/utils';
import { isVisualToken } from '../utils/token-filters.js';
import { formatCssTokenDeclarations } from '../utils/css-formatting.js';
import {
  generateContextsCSS,
  generateEntrypointCSS,
  generatePrimitivesCSS,
  generateThemesCSS
} from '../../scripts/generate-canonical-css.mjs';

const __dirname = fileURLToPath(new URL('.', import.meta.url));

export default function registerCssVariablesThemedFormat(StyleDictionary, options = {}) {
  const { allowedContexts = ['app', 'website', 'report'], contextMirrors = {} } = options;

  // Check for fail-soft mode (handles missing references gracefully)
  const failSoft = process.env.STYLE_DICTIONARY_FAIL_SOFT === 'true';

  // NEW: Register canonical CSS formats for token architecture
  registerCanonicalFormats(StyleDictionary, options);

  StyleDictionary.registerFormat({
    name: 'css/variables-themed',
    format({ dictionary, file }) {
      const configuredSort = file?.options?.sort;
      const compareByName = configuredSort === 'name'
        ? sortByName
        : (a, b) => a.name.localeCompare(b.name);
      const sortOption = configuredSort === undefined ? compareByName : configuredSort;

      // Find tokens root directory
      // file.destination is like: /path/to/generated/css/tokens.themed.css
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
      const toPosixPath = (filePath = '') => filePath.replace(/\\/g, '/');
      const dictionaryFilePaths = Array.from(
        new Set(dictionary.allTokens.map((token) => token.filePath).filter(Boolean))
      );
      const primitiveSourceFiles = dictionaryFilePaths.filter((filePath) => (
        /\/primitives\/[^/]+\.json$/.test(toPosixPath(filePath))
      ));
      const rawSourceFilesByContext = new Map(contextDirs.map((context) => [context, []]));

      console.log(`Generating CSS for contexts: ${contextDirs.join(', ')}`);

      dictionaryFilePaths.forEach((filePath) => {
        const normalizedPath = toPosixPath(filePath);

        const rawMatch = normalizedPath.match(/\/contexts\/([^/]+)\/raw\/.+\.json$/);
        if (rawMatch) {
          const context = rawMatch[1];
          if (rawSourceFilesByContext.has(context)) {
            rawSourceFilesByContext.get(context).push(filePath);
          }
          return;
        }

        const semanticMatch = normalizedPath.match(/\/contexts\/([^/]+)\/semantics\/(.+\.json)$/);
        if (semanticMatch) {
          const context = semanticMatch[1];
          const relativePath = semanticMatch[2];
          if (!contextDirs.includes(context)) return;

          const selector = `[data-eui-context="${context}"]`;
          try {
            const data = JSON.parse(fs.readFileSync(filePath, 'utf8'));
            const key = `${selector}:${relativePath}`;
            contextFiles.set(key, {
              filePath,
              data,
              type: 'semantic',
              context,
              name: relativePath
            });
          } catch (e) {
            console.warn(`Warning: Could not read semantic file ${filePath}:`, e.message);
          }
          return;
        }

        const themeMatch = normalizedPath.match(/\/contexts\/([^/]+)\/themes\/([^/]+)\.json$/);
        if (themeMatch) {
          const context = themeMatch[1];
          const theme = themeMatch[2];
          if (!contextDirs.includes(context)) return;

          const selector = `[data-eui-context="${context}"][data-eui-theme="${theme}"]`;
          try {
            const data = JSON.parse(fs.readFileSync(filePath, 'utf8'));
            contextFiles.set(selector, { filePath, data, type: 'theme', context, theme });
          } catch (e) {
            console.warn(`Warning: Could not read theme file ${filePath}:`, e.message);
          }
        }
      });
      const baseTokens = [];

      // Maps used by the custom resolver path in this formatter
      const semanticBaseValues = new Map(); // Map<tokenPath, value>
      const primitiveResolvedValues = new Map(); // Map<tokenPath|tokenName, resolvedValue>
      const rawTokenValues = new Map(); // Map<tokenPath|tokenName, rawValue>

      const isReferenceValue = (value) => (
        typeof value === 'string' && value.startsWith('{') && value.endsWith('}')
      );

      const toReferenceVariants = (referenceId) => {
        const trimmed = (referenceId || '').trim();
        if (!trimmed) return [];
        const variants = new Set([trimmed]);
        if (trimmed.includes('.')) variants.add(trimmed.split('.').join('-'));
        if (trimmed.includes('-')) variants.add(trimmed.split('-').join('.'));
        return Array.from(variants);
      };

      const registerReferenceValue = (map, tokenPath, tokenName, value) => {
        if (typeof tokenPath === 'string' && tokenPath.length > 0) {
          map.set(tokenPath, value);
          map.set(tokenPath.split('.').join('-'), value);
        }
        if (typeof tokenName === 'string' && tokenName.length > 0) {
          map.set(tokenName, value);
          map.set(tokenName.split('.').join('-'), value);
        }
      };

      const collectRawTokensFromJson = (obj, prefix = []) => {
        const tokens = [];
        Object.entries(obj || {}).forEach(([key, value]) => {
          const nextPath = [...prefix, key];
          if (value && typeof value === 'object' && '$value' in value) {
            const tokenPath = nextPath.join('.');
            const tokenName = nextPath.join('-');
            tokens.push({ tokenPath, tokenName, value: value.$value });
            return;
          }
          if (value && typeof value === 'object' && !Array.isArray(value)) {
            tokens.push(...collectRawTokensFromJson(value, nextPath));
          }
        });
        return tokens;
      };

      // Build primitive lookup from raw primitive JSON files (not dictionary) to avoid collision noise
      const primitiveRawValues = new Map();
      const primitiveEntries = [];
      primitiveSourceFiles.forEach((primitiveFilePath) => {
        try {
          const primitiveData = JSON.parse(fs.readFileSync(primitiveFilePath, 'utf8'));
          const primitiveTokens = collectRawTokensFromJson(primitiveData);
          primitiveTokens.forEach(({ tokenPath, tokenName, value }) => {
            primitiveEntries.push({ tokenPath, tokenName, value });
            primitiveRawValues.set(tokenPath, value);
            primitiveRawValues.set(tokenName, value);
          });
        } catch (e) {
          console.warn(`Warning: Could not read primitive file ${primitiveFilePath}:`, e.message);
        }
      });

      const resolvePrimitiveReference = (referenceId, seen = new Set()) => {
        const normalized = (referenceId || '').trim();
        if (!normalized) return null;
        if (seen.has(normalized)) return null;

        const nextSeen = new Set([...seen, normalized]);
        const variants = toReferenceVariants(normalized);
        for (const variant of variants) {
          if (!primitiveRawValues.has(variant)) continue;
          const primitiveValue = primitiveRawValues.get(variant);
          if (isReferenceValue(primitiveValue)) {
            return resolvePrimitiveReference(primitiveValue.slice(1, -1), nextSeen);
          }
          return primitiveValue;
        }

        return null;
      };

      primitiveEntries.forEach(({ tokenPath, tokenName, value }) => {
        const resolvedValue = isReferenceValue(value)
          ? (resolvePrimitiveReference(value.slice(1, -1), new Set([tokenPath])) ?? value)
          : value;
        registerReferenceValue(primitiveResolvedValues, tokenPath, tokenName, resolvedValue);
      });

      // Build raw-token lookup using only files selected into the dictionary (resolver-aware).
      rawSourceFilesByContext.forEach((rawFiles) => {
        rawFiles.forEach((rawFilePath) => {
          try {
            const rawData = JSON.parse(fs.readFileSync(rawFilePath, 'utf8'));
            const rawTokens = collectRawTokensFromJson(rawData);
            rawTokens.forEach(({ tokenPath, tokenName, value }) => {
              registerReferenceValue(rawTokenValues, tokenPath, tokenName, value);
            });
          } catch (e) {
            console.warn(`Warning: Could not read raw file ${rawFilePath}:`, e.message);
          }
        });
      });

      const resolveReferenceFromMaps = (referenceId, seen = new Set()) => {
        const normalized = (referenceId || '').trim();
        if (!normalized) return null;
        if (seen.has(normalized)) return null;

        const nextSeen = new Set([...seen, normalized]);
        const variants = toReferenceVariants(normalized);

        for (const variant of variants) {
          if (!primitiveResolvedValues.has(variant)) continue;
          const primitiveValue = primitiveResolvedValues.get(variant);
          if (isReferenceValue(primitiveValue)) {
            return resolveReferenceFromMaps(primitiveValue.slice(1, -1), nextSeen);
          }
          return primitiveValue;
        }

        for (const variant of variants) {
          if (!rawTokenValues.has(variant)) continue;
          const rawValue = rawTokenValues.get(variant);
          if (isReferenceValue(rawValue)) {
            const nested = resolveReferenceFromMaps(rawValue.slice(1, -1), nextSeen);
            if (nested != null) return nested;
          } else {
            return rawValue;
          }
        }

        return null;
      };

      // Helper function to resolve a token value using semantic base values first, then Style Dictionary's resolved tokens
      const resolveTokenValue = (rawValue) => {
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
            const semanticValue = semanticBaseValues.get(referencePathStr);
            if (isReferenceValue(semanticValue)) {
              return resolveTokenValue(semanticValue);
            }
            return semanticValue;
          }

          // FIRST.5: Resolve from raw/primitives lookup maps (supports dot and dash references)
          const mappedValue = resolveReferenceFromMaps(referenceStr);
          if (mappedValue != null) {
            return mappedValue;
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
              return resolveTokenValue(resolvedValue);
            }
            return resolvedValue;
          }

          // FAIL-SOFT MODE: If reference cannot be resolved, provide safe fallback
          if (failSoft) {
            console.warn(`⚠️  Fail-soft: Unresolved reference {${referenceStr}} - using safe fallback`);

            // Provide type-appropriate fallbacks based on token path
            if (referenceStr.includes('.color.') || referenceStr.includes('-color-')) {
              return 'transparent'; // Safe color fallback
            } else if (
              referenceStr.includes('.spacing.') || referenceStr.includes('.dimension.')
              || referenceStr.includes('-spacing-') || referenceStr.includes('-dimension-')
            ) {
              return '0px'; // Safe dimension fallback
            } else if (referenceStr.includes('.radius.') || referenceStr.includes('-radius-')) {
              return '0px'; // Safe radius fallback
            } else if (referenceStr.includes('.fontSize.') || referenceStr.includes('-fontSize-')) {
              return '16px'; // Safe font size fallback
            } else if (referenceStr.includes('.opacity.') || referenceStr.includes('-opacity-')) {
              return '1'; // Safe opacity fallback
            } else {
              return 'unset'; // Generic safe fallback
            }
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
            const resolvedValue = resolveTokenValue(value.$value);
            tokens.push({ name: tokenName, path: path, value: resolvedValue });
          } else if (value && typeof value === 'object' && !Array.isArray(value)) {
            // Recurse into nested objects (skip arrays)
            tokens.push(...extractTokensFromJson(value, path));
          }
        }
        return tokens;
      };
      
      // Track which base tokens we've added (by path) to avoid duplicates
      const baseTokenPaths = new Set();
      
      dictionary.allTokens.forEach((token) => {
        const filePath = token.filePath || '';
        const tokenPath = (token.path || []).join('.');

        // Skip tokens from theme files
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
      primitiveSourceFiles.forEach((primitivesFilePath) => {
        try {
          const primitivesData = JSON.parse(fs.readFileSync(primitivesFilePath, 'utf8'));
          const primitivesTokens = extractTokensFromJson(primitivesData);
          primitivesTokens.forEach(({ name, path: tokenPath, value }) => {
            const tokenPathStr = tokenPath.join('.');
            baseTokens.push({ name, value, path: tokenPath });
            if (!baseTokenPaths.has(tokenPathStr)) {
              baseTokenPaths.add(tokenPathStr);
            }
          });
        } catch (e) {
          console.warn(`Warning: Could not read primitive file ${primitivesFilePath}: ${e.message}`);
        }
      });

      // Build baseline context overlays without hardcoded app-only file paths.
      // This keeps :root stable while remaining context-agnostic.
      const baselineContext = contextDirs.includes('app') ? 'app' : (contextDirs[0] || null);
      const baselineSourceFiles = [];

      if (baselineContext) {
        const baselinePrefix = `/contexts/${baselineContext}/`;
        dictionaryFilePaths.forEach((filePath) => {
          const normalizedPath = toPosixPath(filePath);
          if (!normalizedPath.includes(baselinePrefix)) return;
          if (/\/contexts\/[^/]+\/semantics\/.+\.json$/.test(normalizedPath)) {
            baselineSourceFiles.push(filePath);
            return;
          }
          if (/\/contexts\/[^/]+\/components\.json$/.test(normalizedPath)) {
            baselineSourceFiles.push(filePath);
          }
        });
      }

      // Populate semantic base values from baseline context files (before reference resolution).
      baselineSourceFiles.forEach((sourcePath) => {
        try {
          const payload = JSON.parse(fs.readFileSync(sourcePath, 'utf8'));
          const tokens = collectRawTokensFromJson(payload);
          tokens.forEach(({ tokenPath, value }) => {
            semanticBaseValues.set(tokenPath, value);
          });
        } catch (e) {
          console.warn(`Warning: Could not read baseline context file ${sourcePath}: ${e.message}`);
        }
      });

      // Overlay baseline context semantic/component values into :root, replacing collision-prone dictionary values.
      baselineSourceFiles.forEach((sourcePath) => {
        try {
          const payload = JSON.parse(fs.readFileSync(sourcePath, 'utf8'));
          const tokens = extractTokensFromJson(payload);
          tokens.forEach(({ name, path: tokenPath, value }) => {
            const tokenPathStr = tokenPath.join('.');
            const existingIndex = baseTokens.findIndex(t => (t.path || []).join('.') === tokenPathStr);
            if (existingIndex >= 0) {
              baseTokens.splice(existingIndex, 1);
            }
            baseTokens.push({ name, value, path: tokenPath });
            if (!baseTokenPaths.has(tokenPathStr)) {
              baseTokenPaths.add(tokenPathStr);
            }
          });
        } catch (e) {
          console.warn(`Warning: Could not process baseline context file ${sourcePath}: ${e.message}`);
        }
      });

      let output = '/**\n * Do not edit directly, this file was auto-generated.\n */\n\n';

      // CSS Cascade Layers - ADR-0024
      output += '/* CSS Cascade Layers - ADR-0024 */\n';
      output += '@layer third-party, context-app, context-website, context-report, components, theme;\n\n';

      // Generate base tokens in :root
      if (baseTokens.length > 0) {
        const rootDeclarations = formatCssTokenDeclarations({
          tokens: baseTokens,
          dictionary,
          sort: sortOption
        });
        output += ':root {\n';
        output += `${rootDeclarations}\n`;
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

      // If we have context/theme tokens, wrap them in @layer theme
      if (hasContextTokens) {
        output += '@layer theme {\n';

        // Generate context tokens grouped by selector
        selectorTokens.forEach((tokens, selector) => {
          if (tokens.length > 0) {
            const selectorDeclarations = formatCssTokenDeclarations({
              tokens,
              dictionary,
              sort: sortOption,
              indentation: '    ',
              includeEmptyValues: false
            });
            output += `  ${selector} {\n`;
            if (selectorDeclarations) {
              output += `${selectorDeclarations}\n`;
            }
            output += '  }\n\n';
          }
        });
        output += '}\n\n';
      }

      return output;
    }
  });
}

// NEW: Canonical CSS formats for token architecture
function registerCanonicalFormats(StyleDictionary) {
  // Canonical output is delegated to the canonical generator module to keep
  // a single implementation of resolver semantics during migration.
  StyleDictionary.registerFormat({
    name: 'css/canonical-primitives',
    format() {
      return generatePrimitivesCSS();
    }
  });

  StyleDictionary.registerFormat({
    name: 'css/canonical-contexts',
    format() {
      return generateContextsCSS();
    }
  });

  StyleDictionary.registerFormat({
    name: 'css/canonical-themes',
    format() {
      return generateThemesCSS();
    }
  });

  StyleDictionary.registerFormat({
    name: 'css/canonical-entrypoint',
    format() {
      return generateEntrypointCSS();
    }
  });
}
