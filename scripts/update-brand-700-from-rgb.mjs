#!/usr/bin/env node

/**
 * Update brand-700 to exact OKLCH value from RGB(6, 106, 141) = #066a8d
 * Then regenerate the entire scale from this anchor
 */

import { converter } from 'culori';
import { readFileSync, writeFileSync } from 'fs';
import { join, dirname } from 'path';
import { fileURLToPath } from 'url';

const __filename = fileURLToPath(import.meta.url);
const __dirname = dirname(__filename);
const repoRoot = join(__dirname, '..');

const toOklch = converter('oklch');

// RGB(6, 106, 141) = #066a8d
// Convert to hex first, then to OKLCH
const hex = '#066a8d';
const oklch = toOklch(hex);

if (!oklch || oklch.l === undefined) {
  console.error('❌ Failed to convert RGB to OKLCH');
  process.exit(1);
}

const l = Math.round(oklch.l * 100);
const c = oklch.c || 0;
const h = oklch.h !== undefined ? Math.round(oklch.h) : 0;

const newBrand700 = `oklch(${l}% ${c.toFixed(2)} ${h})`;

console.log('🎨 Converting RGB(6, 106, 141) = #066a8d to OKLCH');
console.log('='.repeat(80));
console.log(`\n📌 Target RGB: rgb(6, 106, 141)`);
console.log(`📌 Target HEX: #066a8d`);
console.log(`\n✅ Converted to OKLCH: ${newBrand700}`);
console.log(`   Lightness: ${l}%`);
console.log(`   Chroma: ${c.toFixed(2)}`);
console.log(`   Hue: ${h}°`);

// Update brand.json
const brandFile = join(repoRoot, 'tokens/foundations/colors/brand.json');
const data = JSON.parse(readFileSync(brandFile, 'utf-8'));

const oldValue = data.eui.color.brand['700'].$value;
data.eui.color.brand['700'].$value = newBrand700;

writeFileSync(brandFile, JSON.stringify(data, null, 2) + '\n', 'utf-8');

console.log(`\n📝 Updated brand-700 in tokens/foundations/colors/brand.json:`);
console.log(`   Old: ${oldValue}`);
console.log(`   New: ${newBrand700}`);

console.log('\n' + '='.repeat(80));
console.log('✅ Brand-700 updated!');
console.log('📝 Next step: Run "node scripts/generate-tonal-scale-from-base-700.mjs" to regenerate the scale');

