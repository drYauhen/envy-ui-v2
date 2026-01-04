#!/usr/bin/env node

/**
 * Generates .meta.json files with resolved token values
 * Run after token generation: npm run tokens:generate-metadata
 * 
 * For each token with an alias (e.g., {eui.color.brand.700}) creates
 * a .meta.json file with the resolved value in the $resolved field
 */

import { readFileSync, writeFileSync, readdirSync, statSync, mkdirSync } from 'fs';
import { join, dirname, basename, extname } from 'path';
import { fileURLToPath } from 'url';

const __filename = fileURLToPath(import.meta.url);
const __dirname = dirname(__filename);
const repoRoot = join(__dirname, '..');

// Import utilities from token-utils (will need to adapt for ESM)
// Temporarily implement main functions here

function flattenTokens(node, path = [], acc = {}) {
  if (!node || typeof node !== 'object' || Array.isArray(node)) return acc;

  const obj = node;
  if (typeof obj.$value === 'string') {
    acc[path.join('.')] = { value: obj.$value, type: typeof obj.$type === 'string' ? obj.$type : undefined };
  }

  for (const [key, value] of Object.entries(obj)) {
    if (key === '$value' || key === '$type') continue;
    if (typeof value === 'object' && value !== null) {
      flattenTokens(value, [...path, key], acc);
    }
  }

  return acc;
}

function resolveAlias(ref, map, seen = new Set()) {
  const match = ref.match(/^\{(.+)\}$/);
  const key = match ? match[1] : null;
  
  if (key) {
    if (seen.has(key)) return null;
    seen.add(key);

    const target = map[key];
    if (!target) {
      return null;
    }
    
    if (target.value.startsWith('{')) {
      return resolveAlias(target.value, map, seen);
    }
    
    return target.value;
  }
  
  if (ref.trim().length > 0) {
    return ref.trim();
  }
  
  return null;
}

// Loads all tokens from all JSON files
function loadAllTokens(tokensDir) {
  const flatTokenMap = {};
  const tokenFiles = [];
  
  function walkDir(dir, basePath = []) {
    const entries = readdirSync(dir);
    for (const entry of entries) {
      const fullPath = join(dir, entry);
      const stat = statSync(fullPath);
      
      if (stat.isDirectory()) {
        walkDir(fullPath, [...basePath, entry]);
      } else if (entry.endsWith('.json') && !entry.endsWith('.meta.json')) {
        try {
          const content = JSON.parse(readFileSync(fullPath, 'utf-8'));
          // If the file already has an eui structure, start with eui, otherwise from root
          if (content.eui) {
            // File already has structure { eui: {...} }, start with eui
            flattenTokens(content.eui, ['eui'], flatTokenMap);
          } else {
            // File doesn't have eui structure, start from root
            flattenTokens(content, [], flatTokenMap);
          }
          tokenFiles.push({ path: fullPath, content, basePath: [] });
        } catch (e) {
          console.warn(`Warning: Could not parse ${fullPath}:`, e.message);
        }
      }
    }
  }
  
  walkDir(tokensDir);
  return { flatTokenMap, tokenFiles };
}

// Recursively adds $resolved to metadata
function addResolvedToMeta(node, flatTokenMap, currentPath = []) {
  if (typeof node !== 'object' || node === null || Array.isArray(node)) {
    return {};
  }
  
  const metaNode = {};
  let hasResolved = false;
  
  for (const [key, value] of Object.entries(node)) {
    if (key === '$value' && typeof value === 'string' && value.startsWith('{')) {
      // This is an alias - resolve it
      const resolved = resolveAlias(value, flatTokenMap);
      if (resolved) {
        metaNode.$resolved = resolved;
        hasResolved = true;
      }
    } else if (key !== '$type' && key !== '$description' && typeof value === 'object' && value !== null && !Array.isArray(value)) {
      // Recursively process nested objects
      const nestedMeta = addResolvedToMeta(value, flatTokenMap, [...currentPath, key]);
      if (Object.keys(nestedMeta).length > 0) {
        metaNode[key] = nestedMeta;
        hasResolved = true;
      }
    }
  }
  
  return hasResolved ? metaNode : {};
}

// Generates metadata for a single token file
function generateMetadataForFile(tokenFile, flatTokenMap) {
  const meta = addResolvedToMeta(tokenFile.content, flatTokenMap);
  return meta;
}

// Main function
function main() {
  const tokensDir = join(repoRoot, 'tokens');
  
  console.log('🔍 Loading all tokens...');
  const { flatTokenMap, tokenFiles } = loadAllTokens(tokensDir);
  console.log(`✅ Loaded ${Object.keys(flatTokenMap).length} tokens from ${tokenFiles.length} files`);
  
  console.log('\n📝 Generating metadata files...');
  let generated = 0;
  let skipped = 0;
  
  for (const tokenFile of tokenFiles) {
    const meta = generateMetadataForFile(tokenFile, flatTokenMap);
    
    // Skip if there are no resolved values
    if (Object.keys(meta).length === 0) {
      skipped++;
      continue;
    }
    
    // Create path to .meta.json file
    const metaPath = tokenFile.path.replace('.json', '.meta.json');
    const metaDir = dirname(metaPath);
    
    // Create directory if needed
    try {
      // Make sure the directory exists
      mkdirSync(metaDir, { recursive: true });
      
      writeFileSync(metaPath, JSON.stringify(meta, null, 2) + '\n', 'utf-8');
      generated++;
      const relativePath = metaPath.replace(repoRoot + '/', '');
      console.log(`  ✓ ${relativePath}`);
    } catch (e) {
      console.error(`  ✗ Error writing ${metaPath}:`, e.message);
    }
  }
  
  console.log(`\n✅ Generated ${generated} metadata files`);
  if (skipped > 0) {
    console.log(`⏭️  Skipped ${skipped} files (no aliases to resolve)`);
  }
}

main();

