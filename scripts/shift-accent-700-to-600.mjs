#!/usr/bin/env node

/**
 * Shift current Accent-700 (Viking Blue) to Accent-600
 * Create new darker Accent-700 and regenerate scale
 */

import { converter } from 'culori';
import { readFileSync, writeFileSync } from 'fs';
import { join, dirname } from 'path';
import { fileURLToPath } from 'url';

const __filename = fileURLToPath(import.meta.url);
const __dirname = dirname(__filename);
const repoRoot = join(__dirname, '..');

const toOklch = converter('oklch');
const fromOklch = converter('rgb');

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
const current600 = data.eui.color.accent['600'].$value;

console.log('🔄 Shifting Accent-700 to Accent-600 and creating darker Accent-700');
console.log('='.repeat(80));

// Parse current 700
const current700Parsed = parseOklch(current700);
if (!current700Parsed) {
  console.error('❌ Failed to parse current Accent-700');
  process.exit(1);
}

console.log(`\n📌 Current Accent-700: ${current700}`);
console.log(`   Lightness: ${current700Parsed.l}%`);
console.log(`   Chroma: ${current700Parsed.c.toFixed(2)}`);
console.log(`   Hue: ${current700Parsed.h}°`);

// Move current 700 to 600
data.eui.color.accent['600'].$value = current700;
console.log(`\n✅ Moved Accent-700 → Accent-600: ${current700}`);

// Create new darker 700 (reduce lightness by ~10-13%)
// Target: around 60-63% lightness (darker than current 73%)
const new700Lightness = Math.max(0, current700Parsed.l - 13); // Make it darker
const new700 = formatOklch(new700Lightness, current700Parsed.c, current700Parsed.h);

data.eui.color.accent['700'].$value = new700;
console.log(`✅ Created new Accent-700: ${new700}`);
console.log(`   Lightness: ${new700Lightness}% (was ${current700Parsed.l}%)`);
console.log(`   Chroma: ${current700Parsed.c.toFixed(2)} (preserved)`);
console.log(`   Hue: ${current700Parsed.h}° (preserved)`);

writeFileSync(accentFile, JSON.stringify(data, null, 2) + '\n', 'utf-8');

console.log('\n' + '='.repeat(80));
console.log('✅ Accent colors shifted!');
console.log('📝 Next step: Run "node scripts/generate-tonal-scale-from-base-700-accent.mjs" to regenerate the scale');



