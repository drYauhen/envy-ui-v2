#!/usr/bin/env node

/**
 * Validates token usage in component CSS files
 * Checks that all var(--token-name) references use valid token names
 * Reports errors for unknown tokens and warnings for literal values
 */

import { readFileSync, readdirSync, statSync } from 'fs';
import { join, dirname } from 'path';
import { fileURLToPath } from 'url';

const __filename = fileURLToPath(import.meta.url);
const __dirname = dirname(__filename);
const repoRoot = join(__dirname, '..');

// Allowed literal value exceptions
const ALLOWED_LITERALS = new Set([
  '0px', '0rem', '0em', '0%', '0',
  '1px',
  '100%',
  'auto',
  'inherit',
  'transparent',
  'none',
  'solid',
  'dashed',
  'dotted',
  'normal',
  'bold',
  'italic',
  'center',
  'left',
  'right',
  'top',
  'bottom',
  'middle',
  'baseline',
  'flex',
  'block',
  'inline',
  'inline-block',
  'grid',
  'relative',
  'absolute',
  'fixed',
  'sticky',
  'hidden',
  'visible',
  'pointer',
  'not-allowed',
  'default',
  'cursor',
  'text',
  'grab',
  'grabbing',
  'move',
  'resize',
  'zoom-in',
  'zoom-out',
  'wait',
  'help',
  'crosshair',
  'progress',
  'no-drop',
  'all-scroll',
  'col-resize',
  'row-resize',
  'e-resize',
  'n-resize',
  'ne-resize',
  'nw-resize',
  's-resize',
  'se-resize',
  'sw-resize',
  'w-resize',
  'ew-resize',
  'ns-resize',
  'nesw-resize',
  'nwse-resize',
  'copy',
  'alias',
  'context-menu',
  'cell',
  'not-allowed',
  'vertical-text',
  'all-scroll',
  'no-drop',
  'grab',
  'grabbing',
  'zoom-in',
  'zoom-out',
  'ease',
  'ease-in',
  'ease-out',
  'ease-in-out',
  'linear',
  'step-start',
  'step-end',
  'initial',
  'unset',
  'revert',
  'revert-layer'
]);

// Load valid tokens from generated CSS
const tokensCssPath = join(repoRoot, 'generated', 'css', 'tokens.css');

let tokensCss;
try {
  tokensCss = readFileSync(tokensCssPath, 'utf-8');
} catch (error) {
  console.error(`❌ Error: Could not read ${tokensCssPath}`);
  console.error(`   Make sure to run 'npm run tokens:build' first`);
  process.exit(1);
}

// Extract all valid token names
const cssVarRegex = /--([\w-]+):/g;
const validTokens = new Set();
let match;

while ((match = cssVarRegex.exec(tokensCss)) !== null) {
  validTokens.add(match[1]);
}

if (validTokens.size === 0) {
  console.warn('⚠️  Warning: No tokens found in CSS file');
  process.exit(0);
}

// Recursively find all CSS files
function findCssFiles(dir, fileList = []) {
  const files = readdirSync(dir);
  
  files.forEach(file => {
    const filePath = join(dir, file);
    const stat = statSync(filePath);
    
    if (stat.isDirectory()) {
      findCssFiles(filePath, fileList);
    } else if (file.endsWith('.css')) {
      fileList.push(filePath);
    }
  });
  
  return fileList;
}

// Find all CSS files in src/ui
const componentCssDir = join(repoRoot, 'src', 'ui');
const cssFiles = findCssFiles(componentCssDir);

if (cssFiles.length === 0) {
  console.warn('⚠️  Warning: No CSS files found in src/ui');
  process.exit(0);
}

const errors = [];
const warnings = [];

// Validate each CSS file
cssFiles.forEach(filePath => {
  const content = readFileSync(filePath, 'utf-8');
  const relativePath = filePath.replace(repoRoot + '/', '');
  const lines = content.split('\n');
  
  // Extract all locally defined CSS variables in this file
  // Pattern: --variable-name: value;
  const localVarRegex = /--([\w-]+):/g;
  const localVariables = new Set();
  let localMatch;
  
  while ((localMatch = localVarRegex.exec(content)) !== null) {
    localVariables.add(localMatch[1]);
  }
  
  // Extract all var(--token-name) usages
  const varUsageRegex = /var\(--([\w-]+)\)/g;
  const usedTokens = new Set();
  let varMatch;
  
  while ((varMatch = varUsageRegex.exec(content)) !== null) {
    const tokenName = varMatch[1];
    usedTokens.add(tokenName);
    
    // Skip if it's a local variable defined in this file
    if (localVariables.has(tokenName)) {
      continue;
    }
    
    // Skip if it's a valid token from tokens.css
    if (validTokens.has(tokenName)) {
      continue;
    }
    
    // This is an unknown token
    const lineNumber = content.substring(0, varMatch.index).split('\n').length;
    errors.push({
      file: relativePath,
      line: lineNumber,
      token: tokenName,
      message: `Unknown token: --${tokenName}`
    });
  }
  
  // Check for literal values (excluding allowed exceptions and var() calls)
  // Pattern: property: value; (where value is not var(...) and not in allowed list)
  const literalValueRegex = /:\s*([^;]+);/g;
  let literalMatch;
  
  while ((literalMatch = literalValueRegex.exec(content)) !== null) {
    const value = literalMatch[1].trim();
    
    // Skip if it's a var() call or calc() or color-mix()
    if (value.startsWith('var(') || value.startsWith('calc(') || value.startsWith('color-mix(')) {
      continue;
    }
    
    // Skip if it's in allowed literals
    if (ALLOWED_LITERALS.has(value)) {
      continue;
    }
    
    // Skip if it's a quoted string
    if ((value.startsWith('"') && value.endsWith('"')) || 
        (value.startsWith("'") && value.endsWith("'"))) {
      continue;
    }
    
    // Check if it looks like a literal value (number with unit, hex color, etc.)
    const looksLikeLiteral = /^([0-9]+(?:\.?[0-9]+)?(?:px|rem|em|%|vh|vw|vmin|vmax|ms|s|deg|rad|turn|grad)|#[0-9a-fA-F]{3,8}|rgb\(|rgba\(|hsl\(|hsla\(|oklch\(|oklab\(|lab\(|lch\()/.test(value);
    
    if (looksLikeLiteral) {
      const lineNumber = content.substring(0, literalMatch.index).split('\n').length;
      warnings.push({
        file: relativePath,
        line: lineNumber,
        value: value,
        message: `Literal value found: ${value}. Consider using a token instead.`
      });
    }
  }
});

// Report results
if (errors.length > 0) {
  console.error('\n❌ Token validation errors:');
  errors.forEach(err => {
    console.error(`  ${err.file}:${err.line} - ${err.message}`);
  });
}

if (warnings.length > 0) {
  console.warn('\n⚠️  Token usage warnings:');
  warnings.forEach(warn => {
    console.warn(`  ${warn.file}:${warn.line} - ${warn.message}`);
  });
}

if (errors.length === 0 && warnings.length === 0) {
  console.log('✅ All tokens are valid!');
  console.log(`   Validated ${cssFiles.length} CSS files`);
  process.exit(0);
}

if (errors.length > 0) {
  console.error(`\n❌ Found ${errors.length} error(s) and ${warnings.length} warning(s)`);
  process.exit(1);
}

if (warnings.length > 0) {
  console.warn(`\n⚠️  Found ${warnings.length} warning(s) (no errors)`);
  process.exit(0);
}

