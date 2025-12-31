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
 * Unified exponential distribution: more gradations closer to 50, smooth transition from 500 to 50
 */
function getAsymmetricLightnessStepsFor600() {
  // Steps format: [50, 100, 200, 300, 400, 500, 600, 700, 800, 900]
  // For status.info style (base ~68% lightness):
  // Exponential distribution: more gradations closer to 50, uniform fall from 500 to 50
  // 
  // Strategy: Smooth exponential curve from 500 (68%) to 50 (95%)
  // - 50-300: Close values (more gradations near 50)
  // - 300-500: Consistent steps (uniform fall)
  // - 400 and 500: Consistent (8% difference each)
  
  // If base is at 600 with lightness ~68%, we want:
  // Exponential distribution with more steps near 50:
  // 50: +28 (95% lightness - closest to 50)
  // 100: +25 (93% lightness - very close to 50, 2% difference)
  // 200: +21 (89% lightness - close to 100, 4% difference)
  // 300: +16 (84% lightness - smooth transition, 5% difference from 200)
  // 400: +8 (76% lightness - closer to 300, 8% difference - was 10%)
  // 500: 0 (68% lightness - closer to 400, 8% difference - was 6%)
  // 600: 0 (anchor)
  // 700: -5 (darker)
  // 800: -10 (dark)
  // 900: -15 (darkest)
  
  return {
    50: 28,   // 95% lightness - closest to 50
    100: 25,  // 93% lightness - very close to 50, 2% difference
    200: 21,  // 89% lightness - close to 100, 4% difference
    300: 16,  // 84% lightness - smooth transition, 5% difference from 200
    400: 8,   // 76% lightness - closer to 300, 8% difference (was 10%)
    500: 0,   // 68% lightness - closer to 400, 8% difference (was 6%)
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
    // Max distance is 28 (for 50) or 15 (for 900), so normalize by 28
    const distanceFrom600 = Math.abs(step) / 28;
    
    // Unified chroma progression from 500 to 50
    // Linear interpolation with additional reduction for very light shades
    let c;
    if (level <= 500) {
      // Normalized position from 500 (0) to 50 (1)
      const position = (500 - level) / 450; // 0 at 500, 1 at 50
      
      // Base chroma with parabolic reduction
      c = base.c * (1 - Math.pow(position, 2) * chromaReduction);
      c = Math.max(0, c);
      
      // Additional progressive reduction for very light shades (50-200)
      // Creates softer, more pleasant secondary highlight colors
      // Progressive reduction: 50 (60%), 100 (65%), 200 (75%)
      if (level === 50) {
        c = c * 0.6; // 40% reduction for 50
      } else if (level === 100) {
        c = c * 0.65; // 35% reduction for 100
      } else if (level === 200) {
        c = c * 0.75; // 25% reduction for 200 - closer to 300 in chroma
      }
      // 300, 400, 500 use base chroma (no additional reduction)
    } else {
      // For levels > 500 (600-900), use standard parabolic reduction
      c = base.c * (1 - Math.pow(distanceFrom600, 2) * chromaReduction);
      c = Math.max(0, c);
    }
    
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
  const statusFile = join(repoRoot, 'tokens/app/foundations/colors/status.json');
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

const accentFile = join(repoRoot, 'tokens/app/foundations/colors/accent.json');
processAccentFile(accentFile);

console.log('\n' + '='.repeat(80));
console.log('✅ Done! Run "npm run tokens:build" to regenerate CSS.');

