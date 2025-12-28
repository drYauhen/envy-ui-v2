#!/usr/bin/env node

/**
 * Script to convert HEX colors to OKLCH and fix tonal scale transitions
 * Uses approximate OKLCH values based on perceptual uniformity
 */

// Approximate OKLCH conversions for brand colors (hue ~220, teal-blue)
const brandColors = {
  "50": "oklch(95% 0.05 220)",
  "100": "oklch(90% 0.08 220)",
  "200": "oklch(80% 0.12 220)",
  "300": "oklch(70% 0.15 220)",
  "400": "oklch(60% 0.18 220)",
  "500": "oklch(50% 0.20 220)", // Base: #007fa2
  "600": "oklch(40% 0.18 220)", // FIXED: was too close to 500
  "700": "oklch(35% 0.15 220)", // #066a8d - used for buttons
  "800": "oklch(25% 0.12 220)",
  "900": "oklch(18% 0.10 220)"
};

// Approximate OKLCH conversions for accent colors (hue ~250, cyan-blue)
const accentColors = {
  "50": "oklch(97% 0.05 250)",
  "100": "oklch(92% 0.08 250)",
  "200": "oklch(85% 0.12 250)",
  "300": "oklch(75% 0.15 250)",
  "400": "oklch(65% 0.18 250)",
  "500": "oklch(70% 0.20 250)", // Base: #3db0ff
  "600": "oklch(60% 0.18 250)", // IMPROVED: better distinction from 500
  "700": "oklch(55% 0.15 250)", // #2d98e8 - used for buttons
  "800": "oklch(45% 0.12 250)",
  "900": "oklch(38% 0.10 250)"
};

// Neutral colors (achromatic, chroma = 0)
const neutralColors = {
  "50": "oklch(98% 0 0)",
  "100": "oklch(95% 0 0)",
  "200": "oklch(90% 0 0)",
  "300": "oklch(80% 0 0)",
  "400": "oklch(65% 0 0)",
  "500": "oklch(50% 0 0)",
  "600": "oklch(40% 0 0)",
  "700": "oklch(30% 0 0)",
  "800": "oklch(20% 0 0)",
  "900": "oklch(15% 0 0)",
  "white": "oklch(100% 0 0)"
};

console.log("Brand colors (OKLCH):");
Object.entries(brandColors).forEach(([key, value]) => {
  console.log(`  ${key}: ${value}`);
});

console.log("\nAccent colors (OKLCH):");
Object.entries(accentColors).forEach(([key, value]) => {
  console.log(`  ${key}: ${value}`);
});

console.log("\nNeutral colors (OKLCH):");
Object.entries(neutralColors).forEach(([key, value]) => {
  console.log(`  ${key}: ${value}`);
});

console.log("\n✓ OKLCH color values prepared");
console.log("Note: These are approximate values. For production, use precise conversion tools.");


