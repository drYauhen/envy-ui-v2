#!/usr/bin/env node

/**
 * Generate Canonical Token CSS
 *
 * This script generates the canonical token CSS files directly from JSON,
 * bypassing Style Dictionary's token processing to preserve reference structure.
 */

import fs from 'fs';
import path from 'path';
import { fileURLToPath } from 'url';

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);
const repoRoot = path.resolve(__dirname, '..');

// Global cache for primitive token values
let primitiveTokenCache = null;
// Global cache for raw token values per context
let rawTokenCache = new Map();

// Helper: Load all primitive tokens into cache
const loadPrimitiveTokens = () => {
  if (primitiveTokenCache) return primitiveTokenCache;

  primitiveTokenCache = new Map();

  const primitivesDir = path.join(repoRoot, 'tokens', 'primitives');
  if (!fs.existsSync(primitivesDir)) return primitiveTokenCache;

  const primitiveFiles = fs.readdirSync(primitivesDir).filter(f => f.endsWith('.json'));

  primitiveFiles.forEach(file => {
    const filePath = path.join(primitivesDir, file);
    try {
      const data = JSON.parse(fs.readFileSync(filePath, 'utf8'));
      const tokens = extractTokensResolvingRefs(data); // Use resolving version for cache
      tokens.forEach(({ name, value }) => {
        primitiveTokenCache.set(name, value);
      });
    } catch (e) {
      console.warn(`Warning: Could not load primitives file ${file}: ${e.message}`);
    }
  });

  return primitiveTokenCache;
};

// Helper: Load raw tokens for a context into cache (preserve $value)
const loadRawTokens = (context) => {
  if (rawTokenCache.has(context)) return rawTokenCache.get(context);

  const rawTokens = new Map();
  const rawDir = path.join(repoRoot, 'tokens', 'contexts', context, 'raw');
  if (!fs.existsSync(rawDir)) {
    rawTokenCache.set(context, rawTokens);
    return rawTokens;
  }

  const rawFiles = findJsonFiles(rawDir);
  rawFiles.forEach(file => {
    const filePath = path.join(rawDir, file);
    try {
      const data = JSON.parse(fs.readFileSync(filePath, 'utf8'));
      const tokens = extractTokensRawValues(data);
      tokens.forEach(({ name, value }) => {
        rawTokens.set(name, value);
      });
    } catch (e) {
      console.warn(`Warning: Could not read raw file ${file}: ${e.message}`);
    }
  });

  rawTokenCache.set(context, rawTokens);
  return rawTokens;
};

// Helper: Extract tokens resolving DTCG references to actual values
const extractTokensResolvingRefs = (obj, prefix = []) => {
  const tokens = [];
  for (const [key, value] of Object.entries(obj)) {
    const path = [...prefix, key];
    if (value && typeof value === 'object' && '$value' in value) {
      const tokenName = path.join('-'); // eui-color-neutral-300
      const resolvedValue = resolveReference(value.$value);
      tokens.push({ name: tokenName, value: resolvedValue });
    } else if (value && typeof value === 'object' && !Array.isArray(value)) {
      tokens.push(...extractTokensResolvingRefs(value, path));
    }
  }
  return tokens;
};

// Helper: Extract tokens preserving raw $value (no reference conversion)
const extractTokensRawValues = (obj, prefix = []) => {
  const tokens = [];
  for (const [key, value] of Object.entries(obj)) {
    const path = [...prefix, key];
    if (value && typeof value === 'object' && '$value' in value) {
      const tokenName = path.join('-'); // eui-app-raw-typography-fontSize-base
      tokens.push({ name: tokenName, value: value.$value });
    } else if (value && typeof value === 'object' && !Array.isArray(value)) {
      tokens.push(...extractTokensRawValues(value, path));
    }
  }
  return tokens;
};

// Helper: Convert DTCG reference to CSS var (preserve, don't resolve)
const preserveReference = (value) => {
  if (typeof value === 'string' && value.startsWith('{') && value.endsWith('}')) {
    // Convert {eui.color.neutral.300} → var(--eui-color-neutral-300)
    const ref = value.slice(1, -1); // Remove { }
    const cssVar = ref.split('.').join('-'); // Convert dots to dashes
    return `var(--${cssVar})`;
  }
  return value; // Literal values pass through unchanged
};

const resolveRawToken = (tokenName, seen = new Set()) => {
  const match = tokenName.match(/^eui-(app|website|report)-raw-/);
  if (!match) return null;

  if (seen.has(tokenName)) {
    return `var(--${tokenName.replace(/^eui-(app|website|report)-raw-/, 'eui-')})`;
  }

  const context = match[1];
  const rawTokens = loadRawTokens(context);
  const rawValue = rawTokens.get(tokenName);

  if (rawValue == null) {
    console.warn(`Warning: Raw token ${tokenName} not found for context "${context}".`);
    return `var(--${tokenName.replace(/^eui-(app|website|report)-raw-/, 'eui-')})`;
  }

  if (typeof rawValue === 'string' && rawValue.startsWith('{') && rawValue.endsWith('}')) {
    const ref = rawValue.slice(1, -1);
    const refTokenName = ref.split('.').join('-');
    const nestedRaw = resolveRawToken(refTokenName, new Set([...seen, tokenName]));
    if (nestedRaw != null) return nestedRaw;
    return `var(--${refTokenName})`;
  }

  return rawValue;
};

// Helper: Resolve DTCG reference to actual primitive value
const resolveReference = (value) => {
  if (typeof value === 'string' && value.startsWith('{') && value.endsWith('}')) {
    // Convert {eui.border.width.thin} → lookup eui-border-width-thin
    const ref = value.slice(1, -1); // Remove { }
    const tokenName = ref.split('.').join('-'); // Convert dots to dashes

    const rawResolved = resolveRawToken(tokenName);
    if (rawResolved != null) {
      return rawResolved;
    }

    // Load primitives and lookup the value
    const primitives = loadPrimitiveTokens();
    return primitives.get(tokenName) || `var(--${tokenName})`; // Fallback to var if not found
  }
  return value; // Literal values pass through unchanged
};

// Helper: Extract tokens from JSON with preserved references
const extractTokensPreservingRefs = (obj, prefix = []) => {
  const tokens = [];
  for (const [key, value] of Object.entries(obj)) {
    const path = [...prefix, key];
    if (value && typeof value === 'object' && '$value' in value) {
      const tokenName = path.join('-'); // eui-color-neutral-300
      const preservedValue = preserveReference(value.$value);
      tokens.push({ name: tokenName, value: preservedValue });
    } else if (value && typeof value === 'object' && !Array.isArray(value)) {
      tokens.push(...extractTokensPreservingRefs(value, path));
    }
  }
  return tokens;
};

// Generate primitives CSS
function generatePrimitivesCSS() {
  console.log('📝 Generating tokens.primitives.css...');

  const primitivesDir = path.join(repoRoot, 'tokens', 'primitives');
  if (!fs.existsSync(primitivesDir)) {
    console.warn('Warning: primitives directory not found');
    return '';
  }

  let output = '/**\n * Canonical Token Primitives - Do not edit directly\n */\n\n';

  const primitiveFiles = fs.readdirSync(primitivesDir).filter(f => f.endsWith('.json'));
  const allTokens = [];

  primitiveFiles.forEach(file => {
    const filePath = path.join(primitivesDir, file);
    try {
      const data = JSON.parse(fs.readFileSync(filePath, 'utf8'));
      const tokens = extractTokensPreservingRefs(data);
      allTokens.push(...tokens);
    } catch (e) {
      console.warn(`Warning: Could not read primitives file ${file}: ${e.message}`);
    }
  });

  // Sort deterministically and generate CSS
  allTokens.sort((a, b) => a.name.localeCompare(b.name));

  if (allTokens.length > 0) {
    output += '@layer eui-primitives {\n';
    output += '  :root {\n';
    allTokens.forEach(({ name, value }) => {
      output += `    --${name}: ${value};\n`;
    });
    output += '  }\n';
    output += '}\n';
  }

  return output;
}

// Generate raw CSS
function generateRawCSS() {
  console.log('📝 Generating tokens.raw.css...');

  const contextsDir = path.join(repoRoot, 'tokens', 'contexts');
  if (!fs.existsSync(contextsDir)) {
    console.warn('Warning: contexts directory not found');
    return '';
  }

  let output = '/**\n * Canonical Token Raw - Do not edit directly\n */\n\n';
  output += '@layer eui-raw {\n';

  // Auto-discover contexts
  const contextDirs = fs.readdirSync(contextsDir)
    .filter(dir => fs.statSync(path.join(contextsDir, dir)).isDirectory())
    .filter(context => ['app', 'website', 'report'].includes(context));

  contextDirs.forEach(context => {
    const rawDir = path.join(contextsDir, context, 'raw');
    if (fs.existsSync(rawDir)) {
      const rawFiles = fs.readdirSync(rawDir).filter(f => f.endsWith('.json'));
      const allTokens = [];

      rawFiles.forEach(file => {
        const filePath = path.join(rawDir, file);
        try {
          const data = JSON.parse(fs.readFileSync(filePath, 'utf8'));
          const tokens = extractTokensPreservingRefs(data);
          allTokens.push(...tokens);
        } catch (e) {
          console.warn(`Warning: Could not read raw file ${file}: ${e.message}`);
        }
      });

      // Sort deterministically and generate CSS
      allTokens.sort((a, b) => a.name.localeCompare(b.name));

      if (allTokens.length > 0) {
        output += `  [data-eui-context="${context}"] {\n`;
        allTokens.forEach(({ name, value }) => {
          // The name already includes the full path, just add the raw prefix
          // eui-app-raw-color-neutral-50 → --eui-app-raw-color-neutral-50
          const cssVarName = `--${name}`;
          output += `    ${cssVarName}: ${value};\n`;
        });
        output += '  }\n\n';
      }
    }
  });

  output += '}\n';
  return output;
}

// Helper: Transform raw-proxy variable names to semantic names
function transformToSemanticName(name) {
  // Transform raw-proxy exports to semantic names
  if (name.includes('dimension-')) {
    return name.replace(/dimension-/g, 'spacing-');
  }
  if (name.includes('breakpoint-')) {
    return name.replace(/breakpoint-/g, 'layout-breakpoint-');
  }
  if (name.includes('spacing-')) {
    return name; // Already semantic
  }
  if (name.includes('z-')) {
    return name.replace(/z-/g, 'layer-');
  }
  if (name.includes('transition-')) {
    return name; // Already semantic
  }
  if (name.includes('radius-')) {
    return name; // Already semantic
  }
  if (name.includes('shadow-')) {
    return name; // Already semantic
  }
  if (name.includes('opacity-')) {
    return name; // Already semantic
  }
  if (name.includes('filter-')) {
    return name; // Already semantic
  }
  if (name.includes('border-width-')) {
    return name; // Keep as-is for now
  }
  // For other tokens (colors, layout roles, etc.), keep the original name
  return name;
}

// Helper: Recursively find all JSON files in a directory (relative to repo root)
function findJsonFiles(dir, baseDir = dir) {
  const files = [];
  const items = fs.readdirSync(dir);
  for (const item of items) {
    const fullPath = path.join(dir, item);
    const stat = fs.statSync(fullPath);
    if (stat.isDirectory()) {
      files.push(...findJsonFiles(fullPath, baseDir));
    } else if (item.endsWith('.json')) {
      // Return relative path from baseDir
      files.push(path.relative(baseDir, fullPath));
    }
  }
  return files;
}

// Generate contexts CSS
function generateContextsCSS() {
  console.log('📝 Generating tokens.contexts.css...');

  const contextsDir = path.join(repoRoot, 'tokens', 'contexts');
  if (!fs.existsSync(contextsDir)) {
    console.warn('Warning: contexts directory not found');
    return '';
  }

  let output = '/**\n * Canonical Token Contexts - Do not edit directly\n */\n\n';
  output += '@layer eui-contexts {\n';

  // Auto-discover contexts
  const contextDirs = fs.readdirSync(contextsDir)
    .filter(dir => fs.statSync(path.join(contextsDir, dir)).isDirectory())
    .filter(context => ['app', 'website', 'report'].includes(context));

  contextDirs.forEach(context => {
    const semanticsDir = path.join(contextsDir, context, 'semantics');
    if (fs.existsSync(semanticsDir)) {
      // Recursively find all JSON files in semantics directory and subdirectories
      const semanticFiles = findJsonFiles(semanticsDir);
      console.log(`📁 Found ${semanticFiles.length} semantic files for context "${context}":`);
      semanticFiles.forEach(file => console.log(`  - ${file}`));

      const allTokens = [];

      semanticFiles.forEach(file => {
        const filePath = path.join(semanticsDir, file);
        try {
          const data = JSON.parse(fs.readFileSync(filePath, 'utf8'));
          // Use resolving function for all files to resolve all DTCG references to final values
          // Raw layer tokens should resolve to primitives, semantic tokens should resolve through raw to primitives
          const tokens = extractTokensResolvingRefs(data);
          console.log(`📄 Processed ${file}: ${tokens.length} tokens`);
          allTokens.push(...tokens);
        } catch (e) {
          console.warn(`Warning: Could not read semantic file ${file}: ${e.message}`);
        }
      });

      console.log(`📊 Total tokens extracted for context "${context}": ${allTokens.length}`);

      // Transform all tokens to semantic names
      const semanticTokens = allTokens.map(({ name, value }) => ({
        name: transformToSemanticName(name),
        value,
        originalName: name
      })).map(({ name: semanticName, originalName, value }) => {
        // For tokens from raw files (which reference primitives), resolve to actual primitive values
        if (originalName.startsWith('eui-app-raw-')) {
          // Raw tokens should resolve their DTCG references to actual values
          // The value should already be resolved by extractTokensResolvingRefs
          return {
            name: semanticName,
            value: value // Already resolved to primitive value
          };
        }

        // For semantic tokens from semantic files, handle references
        if (typeof value === 'string' && value.includes('eui-app-raw-')) {
          // Replace raw references with primitive references
          const resolvedValue = value.replace(/var\(--eui-app-raw-([^)]+)\)/g, 'var(--eui-$1)');
          return {
            name: semanticName,
            value: resolvedValue
          };
        } else {
          // Use the value directly
          return {
            name: semanticName,
            value: value
          };
        }
      });

      const primitives = loadPrimitiveTokens();
      const normalizedTokens = semanticTokens.map(({ name, value }) => {
        if (typeof value === 'string' && value === `var(--${name})`) {
          const primitiveValue = primitives.get(name);
          if (primitiveValue) {
            return { name, value: primitiveValue };
          }
        }
        return { name, value };
      });

      // Sort deterministically and generate CSS
      normalizedTokens.sort((a, b) => a.name.localeCompare(b.name));

      if (normalizedTokens.length > 0) {
        output += `  [data-eui-context="${context}"] {\n`;
        normalizedTokens.forEach(({ name, value }) => {
          output += `    --${name}: ${value};\n`;
        });
        output += '  }\n\n';
      }
    }
  });

  output += '}\n';
  return output;
}

// Generate themes CSS
function generateThemesCSS() {
  console.log('📝 Generating tokens.themes.css...');

  const contextsDir = path.join(repoRoot, 'tokens', 'contexts');
  if (!fs.existsSync(contextsDir)) {
    console.warn('Warning: contexts directory not found');
    return '';
  }

  let output = '/**\n * Canonical Token Themes - Do not edit directly\n */\n\n';
  output += '@layer eui-themes {\n';

  // Auto-discover contexts and themes
  const contextDirs = fs.readdirSync(contextsDir)
    .filter(dir => fs.statSync(path.join(contextsDir, dir)).isDirectory())
    .filter(context => ['app', 'website', 'report'].includes(context));

  contextDirs.forEach(context => {
    const themesDir = path.join(contextsDir, context, 'themes');
    if (fs.existsSync(themesDir)) {
      const themeFiles = fs.readdirSync(themesDir).filter(f => f.endsWith('.json'));

      themeFiles.forEach(themeFile => {
        const theme = path.basename(themeFile, '.json');
        const filePath = path.join(themesDir, themeFile);

        try {
          const data = JSON.parse(fs.readFileSync(filePath, 'utf8'));
          const tokens = extractTokensPreservingRefs(data);

          // Filter out component variables (badge-*, button-*, calendar-*, etc.)
          // Keep only semantic meaning tokens
          const semanticTokens = tokens.filter(({ name }) => {
            // Remove component variables - check for component prefixes
            const componentPrefixes = [
              'badge-', 'button-', 'calendar-', 'card-', 'checkbox-',
              'input-', 'radio-', 'select-', 'switch-', 'tabs-',
              'textarea-', 'tooltip-', 'dialog-', 'dropdown-', 'menu-',
              'navigation-', 'sidebar-', 'table-', 'toast-', 'combobox-',
              'listbox-', 'option-', 'progressbar-', 'scrollbar-',
              'separator-', 'slider-', 'spinbutton-', 'tabpanel-', 'textbox-',
              'tree-', 'treeitem-', 'group-', 'radiogroup-', 'tablist-',
              'grid-', 'gridcell-', 'columnheader-', 'row-', 'rowheader-',
              'cell-', 'link-', 'heading-', 'img-', 'list-', 'listitem-',
              'term-', 'definition-'
            ];

            return !componentPrefixes.some(prefix => name.includes(prefix));
          });

          // Sort deterministically and generate CSS
          semanticTokens.sort((a, b) => a.name.localeCompare(b.name));

          if (semanticTokens.length > 0) {
            output += `  [data-eui-context="${context}"][data-eui-theme="${theme}"] {\n`;
            semanticTokens.forEach(({ name, value }) => {
              output += `    --${name}: ${value};\n`;
            });
            output += '  }\n\n';
          }
        } catch (e) {
          console.warn(`Warning: Could not read theme file ${themeFile}: ${e.message}`);
        }
      });
    }
  });

  output += '}\n';
  return output;
}

// Generate entrypoint CSS
function generateEntrypointCSS() {
  console.log('📝 Generating tokens.css (entrypoint)...');

  return `/**
 * Canonical Token CSS - Entry Point
 * Imports token layers in correct cascade order (3-layer only)
 * Raw layer tokens only exist in JSON files, not exposed to CSS
 */

@layer eui-primitives, eui-contexts, eui-themes, eui-components;

/* 1. Primitives (base values) */
@import './tokens.primitives.css';

/* 2. Contexts (semantic aliases - no raw references) */
@import './tokens.contexts.css';

/* 3. Themes (theme overrides) */
@import './tokens.themes.css';

/* 4. Components (component-specific tokens) */
@import './components/card.tokens.css';
@import './components/badge.tokens.css';
@import './components/switch.tokens.css';
@import './components/stack.tokens.css';
@import './components/inline.tokens.css';
@import './components/grid.tokens.css';
@import './components/section.tokens.css';
@import './components/container.tokens.css';
@import './components/page.tokens.css';
@import './components/content.tokens.css';
@import './components/code-block.tokens.css';
@import './components/table.tokens.css';
@import './components/table-container.tokens.css';
@import './components/callout.tokens.css';
@import './components/button.tokens.css';
@import './components/input.tokens.css';
@import './components/input-group.tokens.css';
@import './components/avatar.tokens.css';
@import './components/avatar-group.tokens.css';
@import './components/tooltip.tokens.css';
@import './components/side-nav.tokens.css';
@import './components/logo.tokens.css';
@import './components/form.tokens.css';
`;
}

// Main execution
function main() {
  console.log('🚀 Generating Canonical Token CSS...');

  const outputDir = path.join(repoRoot, 'generated', 'css');

  // Ensure output directory exists
  if (!fs.existsSync(outputDir)) {
    fs.mkdirSync(outputDir, { recursive: true });
  }

  // Generate each file
  const primitivesCSS = generatePrimitivesCSS();
  const contextsCSS = generateContextsCSS();
  const themesCSS = generateThemesCSS();
  const entrypointCSS = generateEntrypointCSS();

  // Write files
  const files = [
    { name: 'tokens.primitives.css', content: primitivesCSS },
    { name: 'tokens.contexts.css', content: contextsCSS },
    { name: 'tokens.themes.css', content: themesCSS },
    { name: 'tokens.css', content: entrypointCSS }
  ];

  files.forEach(({ name, content }) => {
    const filePath = path.join(outputDir, name);
    fs.writeFileSync(filePath, content, 'utf8');
    console.log(`✅ Generated ${name}`);
  });

  console.log('🎉 Canonical Token CSS generation complete!');
}

// Run if called directly
if (import.meta.url === `file://${process.argv[1]}`) {
  main();
}

export { generatePrimitivesCSS, generateContextsCSS, generateThemesCSS, generateEntrypointCSS };
