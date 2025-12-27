#!/usr/bin/env node

/**
 * Generate tonal scale from base color (500) using OKLCH best practices
 * 
 * Best practices for OKLCH tonal scales:
 * 1. Base color (500) is the reference tone
 * 2. Lightness: uniform steps (5-10% between levels)
 * 3. Chroma: decreases towards edges (50 and 900 have less saturation)
 * 4. Hue: can shift slightly for more natural appearance, but stays close to base
 */

import { converter, parse } from 'culori';
import { readFileSync, writeFileSync } from 'fs';
import { join, dirname } from 'path';
import { fileURLToPath } from 'url';

const __filename = fileURLToPath(import.meta.url);
const __dirname = dirname(__filename);
const repoRoot = join(__dirname, '..');

const toOklch = converter('oklch');
const fromOklch = converter('oklch');

/**
 * Generate tonal scale from base color (500)
 * @param {string} base500 - Base color in any format (HEX, OKLCH, etc.)
 * @param {Object} options - Generation options
 * @returns {Object} - Tonal scale with keys 50-900
 */
function generateTonalScale(base500, options = {}) {
  const {
    lightnessSteps = [50, 10, 10, 10, 10, 0, 10, 10, 10, 10], // Steps between levels
    chromaCurve = 'parabolic', // 'linear' or 'parabolic'
    hueShift = 0, // Degrees to shift hue at edges
    preserveBase = true // Keep exact base value for 500
  } = options;

  // Parse base color to OKLCH
  const baseOklch = toOklch(base500);
  if (!baseOklch || baseOklch.l === undefined) {
    throw new Error(`Failed to parse base color: ${base500}`);
  }

  const baseL = baseOklch.l * 100; // Convert to 0-100 range
  const baseC = baseOklch.c || 0;
  const baseH = baseOklch.h || 0;

  const scale = {};
  const levels = [50, 100, 200, 300, 400, 500, 600, 700, 800, 900];
  
  // Calculate cumulative lightness positions
  // Start from 500 and build up (to 50) and down (to 900)
  const lightnessPositions = [];
  
  // Go up from 500 to 50 (indices 5, 4, 3, 2, 1, 0)
  let currentL = baseL;
  for (let i = 4; i >= 0; i--) {
    currentL += lightnessSteps[i];
    lightnessPositions.unshift(Math.min(100, currentL)); // Cap at 100
  }
  
  // Add 500
  lightnessPositions.push(baseL);
  
  // Go down from 500 to 900 (indices 5, 6, 7, 8, 9)
  currentL = baseL;
  for (let i = 5; i < 10; i++) {
    currentL -= lightnessSteps[i];
    lightnessPositions.push(Math.max(0, currentL)); // Cap at 0
  }

  // Generate scale
  levels.forEach((level, index) => {
    const l = lightnessPositions[index];
    
    // Calculate chroma based on distance from 500
    let c;
    const distanceFrom500 = Math.abs(index - 5) / 5; // 0 at 500, 1 at edges
    
    if (chromaCurve === 'parabolic') {
      // Parabolic curve: chroma decreases more at edges
      // Formula: c = baseC * (1 - distance^2 * reductionFactor)
      const reductionFactor = 0.7; // How much chroma reduces at edges (0-1)
      c = baseC * (1 - Math.pow(distanceFrom500, 2) * reductionFactor);
    } else {
      // Linear: chroma decreases linearly
      const reductionFactor = 0.6;
      c = baseC * (1 - distanceFrom500 * reductionFactor);
    }
    
    // Ensure chroma doesn't go negative
    c = Math.max(0, c);
    
    // Calculate hue (slight shift at edges for natural appearance)
    let h = baseH;
    if (hueShift !== 0) {
      const shiftAmount = distanceFrom500 * hueShift;
      h = (baseH + shiftAmount) % 360;
      if (h < 0) h += 360;
    }
    
    // For 500, use exact base if preserveBase is true
    if (level === 500 && preserveBase) {
      scale[level] = {
        l: baseL,
        c: baseC,
        h: baseH,
        original: base500
      };
    } else {
      scale[level] = {
        l: Math.max(0, Math.min(100, l)),
        c: parseFloat(c.toFixed(2)),
        h: Math.round(h)
      };
    }
  });

  return scale;
}

/**
 * Format OKLCH object to string
 */
function formatOklch(oklch) {
  const l = Math.round(oklch.l);
  const c = oklch.c.toFixed(2);
  const h = oklch.h !== undefined ? Math.round(oklch.h) : 0;
  return `oklch(${l}% ${c} ${h})`;
}

/**
 * Process a color token file
 */
function processColorFile(filePath, baseColor500) {
  console.log(`\n📄 Processing: ${filePath}`);
  
  const content = readFileSync(filePath, 'utf-8');
  const data = JSON.parse(content);
  
  // Find the color family (brand, accent, neutral, etc.)
  const colorFamily = Object.keys(data.eui?.color || {})[0];
  if (!colorFamily) {
    console.log('  ⚠️  Could not find color family');
    return;
  }
  
  console.log(`  🎨 Color family: ${colorFamily}`);
  
  // Generate scale
  let scale;
  try {
    if (colorFamily === 'neutral') {
      // Neutral: achromatic, chroma = 0, no hue
      // Lightness steps from 500: [50←100←200←300←400←500→600→700→800→900]
      // Steps: 5% increments going up, 10% going down
      scale = generateTonalScale(baseColor500, {
        lightnessSteps: [3, 5, 10, 10, 10, 0, 10, 10, 5, 3],
        chromaCurve: 'linear',
        hueShift: 0
      });
      // Force chroma to 0 for neutral
      Object.values(scale).forEach(color => {
        color.c = 0;
        color.h = 0;
      });
    } else if (colorFamily === 'brand') {
      // Brand: use parabolic chroma curve
      // Base is at 50% lightness, so we need good distribution
      // Steps: [50←100←200←300←400←500→600→700→800→900]
      scale = generateTonalScale(baseColor500, {
        lightnessSteps: [5, 5, 10, 10, 10, 0, 10, 10, 5, 5],
        chromaCurve: 'parabolic',
        hueShift: 2 // Slight hue shift for natural look
      });
    } else {
      // Accent: lighter base (70%), compressed scale
      // Steps: [50←100←200←300←400←500→600→700→800→900]
      scale = generateTonalScale(baseColor500, {
        lightnessSteps: [3, 3, 5, 10, 10, 0, 10, 10, 5, 3],
        chromaCurve: 'parabolic',
        hueShift: 1 // Smaller shift for accent
      });
    }
    
    // Update the color object
    const colorObj = data.eui.color[colorFamily];
    Object.entries(scale).forEach(([level, oklch]) => {
      if (colorObj[level]) {
        const oldValue = colorObj[level].$value;
        colorObj[level].$value = formatOklch(oklch);
        if (level === '500') {
          colorObj[level].$description = `Base ${colorFamily} color - reference tone. ${oklch.original ? `Original: ${oklch.original}` : ''}`;
        } else {
          colorObj[level].$description = `Generated from base 500 using OKLCH tonal scale best practices`;
        }
        console.log(`  ✓ ${level}: ${oldValue} → ${formatOklch(oklch)}`);
      }
    });
    
    // Write back
    writeFileSync(filePath, JSON.stringify(data, null, 2) + '\n', 'utf-8');
    console.log(`  ✅ Scale generated successfully`);
    
  } catch (error) {
    console.error(`  ❌ Error: ${error.message}`);
  }
}

// Main execution
console.log('🎨 Generate Tonal Scale from Base Color (500)');
console.log('='.repeat(80));
console.log('\n📋 Best Practices Applied:');
console.log('  • Base color (500) is preserved as reference');
console.log('  • Lightness: uniform perceptual steps');
console.log('  • Chroma: parabolic curve (decreases at edges)');
console.log('  • Hue: slight shift at edges for natural appearance');
console.log('  • Neutral: achromatic (chroma = 0)');

// Read current base colors
const brandFile = join(repoRoot, 'tokens/foundations/colors/brand.json');
const accentFile = join(repoRoot, 'tokens/foundations/colors/accent.json');
const neutralFile = join(repoRoot, 'tokens/foundations/colors/neutral.json');

// Extract base 500 colors (use current OKLCH values, not HEX)
const brandData = JSON.parse(readFileSync(brandFile, 'utf-8'));
const accentData = JSON.parse(readFileSync(accentFile, 'utf-8'));
const neutralData = JSON.parse(readFileSync(neutralFile, 'utf-8'));

// Get current 500 values - if they're OKLCH, use them; if HEX, convert
function getBase500(value) {
  if (value.startsWith('oklch')) {
    return value; // Already OKLCH
  } else if (value.startsWith('#')) {
    // Convert HEX to OKLCH
    const oklch = toOklch(value);
    if (!oklch) return value;
    return formatOklch({
      l: oklch.l * 100,
      c: oklch.c || 0,
      h: oklch.h || 0
    });
  }
  return value;
}

const brand500 = getBase500(brandData.eui.color.brand['500'].$value);
const accent500 = getBase500(accentData.eui.color.accent['500'].$value);
const neutral500 = getBase500(neutralData.eui.color.neutral['500'].$value);

console.log('\n📌 Base Colors (500):');
console.log(`  Brand:  ${brand500}`);
console.log(`  Accent: ${accent500}`);
console.log(`  Neutral: ${neutral500}`);

// Process each file
processColorFile(brandFile, brand500);
processColorFile(accentFile, accent500);
processColorFile(neutralFile, neutral500);

console.log('\n' + '='.repeat(80));
console.log('✅ Tonal scales generated!');
console.log('💡 Run "npm run tokens:build" to regenerate CSS tokens.');

