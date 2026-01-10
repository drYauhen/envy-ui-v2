#!/usr/bin/env node

/**
 * Precise HEX to OKLCH conversion script
 * Uses culori library for accurate color space conversion
 */

import { converter } from 'culori';
import { readFileSync, writeFileSync } from 'fs';
import { join, dirname } from 'path';
import { fileURLToPath } from 'url';

const __filename = fileURLToPath(import.meta.url);
const __dirname = dirname(__filename);
const repoRoot = join(__dirname, '..');

// Initialize converter
const toOklch = converter('oklch');

/**
 * Convert HEX color to OKLCH string
 * @param {string} hex - HEX color (e.g., "#007fa2")
 * @returns {string} - OKLCH string (e.g., "oklch(50% 0.20 220)")
 */
function hexToOklch(hex) {
  try {
    const oklch = toOklch(hex);
    if (!oklch || oklch.l === undefined) {
      throw new Error(`Failed to convert ${hex}`);
    }
    
    // Format: oklch(L% C H)
    // L: lightness (0-100), C: chroma (0+), H: hue (0-360)
    const l = Math.round(oklch.l * 100);
    const c = oklch.c || 0;
    const h = oklch.h !== undefined ? Math.round(oklch.h) : 0;
    
    return `oklch(${l}% ${c.toFixed(2)} ${h})`;
  } catch (error) {
    console.error(`Error converting ${hex}:`, error.message);
    return hex; // Fallback to original
  }
}

/**
 * Convert all HEX values in a color token file to OKLCH
 */
function convertColorFile(filePath) {
  console.log(`\n📄 Processing: ${filePath}`);
  
  const content = readFileSync(filePath, 'utf-8');
  const data = JSON.parse(content);
  
  let converted = 0;
  let skipped = 0;
  
  function processObject(obj, path = []) {
    for (const [key, value] of Object.entries(obj)) {
      const currentPath = [...path, key];
      
      if (typeof value === 'object' && value !== null && !Array.isArray(value)) {
        // Recursively process nested objects
        processObject(value, currentPath);
      } else if (key === '$value' && typeof value === 'string' && value.startsWith('#')) {
        // Found a HEX color value
        const original = value;
        const convertedValue = hexToOklch(original);
        
        if (convertedValue !== original) {
          obj[key] = convertedValue;
          converted++;
          console.log(`  ✓ ${currentPath.join('.')}: ${original} → ${convertedValue}`);
        } else {
          skipped++;
        }
      }
    }
  }
  
  processObject(data);
  
  if (converted > 0) {
    writeFileSync(filePath, JSON.stringify(data, null, 2) + '\n', 'utf-8');
    console.log(`  ✅ Converted ${converted} colors, skipped ${skipped}`);
  } else {
    console.log(`  ⏭️  No HEX colors found (or already converted)`);
  }
  
  return { converted, skipped };
}

// Main execution
console.log('🎨 Precise HEX to OKLCH Conversion');
console.log('=====================================\n');

const colorFiles = [
  'tokens/knowledge/foundations/colors/brand.json',
  'tokens/knowledge/foundations/colors/accent.json',
  'tokens/knowledge/foundations/colors/neutral.json',
  'tokens/knowledge/foundations/colors/status.json',
  'tokens/knowledge/foundations/colors/signal.json'
];

let totalConverted = 0;
let totalSkipped = 0;

colorFiles.forEach(relativePath => {
  const fullPath = join(repoRoot, relativePath);
  try {
    const result = convertColorFile(fullPath);
    totalConverted += result.converted;
    totalSkipped += result.skipped;
  } catch (error) {
    console.error(`❌ Error processing ${relativePath}:`, error.message);
  }
});

console.log('\n=====================================');
console.log(`📊 Summary: ${totalConverted} colors converted, ${totalSkipped} skipped`);
console.log('\n✅ Conversion complete!');
console.log('💡 Run "npm run tokens:build" to regenerate CSS tokens.');

