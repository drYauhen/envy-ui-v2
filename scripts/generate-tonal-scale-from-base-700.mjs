#!/usr/bin/env node

/**
 * Generate tonal scale from base color (700) using OKLCH best practices
 * 
 * Approach for Brand color (700 anchor):
 * 1. Take base 700 color as reference (preserve it exactly)
 * 2. Asymmetric distribution: more light shades (50-600), fewer dark (800-900)
 * 3. Primary usage range: Brand-50 → Brand-700
 * 4. Brand-800-900 as edge-cases only
 * 5. Use parabolic chroma curve (decreases at edges)
 * 6. Slight hue shift for natural appearance
 */

import { converter } from 'culori';
import { readFileSync, writeFileSync } from 'fs';
import { join, dirname } from 'path';
import { fileURLToPath } from 'url';

const __filename = fileURLToPath(import.meta.url);
const __dirname = dirname(__filename);
const repoRoot = join(__dirname, '..');

const toOklch = converter('oklch');

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

/**
 * Get asymmetric lightness steps for 700 anchor
 * More steps going up (50-600) for light shades, minimal steps down (800-900)
 */
function getAsymmetricLightnessStepsFor700() {
  // Steps format: [50, 100, 200, 300, 400, 500, 600, 700, 800, 900]
  // Index:        [0,  1,   2,   3,   4,   5,   6,   7,   8,   9]
  
  // For Brand-700 anchor (dark base ~40%):
  // Going up (50-600): larger steps to create more usable light shades
  // [50, 100, 200, 300, 400, 500, 600] = [10, 8, 10, 10, 8, 5, 3]
  // Going down (800-900): minimal steps (edge-cases only)
  // [800, 900] = [2, 1]
  
  return [10, 8, 10, 10, 8, 5, 3, 0, 2, 1];
}

/**
 * Generate tonal scale from base 700
 */
function generateScaleFrom700(base700, config) {
  const { chromaReduction, hueShift } = config;
  
  // Parse base 700
  let base;
  if (base700.startsWith('oklch')) {
    base = parseOklch(base700);
  } else {
    const oklch = toOklch(base700);
    base = {
      l: oklch.l * 100,
      c: oklch.c || 0,
      h: oklch.h || 0
    };
  }
  
  if (!base) throw new Error(`Failed to parse base 700: ${base700}`);
  
  // Get asymmetric steps
  const lightnessSteps = getAsymmetricLightnessStepsFor700();
  
  const scale = {};
  const levels = [50, 100, 200, 300, 400, 500, 600, 700, 800, 900];
  
  // Calculate lightness for each level (starting from 700, going up and down)
  const lightnessValues = [];
  
  // Build up (50-600) - going lighter from 700
  // Start from 700 and add steps going up: 600, 500, 400, 300, 200, 100, 50
  // Steps array: [50, 100, 200, 300, 400, 500, 600, 700, 800, 900]
  // Indices:     [0,  1,   2,   3,   4,   5,   6,   7,   8,   9]
  // Steps:       [10, 8,   10,  10,  8,   5,   3,   0,   2,   1]
  
  let currentL = base.l; // Start at 700 (40%)
  const upValues = [];
  
  // Build from 700 upward: 600, 500, 400, 300, 200, 100, 50
  // We need to accumulate: 600=43%, 500=48%, 400=56%, 300=66%, 200=76%, 100=84%, 50=94%
  for (let i = 6; i >= 0; i--) {
    currentL += lightnessSteps[i];
    upValues.unshift(Math.min(100, currentL)); // unshift to prepend (50 first, then 100, etc.)
  }
  
  // upValues should now be: [94, 84, 76, 66, 56, 48, 43] for [50, 100, 200, 300, 400, 500, 600]
  lightnessValues.push(...upValues);
  
  // Add 700 (base/anchor)
  lightnessValues.push(base.l);
  
  // Build down (800-900) - going darker from 700
  currentL = base.l;
  for (let i = 8; i < 10; i++) {
    currentL -= lightnessSteps[i];
    lightnessValues.push(Math.max(0, currentL));
  }
  
  // Generate each level with chroma and hue adjustments
  levels.forEach((level, idx) => {
    const l = lightnessValues[idx];
    // Distance from 700 (index 7)
    const distanceFrom700 = Math.abs(idx - 7) / 7; // 0 at 700, 1 at edges
    
    // Chroma: parabolic reduction
    let c = base.c * (1 - Math.pow(distanceFrom700, 2) * chromaReduction);
    c = Math.max(0, c);
    
    // Hue: slight shift at edges
    let h = base.h;
    if (hueShift > 0) {
      const shift = distanceFrom700 * hueShift;
      h = (base.h + shift) % 360;
      if (h < 0) h += 360;
    }
    
    scale[level] = {
      l: Math.round(l),
      c: parseFloat(c.toFixed(2)),
      h: Math.round(h)
    };
  });
  
  return scale;
}

/**
 * Process brand color file
 */
function processBrandFile(filePath) {
  console.log(`\n📄 Processing: ${filePath}`);
  
  const content = readFileSync(filePath, 'utf-8');
  const data = JSON.parse(content);
  
  const colorFamily = Object.keys(data.eui?.color || {})[0];
  if (colorFamily !== 'brand') {
    console.log('  ⚠️  This script is only for brand color');
    return;
  }
  
  console.log(`  🎨 Color family: ${colorFamily}`);
  
  // Get base 700 (canonical brand color)
  const base700 = data.eui.color[colorFamily]['700'].$value;
  console.log(`  📌 Base 700 (anchor): ${base700}`);
  
  // Parse base to get lightness
  let base;
  if (base700.startsWith('oklch')) {
    base = parseOklch(base700);
  } else {
    const oklch = toOklch(base700);
    base = {
      l: oklch.l * 100,
      c: oklch.c || 0,
      h: oklch.h || 0
    };
  }
  
  if (base) {
    console.log(`  💡 Base lightness: ${base.l.toFixed(1)}%`);
    console.log(`  💡 Base chroma: ${base.c.toFixed(2)}`);
    console.log(`  💡 Base hue: ${base.h.toFixed(0)}°`);
  }
  
  // Configuration for brand color
  const config = {
    chromaReduction: 0.7,
    hueShift: 2,
  };
  
  // Generate scale from 700
  const scale = generateScaleFrom700(base700, config);
  
  // Update file
  Object.entries(scale).forEach(([level, oklch]) => {
    const oldValue = data.eui.color[colorFamily][level].$value;
    const newValue = formatOklch(oklch.l, oklch.c, oklch.h);
    
    data.eui.color[colorFamily][level].$value = newValue;
    
    if (level === '700') {
      data.eui.color[colorFamily][level].$description = `Base brand color - canonical brand color (anchor)`;
    } else if (level === '800' || level === '900') {
      data.eui.color[colorFamily][level].$description = `Generated from base 700 using OKLCH tonal scale - edge-case dark shade`;
    } else {
      data.eui.color[colorFamily][level].$description = `Generated from base 700 using OKLCH tonal scale (asymmetric distribution)`;
    }
    
    console.log(`  ✓ ${level}: ${oldValue} → ${newValue}`);
  });
  
  writeFileSync(filePath, JSON.stringify(data, null, 2) + '\n', 'utf-8');
  console.log(`  ✅ Scale generated successfully from base 700`);
}

// Main
console.log('🎨 Generate Tonal Scale from Base Color (700) - Asymmetric Distribution');
console.log('='.repeat(80));
console.log('\n📋 Best Practices:');
console.log('  • Base 700 preserved as canonical brand color (anchor)');
console.log('  • Asymmetric distribution: more light shades (50-600), fewer dark (800-900)');
console.log('  • Primary usage range: Brand-50 → Brand-700');
console.log('  • Brand-800-900 as edge-cases only');
console.log('  • Parabolic chroma curve (decreases at edges)');
console.log('  • Slight hue shift for natural appearance');
console.log('\n💡 Asymmetric Logic:');
console.log('  • Steps up (50-600): [10, 8, 10, 10, 8, 5, 3] - larger steps for more light shades');
console.log('  • Steps down (800-900): [2, 1] - minimal steps for edge-cases');

const brandFile = join(repoRoot, 'tokens/foundations/colors/brand.json');
processBrandFile(brandFile);

console.log('\n' + '='.repeat(80));
console.log('✅ Done! Run "npm run tokens:build" to regenerate CSS.');

