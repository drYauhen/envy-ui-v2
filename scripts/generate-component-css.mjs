#!/usr/bin/env node

/**
 * Generate Component Token CSS
 *
 * This script generates component-specific CSS files from JSON tokens.
 * Components generate into generated/css/components/ under @layer eui-components.
 */

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
function generateComponentCSS(componentName, baseSelector, variants = [], statuses = []) {
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

    // Group tokens by their paths for selector generation
    const baseTokens = allTokens.filter(({ name }) =>
      name.startsWith(`eui-${componentName}-base-`)
    );
    const variantTokens = allTokens.filter(({ name }) =>
      name.startsWith(`eui-${componentName}-variant-`)
    );
    const statusTokens = allTokens.filter(({ name }) =>
      name.startsWith(`eui-${componentName}-status-`)
    );

    // For badge component, also extract color tokens from variant structure
    let colorTokens = [];
    if (componentName === 'badge') {
      colorTokens = allTokens.filter(({ name }) =>
        name.includes('-colors-') &&
        (name.includes('-variant-subtle-') ||
         name.includes('-variant-solid-') ||
         name.includes('-variant-outline-'))
      );
    }

    // Convert token names to runtime variable names (--eui-${componentName}-*)
    const convertToRuntimeVar = (tokenName) => {
      // Special handling for badge color tokens
      if (componentName === 'badge' && tokenName.includes('-colors-')) {
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

            // For subtle variant, tone comes first: --eui-badge-colors-{tone}-{property}
            // For solid variant, tone comes first then solid: --eui-badge-colors-{tone}-solid-{property}
            if (variant === 'subtle') {
              return `--eui-badge-colors-${tone}-${property}`;
            } else if (variant === 'solid') {
              return `--eui-badge-colors-${tone}-solid-${property}`;
            }
          } else {
            // No tone (outline variant only)
            // eui-badge-variant-outline-colors-background → --eui-badge-colors-variant-outline-background
            return `--eui-badge-colors-variant-outline-${property}`;
          }
        }
      }

      // All variants and base tokens become --eui-${componentName}-* runtime variables
      // eui-${componentName}-variant-elevated-shadow → --eui-${componentName}-shadow
      // eui-${componentName}-status-pending-indicator-color → --eui-${componentName}-status-indicator-color
      // eui-${componentName}-base-shadow → --eui-${componentName}-shadow

      if (tokenName.startsWith(`eui-${componentName}-variant-`)) {
        // eui-${componentName}-variant-elevated-shadow → --eui-${componentName}-shadow
        const parts = tokenName.split('-');
        const variantIndex = parts.indexOf('variant');
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
        const propertyParts = parts.slice(3); // Skip 'eui', componentName, and 'base'
        return `--eui-${componentName}-${propertyParts.join('-')}`;
      }

      return `--${tokenName}`;
    };

    // Generate color token variables for badge (special handling)
    if (componentName === 'badge' && colorTokens.length > 0) {
      // Group color tokens by their expected CSS variable names
      const colorVarGroups = {};

      colorTokens.forEach(({ name, value }) => {
        const runtimeVar = convertToRuntimeVar(name);
        if (!colorVarGroups[runtimeVar]) {
          colorVarGroups[runtimeVar] = [];
        }
        colorVarGroups[runtimeVar].push({ name, value });
      });

      // Generate color variables globally available for component usage
      output += `  /* Badge color variables - Available globally for component usage */\n`;
      output += `  :root {\n`;
      Object.keys(colorVarGroups).forEach(runtimeVar => {
        // Use the first value (they should all be the same for the same variable)
        const firstToken = colorVarGroups[runtimeVar][0];
        output += `    ${runtimeVar}: ${firstToken.value};\n`;
      });
      output += '  }\n\n';
    }

    // Generate base variables (default variant)
    if (baseTokens.length > 0) {
      output += `  /* Base ${componentName} variables (default variant) */\n`;
      output += `  [data-eui-context] .${baseSelector} {\n`;
      baseTokens.forEach(({ name, value }) => {
        const runtimeVar = convertToRuntimeVar(name);
        output += `    ${runtimeVar}: ${value};\n`;
      });
      output += '  }\n\n';
    }

    // Generate variant overrides
    if (variants.length > 0) {
      variants.forEach(variant => {
        const variantTokensForThis = variantTokens.filter(({ name }) =>
          name.includes(`-variant-${variant}-`)
        );

        if (variantTokensForThis.length > 0) {
          output += `  /* Variant: ${variant} */\n`;
          output += `  [data-eui-context] .${baseSelector}[data-eui-variant='${variant}'] {\n`;
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

// Generate Card component CSS
function generateCardComponentCSS() {
  return generateComponentCSS('card', 'eui-card', ['elevated', 'flat', 'muted', 'strong'], ['pending', 'onTrack', 'completed', 'minorDisruption', 'majorDisruption', 'upcoming', 'discontinued']);
}

// Generate Badge component CSS
function generateBadgeComponentCSS() {
  return generateComponentCSS('badge', 'eui-badge');
}

// Main execution
function main() {
  console.log('🚀 Generating Component Token CSS...');

  const outputDir = path.join(repoRoot, 'generated', 'css', 'components');

  // Ensure output directory exists
  if (!fs.existsSync(outputDir)) {
    fs.mkdirSync(outputDir, { recursive: true });
  }

  // Generate Card component CSS
  const cardCSS = generateCardComponentCSS();
  const cardFilePath = path.join(outputDir, 'card.tokens.css');
  fs.writeFileSync(cardFilePath, cardCSS, 'utf8');
  console.log(`✅ Generated components/card.tokens.css`);

  // Generate Badge component CSS
  const badgeCSS = generateBadgeComponentCSS();
  const badgeFilePath = path.join(outputDir, 'badge.tokens.css');
  fs.writeFileSync(badgeFilePath, badgeCSS, 'utf8');
  console.log(`✅ Generated components/badge.tokens.css`);

  console.log('🎉 Component Token CSS generation complete!');
}

// Run if called directly
if (import.meta.url === `file://${process.argv[1]}`) {
  main();
}

export { generateCardComponentCSS };
