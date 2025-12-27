#!/usr/bin/env node

/**
 * Generate tonal scale from base color (500) using OKLCH best practices
 * 
 * Approach:
 * 1. Take base 500 color as reference (preserve it exactly)
 * 2. Generate other levels with adaptive perceptual steps
 * 3. Use adaptive steps for darkening based on base lightness
 * 4. Use parabolic chroma curve (decreases at edges)
 * 5. Slight hue shift for natural appearance
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
 * Get adaptive lightness steps based on base lightness
 * For dark base colors (< 55%), use smaller steps to avoid near-black values
 */
function getAdaptiveLightnessSteps(baseL, isNeutral) {
  // Steps format: [50, 100, 200, 300, 400, 500, 600, 700, 800, 900]
  // Index:        [0,  1,   2,   3,   4,   5,   6,   7,   8,   9]
  
  if (isNeutral) {
    // Neutral: lighter base, more granular steps for light shades (50-500), larger steps for dark (600-900)
    // Steps format: [50, 100, 200, 300, 400, 500, 600, 700, 800, 900]
    // Going up (50-400): smaller steps for more light shades [2, 3, 5, 7, 8]
    // Going down (600-900): larger steps for fewer dark shades [15, 15, 10, 8]
    return [2, 3, 5, 7, 8, 0, 15, 15, 10, 8];
  }
  
  // For colored scales, adapt based on base lightness
  if (baseL < 55) {
    // Dark base color: use smaller steps for darkening to avoid near-black
    // Steps up (50-400): [5, 5, 10, 10, 10]
    // Step for 500: 0
    // Steps down (600-900): [5, 5, 3, 2] - smaller steps to preserve distinction
    return [5, 5, 10, 10, 10, 0, 5, 5, 3, 2];
  } else if (baseL < 65) {
    // Medium-dark base: moderate steps
    return [5, 5, 10, 10, 10, 0, 8, 7, 4, 3];
  } else {
    // Light base color: standard steps
    return [3, 3, 5, 10, 10, 0, 10, 10, 5, 3];
  }
}

/**
 * Generate tonal scale from base 500
 */
function generateScale(base500, config) {
  const { chromaReduction, hueShift, isNeutral } = config;
  
  // Parse base
  let base;
  if (base500.startsWith('oklch')) {
    base = parseOklch(base500);
  } else {
    const oklch = toOklch(base500);
    base = {
      l: oklch.l * 100,
      c: oklch.c || 0,
      h: oklch.h || 0
    };
  }
  
  if (!base) throw new Error(`Failed to parse base color: ${base500}`);
  
  // Get adaptive steps based on base lightness
  const lightnessSteps = getAdaptiveLightnessSteps(base.l, isNeutral);
  
  const scale = {};
  const levels = [50, 100, 200, 300, 400, 500, 600, 700, 800, 900];
  
  // Calculate lightness for each level
  let currentL = base.l;
  const lightnessValues = [];
  
  // Build up (50-400)
  for (let i = 4; i >= 0; i--) {
    currentL += lightnessSteps[i];
    lightnessValues.unshift(Math.min(100, currentL));
  }
  
  // Add 500 (base)
  lightnessValues.push(base.l);
  
  // Build down (600-900)
  // lightnessSteps[5] = 0 (for 500), so start from index 6 for 600
  currentL = base.l;
  for (let i = 6; i < 10; i++) {
    currentL -= lightnessSteps[i];
    lightnessValues.push(Math.max(0, currentL));
  }
  
  // Generate each level
  levels.forEach((level, idx) => {
    const l = lightnessValues[idx];
    const distanceFrom500 = Math.abs(idx - 5) / 5; // 0 at 500, 1 at edges
    
    // Chroma: parabolic reduction
    let c = base.c;
    if (!isNeutral) {
      c = base.c * (1 - Math.pow(distanceFrom500, 2) * chromaReduction);
      c = Math.max(0, c);
    } else {
      c = 0;
    }
    
    // Hue: slight shift at edges
    let h = base.h;
    if (!isNeutral && hueShift > 0) {
      const shift = distanceFrom500 * hueShift;
      h = (base.h + shift) % 360;
      if (h < 0) h += 360;
    } else {
      h = 0; // Neutral has no hue
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
 * Process color file
 */
function processFile(filePath) {
  console.log(`\n📄 Processing: ${filePath}`);
  
  const content = readFileSync(filePath, 'utf-8');
  const data = JSON.parse(content);
  
  const colorFamily = Object.keys(data.eui?.color || {})[0];
  if (!colorFamily) {
    console.log('  ⚠️  Could not find color family');
    return;
  }
  
  console.log(`  🎨 Color family: ${colorFamily}`);
  
  // Get base 500
  const base500 = data.eui.color[colorFamily]['500'].$value;
  console.log(`  📌 Base 500: ${base500}`);
  
  // Parse base to get lightness for adaptive steps
  let base;
  if (base500.startsWith('oklch')) {
    base = parseOklch(base500);
  } else {
    const oklch = toOklch(base500);
    base = {
      l: oklch.l * 100,
      c: oklch.c || 0,
      h: oklch.h || 0
    };
  }
  
  if (base) {
    console.log(`  💡 Base lightness: ${base.l.toFixed(1)}%`);
    if (base.l < 55) {
      console.log(`  ⚠️  Dark base detected - using smaller darkening steps`);
    }
  }
  
  // Configuration based on color family
  let config;
  if (colorFamily === 'neutral') {
    config = {
      chromaReduction: 1.0,
      hueShift: 0,
      isNeutral: true
    };
  } else if (colorFamily === 'brand') {
    config = {
      chromaReduction: 0.7,
      hueShift: 2,
      isNeutral: false
    };
  } else { // accent
    config = {
      chromaReduction: 0.7,
      hueShift: 1,
      isNeutral: false
    };
  }
  
  // Generate scale (lightnessSteps will be determined adaptively inside generateScale)
  const scale = generateScale(base500, config);
  
  // Update file
  Object.entries(scale).forEach(([level, oklch]) => {
    const oldValue = data.eui.color[colorFamily][level].$value;
    const newValue = formatOklch(oklch.l, oklch.c, oklch.h);
    
    data.eui.color[colorFamily][level].$value = newValue;
    
    if (level === '500') {
      data.eui.color[colorFamily][level].$description = `Base ${colorFamily} color - reference tone`;
    } else {
      data.eui.color[colorFamily][level].$description = `Generated from base 500 using OKLCH tonal scale best practices (adaptive steps)`;
    }
    
    console.log(`  ✓ ${level}: ${oldValue} → ${newValue}`);
  });
  
  writeFileSync(filePath, JSON.stringify(data, null, 2) + '\n', 'utf-8');
  console.log(`  ✅ Scale generated successfully`);
}

// Main
console.log('🎨 Generate Tonal Scale from Base Color (500) - Adaptive Steps');
console.log('='.repeat(80));
console.log('\n📋 Best Practices:');
console.log('  • Base 500 preserved as reference');
console.log('  • Adaptive perceptual lightness steps (smaller for dark bases)');
console.log('  • Parabolic chroma curve (decreases at edges)');
console.log('  • Slight hue shift for natural appearance');
console.log('\n💡 Adaptive Logic:');
console.log('  • Base lightness < 55%: small steps [5, 5, 3, 2] for 600-900');
console.log('  • Base lightness 55-65%: moderate steps [8, 7, 4, 3]');
console.log('  • Base lightness > 65%: standard steps [10, 10, 5, 3]');

const files = [
  'tokens/foundations/colors/brand.json',
  'tokens/foundations/colors/accent.json',
  'tokens/foundations/colors/neutral.json'
];

files.forEach(relPath => {
  processFile(join(repoRoot, relPath));
});

console.log('\n' + '='.repeat(80));
console.log('✅ Done! Run "npm run tokens:build" to regenerate CSS.');

