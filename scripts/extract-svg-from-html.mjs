#!/usr/bin/env node

/**
 * Extract inline SVG elements from HTML and save them as individual files
 * 
 * Usage:
 *   1. Save HTML with embedded SVG to a file (e.g., icons.html)
 *   2. Run: node scripts/extract-svg-from-html.mjs icons.html
 *   3. SVG files will be saved to assets/icons/extracted/
 * 
 * The script will try to extract icon names from:
 * - data-icon attribute
 * - class name (e.g., "fa-check" -> "check")
 * - aria-label
 * - data-fa-i2svg (FontAwesome specific)
 */

import fs from 'fs';
import path from 'path';
import { fileURLToPath } from 'url';

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);
const REPO_ROOT = path.resolve(__dirname, '..');

// Output directory for extracted SVG files
const OUTPUT_DIR = path.join(REPO_ROOT, 'assets', 'icons', 'extracted');

// Ensure output directory exists
if (!fs.existsSync(OUTPUT_DIR)) {
  fs.mkdirSync(OUTPUT_DIR, { recursive: true });
}

/**
 * Extract icon name from various sources (data attributes, classes, etc.)
 */
function extractIconName(element, index) {
  // Try data-icon attribute
  if (element.dataset?.icon) {
    return element.dataset.icon;
  }

  // Try FontAwesome data-fa-i2svg
  if (element.dataset?.faI2svg) {
    // FontAwesome usually has class like "fa-check" or "fas fa-check"
    const classNames = element.className?.baseVal || element.className || '';
    const faMatch = classNames.match(/\bfa[sr]?\s+fa-([a-z0-9-]+)/i);
    if (faMatch) {
      return faMatch[1];
    }
  }

  // Try class names (look for fa-*, icon-*, etc.)
  const classNames = element.className?.baseVal || element.className || '';
  const classMatch = classNames.match(/(?:fa|icon)-([a-z0-9-]+)/i);
  if (classMatch) {
    return classMatch[1];
  }

  // Try aria-label
  const ariaLabel = element.getAttribute('aria-label');
  if (ariaLabel) {
    return ariaLabel
      .toLowerCase()
      .replace(/[^a-z0-9]+/g, '-')
      .replace(/^-|-$/g, '');
  }

  // Try id
  const id = element.getAttribute('id');
  if (id) {
    return id.replace(/[^a-z0-9-]/gi, '-').toLowerCase();
  }

  // Fallback to index-based name
  return `icon-${index}`;
}

/**
 * Clean SVG: remove FontAwesome-specific attributes, normalize
 */
function cleanSvg(svgString) {
  // Parse and clean SVG
  let cleaned = svgString;

  // Remove FontAwesome-specific attributes
  cleaned = cleaned.replace(/\s+data-fa-[a-z-]+="[^"]*"/gi, '');
  cleaned = cleaned.replace(/\s+data-icon="[^"]*"/gi, '');
  
  // Ensure viewBox is present (FontAwesome usually has it)
  if (!cleaned.includes('viewBox=')) {
    // Try to extract width/height and create viewBox
    const widthMatch = cleaned.match(/\bwidth="([^"]+)"/i);
    const heightMatch = cleaned.match(/\bheight="([^"]+)"/i);
    if (widthMatch && heightMatch) {
      const width = widthMatch[1].replace(/[^\d.]/g, '');
      const height = heightMatch[1].replace(/[^\d.]/g, '');
      cleaned = cleaned.replace(/<svg/i, `<svg viewBox="0 0 ${width} ${height}"`);
    } else {
      // Default viewBox for FontAwesome
      cleaned = cleaned.replace(/<svg/i, '<svg viewBox="0 0 512 512"');
    }
  }

  // Normalize to standard template
  // Ensure fill="none" and stroke="currentColor" for outline icons
  // (FontAwesome usually uses fill for solid icons)
  
  // Remove width/height if present (we'll use viewBox)
  cleaned = cleaned.replace(/\s+(width|height)="[^"]*"/gi, '');
  
  // Add xmlns if missing
  if (!cleaned.includes('xmlns=')) {
    cleaned = cleaned.replace(/<svg/i, '<svg xmlns="http://www.w3.org/2000/svg"');
  }

  // Clean up extra whitespace
  cleaned = cleaned.replace(/\s+/g, ' ').trim();

  return cleaned;
}

/**
 * Parse HTML and extract SVG elements
 */
function extractSvgsFromHtml(htmlContent) {
  // Use regex to find all <svg>...</svg> blocks (works well for simple cases)
  // More complex HTML might need a proper HTML parser, but this should work for most cases
  
  const svgRegex = /<svg[^>]*>[\s\S]*?<\/svg>/gi;
  const matches = htmlContent.matchAll(svgRegex);
  
  const svgs = [];
  let index = 0;
  
  for (const match of matches) {
    const svgString = match[0];
    
    // Create a temporary DOM element to parse attributes
    // For Node.js, we'll use a simpler approach with regex
    const nameMatch = svgString.match(/data-icon="([^"]+)"/i) ||
                     svgString.match(/class="[^"]*fa[sr]?\s+fa-([a-z0-9-]+)/i) ||
                     svgString.match(/aria-label="([^"]+)"/i);
    
    const iconName = nameMatch 
      ? nameMatch[1].toLowerCase().replace(/[^a-z0-9-]/g, '-')
      : `icon-${index}`;
    
    svgs.push({
      name: iconName,
      content: svgString,
      index: index++
    });
  }
  
  return svgs;
}

/**
 * Main function
 */
function main() {
  const htmlFilePath = process.argv[2];
  
  if (!htmlFilePath) {
    console.error('Usage: node scripts/extract-svg-from-html.mjs <html-file>');
    console.error('Example: node scripts/extract-svg-from-html.mjs icons.html');
    process.exit(1);
  }
  
  const fullPath = path.isAbsolute(htmlFilePath) 
    ? htmlFilePath 
    : path.join(process.cwd(), htmlFilePath);
  
  if (!fs.existsSync(fullPath)) {
    console.error(`File not found: ${fullPath}`);
    process.exit(1);
  }
  
  console.log(`Reading HTML from: ${fullPath}`);
  const htmlContent = fs.readFileSync(fullPath, 'utf-8');
  
  console.log('Extracting SVG elements...');
  const svgs = extractSvgsFromHtml(htmlContent);
  
  if (svgs.length === 0) {
    console.warn('No SVG elements found in HTML. Make sure SVG tags are present.');
    process.exit(1);
  }
  
  console.log(`Found ${svgs.length} SVG element(s)`);
  
  // Save each SVG to a file
  let savedCount = 0;
  const savedNames = new Set();
  
  for (const svg of svgs) {
    // Ensure unique filename
    let filename = svg.name;
    let counter = 1;
    while (savedNames.has(filename)) {
      filename = `${svg.name}-${counter++}`;
    }
    savedNames.add(filename);
    
    // Clean the SVG
    const cleanedSvg = cleanSvg(svg.content);
    
    // Save to file
    const filePath = path.join(OUTPUT_DIR, `${filename}.svg`);
    fs.writeFileSync(filePath, cleanedSvg, 'utf-8');
    
    console.log(`  ✓ Saved: ${filename}.svg`);
    savedCount++;
  }
  
  console.log(`\n✅ Successfully extracted ${savedCount} SVG file(s) to: ${OUTPUT_DIR}`);
  console.log(`\nNext steps:`);
  console.log(`  1. Review extracted SVG files`);
  console.log(`  2. Normalize them using scripts/normalize-icons.mjs (if you create it)`);
  console.log(`  3. Move to assets/icons/source/ for icon generation`);
}

main();


