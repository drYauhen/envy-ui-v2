#!/usr/bin/env node

/**
 * Set Accent-600 to Viking Blue (#51b6d4) from Envy UI v1
 * Then regenerate the entire scale from Accent-600 as anchor
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

const vikingBlueOklch = `oklch(${l}% ${c.toFixed(2)} ${h})`;

console.log('🎨 Setting Accent-600 to Viking Blue (#51b6d4) from Envy UI v1');
console.log('='.repeat(80));
console.log(`\n📌 Source: Envy UI v1 - Viking Blue`);
console.log(`📌 Target HEX: ${vikingBlueHex}`);
console.log(`\n✅ Converted to OKLCH: ${vikingBlueOklch}`);
console.log(`   Lightness: ${l}%`);
console.log(`   Chroma: ${c.toFixed(2)}`);
console.log(`   Hue: ${h}°`);

// Update accent.json
const accentFile = join(repoRoot, 'tokens/knowledge/foundations/colors/accent.json');
const data = JSON.parse(readFileSync(accentFile, 'utf-8'));

const old600 = data.eui.color.accent['600'].$value;
data.eui.color.accent['600'].$value = vikingBlueOklch;
data.eui.color.accent['600'].$description = 'Viking Blue from Envy UI v1 - anchor for accent scale';

writeFileSync(accentFile, JSON.stringify(data, null, 2) + '\n', 'utf-8');

console.log(`\n📝 Updated accent-600 in tokens/knowledge/foundations/colors/accent.json:`);
console.log(`   Old: ${old600}`);
console.log(`   New: ${vikingBlueOklch}`);

console.log('\n' + '='.repeat(80));
console.log('✅ Accent-600 set to Viking Blue!');
console.log('📝 Next step: Need to create script to regenerate scale from Accent-600 anchor');



