#!/usr/bin/env node

/**
 * Remove duplicate SVG icons with numbered suffixes
 * 
 * If icon-name-1.svg exists and icon-name.svg exists, remove icon-name-1.svg
 * 
 * Usage:
 *   node scripts/remove-duplicate-icons.mjs [directory]
 */

import fs from 'fs';
import path from 'path';
import { fileURLToPath } from 'url';

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);
const REPO_ROOT = path.resolve(__dirname, '..');

// Target directory
const targetDir = process.argv[2] 
  ? path.resolve(process.argv[2])
  : path.join(REPO_ROOT, 'personal', 'extracted');

if (!fs.existsSync(targetDir)) {
  console.error(`❌ Directory not found: ${targetDir}`);
  process.exit(1);
}

console.log(`📁 Scanning directory: ${targetDir}\n`);

// Get all SVG files
const files = fs.readdirSync(targetDir).filter(file => file.endsWith('.svg'));

if (files.length === 0) {
  console.log('No SVG files found.');
  process.exit(0);
}

console.log(`Found ${files.length} SVG file(s)\n`);

// Pattern to match numbered suffixes: name-N.svg where N is a number
const numberedPattern = /^(.+)-(\d+)\.svg$/;

// Group files by base name
const baseNames = new Set();
const numberedFiles = [];

for (const file of files) {
  const match = file.match(numberedPattern);
  if (match) {
    const [, baseName] = match;
    numberedFiles.push({
      file,
      baseName: `${baseName}.svg`
    });
  } else {
    baseNames.add(file);
  }
}

console.log(`Base files (without numbers): ${baseNames.size}`);
console.log(`Numbered files (potential duplicates): ${numberedFiles.length}\n`);

// Find duplicates to remove
const toRemove = numberedFiles.filter(({ baseName }) => baseNames.has(baseName));

if (toRemove.length === 0) {
  console.log('✅ No duplicates found. All numbered files have unique base names.');
  process.exit(0);
}

console.log(`🗑️  Found ${toRemove.length} duplicate file(s) to remove:\n`);

// Show what will be removed
for (const { file, baseName } of toRemove) {
  console.log(`  - ${file} (duplicate of ${baseName})`);
}

console.log(`\n⚠️  This will delete ${toRemove.length} file(s).`);
console.log('Proceeding with deletion...\n');

// Remove duplicates
let removedCount = 0;
for (const { file } of toRemove) {
  const filePath = path.join(targetDir, file);
  try {
    fs.unlinkSync(filePath);
    console.log(`  ✓ Removed: ${file}`);
    removedCount++;
  } catch (error) {
    console.error(`  ❌ Failed to remove ${file}: ${error.message}`);
  }
}

console.log(`\n✅ Successfully removed ${removedCount} duplicate file(s)`);
console.log(`📊 Remaining files: ${files.length - removedCount}`);


