#!/usr/bin/env node

/**
 * Generates Tailwind config from design tokens
 * Reads tokens and maps them to Tailwind theme structure
 */

import { readFileSync, writeFileSync, readdirSync } from 'fs';
import { join, dirname } from 'path';
import { fileURLToPath } from 'url';

const __filename = fileURLToPath(import.meta.url);
const __dirname = dirname(__filename);
const repoRoot = join(__dirname, '..');

// Helper to read and parse JSON token files
function readTokenFile(filePath) {
  try {
    const content = readFileSync(filePath, 'utf-8');
    return JSON.parse(content);
  } catch (error) {
    console.warn(`Warning: Could not read ${filePath}:`, error.message);
    return null;
  }
}

// Extract value from token object
function extractTokenValue(tokenObj, path = []) {
  if (!tokenObj || typeof tokenObj !== 'object') return null;
  
  if (tokenObj.$value !== undefined) {
    return tokenObj.$value;
  }
  
  // Recursively search for $value
  for (const [key, value] of Object.entries(tokenObj)) {
    if (key === '$value') return value;
    if (typeof value === 'object' && value !== null) {
      const result = extractTokenValue(value, [...path, key]);
      if (result !== null) return result;
    }
  }
  
  return null;
}

// Flatten nested token structure
function flattenTokens(obj, prefix = '', result = {}) {
  for (const [key, value] of Object.entries(obj)) {
    if (key.startsWith('$')) continue; // Skip metadata keys
    
    const newKey = prefix ? `${prefix}-${key}` : key;
    
    if (value && typeof value === 'object' && value.$value !== undefined) {
      result[newKey] = value.$value;
    } else if (value && typeof value === 'object') {
      flattenTokens(value, newKey, result);
    }
  }
  return result;
}

// Read spacing tokens
const spacingPath = join(repoRoot, 'tokens', 'foundations', 'spacing.json');
const spacingData = readTokenFile(spacingPath);
const spacing = spacingData?.eui?.spacing ? flattenTokens(spacingData.eui.spacing) : {};

// Read color tokens
const colorsDir = join(repoRoot, 'tokens', 'foundations', 'colors');
const colorFiles = readdirSync(colorsDir).filter(f => f.endsWith('.json'));
const colors = {};

colorFiles.forEach(file => {
  const colorPath = join(colorsDir, file);
  const colorData = readTokenFile(colorPath);
  if (colorData?.eui?.color) {
    const category = file.replace('.json', '');
    const flattened = flattenTokens(colorData.eui.color);
    // Flatten nested structure: brand.brand-600 -> brand-600
    // But keep category prefix for organization
    Object.keys(flattened).forEach(key => {
      const newKey = key.startsWith(`${category}-`) ? key : `${category}-${key}`;
      colors[newKey] = flattened[key];
    });
  }
});

// Read shape tokens
const shapePath = join(repoRoot, 'tokens', 'foundations', 'shape.json');
const shapeData = readTokenFile(shapePath);
const borderRadius = shapeData?.eui?.radius ? flattenTokens(shapeData.eui.radius) : {};

// Read typography tokens
const typographyDir = join(repoRoot, 'tokens', 'foundations', 'typography');
const fontSize = {};
const fontWeight = {};
const lineHeight = {};

try {
  const fontSizeData = readTokenFile(join(typographyDir, 'font-size.json'));
  if (fontSizeData?.eui?.typography?.fontSize) {
    Object.assign(fontSize, flattenTokens(fontSizeData.eui.typography.fontSize));
  }
  
  const fontWeightData = readTokenFile(join(typographyDir, 'font-weight.json'));
  if (fontWeightData?.eui?.typography?.fontWeight) {
    Object.assign(fontWeight, flattenTokens(fontWeightData.eui.typography.fontWeight));
  }
  
  const lineHeightData = readTokenFile(join(typographyDir, 'line-height.json'));
  if (lineHeightData?.eui?.typography?.lineHeight) {
    Object.assign(lineHeight, flattenTokens(lineHeightData.eui.typography.lineHeight));
  }
} catch (error) {
  console.warn('Warning: Could not read typography tokens:', error.message);
}

// Build Tailwind config
      const tailwindConfig = {
        content: [
          "./packages/tailwind/**/*.{js,ts,jsx,tsx}",
          "./stories/**/*.{js,ts,jsx,tsx}",
          "./.storybook/**/*.{js,ts,jsx,tsx}",
        ],
  theme: {
    extend: {
      colors: colors,
      spacing: spacing,
      borderRadius: borderRadius,
      fontSize: fontSize,
      fontWeight: fontWeight,
      lineHeight: lineHeight,
    },
  },
  plugins: [],
};

// Generate config file
const configPath = join(repoRoot, 'packages', 'tailwind', 'config', 'tailwind.config.js');
const configContent = `/** @type {import('tailwindcss').Config} */
// Auto-generated from design tokens - do not edit manually
// Run: npm run tailwind:generate-config

export default ${JSON.stringify(tailwindConfig, null, 2)};
`;

writeFileSync(configPath, configContent, 'utf-8');
console.log('✓ Generated Tailwind config from tokens');
console.log(`  Colors: ${Object.keys(colors).length} categories`);
console.log(`  Spacing: ${Object.keys(spacing).length} values`);
console.log(`  Border radius: ${Object.keys(borderRadius).length} values`);

