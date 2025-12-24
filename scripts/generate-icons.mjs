#!/usr/bin/env node

/**
 * Generate icon implementations for both HTML + CSS and TSX layers
 * 
 * Usage:
 *   node scripts/generate-icons.mjs
 * 
 * Reads normalized SVG from assets/icons/svg-icons-normalized/
 * Generates:
 *   - src/ui/icons/_icons.css (CSS classes with mask/data URI)
 *   - packages/tsx/icon/generated/*.tsx (React components via SVGR)
 */

import fs from 'fs';
import path from 'path';
import { fileURLToPath } from 'url';
// Note: SVGR is available but we use manual generation for more control

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);
const REPO_ROOT = path.resolve(__dirname, '..');

const SOURCE_DIR = path.join(REPO_ROOT, 'assets', 'icons', 'svg-icons-normalized');
const CSS_OUTPUT_DIR = path.join(REPO_ROOT, 'src', 'ui', 'icons');
const TSX_OUTPUT_DIR = path.join(REPO_ROOT, 'packages', 'tsx', 'icon', 'generated');

// Ensure output directories exist
if (!fs.existsSync(CSS_OUTPUT_DIR)) {
  fs.mkdirSync(CSS_OUTPUT_DIR, { recursive: true });
}
if (!fs.existsSync(TSX_OUTPUT_DIR)) {
  fs.mkdirSync(TSX_OUTPUT_DIR, { recursive: true });
}

/**
 * URL-encode SVG for data URI
 */
function encodeSvgForDataUri(svgContent) {
  // Remove newlines and extra spaces
  const cleaned = svgContent.replace(/\s+/g, ' ').trim();
  // URL encode
  return encodeURIComponent(cleaned)
    .replace(/'/g, '%27')
    .replace(/"/g, '%22');
}

/**
 * Convert SVG to CSS mask data URI
 */
function svgToCssMaskDataUri(svgContent) {
  // Replace fill="currentColor" with fill="black" for mask (mask uses black as visible)
  const maskSvg = svgContent.replace(/fill="currentColor"/g, 'fill="black"');
  const encoded = encodeSvgForDataUri(maskSvg);
  return `url("data:image/svg+xml,${encoded}")`;
}

/**
 * Convert kebab-case to PascalCase
 */
function toPascalCase(str) {
  return str
    .split('-')
    .map(word => word.charAt(0).toUpperCase() + word.slice(1))
    .join('');
}

/**
 * Generate CSS selector for icon using data-eui-icon attribute
 */
function generateCssSelector(iconName, svgContent) {
  const dataUri = svgToCssMaskDataUri(svgContent);
  
  return `
/* Icon: ${iconName} */
[data-eui-icon="${iconName}"] {
  mask-image: ${dataUri};
  -webkit-mask-image: ${dataUri};
  mask-size: contain;
  -webkit-mask-size: contain;
  mask-repeat: no-repeat;
  -webkit-mask-repeat: no-repeat;
  mask-position: center;
  -webkit-mask-position: center;
  background-color: currentColor;
}`;
}

/**
 * Generate React component manually (extracting SVG content)
 */
function generateReactComponent(iconName, svgContent) {
  const componentName = `Icon${toPascalCase(iconName)}`;
  
  // Extract viewBox
  const viewBoxMatch = svgContent.match(/viewBox="([^"]+)"/);
  const viewBox = viewBoxMatch ? viewBoxMatch[1] : '0 0 24 24';
  
  // Extract all path elements and other children
  // Remove the outer <svg> tag and get inner content
  const innerContent = svgContent
    .replace(/<svg[^>]*>/, '')
    .replace(/<\/svg>/, '')
    .trim();
  
  // Replace fill="currentColor" with fill={color} in paths
  const processedContent = innerContent
    .replace(/fill="currentColor"/g, 'fill={color}')
    .replace(/fill='currentColor'/g, 'fill={color}');
  
  return `import React from 'react';
import { IconProps } from '../icon.contract';

export const ${componentName} = ({ 
  size = 16, 
  color = 'currentColor',
  className,
  ...props 
}: IconProps) => (
  <svg
    width={size}
    height={size}
    viewBox="${viewBox}"
    fill={color}
    className={className}
    xmlns="http://www.w3.org/2000/svg"
    {...props}
  >
    ${processedContent}
  </svg>
);
`;
}

/**
 * Main function
 */
async function main() {
  if (!fs.existsSync(SOURCE_DIR)) {
    console.error(`❌ Source directory not found: ${SOURCE_DIR}`);
    process.exit(1);
  }
  
  const files = fs.readdirSync(SOURCE_DIR);
  const svgFiles = files.filter(file => file.endsWith('.svg'));
  
  if (svgFiles.length === 0) {
    console.warn(`⚠️  No SVG files found in ${SOURCE_DIR}`);
    process.exit(0);
  }
  
  console.log(`📦 Generating icons for ${svgFiles.length} icon(s)...\n`);
  
  let cssClasses = [];
  let reactComponents = [];
  let iconMapEntries = [];
  
  // Base CSS
  cssClasses.push(`/* Icon System - Auto-generated from assets/icons/svg-icons-normalized/ */
/* Do not edit manually - regenerate via: npm run icons:generate */

/* Base icon element - use data-eui-icon attribute */
[data-eui-icon] {
  display: inline-block;
  width: 1em;
  height: 1em;
  flex-shrink: 0;
  vertical-align: middle;
}

/* Size variants - use data-eui-size attribute */
[data-eui-icon][data-eui-size="xs"] {
  width: 0.75em;
  height: 0.75em;
}

[data-eui-icon][data-eui-size="sm"] {
  width: 0.875em;
  height: 0.875em;
}

[data-eui-icon][data-eui-size="md"] {
  width: 1em;
  height: 1em;
}

[data-eui-icon][data-eui-size="lg"] {
  width: 1.25em;
  height: 1.25em;
}

[data-eui-icon][data-eui-size="xl"] {
  width: 1.5em;
  height: 1.5em;
}

/* Icon-specific styles */
`);
  
  for (const file of svgFiles) {
    const iconName = file.replace('.svg', '');
    const filePath = path.join(SOURCE_DIR, file);
    
    try {
      const svgContent = fs.readFileSync(filePath, 'utf-8');
      
      // Generate CSS selector for data-eui-icon attribute
      const cssSelector = generateCssSelector(iconName, svgContent);
      cssClasses.push(cssSelector);
      
      // Generate React component
      const componentName = `Icon${toPascalCase(iconName)}`;
      const componentCode = generateReactComponent(iconName, svgContent);
      const componentPath = path.join(TSX_OUTPUT_DIR, `${componentName}.tsx`);
      fs.writeFileSync(componentPath, componentCode, 'utf-8');
      
      reactComponents.push({ name: componentName, iconName });
      iconMapEntries.push(`  '${iconName}': ${componentName},`);
      
      console.log(`  ✅ ${iconName}`);
    } catch (error) {
      console.error(`  ❌ ${iconName}: ${error.message}`);
    }
  }
  
  // Write CSS file
  const cssPath = path.join(CSS_OUTPUT_DIR, '_icons.css');
  fs.writeFileSync(cssPath, cssClasses.join('\n'), 'utf-8');
  console.log(`\n  📄 CSS: ${cssPath}`);
  
  // Write icon map for TSX layer
  const iconMapCode = `/* Icon Map - Auto-generated from assets/icons/svg-icons-normalized/ */
/* Do not edit manually - regenerate via: npm run icons:generate */

${reactComponents.map(({ name }) => `import { ${name} } from './generated/${name}';`).join('\n')}

export const iconMap = {
${iconMapEntries.join('\n')}
};

export type IconName = ${reactComponents.map(({ iconName }) => `'${iconName}'`).join(' | ')};
`;
  
  const iconMapPath = path.join(REPO_ROOT, 'packages', 'tsx', 'icon', 'icon-map.ts');
  fs.writeFileSync(iconMapPath, iconMapCode, 'utf-8');
  console.log(`  📄 Icon Map: ${iconMapPath}`);
  
  console.log(`\n📊 Generated:`);
  console.log(`  - ${svgFiles.length} CSS classes`);
  console.log(`  - ${reactComponents.length} React components`);
}

main().catch(error => {
  console.error('❌ Error:', error);
  process.exit(1);
});

