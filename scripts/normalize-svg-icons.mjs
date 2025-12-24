#!/usr/bin/env node

/**
 * Normalize SVG icons: scale coordinates to fit 24x24 viewBox while preserving aspect ratio
 * 
 * Usage:
 *   node scripts/normalize-svg-icons.mjs [icon-name]
 * 
 * If icon-name is provided, normalizes only that icon.
 * Otherwise, normalizes all icons in personal/svg/icon-source/
 */

import fs from 'fs';
import path from 'path';
import { fileURLToPath } from 'url';
import svgPathParser from 'svg-path-parser';
const { parseSVG, makeAbsolute } = svgPathParser;

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);
const REPO_ROOT = path.resolve(__dirname, '..');

const SOURCE_DIR = path.join(REPO_ROOT, 'personal', 'svg', 'icon-source');
const OUTPUT_DIR = path.join(REPO_ROOT, 'assets', 'icons', 'svg-icons-normalized');
const TARGET_SIZE = 24;

// Ensure output directory exists
if (!fs.existsSync(OUTPUT_DIR)) {
  fs.mkdirSync(OUTPUT_DIR, { recursive: true });
}

/**
 * Scale path data coordinates
 */
/**
 * Convert command object back to path string
 */
function commandToString(cmd, isRelative = false) {
  const code = isRelative ? cmd.code.toLowerCase() : cmd.code.toUpperCase();
  
  switch (cmd.code.toUpperCase()) {
    case 'M':
      return `${code} ${formatNumber(cmd.x)} ${formatNumber(cmd.y)}`;
    case 'L':
      return `${code} ${formatNumber(cmd.x)} ${formatNumber(cmd.y)}`;
    case 'H':
      return `${code} ${formatNumber(cmd.x)}`;
    case 'V':
      return `${code} ${formatNumber(cmd.y)}`;
    case 'C':
      return `${code} ${formatNumber(cmd.x1)} ${formatNumber(cmd.y1)} ${formatNumber(cmd.x2)} ${formatNumber(cmd.y2)} ${formatNumber(cmd.x)} ${formatNumber(cmd.y)}`;
    case 'S':
      return `${code} ${formatNumber(cmd.x2)} ${formatNumber(cmd.y2)} ${formatNumber(cmd.x)} ${formatNumber(cmd.y)}`;
    case 'Q':
      return `${code} ${formatNumber(cmd.x1)} ${formatNumber(cmd.y1)} ${formatNumber(cmd.x)} ${formatNumber(cmd.y)}`;
    case 'T':
      return `${code} ${formatNumber(cmd.x)} ${formatNumber(cmd.y)}`;
    case 'A':
      return `${code} ${formatNumber(cmd.rx)} ${formatNumber(cmd.ry)} ${cmd.xAxisRotation || 0} ${cmd.largeArcFlag || 0} ${cmd.sweepFlag || 0} ${formatNumber(cmd.x)} ${formatNumber(cmd.y)}`;
    case 'Z':
      return 'Z';
    default:
      return '';
  }
}

/**
 * Format number to remove unnecessary precision
 */
function formatNumber(num) {
  if (typeof num !== 'number' || isNaN(num)) return num;
  // Round to 6 decimal places to avoid floating point errors
  return Math.round(num * 1000000) / 1000000;
}

function scalePathData(d, scale, offsetX, offsetY) {
  if (!d || d.trim() === '') return d;
  
  try {
    // Parse and convert relative commands to absolute
    const commands = makeAbsolute(parseSVG(d));
    
    // Scale all coordinates
    const scaledCommands = commands.map(cmd => {
      const code = cmd.code.toUpperCase();
      
      switch (code) {
        case 'M': // MoveTo
        case 'L': // LineTo
          return {
            ...cmd,
            x: (cmd.x * scale) + offsetX,
            y: (cmd.y * scale) + offsetY
          };
        
        case 'H': // Horizontal line
          return {
            ...cmd,
            x: (cmd.x * scale) + offsetX
          };
        
        case 'V': // Vertical line
          return {
            ...cmd,
            y: (cmd.y * scale) + offsetY
          };
        
        case 'C': // Cubic Bezier
          return {
            ...cmd,
            x1: (cmd.x1 * scale) + offsetX,
            y1: (cmd.y1 * scale) + offsetY,
            x2: (cmd.x2 * scale) + offsetX,
            y2: (cmd.y2 * scale) + offsetY,
            x: (cmd.x * scale) + offsetX,
            y: (cmd.y * scale) + offsetY
          };
        
        case 'S': // Smooth cubic Bezier
          return {
            ...cmd,
            x2: (cmd.x2 * scale) + offsetX,
            y2: (cmd.y2 * scale) + offsetY,
            x: (cmd.x * scale) + offsetX,
            y: (cmd.y * scale) + offsetY
          };
        
        case 'Q': // Quadratic Bezier
          return {
            ...cmd,
            x1: (cmd.x1 * scale) + offsetX,
            y1: (cmd.y1 * scale) + offsetY,
            x: (cmd.x * scale) + offsetX,
            y: (cmd.y * scale) + offsetY
          };
        
        case 'T': // Smooth quadratic Bezier
          return {
            ...cmd,
            x: (cmd.x * scale) + offsetX,
            y: (cmd.y * scale) + offsetY
          };
        
        case 'A': // Arc
          return {
            ...cmd,
            rx: cmd.rx * scale,
            ry: cmd.ry * scale,
            x: (cmd.x * scale) + offsetX,
            y: (cmd.y * scale) + offsetY
          };
        
        case 'Z': // ClosePath
          return cmd; // No coordinates to scale
        
        default:
          console.warn(`  ⚠️  Unknown path command: ${cmd.code}`);
          return cmd;
      }
    });
    
    // Convert back to path string (all absolute)
    return scaledCommands.map(cmd => commandToString(cmd, false)).join(' ');
  } catch (error) {
    console.warn(`  ⚠️  Error parsing path data: ${error.message}`);
    return d; // Return original if parsing fails
  }
}

/**
 * Normalize a single SVG file using regex-based parsing
 */
function normalizeSvg(svgContent, filename) {
  // 1. Extract viewBox
  const viewBoxMatch = svgContent.match(/viewBox\s*=\s*["']([^"']+)["']/i);
  if (!viewBoxMatch) {
    throw new Error('No viewBox found in SVG');
  }
  
  const [x, y, width, height] = viewBoxMatch[1].split(/\s+/).map(Number);
  
  if (isNaN(width) || isNaN(height) || width <= 0 || height <= 0) {
    throw new Error(`Invalid viewBox: ${viewBoxMatch[1]}`);
  }
  
  // 2. Calculate scale (preserve aspect ratio)
  const scaleX = TARGET_SIZE / width;
  const scaleY = TARGET_SIZE / height;
  const scale = Math.min(scaleX, scaleY); // Use smaller to ensure it fits
  
  // 3. Calculate centering offsets
  const scaledWidth = width * scale;
  const scaledHeight = height * scale;
  const offsetX = (TARGET_SIZE - scaledWidth) / 2;
  const offsetY = (TARGET_SIZE - scaledHeight) / 2;
  
  let normalized = svgContent;
  
  // 4. Scale all path elements
  normalized = normalized.replace(/<path([^>]*)d\s*=\s*["']([^"']+)["']([^>]*)>/gi, (match, before, d, after) => {
    const scaledD = scalePathData(d, scale, offsetX, offsetY);
    // Clean up extra spaces in path data
    const cleanedD = scaledD.replace(/\s+/g, ' ').trim();
    return `<path${before}d="${cleanedD}"${after}>`;
  });
  
  // 5. Update viewBox
  normalized = normalized.replace(/viewBox\s*=\s*["'][^"']*["']/i, `viewBox="0 0 ${TARGET_SIZE} ${TARGET_SIZE}"`);
  
  // 6. Remove width/height attributes
  normalized = normalized.replace(/\s+(width|height)\s*=\s*["'][^"']*["']/gi, '');
  
  // 7. Set fill="currentColor" on root svg if not present
  if (!normalized.match(/<svg[^>]*fill\s*=/i)) {
    normalized = normalized.replace(/<svg([^>]*)>/i, '<svg$1 fill="currentColor">');
  }
  
  // 8. Remove unnecessary attributes from root svg (multiple passes for all attributes)
  const attributesToRemove = ['aria-hidden', 'focusable', 'data-prefix', 'data-icon', 'role', 'class'];
  attributesToRemove.forEach(attr => {
    normalized = normalized.replace(new RegExp(`\\s+${attr}\\s*=\\s*["'][^"']*["']`, 'gi'), '');
  });
  
  // 9. Ensure xmlns is present
  if (!normalized.match(/xmlns\s*=/i)) {
    normalized = normalized.replace(/<svg([^>]*)>/i, '<svg$1 xmlns="http://www.w3.org/2000/svg">');
  }
  
  // 10. Replace hardcoded colors with currentColor in paths
  normalized = normalized.replace(/fill\s*=\s*["'](?!currentColor|none)[^"']*["']/gi, 'fill="currentColor"');
  normalized = normalized.replace(/stroke\s*=\s*["'](?!currentColor|none)[^"']*["']/gi, 'stroke="currentColor"');
  
  return normalized;
}

/**
 * Main function
 */
function main() {
  const iconName = process.argv[2];
  
  if (!fs.existsSync(SOURCE_DIR)) {
    console.error(`❌ Source directory not found: ${SOURCE_DIR}`);
    process.exit(1);
  }
  
  let filesToProcess = [];
  
  if (iconName) {
    // Process single icon
    const filePath = path.join(SOURCE_DIR, `${iconName}.svg`);
    if (!fs.existsSync(filePath)) {
      console.error(`❌ Icon not found: ${filePath}`);
      process.exit(1);
    }
    filesToProcess = [filePath];
  } else {
    // Process all SVG files
    const files = fs.readdirSync(SOURCE_DIR);
    filesToProcess = files
      .filter(file => file.endsWith('.svg'))
      .map(file => path.join(SOURCE_DIR, file));
  }
  
  if (filesToProcess.length === 0) {
    console.warn(`⚠️  No SVG files found in ${SOURCE_DIR}`);
    process.exit(0);
  }
  
  console.log(`📦 Normalizing ${filesToProcess.length} icon(s)...\n`);
  
  let successCount = 0;
  let errorCount = 0;
  
  // Check for --force flag to overwrite existing files
  const force = process.argv.includes('--force') || process.argv.includes('-f');
  
  for (const filePath of filesToProcess) {
    const filename = path.basename(filePath);
    const outputPath = path.join(OUTPUT_DIR, filename);
    
    // Skip if file already exists and --force is not used
    if (!force && fs.existsSync(outputPath)) {
      console.log(`  ⏭️  ${filename} (already exists, use --force to overwrite)`);
      continue;
    }
    
    try {
      const svgContent = fs.readFileSync(filePath, 'utf-8');
      const normalized = normalizeSvg(svgContent, filename);
      
      fs.writeFileSync(outputPath, normalized, 'utf-8');
      console.log(`  ✅ ${filename}`);
      successCount++;
    } catch (error) {
      console.error(`  ❌ ${filename}: ${error.message}`);
      errorCount++;
    }
  }
  
  console.log(`\n📊 Results: ${successCount} succeeded, ${errorCount} failed`);
  console.log(`📁 Output directory: ${OUTPUT_DIR}`);
}

main();
