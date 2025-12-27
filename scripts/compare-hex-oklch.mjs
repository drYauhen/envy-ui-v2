#!/usr/bin/env node

/**
 * Compare original HEX values with current OKLCH values
 * Shows what the precise conversion would be vs what was used
 */

import { converter } from 'culori';

const toOklch = converter('oklch');

function hexToOklch(hex) {
  const oklch = toOklch(hex);
  if (!oklch || oklch.l === undefined) return null;
  
  const l = Math.round(oklch.l * 100);
  const c = oklch.c || 0;
  const h = oklch.h !== undefined ? Math.round(oklch.h) : 0;
  
  return `oklch(${l}% ${c.toFixed(2)} ${h})`;
}

// Original HEX values (before conversion)
const originalHex = {
  brand: {
    "50": "#e6f6fb",
    "100": "#c9edf7",
    "200": "#9ad8ee",
    "300": "#63c0e2",
    "400": "#2ea7d1",
    "500": "#007fa2",
    "600": "#007ca0", // Problem: too close to 500
    "700": "#066a8d",
    "800": "#055973",
    "900": "#043c55"
  },
  accent: {
    "500": "#3db0ff",
    "600": "#35a8f8",
    "700": "#2d98e8"
  },
  neutral: {
    "50": "#f8fafc",
    "100": "#f1f2f7",
    "200": "#e5e7eb",
    "300": "#cccccc",
    "400": "#a3a3a3",
    "500": "#757575",
    "600": "#525252",
    "700": "#404040",
    "800": "#262626",
    "900": "#1b1b1b"
  }
};

// Current OKLCH values (what I used - approximate)
const currentOklch = {
  brand: {
    "500": "oklch(50% 0.20 220)",
    "600": "oklch(40% 0.18 220)", // Fixed manually
    "700": "oklch(35% 0.15 220)"
  }
};

console.log('🔍 Comparison: Original HEX → Precise OKLCH vs Approximate OKLCH\n');
console.log('='.repeat(80));

Object.entries(originalHex.brand).forEach(([key, hex]) => {
  const precise = hexToOklch(hex);
  const current = currentOklch.brand[key];
  
  console.log(`\nBrand ${key}:`);
  console.log(`  Original HEX:  ${hex}`);
  console.log(`  Precise OKLCH: ${precise || 'N/A'}`);
  if (current) {
    console.log(`  Used OKLCH:    ${current}`);
    if (precise && precise !== current) {
      console.log(`  ⚠️  Difference: Approximate value was used`);
    }
  }
});

console.log('\n' + '='.repeat(80));
console.log('\n📝 Summary:');
console.log('  • I used APPROXIMATE OKLCH values based on visual analysis');
console.log('  • Precise conversion would use culori library (now available)');
console.log('  • Brand 600 was manually fixed to be visually distinct from 500');
console.log('  • For production, use precise conversion script');

