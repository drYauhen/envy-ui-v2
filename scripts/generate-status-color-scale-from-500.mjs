#!/usr/bin/env node

/**
 * Generate tonal scale for UI status colors from anchor 500
 * 
 * Approach for Status colors (500 anchor):
 * 1. Take current status color as anchor 500 (preserve it exactly)
 * 2. Asymmetric distribution: more light shades (50, 100), fewer dark (600, 700)
 * 3. Primary usage: 50-100 for backgrounds, 500 for base, 600-700 for text/icons
 * 4. Use parabolic chroma curve (decreases at edges)
 * 5. Minimal hue shift to maintain color identity
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
 * Get asymmetric lightness steps for 500 anchor
 * More steps going up (50, 100) for light backgrounds, minimal steps down (600, 700) for text/icons
 */
function getAsymmetricLightnessStepsFor500() {
  // Steps format: [50, 100, 500, 600, 700]
  // For Status-500 anchor (medium lightness ~65-75%):
  // Going up (50, 100): larger steps for light backgrounds
  // [50, 100] = [20, 10] (from 500)
  // Going down (600, 700): smaller steps for text/icons
  // [600, 700] = [-5, -8] (from 500)
  
  return {
    50: 20,   // Very light for subtle backgrounds
    100: 10,  // Light for backgrounds
    500: 0,   // Anchor (base)
    600: -5,  // Darker for borders/icons
    700: -8   // Darkest for text/active states
  };
}

/**
 * Generate tonal scale from base 500
 */
function generateScaleFrom500(base500, config) {
  const { chromaReduction, hueShift } = config;
  
  // Parse base 500
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
  
  if (!base) throw new Error(`Failed to parse base 500: ${base500}`);
  
  // Get asymmetric steps
  const lightnessSteps = getAsymmetricLightnessStepsFor500();
  
  const scale = {};
  const levels = [50, 100, 500, 600, 700];
  
  // Generate each level
  levels.forEach((level) => {
    const step = lightnessSteps[level];
    const l = Math.max(0, Math.min(100, base.l + step));
    
    // Distance from 500 (anchor)
    const distanceFrom500 = Math.abs(step) / 20; // Normalize to 0-1 range
    
    // Chroma: parabolic reduction at edges
    let c = base.c * (1 - Math.pow(distanceFrom500, 2) * chromaReduction);
    c = Math.max(0, c);
    
    // Hue: minimal shift to maintain color identity
    let h = base.h;
    if (hueShift > 0 && step !== 0) {
      const shift = (step > 0 ? -1 : 1) * distanceFrom500 * hueShift;
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
 * Process status color file
 */
function processStatusFile(filePath) {
  console.log(`\n📄 Processing: ${filePath}`);
  
  const content = readFileSync(filePath, 'utf-8');
  const data = JSON.parse(content);
  
  const statusColors = data.eui?.color?.status || {};
  const statusNames = Object.keys(statusColors);
  
  if (statusNames.length === 0) {
    console.log('  ⚠️  No status colors found');
    return;
  }
  
  console.log(`  🎨 Found ${statusNames.length} status colors: ${statusNames.join(', ')}`);
  
  // Configuration for status colors (less aggressive than brand)
  const config = {
    chromaReduction: 0.5,  // Less reduction to maintain vibrancy
    hueShift: 1,           // Minimal shift to maintain color identity
  };
  
  // Process each status color
  statusNames.forEach((statusName) => {
    console.log(`\n  📌 Processing: ${statusName}`);
    
    // Get current value (will become 500)
    const currentValue = statusColors[statusName].$value;
    console.log(`    Current value: ${currentValue}`);
    
    // Convert to OKLCH if needed
    let base500;
    if (currentValue.startsWith('oklch')) {
      base500 = currentValue;
    } else {
      // Convert HEX to OKLCH
      const oklch = toOklch(currentValue);
      if (!oklch || oklch.l === undefined) {
        console.log(`    ❌ Failed to convert ${currentValue} to OKLCH`);
        return;
      }
      const l = Math.round(oklch.l * 100);
      const c = oklch.c || 0;
      const h = oklch.h !== undefined ? Math.round(oklch.h) : 0;
      base500 = formatOklch(l, c, h);
      console.log(`    Converted to OKLCH: ${base500}`);
    }
    
    // Parse base to show info
    const base = parseOklch(base500);
    if (base) {
      console.log(`    Lightness: ${base.l.toFixed(1)}%`);
      console.log(`    Chroma: ${base.c.toFixed(2)}`);
      console.log(`    Hue: ${base.h.toFixed(0)}°`);
    }
    
    // Generate scale from 500
    const scale = generateScaleFrom500(base500, config);
    
    // Update structure: convert flat to nested
    // Old: status.success = { $value: "#22c55e" }
    // New: status.success.50 = { $value: "oklch(...)" }, etc.
    
    // Create nested structure
    data.eui.color.status[statusName] = {};
    
    const levels = [50, 100, 500, 600, 700];
    levels.forEach((level) => {
      const oklch = scale[level];
      const newValue = formatOklch(oklch.l, oklch.c, oklch.h);
      
      data.eui.color.status[statusName][level] = {
        $value: newValue,
        $type: 'color'
      };
      
      if (level === 500) {
        data.eui.color.status[statusName][level].$description = `UI status: ${statusName} (anchor). Used for general ${statusName} feedback (alerts, notifications, form validation). Separate from application-specific status colors.`;
      } else if (level === 50 || level === 100) {
        data.eui.color.status[statusName][level].$description = `UI status: ${statusName} (light). Used for backgrounds and subtle surfaces. Generated from anchor 500 using OKLCH tonal scale.`;
      } else {
        data.eui.color.status[statusName][level].$description = `UI status: ${statusName} (dark). Used for text, icons, and borders. Generated from anchor 500 using OKLCH tonal scale.`;
      }
      
      console.log(`    ✓ ${level}: ${newValue}`);
    });
  });
  
  writeFileSync(filePath, JSON.stringify(data, null, 2) + '\n', 'utf-8');
  console.log(`\n  ✅ Status color scales generated successfully`);
}

// Main
console.log('🎨 Generate Status Color Scale from Anchor 500');
console.log('='.repeat(80));
console.log('\n📋 Best Practices:');
console.log('  • Base 500 preserved as anchor (current status color)');
console.log('  • Asymmetric distribution: more light shades (50, 100), fewer dark (600, 700)');
console.log('  • Primary usage: 50-100 for backgrounds, 500 for base, 600-700 for text/icons');
console.log('  • Parabolic chroma curve (decreases at edges)');
console.log('  • Minimal hue shift to maintain color identity');
console.log('\n💡 Scale Structure:');
console.log('  • 50: Very light (subtle backgrounds)');
console.log('  • 100: Light (backgrounds)');
console.log('  • 500: Anchor (base color)');
console.log('  • 600: Darker (borders, icons)');
console.log('  • 700: Darkest (text, active states)');

const statusFile = join(repoRoot, 'tokens/foundations/colors/status.json');
processStatusFile(statusFile);

console.log('\n' + '='.repeat(80));
console.log('✅ Done! Run "npm run tokens:build" to regenerate CSS.');

