#!/usr/bin/env node

/**
 * Shift Accent-700 hue slightly towards blue to differentiate from brand colors
 * Then regenerate the entire scale from Accent-600 anchor
 */

import { readFileSync, writeFileSync } from 'fs';
import { join, dirname } from 'path';
import { fileURLToPath } from 'url';

const __filename = fileURLToPath(import.meta.url);
const __dirname = dirname(__filename);
const repoRoot = join(__dirname, '..');

/**
 * Parse OKLCH string to object
 */
function parseOklch(oklchStr) {
  const match = oklchStr.match(/oklch\((\d+(?:\.\d+)?)%\s+([\d.]+)\s+(\d+(?:\.\d+)?)\)/);
  if (!match) return null;
  return {
    l: parseFloat(match[1]),
    c: parseFloat(match[2]),
    h: parseFloat(match[3])
  };
}

/**
 * Format OKLCH object to string
 */
function formatOklch(l, c, h) {
  return `oklch(${Math.round(l)}% ${c.toFixed(2)} ${Math.round(h)})`;
}

// Read current accent.json
const accentFile = join(repoRoot, 'tokens/foundations/colors/accent.json');
const data = JSON.parse(readFileSync(accentFile, 'utf-8'));

const current700 = data.eui.color.accent['700'].$value;
const current700Parsed = parseOklch(current700);

if (!current700Parsed) {
  console.error('❌ Failed to parse current Accent-700');
  process.exit(1);
}

console.log('🎨 Shifting Accent-700 hue towards blue');
console.log('='.repeat(80));
console.log(`\n📌 Current Accent-700: ${current700}`);
console.log(`   Lightness: ${current700Parsed.l}%`);
console.log(`   Chroma: ${current700Parsed.c.toFixed(2)}`);
console.log(`   Hue: ${current700Parsed.h}° (teal/cyan)`);

// Shift hue slightly towards blue (increase hue by ~10-15 degrees)
// Current: 220° (teal/cyan), shift to ~230-235° (more blue)
const newHue = (current700Parsed.h + 12) % 360;
const new700 = formatOklch(current700Parsed.l, current700Parsed.c, newHue);

// Update Accent-700
data.eui.color.accent['700'].$value = new700;

writeFileSync(accentFile, JSON.stringify(data, null, 2) + '\n', 'utf-8');

console.log(`\n✅ Updated Accent-700:`);
console.log(`   Old: ${current700}`);
console.log(`   New: ${new700}`);
console.log(`   Hue shift: ${current700Parsed.h}° → ${newHue}° (+${newHue - current700Parsed.h}°)`);

console.log('\n' + '='.repeat(80));
console.log('✅ Accent-700 hue shifted towards blue!');
console.log('📝 Next step: Run "node scripts/generate-tonal-scale-from-base-600-accent.mjs" to regenerate the scale');

