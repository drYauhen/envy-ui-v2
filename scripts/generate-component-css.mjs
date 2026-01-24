#!/usr/bin/env node

/**
 * Generate Component Token CSS
 *
 * This script generates component-specific CSS files from JSON tokens.
 * Components generate into generated/css/components/ under @layer eui-components.
 */

// Policy: structure CSS is generated from contracts for machine-run stability.
// Escape hatch: hybrid/manual structure CSS requires ADR/Rules update (no ad-hoc edits).

import fs from 'fs';
import path from 'path';
import { fileURLToPath } from 'url';

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);
const repoRoot = path.resolve(__dirname, '..');

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

// Helper: Extract tokens from JSON with preserved references
const extractTokensPreservingRefs = (obj, prefix = []) => {
  const tokens = [];
  for (const [key, value] of Object.entries(obj)) {
    const path = [...prefix, key];
    if (value && typeof value === 'object' && '$value' in value) {
      const tokenName = path.join('-'); // eui-card-variant-elevated-shadow
      const preservedValue = preserveReference(value.$value);
      tokens.push({ name: tokenName, value: preservedValue });
    } else if (value && typeof value === 'object' && !Array.isArray(value)) {
      tokens.push(...extractTokensPreservingRefs(value, path));
    }
  }
  return tokens;
};

// Generate Component CSS (generic function)
function generateComponentCSS(componentName, baseSelector, variants = [], statuses = [], options = {}) {
  console.log(`📝 Generating components/${componentName}.tokens.css...`);

  const tokensPath = path.join(repoRoot, 'tokens', 'components', `${componentName}.tokens.json`);
  if (!fs.existsSync(tokensPath)) {
    console.warn(`Warning: ${componentName}.tokens.json not found`);
    return '';
  }

  let output = `/**\n * ${componentName.charAt(0).toUpperCase() + componentName.slice(1)} Component Tokens - Generated from tokens/components/${componentName}.tokens.json\n */\n\n`;
  // Start with context layer for semantic tokens
  output += '@layer eui-components {\n';

  const variantAttribute = options.variantAttribute || 'data-eui-variant';
  const variantTokenPrefix = options.variantTokenPrefix || 'variant';

  try {
    const data = JSON.parse(fs.readFileSync(tokensPath, 'utf8'));
    const allTokens = extractTokensPreservingRefs(data);

    // Group tokens by their paths for selector generation
    const baseTokens = allTokens.filter(({ name }) =>
      name.startsWith(`eui-${componentName}-base-`)
    );
    const sizeTokens = allTokens.filter(({ name }) =>
      name.startsWith(`eui-${componentName}-size-`)
    );
    const shapeTokens = allTokens.filter(({ name }) =>
      name.startsWith(`eui-${componentName}-shape-`)
    );
    const variantTokens = allTokens.filter(({ name }) =>
      name.startsWith(`eui-${componentName}-${variantTokenPrefix}-`)
    );
    const stateTokens = allTokens.filter(({ name }) =>
      name.startsWith(`eui-${componentName}-state-`)
    );
    const statusTokens = allTokens.filter(({ name }) =>
      name.startsWith(`eui-${componentName}-status-`)
    );

    // For tone-based components, also extract color tokens from variant structure
    let colorTokens = [];
    const toneComponents = new Set(['badge', 'callout']);
    if (toneComponents.has(componentName)) {
      colorTokens = allTokens.filter(({ name }) =>
        name.includes('-colors-') &&
        (name.includes('-variant-subtle-') ||
         name.includes('-variant-solid-') ||
         name.includes('-variant-outline-'))
      );
    }

    // Convert token names to runtime variable names (--eui-${componentName}-*)
    const convertToRuntimeVar = (tokenName) => {
      // Special handling for tone-based color tokens
      if (toneComponents.has(componentName) && tokenName.includes('-colors-')) {
        // eui-badge-variant-subtle-tone-neutral-colors-background → --eui-badge-colors-neutral-background
        // eui-badge-variant-solid-tone-success-colors-background → --eui-badge-colors-success-solid-background
        // eui-badge-variant-outline-colors-background → --eui-badge-colors-variant-outline-background
        const parts = tokenName.split('-');
        const colorsIndex = parts.indexOf('colors');
        const property = parts[colorsIndex + 1]; // 'background', 'border', 'text'

        // Find variant and tone
        const variantIndex = parts.indexOf('variant');
        const toneIndex = parts.indexOf('tone');

        if (variantIndex !== -1) {
          const variant = parts[variantIndex + 1]; // 'subtle', 'solid', 'outline'

          if (toneIndex !== -1) {
            // Has tone (subtle and solid variants)
            const tone = parts[toneIndex + 1]; // 'neutral', 'success', etc.

            // For subtle variant, tone comes first: --eui-{component}-colors-{tone}-{property}
            // For solid variant, tone comes first then solid: --eui-{component}-colors-{tone}-solid-{property}
            if (variant === 'subtle') {
              return `--eui-${componentName}-colors-${tone}-${property}`;
            } else if (variant === 'solid') {
              return `--eui-${componentName}-colors-${tone}-solid-${property}`;
            }
          } else {
            // No tone (outline variant only)
            // eui-badge-variant-outline-colors-background → --eui-badge-colors-variant-outline-background
            return `--eui-${componentName}-colors-variant-outline-${property}`;
          }
        }
      }

      // All variants and base tokens become --eui-${componentName}-* runtime variables
      // eui-${componentName}-variant-elevated-shadow → --eui-${componentName}-shadow
      // eui-${componentName}-status-pending-indicator-color → --eui-${componentName}-status-indicator-color
      // eui-${componentName}-base-shadow → --eui-${componentName}-shadow

      if (tokenName.startsWith(`eui-${componentName}-${variantTokenPrefix}-`)) {
        // eui-${componentName}-variant-elevated-shadow → --eui-${componentName}-shadow
        const parts = tokenName.split('-');
        const variantIndex = parts.indexOf(variantTokenPrefix);
        const propertyParts = parts.slice(variantIndex + 2); // Skip 'variant' and variant name
        return `--eui-${componentName}-${propertyParts.join('-')}`;
      } else if (tokenName.startsWith(`eui-${componentName}-status-`)) {
        // eui-${componentName}-status-pending-indicator-color → --eui-${componentName}-status-indicator-color
        const parts = tokenName.split('-');
        const statusIndex = parts.indexOf('status');
        const propertyParts = parts.slice(statusIndex + 2); // Skip 'status' and status name
        return `--eui-${componentName}-status-${propertyParts.join('-')}`;
      } else if (tokenName.startsWith(`eui-${componentName}-base-`)) {
        // eui-${componentName}-base-shadow → --eui-${componentName}-shadow
        const parts = tokenName.split('-');
        const componentParts = componentName.split('-');
        const propertyParts = parts.slice(1 + componentParts.length + 1); // Skip 'eui', componentName, and 'base'
        return `--eui-${componentName}-${propertyParts.join('-')}`;
      }

      return `--${tokenName}`;
    };

    // Generate color token variables for tone components (special handling)
    if (toneComponents.has(componentName) && colorTokens.length > 0) {
      // Group color tokens by their expected CSS variable names
      const colorVarGroups = {};

      colorTokens.forEach(({ name, value }) => {
        const runtimeVar = convertToRuntimeVar(name);
        if (!colorVarGroups[runtimeVar]) {
          colorVarGroups[runtimeVar] = [];
        }
        colorVarGroups[runtimeVar].push({ name, value });
      });

      // Generate color variables scoped to the component within context
      output += `  /* ${componentName} color variables - Scoped to component */\n`;
      output += `  [data-eui-context] .${baseSelector} {\n`;
      Object.keys(colorVarGroups).forEach(runtimeVar => {
        // Use the first value (they should all be the same for the same variable)
        const firstToken = colorVarGroups[runtimeVar][0];
        output += `    ${runtimeVar}: ${firstToken.value};\n`;
      });
      output += '  }\n\n';
    }

    const baseAndSizeTokens = [...baseTokens, ...sizeTokens, ...shapeTokens, ...stateTokens];

    // Generate base variables (default variant)
    if (baseAndSizeTokens.length > 0) {
      output += `  /* Base ${componentName} variables (default variant) */\n`;
      output += `  [data-eui-context] .${baseSelector} {\n`;
      baseAndSizeTokens.forEach(({ name, value }) => {
        const runtimeVar = convertToRuntimeVar(name);
        output += `    ${runtimeVar}: ${value};\n`;
      });
      output += '  }\n\n';
    }

    // Generate variant overrides
    if (variants.length > 0) {
      variants.forEach(variant => {
        const variantTokensForThis = variantTokens.filter(({ name }) =>
          name.includes(`-${variantTokenPrefix}-${variant}-`)
        );

        if (variantTokensForThis.length > 0) {
          output += `  /* Variant: ${variant} */\n`;
          output += `  [data-eui-context] .${baseSelector}[${variantAttribute}='${variant}'] {\n`;
          variantTokensForThis.forEach(({ name, value }) => {
            const runtimeVar = convertToRuntimeVar(name);
            output += `    ${runtimeVar}: ${value};\n`;
          });
          output += '  }\n\n';
        }
      });
    }

    // Generate status overrides (for card component)
    if (statuses.length > 0) {
      statuses.forEach(status => {
        const statusTokensForThis = statusTokens.filter(({ name }) =>
          name.includes(`-status-${status}-`)
        );

        if (statusTokensForThis.length > 0) {
          output += `  /* Status: ${status} */\n`;
          output += `  [data-eui-context] .${baseSelector}[data-eui-status='${status}'] {\n`;
          statusTokensForThis.forEach(({ name, value }) => {
            const runtimeVar = convertToRuntimeVar(name);
            output += `    ${runtimeVar}: ${value};\n`;
          });
          output += '  }\n\n';
        }
      });
    }

  } catch (e) {
    console.warn(`Warning: Could not read ${componentName}.tokens.json: ${e.message}`);
    return '';
  }

  output += '}\n';
  return output;
}

// Generate simple component CSS with a flat variable map (no variants)
function generateSimpleComponentCSS(componentName, baseSelector) {
  console.log(`📝 Generating components/${componentName}.tokens.css...`);

  const tokensPath = path.join(repoRoot, 'tokens', 'components', `${componentName}.tokens.json`);
  if (!fs.existsSync(tokensPath)) {
    console.warn(`Warning: ${componentName}.tokens.json not found`);
    return '';
  }

  let output = `/**\n * ${componentName.charAt(0).toUpperCase() + componentName.slice(1)} Component Tokens - Generated from tokens/components/${componentName}.tokens.json\n */\n\n`;
  output += '@layer eui-components {\n';

  try {
    const data = JSON.parse(fs.readFileSync(tokensPath, 'utf8'));
    const allTokens = extractTokensPreservingRefs(data);
    const componentTokens = allTokens.filter(({ name }) =>
      name.startsWith(`eui-${componentName}-`)
    );

    if (componentTokens.length > 0) {
      output += `  /* ${componentName} variables */\n`;
      output += `  [data-eui-context] .${baseSelector} {\n`;
      componentTokens.forEach(({ name, value }) => {
        output += `    --${name}: ${value};\n`;
      });
      output += '  }\n\n';
    }
  } catch (e) {
    console.warn(`Warning: Could not read ${componentName}.tokens.json: ${e.message}`);
    return '';
  }

  output += '}\n';
  return output;
}

// Generate Card component CSS
function generateCardComponentCSS() {
  return generateComponentCSS('card', 'eui-card', ['elevated', 'flat', 'muted', 'strong'], ['pending', 'onTrack', 'completed', 'minorDisruption', 'majorDisruption', 'upcoming', 'discontinued']);
}

// Generate Badge component CSS
function generateBadgeComponentCSS() {
  return generateComponentCSS('badge', 'eui-badge');
}

// Generate Layout component CSS
function generateStackComponentCSS() {
  return generateComponentCSS('stack', 'eui-stack');
}

function generateInlineComponentCSS() {
  return generateComponentCSS('inline', 'eui-inline');
}

function generateGridComponentCSS() {
  return generateComponentCSS('grid', 'eui-grid');
}

function generateSectionComponentCSS() {
  return generateComponentCSS('section', 'eui-section');
}

function generateContainerComponentCSS() {
  return generateComponentCSS('container', 'eui-container');
}

function generatePageComponentCSS() {
  return generateComponentCSS('page', 'eui-page');
}

// Generate Docs-oriented component CSS
function generateContentComponentCSS() {
  return generateComponentCSS('content', 'eui-content');
}

function generateCodeBlockComponentCSS() {
  return generateComponentCSS('code-block', 'eui-code-block', ['block']);
}

function generateTableComponentCSS() {
  return generateComponentCSS('table', 'eui-table');
}

function generateTableContainerComponentCSS() {
  return generateComponentCSS('table-container', 'eui-table-container');
}

function generateCalloutComponentCSS() {
  return generateComponentCSS('callout', 'eui-callout', ['subtle', 'solid']);
}

function generateButtonComponentCSS() {
  return generateComponentCSS(
    'button',
    'eui-button',
    ['primary', 'secondary', 'accent', 'accent-finished', 'link'],
    [],
    { variantAttribute: 'data-eui-intent', variantTokenPrefix: 'intent' }
  );
}

function generateDividerComponentCSS() {
  return generateComponentCSS('divider', 'eui-divider');
}

function generateCalendarComponentCSS() {
  return generateComponentCSS('calendar', 'eui-calendar');
}

function generateAvatarComponentCSS() {
  return generateSimpleComponentCSS('avatar', 'eui-avatar');
}

function generateAvatarGroupComponentCSS() {
  return generateSimpleComponentCSS('avatar-group', 'eui-avatar-group');
}

function generateTooltipComponentCSS() {
  return generateSimpleComponentCSS('tooltip', 'eui-tooltip');
}

function generateSideNavComponentCSS() {
  return generateSimpleComponentCSS('side-nav', 'eui-side-nav');
}

function generateLogoComponentCSS() {
  return generateSimpleComponentCSS('logo', 'eui-logo');
}

function generateInputComponentCSS() {
  const selector =
    'eui-input, [data-eui-context] .eui-input-group, [data-eui-context] .eui-select, [data-eui-context] .eui-textarea';
  return generateSimpleComponentCSS('input', selector);
}

function generateInputGroupComponentCSS() {
  return generateSimpleComponentCSS('input-group', 'eui-input-group');
}

function generateFormComponentCSS() {
  const selector =
    'eui-form, [data-eui-context] .eui-form-field, [data-eui-context] .eui-form-section, [data-eui-context] .eui-form-row, [data-eui-context] .eui-form-group, [data-eui-context] .eui-form-actions';
  return generateSimpleComponentCSS('form', selector);
}

// Main execution
function main() {
  console.log('🚀 Generating Component Token CSS...');

  const outputDir = path.join(repoRoot, 'generated', 'css', 'components');

  // Ensure output directory exists
  if (!fs.existsSync(outputDir)) {
    fs.mkdirSync(outputDir, { recursive: true });
  }

  const components = [
    { name: 'avatar', css: generateAvatarComponentCSS() },
    { name: 'avatar-group', css: generateAvatarGroupComponentCSS() },
    { name: 'card', css: generateCardComponentCSS() },
    { name: 'badge', css: generateBadgeComponentCSS() },
    { name: 'input', css: generateInputComponentCSS() },
    { name: 'input-group', css: generateInputGroupComponentCSS() },
    { name: 'stack', css: generateStackComponentCSS() },
    { name: 'inline', css: generateInlineComponentCSS() },
    { name: 'grid', css: generateGridComponentCSS() },
    { name: 'section', css: generateSectionComponentCSS() },
    { name: 'container', css: generateContainerComponentCSS() },
    { name: 'page', css: generatePageComponentCSS() },
    { name: 'content', css: generateContentComponentCSS() },
    { name: 'code-block', css: generateCodeBlockComponentCSS() },
    { name: 'table', css: generateTableComponentCSS() },
    { name: 'table-container', css: generateTableContainerComponentCSS() },
    { name: 'callout', css: generateCalloutComponentCSS() },
    { name: 'button', css: generateButtonComponentCSS() },
    { name: 'divider', css: generateDividerComponentCSS() },
    { name: 'calendar', css: generateCalendarComponentCSS() },
    { name: 'tooltip', css: generateTooltipComponentCSS() },
    { name: 'side-nav', css: generateSideNavComponentCSS() },
    { name: 'logo', css: generateLogoComponentCSS() },
    { name: 'form', css: generateFormComponentCSS() }
  ];

  components.forEach(({ name, css }) => {
    const filePath = path.join(outputDir, `${name}.tokens.css`);
    fs.writeFileSync(filePath, css, 'utf8');
    console.log(`✅ Generated components/${name}.tokens.css`);
  });

  console.log('🎉 Component Token CSS generation complete!');
}

// Run if called directly
if (import.meta.url === `file://${process.argv[1]}`) {
  main();
}

export { generateCardComponentCSS };
