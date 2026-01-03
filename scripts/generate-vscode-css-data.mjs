#!/usr/bin/env node

/**
 * Generates VS Code CSS custom data for autocomplete support
 * Creates .vscode/css-custom-data.json with all CSS custom properties
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
// Pattern: --token-name: value; /* optional comment */
const tokenRegex = /--([\w-]+):\s*([^;]+);(?:\s*\/\*([^*]+)\*\/)?/g;
const tokens = [];
let match;

while ((match = tokenRegex.exec(tokensCss)) !== null) {
  const name = match[1];
  const value = match[2].trim();
  const comment = match[3]?.trim() || '';
  
  tokens.push({
    name: `var(--${name})`,
    description: comment || `Token: ${name} = ${value}`
  });
}

if (tokens.length === 0) {
  console.warn('⚠️  Warning: No tokens found in CSS file');
  process.exit(0);
}

// Generate VS Code custom data format
const customData = {
  version: 1.1,
  customData: [{
    valueSets: [{
      name: "eui-tokens",
      values: tokens
    }]
  }]
};

// Ensure .vscode directory exists
const vscodeDir = join(repoRoot, '.vscode');
try {
  mkdirSync(vscodeDir, { recursive: true });
} catch (error) {
  // Directory might already exist, ignore
}

// Write VS Code custom data file
const outputPath = join(vscodeDir, 'css-custom-data.json');
writeFileSync(outputPath, JSON.stringify(customData, null, 2), 'utf-8');

console.log(`✅ Generated VS Code CSS autocomplete: ${outputPath}`);
console.log(`   Found ${tokens.length} tokens`);

// Update or create .vscode/settings.json
const settingsPath = join(vscodeDir, 'settings.json');
let settings = {};

try {
  const existingSettings = readFileSync(settingsPath, 'utf-8');
  settings = JSON.parse(existingSettings);
} catch (error) {
  // File doesn't exist or is invalid, create new settings
  settings = {};
}

// Ensure css.customData is configured
if (!settings['css.customData']) {
  settings['css.customData'] = [];
}

// Add our custom data file if not already present
const customDataRelative = '.vscode/css-custom-data.json';
if (!settings['css.customData'].includes(customDataRelative)) {
  settings['css.customData'].push(customDataRelative);
}

// Write updated settings
writeFileSync(settingsPath, JSON.stringify(settings, null, 2), 'utf-8');

console.log(`✅ Updated VS Code settings: ${settingsPath}`);

