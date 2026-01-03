#!/usr/bin/env node

/**
 * Generates token reference documentation from CSS custom properties
 * Creates docs/tokens/reference.md with all tokens organized by component
 */

import { readFileSync, writeFileSync, mkdirSync } from 'fs';
import { join, dirname } from 'path';
import { fileURLToPath } from 'url';

const __filename = fileURLToPath(import.meta.url);
const __dirname = dirname(__filename);
const repoRoot = join(__dirname, '..');

// Read generated CSS tokens file
const tokensCssPath = join(repoRoot, 'generated', 'css', 'tokens.css');

let tokensCss;
try {
  tokensCss = readFileSync(tokensCssPath, 'utf-8');
} catch (error) {
  console.error(`❌ Error: Could not read ${tokensCssPath}`);
  console.error(`   Make sure to run 'npm run tokens:build' first`);
  process.exit(1);
}

// Extract tokens with their values
const tokenRegex = /--([\w-]+):\s*([^;]+);/g;
const tokens = [];
let match;

while ((match = tokenRegex.exec(tokensCss)) !== null) {
  tokens.push({
    name: match[1],
    value: match[2].trim()
  });
}

if (tokens.length === 0) {
  console.warn('⚠️  Warning: No tokens found in CSS file');
  process.exit(0);
}

// Group tokens by component
const tokenGroups = new Map();
const foundationTokens = [];

tokens.forEach(({ name, value }) => {
  const parts = name.split('-');
  
  if (parts[0] === 'eui' && parts.length > 1) {
    const component = parts[1];
    
    // Check if it's a foundation token (no component prefix after eui-)
    // Foundation tokens: eui-radius-*, eui-spacing-*, eui-color-*, etc.
    const isFoundation = ['radius', 'spacing', 'color', 'typography', 'shadow', 'border', 'z-index', 'motion'].includes(component);
    
    if (isFoundation) {
      foundationTokens.push({ name, value });
    } else {
      if (!tokenGroups.has(component)) {
        tokenGroups.set(component, []);
      }
      tokenGroups.get(component).push({ name, value });
    }
  } else {
    foundationTokens.push({ name, value });
  }
});

// Sort tokens within each group
tokenGroups.forEach((tokens, component) => {
  tokens.sort((a, b) => a.name.localeCompare(b.name));
});
foundationTokens.sort((a, b) => a.name.localeCompare(b.name));

// Generate Markdown documentation
let docs = `# Design Tokens Reference

> Auto-generated from design tokens. Last updated: ${new Date().toISOString()}

## Overview

This document lists all available CSS custom properties (tokens) organized by component and foundation tokens.

**Total tokens:** ${tokens.length}

## Usage

### In CSS

\`\`\`css
/* In component CSS */
.my-component {
  color: var(--eui-button-primary-label-base);
  height: var(--eui-button-size-md-height);
}
\`\`\`

### In TypeScript/React

\`\`\`typescript
// Using type-safe token utilities
import { tokenVar, getTokenValue } from '@/generated/tsx/tokens.types';
import { getComponentTokens } from '@/utils/tokens';

// Type-safe token reference
const style = {
  color: tokenVar('eui-button-primary-label-base'),
  height: tokenVar('eui-button-size-md-height')
};

// Get token value at runtime
const buttonColor = getTokenValue('eui-button-primary-label-base');

// Get all tokens for a component
const buttonTokens = getComponentTokens('button');
\`\`\`

### In Inline Styles

\`\`\`tsx
<div style={{ color: 'var(--eui-button-primary-label-base)' }}>
  Content
</div>
\`\`\`

---

## Foundation Tokens

Foundation tokens are base design tokens that are not component-specific.

| Token | Value |
|-------|-------|
`;

foundationTokens.forEach(({ name, value }) => {
  docs += `| \`--${name}\` | \`${value}\` |\n`;
});

docs += '\n---\n\n';

// Generate component sections
const sortedComponents = Array.from(tokenGroups.keys()).sort();

sortedComponents.forEach(component => {
  const componentTokens = tokenGroups.get(component);
  const componentTitle = component.charAt(0).toUpperCase() + component.slice(1).replace(/-/g, ' ');
  
  docs += `## ${componentTitle}\n\n`;
  docs += `| Token | Value |\n`;
  docs += `|-------|-------|\n`;
  
  componentTokens.forEach(({ name, value }) => {
    docs += `| \`--${name}\` | \`${value}\` |\n`;
  });
  
  docs += '\n';
});

docs += `---

## Related Documentation

- [Token Usage Rules](../architecture/token-usage-rules.md) - Rules for using tokens in components
- [Token System Architecture](../adr/ADR-0017-layered-token-architecture-contexts-and-themes.md) - Architecture overview
- [Token-First Contract Layer](../adr/ADR-0015-token-first-contract-layer-and-renderer-agnostic-model.md) - Contract layer design

---

*This file is auto-generated. Do not edit manually. Run \`npm run tokens:generate-docs\` to regenerate.*
`;

// Ensure output directory exists
const outputDir = join(repoRoot, 'docs', 'tokens');
try {
  mkdirSync(outputDir, { recursive: true });
} catch (error) {
  // Directory might already exist, ignore
}

// Write documentation file
const outputPath = join(outputDir, 'reference.md');
writeFileSync(outputPath, docs, 'utf-8');

console.log(`✅ Generated token documentation: ${outputPath}`);
console.log(`   Found ${tokens.length} tokens`);
console.log(`   Organized into ${tokenGroups.size} components + foundation tokens`);

