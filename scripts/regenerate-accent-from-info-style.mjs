#!/usr/bin/env node

/**
 * Regenerate Accent Color scale using status.info algorithm
 * 
 * Approach:
 * 1. Take status.info.500 color as base (oklch(68% 0.15 237))
 * 2. Use same algorithm as status colors (chromaReduction: 0.5, hueShift: 1)
 * 3. Generate full scale 50-900
 * 4. Use 600 as anchor (to match current accent structure)
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
 * Get asymmetric lightness steps for 600 anchor (extended to 50-900)
 * Based on status.info algorithm but with more gradations in light side (500-100)
 */
function getAsymmetricLightnessStepsFor600() {
  // Steps format: [50, 100, 200, 300, 400, 500, 600, 700, 800, 900]
  // For status.info style (base ~68% lightness):
  // Going up (50-500): MORE gradations, more steps for light backgrounds
  // Going down (700-900): smaller steps for dark shades
  
  // If base is at 600 with lightness ~68%, we want:
  // More gradations between 500 and 100:
  // 50: +30 (very light, lighter than before)
  // 100: +22 (light, lighter than before - was 18, now 22)
  // 200: +15 (medium-light, more gap from 100)
  // 300: +10 (medium, more gap from 200)
  // 400: +5 (medium-dark, more gap from 300)
  // 500: -1 (slightly darker, closer to 600)
  // 600: 0 (anchor)
  // 700: -5 (darker)
  // 800: -10 (dark)
  // 900: -15 (darkest)
  
  return {
    50: 30,   // Lighter (was 28)
    100: 22,  // Lighter (was 18) - more gap from 200
    200: 15,  // More gap from 100 (was 13)
    300: 10,  // More gap from 200 (was 8)
    400: 5,   // More gap from 300 (was 3)
    500: -1,  // Closer to 600 (was -2)
    600: 0,   // Anchor
    700: -5,
    800: -10,
    900: -15
  };
}

/**
 * Generate tonal scale from base 600 using status.info algorithm
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
  
  // Generate each level
  levels.forEach((level) => {
    const step = lightnessSteps[level];
    const l = Math.max(0, Math.min(100, base.l + step));
    
    // Distance from 600 (anchor) - normalize to 0-1 range
    // Max distance is 30 (for 50) or 15 (for 900), so normalize by 30
    const distanceFrom600 = Math.abs(step) / 30;
    
    // Chroma: parabolic reduction at edges (same as status.info)
    let c = base.c * (1 - Math.pow(distanceFrom600, 2) * chromaReduction);
    c = Math.max(0, c);
    
    // Hue: minimal shift to maintain color identity (same as status.info)
    let h = base.h;
    if (hueShift > 0 && step !== 0) {
      const shift = (step > 0 ? -1 : 1) * distanceFrom600 * hueShift;
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
 * Process accent color file
 */
function processAccentFile(filePath) {
  console.log(`\n📄 Processing: ${filePath}`);
  
  const content = readFileSync(filePath, 'utf-8');
  const data = JSON.parse(content);
  
  // Get status.info.500 as base color
  const statusFile = join(repoRoot, 'tokens/foundations/colors/status.json');
  const statusContent = readFileSync(statusFile, 'utf-8');
  const statusData = JSON.parse(statusContent);
  const statusInfo500 = statusData.eui.color.status.info['500'].$value;
  
  console.log(`  🎨 Using status.info.500 as base: ${statusInfo500}`);
  
  // Parse to show info
  const base = parseOklch(statusInfo500);
  if (base) {
    console.log(`  💡 Base lightness: ${base.l.toFixed(1)}%`);
    console.log(`  💡 Base chroma: ${base.c.toFixed(2)}`);
    console.log(`  💡 Base hue: ${base.h.toFixed(0)}°`);
  }
  
  // Configuration matching status.info algorithm
  const config = {
    chromaReduction: 0.5,  // Same as status colors
    hueShift: 1,           // Same as status colors
  };
  
  // Generate scale from status.info.500 (will be placed at 600 as anchor)
  const scale = generateScaleFrom600(statusInfo500, config);
  
  // Update accent.json
  const levels = [50, 100, 200, 300, 400, 500, 600, 700, 800, 900];
  levels.forEach((level) => {
    const oklch = scale[level];
    const newValue = formatOklch(oklch.l, oklch.c, oklch.h);
    
    const oldValue = data.eui.color.accent[level].$value;
    data.eui.color.accent[level].$value = newValue;
    
    if (level === 600) {
      data.eui.color.accent[level].$description = `Base accent color - canonical accent color (anchor) - derived from status.info.500 using status.info algorithm`;
    } else if (level <= 500) {
      data.eui.color.accent[level].$description = `Generated from base 600 using status.info algorithm (asymmetric distribution, light shades for backgrounds)`;
    } else {
      data.eui.color.accent[level].$description = `Generated from base 600 using status.info algorithm (asymmetric distribution, dark shades for text/icons)`;
    }
    
    console.log(`  ✓ ${level}: ${oldValue} → ${newValue}`);
  });
  
  writeFileSync(filePath, JSON.stringify(data, null, 2) + '\n', 'utf-8');
  console.log(`\n  ✅ Accent color scale regenerated using status.info algorithm`);
}

// Main
console.log('🎨 Regenerate Accent Color Scale from status.info.500');
console.log('='.repeat(80));
console.log('\n📋 Approach:');
console.log('  • Base: status.info.500 (oklch(68% 0.15 237))');
console.log('  • Algorithm: Same as status colors (chromaReduction: 0.5, hueShift: 1)');
console.log('  • Scale: Full 50-900 range');
console.log('  • Anchor: 600 (to match current accent structure)');
console.log('\n💡 Algorithm Details:');
console.log('  • Parabolic chroma reduction at edges (0.5 factor)');
console.log('  • Minimal hue shift (1°) to maintain color identity');
console.log('  • Asymmetric lightness distribution');

const accentFile = join(repoRoot, 'tokens/foundations/colors/accent.json');
processAccentFile(accentFile);

console.log('\n' + '='.repeat(80));
console.log('✅ Done! Run "npm run tokens:build" to regenerate CSS.');

