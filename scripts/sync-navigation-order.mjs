#!/usr/bin/env node

/**
 * Script to sync navigationOrder from system.manifest.json to .storybook/preview.tsx
 * 
 * NOTE: Currently not used automatically. Navigation order is defined directly in
 * .storybook/preview.tsx in the storySort function's sectionOrder array.
 * 
 * This script can be used if navigationOrder is restored to system.manifest.json
 * in the future. For now, edit .storybook/preview.tsx directly to change section order.
 * 
 * Run manually with: npm run storybook:sync-nav
 */

import { readFileSync, writeFileSync } from 'fs';
import { join, dirname } from 'path';
import { fileURLToPath } from 'url';

const __filename = fileURLToPath(import.meta.url);
const __dirname = dirname(__filename);
const repoRoot = join(__dirname, '..');

// Read system.manifest.json
const manifestPath = join(repoRoot, 'system.manifest.json');
const manifest = JSON.parse(readFileSync(manifestPath, 'utf-8'));
const navigationOrder = manifest.storybook?.navigationOrder || [];

if (navigationOrder.length === 0) {
  console.error('Error: navigationOrder not found in system.manifest.json');
  process.exit(1);
}

// Read preview.tsx
const previewPath = join(repoRoot, '.storybook', 'preview.tsx');
let previewContent = readFileSync(previewPath, 'utf-8');

// Generate the array string with proper formatting
const arrayString = `      const sectionOrder = [
${navigationOrder.map(item => `        "${item}"`).join(',\n')}
      ];`;

// Replace the sectionOrder array in preview.tsx
// Match the pattern: const sectionOrder = [...];
const pattern = /const sectionOrder = \[[\s\S]*?\];/;
if (!pattern.test(previewContent)) {
  console.error('Error: Could not find sectionOrder in preview.tsx');
  process.exit(1);
}

previewContent = previewContent.replace(pattern, arrayString);

// Write back
writeFileSync(previewPath, previewContent, 'utf-8');

console.log('✓ Synced navigationOrder from system.manifest.json to .storybook/preview.tsx');
console.log(`  Order: ${navigationOrder.join(' → ')}`);

