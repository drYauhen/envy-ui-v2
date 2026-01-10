#!/usr/bin/env node

/**
 * Adds DTCG schema references to canonical token files that don't have them,
 * or fixes incorrect schema paths
 */

import { readFileSync, writeFileSync, readdirSync, statSync } from 'fs';
import { join, dirname, relative } from 'path';
import { fileURLToPath } from 'url';

const __filename = fileURLToPath(import.meta.url);
const __dirname = dirname(__filename);
const repoRoot = join(__dirname, '..');

// Canonical directory classification
const CANONICAL_PATHS = [
  'tokens/primitives/**',
  'tokens/contexts/**/raw/**',
  'tokens/contexts/**/semantics/**',
  'tokens/contexts/**/themes/**',
  'tokens/contexts/**/components.json'
];

// Include knowledge files for schema fixing (they have broken schema paths)
const KNOWLEDGE_PATHS = [
  'tokens/knowledge/**'
];

// Note: We exclude legacy but include knowledge for schema fixing
const EXCLUDED_PATHS = [
  'tokens/legacy/**',
  '**/node_modules/**',
  '**/.git/**'
];

// Utility to check if path matches patterns
function matchesPath(path, patterns) {
  return patterns.some(pattern => {
    const regex = new RegExp(pattern.replace(/\*\*/g, '.*').replace(/\*/g, '[^/]*'));
    return regex.test(path);
  });
}

// Utility to find all JSON files recursively
function findJsonFiles(dir, fileList = []) {
  const files = readdirSync(dir);

  files.forEach(file => {
    const filePath = join(dir, file);
    const stat = statSync(filePath);

    if (stat.isDirectory()) {
      // Skip excluded directories
      if (!matchesPath(filePath, EXCLUDED_PATHS)) {
        findJsonFiles(filePath, fileList);
      }
    } else if (file.endsWith('.json') && !file.endsWith('.meta.json')) {
      fileList.push(filePath);
    }
  });

  return fileList;
}

// Calculate relative path from file to schema
function getSchemaPath(filePath) {
  const fileDir = dirname(filePath);
  const schemaPath = join(repoRoot, 'schemas', 'dtcg-2025.10-schema.json');
  return relative(fileDir, schemaPath);
}

// Main script
function addSchemasToCanonical() {
  console.log('🔍 Finding canonical token files...');

  const allFiles = findJsonFiles(join(repoRoot, 'tokens'));
  const canonicalFiles = allFiles.filter(filePath => {
    const relativePath = relative(join(repoRoot, 'tokens'), filePath);
    return matchesPath(`tokens/${relativePath}`, CANONICAL_PATHS) ||
           matchesPath(`tokens/${relativePath}`, KNOWLEDGE_PATHS);
  });

  console.log(`📊 Found ${canonicalFiles.length} canonical + knowledge token files`);

  let updatedCount = 0;

  canonicalFiles.forEach(filePath => {
    try {
      const content = readFileSync(filePath, 'utf-8');
      const relativePath = relative(join(repoRoot, 'tokens'), filePath);

      // Parse content
      const jsonContent = JSON.parse(content);

      // Calculate correct schema path
      const correctSchemaPath = getSchemaPath(filePath);
      const currentSchemaPath = jsonContent.$schema;

      // Check if schema exists and is correct
      if (!currentSchemaPath || currentSchemaPath !== correctSchemaPath) {
        console.log(`📝 ${currentSchemaPath ? 'Fixing' : 'Adding'} schema in: ${relativePath}`);
        console.log(`   From: ${currentSchemaPath || 'none'}`);
        console.log(`   To:   ${correctSchemaPath}`);

        // Update schema path
        jsonContent.$schema = correctSchemaPath;

        // Write back with proper formatting
        writeFileSync(filePath, JSON.stringify(jsonContent, null, 2) + '\n');

        updatedCount++;
      }
    } catch (error) {
      console.error(`❌ Error processing ${filePath}: ${error.message}`);
    }
  });

  console.log(`✅ Updated schemas in ${updatedCount} canonical token files`);

  if (updatedCount > 0) {
    console.log('\n💡 Schema references updated to use correct relative paths');
  }
}

// Run the script
addSchemasToCanonical();
