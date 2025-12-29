#!/usr/bin/env node

/**
 * Update accent-700 to exact OKLCH value from Viking Blue (#51b6d4) from Envy UI v1
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

// Viking Blue from Envy UI v1: #51b6d4
const vikingBlueHex = '#51b6d4';
const oklch = toOklch(vikingBlueHex);

if (!oklch || oklch.l === undefined) {
  console.error('❌ Failed to convert HEX to OKLCH');
  process.exit(1);
}

const l = Math.round(oklch.l * 100);
const c = oklch.c || 0;
const h = oklch.h !== undefined ? Math.round(oklch.h) : 0;

const newAccent700 = `oklch(${l}% ${c.toFixed(2)} ${h})`;

console.log('🎨 Converting Viking Blue (#51b6d4) from Envy UI v1 to OKLCH');
console.log('='.repeat(80));
console.log(`\n📌 Source: Envy UI v1 - Viking Blue`);
console.log(`📌 Target HEX: ${vikingBlueHex}`);
console.log(`\n✅ Converted to OKLCH: ${newAccent700}`);
console.log(`   Lightness: ${l}%`);
console.log(`   Chroma: ${c.toFixed(2)}`);
console.log(`   Hue: ${h}°`);

// Update accent.json
const accentFile = join(repoRoot, 'tokens/foundations/colors/accent.json');
const data = JSON.parse(readFileSync(accentFile, 'utf-8'));

const oldValue = data.eui.color.accent['700'].$value;
data.eui.color.accent['700'].$value = newAccent700;

writeFileSync(accentFile, JSON.stringify(data, null, 2) + '\n', 'utf-8');

console.log(`\n📝 Updated accent-700 in tokens/foundations/colors/accent.json:`);
console.log(`   Old: ${oldValue}`);
console.log(`   New: ${newAccent700}`);

console.log('\n' + '='.repeat(80));
console.log('✅ Accent-700 updated!');
console.log('📝 Next step: Run "node scripts/generate-tonal-scale-from-base-700-accent.mjs" to regenerate the scale');

