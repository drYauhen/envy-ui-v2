#!/usr/bin/env node

/**
 * Document ID Generator
 *
 * Generates unique, predictable IDs for all documentation.
 *
 * Usage:
 *   node scripts/generate-doc-ids.mjs --help
 *   node scripts/generate-doc-ids.mjs --type architecture --preview
 *   node scripts/generate-doc-ids.mjs --type architecture --update-headers
 *   node scripts/generate-doc-ids.mjs --all --preview
 */

import { readdirSync, statSync, readFileSync, writeFileSync } from 'fs';
import { join, extname, relative } from 'path';
import { fileURLToPath } from 'url';

const __dirname = fileURLToPath(new URL('.', import.meta.url));
const ROOT_DIR = join(__dirname, '..');

/**
 * Generate document ID from title and type
 */
function generateDocumentId(type, title, filePath = null, allFiles = null) {
  if (!title || typeof title !== 'string') {
    throw new Error('Title is required and must be a string');
  }

  const baseSlug = title
    .toLowerCase()
    .replace(/[^a-z0-9\s-]/g, '') // Remove special chars except spaces and hyphens
    .replace(/\s+/g, '-')          // Spaces to hyphens
    .replace(/-+/g, '-')           // Multiple hyphens to single
    .replace(/^-|-$/g, '');        // Remove leading/trailing hyphens

  switch(type) {
    case 'architecture':
      return generateArchitectureId(title, filePath);
    case 'workflow':
      return `workflow-${baseSlug}`;
    case 'guide':
      return `guide-${baseSlug}`;
    case 'adr':
      // ADRs have their own numbering system
      return title.startsWith('ADR-') ? title.split(':')[0] : `adr-${baseSlug}`;
    default:
      return `${type}-${baseSlug}`;
  }
}

/**
 * Determine major relation for architecture documents
 */
function determineMajorRelation(title, filePath = null) {
  const filename = filePath ? filePath.split('/').pop().toLowerCase() : '';
  const titleLower = title.toLowerCase();

  // ACCESSIBILITY category (check first - most specific)
  if (filename.includes('accessibility') || filename.includes('focus') ||
      titleLower.includes('accessibility') || titleLower.includes('focus')) {
    return 'accessibility';
  }

  // THEME category
  if (filename.includes('theme') || titleLower.includes('theme')) {
    return 'theme';
  }

  // LAYOUT category
  if (filename.includes('layout') || titleLower.includes('layout')) {
    return 'layout';
  }

  // COMPONENTS category (check before tokens to avoid conflicts)
  if (filename.includes('component') || titleLower.includes('component')) {
    return 'components';
  }

  // TOKENS category (check after components to avoid conflicts with component-css-*)
  if (filename.includes('color') || filename.includes('token') ||
      titleLower.includes('color') || titleLower.includes('token')) {
    return 'tokens';
  }

  // SYSTEM category (catch-all for architecture, dev-app, storybook, system, template, guide, etc.)
  return 'system';
}

/**
 * Generate architecture ID with structured naming
 */
function generateArchitectureId(title, filePath = null, allFiles = null) {
  const majorRelation = determineMajorRelation(title, filePath);
  const baseSlug = title
    .toLowerCase()
    .replace(/[^a-z0-9\s-]/g, '')
    .replace(/\s+/g, '-')
    .replace(/-+/g, '-')
    .replace(/^-|-$/g, '');

  // Get next sequential number for this major relation
  const nextNumber = getNextSequentialNumber(majorRelation, allFiles);
  const paddedNumber = String(nextNumber).padStart(3, '0');

  return `ARCH-${majorRelation}-${paddedNumber}-${baseSlug}`;
}

/**
 * Get next sequential number for a major relation
 * Analyzes existing documents to determine the next number
 */
function getNextSequentialNumber(majorRelation, allFiles = null) {
  if (!allFiles) {
    // Fallback if no file list provided
    return 1;
  }

  // Count how many documents already have ARCH- IDs in this major relation
  let maxNumber = 0;

  for (const filePath of allFiles) {
    const type = getDocumentType(filePath);
    if (type === 'architecture') {
      const title = extractTitleFromFile(filePath);
      if (title && determineMajorRelation(title, filePath) === majorRelation) {
        // Check if this document already has an ARCH- ID
        const hasId = hasDocumentId(filePath);
        if (hasId) {
          try {
            const content = readFileSync(filePath, 'utf8');
            const idMatch = content.match(/\*\*Document ID:\*\*\s*(ARCH-[^-]+-(\d+)-.*)/);
            if (idMatch && idMatch[2]) {
              const existingNumber = parseInt(idMatch[2], 10);
              maxNumber = Math.max(maxNumber, existingNumber);
            }
          } catch (error) {
            // Ignore read errors
          }
        }
      }
    }
  }

  return maxNumber + 1;
}

/**
 * Find all markdown files in a directory recursively
 */
function findMarkdownFiles(dir, results = []) {
  const items = readdirSync(dir);

  for (const item of items) {
    const fullPath = join(dir, item);
    const stat = statSync(fullPath);

    if (stat.isDirectory()) {
      // Skip certain directories
      if (!['node_modules', '.git', 'build', 'storybook-static'].includes(item)) {
        findMarkdownFiles(fullPath, results);
      }
    } else if (extname(item) === '.md') {
      results.push(fullPath);
    }
  }

  return results;
}

/**
 * Extract title from markdown file
 */
function extractTitleFromFile(filePath) {
  try {
    const content = readFileSync(filePath, 'utf8');
    const lines = content.split('\n');

    // Look for # Title
    for (const line of lines) {
      if (line.startsWith('# ')) {
        return line.substring(2).trim();
      }
    }

    // Fallback to filename
    const filename = filePath.split('/').pop();
    return filename.replace('.md', '').replace(/-/g, ' ');
  } catch (error) {
    console.error(`Error reading ${filePath}:`, error.message);
    return null;
  }
}

/**
 * Determine document type from path
 */
function getDocumentType(filePath) {
  const relativePath = relative(ROOT_DIR, filePath);

  if (relativePath.startsWith('docs/adr/')) {
    return 'adr';
  } else if (relativePath.startsWith('docs/architecture/')) {
    return 'architecture';
  } else if (relativePath.startsWith('docs/workflows/')) {
    return 'workflow';
  } else if (relativePath.includes('docs/')) {
    return 'guide';
  }

  return 'unknown';
}

/**
 * Check if file already has Document ID
 */
function hasDocumentId(filePath) {
  try {
    const content = readFileSync(filePath, 'utf8');
    return content.includes('**Document ID:**');
  } catch {
    return false;
  }
}

/**
 * Add Document ID to file header
 */
function addDocumentIdToFile(filePath, docId, type) {
  try {
    let content = readFileSync(filePath, 'utf8');
    const lines = content.split('\n');

    // Find the title line
    let titleIndex = -1;
    for (let i = 0; i < lines.length; i++) {
      if (lines[i].startsWith('# ')) {
        titleIndex = i;
        break;
      }
    }

    if (titleIndex === -1) {
      console.error(`No title found in ${filePath}`);
      return false;
    }

    // Insert Document ID after title
    const insertIndex = titleIndex + 1;
    const today = new Date().toISOString().split('T')[0];

    let categoryText = '';
    switch(type) {
      case 'architecture':
        categoryText = 'Architecture Rules (Binding)';
        break;
      case 'workflow':
        categoryText = 'Workflow';
        break;
      case 'guide':
        categoryText = 'Guide';
        break;
      default:
        categoryText = type.charAt(0).toUpperCase() + type.slice(1);
    }

    const idLines = [
      '',
      `**Document ID:** ${docId}`,
      `**Last Updated:** ${today}`,
      `**Category:** ${categoryText}`,
      ''
    ];

    lines.splice(insertIndex, 0, ...idLines);
    content = lines.join('\n');

    writeFileSync(filePath, content, 'utf8');
    return true;
  } catch (error) {
    console.error(`Error updating ${filePath}:`, error.message);
    return false;
  }
}

/**
 * Main CLI function
 */
function main() {
  const args = process.argv.slice(2);
  const options = {};

  // Parse arguments
  for (let i = 0; i < args.length; i++) {
    const arg = args[i];
    if (arg.startsWith('--')) {
      const key = arg.substring(2);
      const value = args[i + 1] && !args[i + 1].startsWith('--') ? args[i + 1] : true;
      options[key] = value;
      if (value !== true) i++; // Skip next arg if it was a value
    }
  }

  if (options.help || options.h) {
    console.log(`
Document ID Generator

Generate unique, predictable IDs for documentation files.

USAGE:
  node scripts/generate-doc-ids.mjs [options]

OPTIONS:
  --type <type>        Document type: architecture, workflow, guide, adr (default: all)
  --preview           Show what would be done without making changes
  --update-headers    Add Document ID headers to files
  --all               Process all document types
  --help              Show this help

EXAMPLES:
  node scripts/generate-doc-ids.mjs --type architecture --preview
  node scripts/generate-doc-ids.mjs --type architecture --update-headers
  node scripts/generate-doc-ids.mjs --all --preview
`);
    return;
  }

  const targetType = options.type || (options.all ? 'all' : null);
  const preview = options.preview || false;
  const updateHeaders = options['update-headers'] || false;

  if (!targetType && !options.all) {
    console.error('Please specify --type <type>, --all, or --help');
    process.exit(1);
  }

  console.log('🔍 Scanning documentation files...');

  // Find all markdown files in docs/
  const docsDir = join(ROOT_DIR, 'docs');
  const allFiles = findMarkdownFiles(docsDir);

  // Filter by type
  let targetFiles = [];
  if (options.all || !targetType) {
    targetFiles = allFiles;
  } else {
    targetFiles = allFiles.filter(file => getDocumentType(file) === targetType);
  }

  console.log(`📋 Found ${targetFiles.length} files to process`);

  if (targetFiles.length === 0) {
    console.log('No files found matching criteria');
    return;
  }

  // Process files
  const results = [];
  let updated = 0;
  let skipped = 0;

  for (const filePath of targetFiles) {
    const type = getDocumentType(filePath);
    const title = extractTitleFromFile(filePath);

    if (!title) {
      console.warn(`⚠️  Could not extract title from ${filePath}`);
      continue;
    }

    let docId;
    try {
      if (type === 'architecture' && title.includes('ARCH-')) {
        // Already has structured naming
        docId = title.split(' ')[0]; // Take first part before space
      } else {
        docId = generateDocumentId(type, title, filePath, targetFiles);
      }
    } catch (error) {
      console.error(`❌ Error generating ID for ${filePath}:`, error.message);
      continue;
    }

    const hasId = hasDocumentId(filePath);
    const action = hasId ? 'HAS_ID' : (updateHeaders ? 'UPDATE' : 'PREVIEW');

    results.push({
      file: relative(ROOT_DIR, filePath),
      type,
      title,
      id: docId,
      hasId,
      action
    });

    if (action === 'UPDATE') {
      const success = addDocumentIdToFile(filePath, docId, type);
      if (success) {
        updated++;
        console.log(`✅ Updated: ${relative(ROOT_DIR, filePath)} → ${docId}`);
      } else {
        console.error(`❌ Failed: ${relative(ROOT_DIR, filePath)}`);
      }
    } else if (action === 'HAS_ID') {
      skipped++;
    }
  }

  // Summary
  console.log('\n📊 Summary:');
  console.log(`   Files processed: ${results.length}`);
  console.log(`   Already have IDs: ${skipped}`);
  if (updateHeaders) {
    console.log(`   Updated: ${updated}`);
  } else if (preview) {
    console.log(`   Would update: ${results.filter(r => r.action === 'UPDATE').length}`);
  }

  // Show preview table
  if (preview || !updateHeaders) {
    console.log('\n📋 Preview:');
    console.log('─'.repeat(100));
    console.log('File'.padEnd(50), 'Type'.padEnd(12), 'ID'.padEnd(25), 'Action');
    console.log('─'.repeat(100));

    for (const result of results.slice(0, 20)) { // Limit to first 20
      const action = result.action === 'HAS_ID' ? 'SKIP' :
                    result.action === 'UPDATE' ? 'UPDATE' : 'PREVIEW';
      console.log(
        result.file.substring(0, 48).padEnd(50),
        result.type.substring(0, 10).padEnd(12),
        result.id.substring(0, 23).padEnd(25),
        action
      );
    }

    if (results.length > 20) {
      console.log(`... and ${results.length - 20} more files`);
    }
  }
}

// Export functions for testing
export {
  generateDocumentId,
  generateArchitectureId,
  findMarkdownFiles,
  extractTitleFromFile,
  getDocumentType,
  hasDocumentId,
  addDocumentIdToFile
};

// Run CLI if called directly
if (import.meta.url === `file://${process.argv[1]}`) {
  main();
}
