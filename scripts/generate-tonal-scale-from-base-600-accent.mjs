#!/usr/bin/env node

/**
 * Generate tonal scale from base color (600) using OKLCH best practices
 * 
 * Approach for Accent color (600 anchor):
 * 1. Take base 600 color (Viking Blue) as reference (preserve it exactly)
 * 2. Asymmetric distribution: more light shades (50-500), fewer dark (700-900)
 * 3. Primary usage range: Accent-50 → Accent-600
 * 4. Accent-700-900 as darker shades
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
 * Get asymmetric lightness steps for 600 anchor
 * More steps going up (50-500) for light shades, steps down (700-900) for dark shades
 */
function getAsymmetricLightnessStepsFor600() {
  // Steps format: [50, 100, 200, 300, 400, 500, 600, 700, 800, 900]
  // Index:        [0,  1,   2,   3,   4,   5,   6,   7,   8,   9]
  
  // For Accent-600 anchor (medium-light base ~73%):
  // Going up (50-500): balanced steps (50 should be ~98-99%, not 100% but not too dark)
  // [50, 100, 200, 300, 400, 500] = [3, 5, 6, 5, 4, 3] - balanced steps
  // Going down (700-900): steps to create darker shades
  // [700, 800, 900] = [8, 5, 3]
  
  return [3, 5, 6, 5, 4, 3, 0, 8, 5, 3];
}

/**
 * Generate tonal scale from base 600
 */
function generateScaleFrom600(base600, config) {
  const { chromaReduction, hueShift } = config;
  
  // Parse base 600
  let base;
  if (base600.startsWith('oklch')) {
    base = parseOklch(base600);
  } else {
    const oklch = toOklch(base600);
    base = {
      l: oklch.l * 100,
      c: oklch.c || 0,
      h: oklch.h || 0
    };
  }
  
  if (!base) throw new Error(`Failed to parse base 600: ${base600}`);
  
  // Get asymmetric steps
  const lightnessSteps = getAsymmetricLightnessStepsFor600();
  
  const scale = {};
  const levels = [50, 100, 200, 300, 400, 500, 600, 700, 800, 900];
  
  // Calculate lightness for each level (starting from 600, going up and down)
  const lightnessValues = [];
  
  // Build up (50-500) - going lighter from 600
  let currentL = base.l; // Start at 600
  const upValues = [];
  
  // Build from 600 upward: 500, 400, 300, 200, 100, 50
  for (let i = 5; i >= 0; i--) {
    currentL += lightnessSteps[i];
    upValues.unshift(Math.min(100, currentL)); // unshift to prepend (50 first, then 100, etc.)
  }
  
  // upValues should now be: [50, 100, 200, 300, 400, 500] in correct order
  lightnessValues.push(...upValues);
  
  // Add 600 (base/anchor)
  lightnessValues.push(base.l);
  
  // Build down (700-900) - going darker from 600
  currentL = base.l;
  for (let i = 7; i < 10; i++) {
    currentL -= lightnessSteps[i];
    lightnessValues.push(Math.max(0, currentL));
  }
  
  // Generate each level with chroma and hue adjustments
  levels.forEach((level, idx) => {
    const l = lightnessValues[idx];
    // Distance from 600 (index 6)
    const distanceFrom600 = Math.abs(idx - 6) / 6; // 0 at 600, 1 at edges (50 or 900)
    
    // Chroma: parabolic reduction
    let c = base.c * (1 - Math.pow(distanceFrom600, 2) * chromaReduction);
    c = Math.max(0, c);
    
    // Hue: different strategy for light shades (50-100) vs medium-light (200-300) vs medium (400-500) vs dark (700-900)
    let h = base.h;
    if (hueShift > 0) {
      // For very light shades (50-100), shift towards more neutral/pastel hue
      if (idx <= 1) { // 50, 100
        // Shift hue towards more neutral/pastel (reduce hue towards 200-210°)
        // This makes light shades less "toxic" and more pleasant
        const pastelHueShift = -20; // Balanced shift (between -15 and -25)
        h = (base.h + pastelHueShift) % 360;
        if (h < 0) h += 360;
        
        // Additional chroma reduction for pastel effect
        c = c * 0.6; // Reduce chroma by 40% for balanced pastel appearance (between 30% and 50%)
      }
      // For Accent-200 and 300, shift towards light blue (away from green)
      else if (idx === 2 || idx === 3) { // 200, 300
        // Shift towards light blue: increase hue to move away from green towards blue
        // Accent-200: shift to 215° (more blue)
        // Accent-300: shift to 220° (even more blue)
        const blueShift = idx === 2 ? 15 : 20; // 200: +15°, 300: +20° from pastel base
        h = (base.h - 20 + blueShift) % 360; // Start from pastel base, then shift blue
        if (h < 0) h += 360;
        c = c * 0.6; // Keep pastel chroma reduction
      }
      // For medium shades (400-500), shift towards blue (away from green)
      else if (idx >= 4 && idx <= 5) { // 400, 500
        // Shift towards blue: increase hue to move away from green
        const blueShift = 10; // Shift from 220° to 230° (more blue, less green)
        h = (base.h + blueShift) % 360;
      }
      // For dark shades (700-900), shift more towards blue
      else if (idx >= 7) { // 700, 800, 900
        const extraBlueShift = 12;
        const shift = distanceFrom600 * hueShift + extraBlueShift;
        h = (base.h + shift) % 360;
      }
      // For 600 (anchor), keep original hue
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
 * Process accent color file
 */
function processAccentFile(filePath) {
  console.log(`\n📄 Processing: ${filePath}`);
  
  const content = readFileSync(filePath, 'utf-8');
  const data = JSON.parse(content);
  
  const colorFamily = Object.keys(data.eui?.color || {})[0];
  if (colorFamily !== 'accent') {
    console.log('  ⚠️  This script is only for accent color');
    return;
  }
  
  console.log(`  🎨 Color family: ${colorFamily}`);
  
  // Get base 600 (Viking Blue - anchor)
  const base600 = data.eui.color[colorFamily]['600'].$value;
  console.log(`  📌 Base 600 (anchor): ${base600}`);
  
  // Parse base to get lightness
  let base;
  if (base600.startsWith('oklch')) {
    base = parseOklch(base600);
  } else {
    const oklch = toOklch(base600);
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
  
  // Configuration for accent color
  const config = {
    chromaReduction: 0.7,
    hueShift: 1, // Accent uses 1, brand uses 2
  };
  
  // Generate scale from 600
  const scale = generateScaleFrom600(base600, config);
  
  // Update file
  Object.entries(scale).forEach(([level, oklch]) => {
    const oldValue = data.eui.color[colorFamily][level].$value;
    const newValue = formatOklch(oklch.l, oklch.c, oklch.h);
    
    data.eui.color[colorFamily][level].$value = newValue;
    
    if (level === '600') {
      data.eui.color[colorFamily][level].$description = `Viking Blue from Envy UI v1 - anchor for accent scale`;
    } else if (level === '700' || level === '800' || level === '900') {
      data.eui.color[colorFamily][level].$description = `Generated from base 600 using OKLCH tonal scale - dark shade`;
    } else {
      data.eui.color[colorFamily][level].$description = `Generated from base 600 using OKLCH tonal scale (asymmetric distribution)`;
    }
    
    console.log(`  ✓ ${level}: ${oldValue} → ${newValue}`);
  });
  
  writeFileSync(filePath, JSON.stringify(data, null, 2) + '\n', 'utf-8');
  console.log(`  ✅ Scale generated successfully from base 600`);
}

// Main
console.log('🎨 Generate Tonal Scale from Base Color (600) - Asymmetric Distribution');
console.log('='.repeat(80));
console.log('\n📋 Best Practices:');
console.log('  • Base 600 preserved as Viking Blue from Envy UI v1 (anchor)');
console.log('  • Asymmetric distribution: more light shades (50-500), darker shades (700-900)');
console.log('  • Primary usage range: Accent-50 → Accent-600');
console.log('  • Accent-700-900 as darker shades');
console.log('  • Parabolic chroma curve (decreases at edges)');
console.log('  • Slight hue shift for natural appearance');
console.log('\n💡 Asymmetric Logic:');
console.log('  • Steps up (50-500): [3, 5, 6, 5, 4, 3] - balanced steps (50 ~98-99%)');
console.log('  • Steps down (700-900): [8, 5, 3] - steps for darker shades');

const accentFile = join(repoRoot, 'tokens/foundations/colors/accent.json');
processAccentFile(accentFile);

console.log('\n' + '='.repeat(80));
console.log('✅ Done! Run "npm run tokens:build" to regenerate CSS.');

