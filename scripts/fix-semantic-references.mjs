#!/usr/bin/env node

/**
 * Fix semantic token references to use correct path-based format
 * Converts {eui.app.raw.*} → {eui-app-raw-*}
 */

import fs from 'fs';
import path from 'path';
import { fileURLToPath } from 'url';

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);
const repoRoot = path.resolve(__dirname, '..');

// Function to convert dot notation to dash notation for raw references
function convertReference(ref) {
  // Match {eui.app.raw.*} and convert to {eui-app-raw-*}
  return ref.replace(/\{eui\.app\.raw\.([^}]+)\}/g, (match, path) => {
    const dashPath = path.replace(/\./g, '-');
    return `{eui-app-raw-${dashPath}}`;
  });
}

// Function to process a JSON file
function processFile(filePath) {
  try {
    const content = fs.readFileSync(filePath, 'utf8');
    const data = JSON.parse(content);

    // Recursively process all $value fields
    function processObject(obj) {
      for (const key in obj) {
        if (key === '$value' && typeof obj[key] === 'string') {
          obj[key] = convertReference(obj[key]);
        } else if (typeof obj[key] === 'object' && obj[key] !== null) {
          processObject(obj[key]);
        }
      }
    }

    processObject(data);

    // Write back
    fs.writeFileSync(filePath, JSON.stringify(data, null, 2) + '\n', 'utf8');
    console.log(`✅ Fixed ${filePath}`);
  } catch (e) {
    console.warn(`Warning: Could not process ${filePath}: ${e.message}`);
  }
}

// Find all semantic JSON files
function findSemanticFiles(dir) {
  const files = [];

  function scan(dir) {
    const items = fs.readdirSync(dir);
    for (const item of items) {
      const fullPath = path.join(dir, item);
      const stat = fs.statSync(fullPath);

      if (stat.isDirectory()) {
        scan(fullPath);
      } else if (item.endsWith('.json') && fullPath.includes('/semantics/')) {
        files.push(fullPath);
      }
    }
  }

  scan(dir);
  return files;
}

// Main execution
function main() {
  console.log('🔧 Fixing semantic token references...');

  const contextsDir = path.join(repoRoot, 'tokens', 'contexts');
  const semanticFiles = findSemanticFiles(contextsDir);

  console.log(`Found ${semanticFiles.length} semantic files to process`);

  semanticFiles.forEach(processFile);

  console.log('🎉 Semantic reference fixing complete!');
}

// Run if called directly
if (import.meta.url === `file://${process.argv[1]}`) {
  main();
}
