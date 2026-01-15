#!/usr/bin/env node

/**
 * Document Header Formatter
 *
 * Unifies document headers across all ADR and Architecture documents.
 * Ensures all mandatory fields are present and formatted consistently.
 */

import { readFileSync, writeFileSync, readdirSync } from 'fs';
import { join, dirname, basename } from 'path';
import { fileURLToPath } from 'url';

const __filename = fileURLToPath(import.meta.url);
const __dirname = dirname(__filename);
const projectRoot = join(__dirname, '..');

// Default values for mandatory fields
const DEFAULT_DATE = new Date().toISOString().split('T')[0];
const DEFAULT_OWNER = 'Eugene Goncharov';
const DEFAULT_ASSISTANCE = 'AI-assisted drafting (human-reviewed)';
const DEFAULT_ADR_STATUS = 'Proposed';
const DEFAULT_ARCH_STATUS = 'Draft';
const DEFAULT_ARCH_CATEGORY = 'Reference';

/**
 * Extract field value from content
 */
function extractField(content, fieldName) {
  const regex = new RegExp(`^\\*\\*${fieldName}:\\*\\*\\s*(.+)$`, 'm');
  const match = content.match(regex);
  return match ? match[1].trim() : null;
}

/**
 * Extract related links section
 */
function extractRelatedLinks(content) {
  const relatedMatch = content.match(/\*\*Related:\*\*\s*\n((?:- .+\n?)*)/);
  if (!relatedMatch) return [];

  const relatedSection = relatedMatch[1];
  return relatedSection
    .split('\n')
    .filter(line => line.trim().startsWith('-'))
    .map(line => line.trim());
}

/**
 * Extract metadata from ADR document
 */
function extractADRMetadata(content, filename) {
  const lines = content.split('\n');

  // Extract title from first heading
  const titleMatch = lines.find(line => line.startsWith('# '));
  if (!titleMatch) {
    console.warn(`⚠️  No title found in ${filename}`);
    return null;
  }

  const titleLine = titleMatch.substring(2).trim();

  // ADR format: # ADR-XXXX: Title
  const adrMatch = titleLine.match(/^ADR-(\d{4}):\s*(.+)$/);
  if (!adrMatch) {
    console.warn(`⚠️  Invalid ADR title format in ${filename}: ${titleLine}`);
    return null;
  }

  const [, number, title] = adrMatch;

  return {
    type: 'adr',
    number,
    title,
    status: extractField(content, 'Status') || DEFAULT_ADR_STATUS,
    date: extractField(content, 'Date') || DEFAULT_DATE,
    lastUpdated: extractField(content, 'Last Updated') || extractField(content, 'Date') || DEFAULT_DATE,
    owner: extractField(content, 'Owner') || DEFAULT_OWNER,
    assistance: extractField(content, 'Assistance') || DEFAULT_ASSISTANCE,
    related: extractRelatedLinks(content),
  };
}

/**
 * Extract metadata from Architecture document
 */
function extractArchMetadata(content, filename) {
  const lines = content.split('\n');

  // Extract title from first heading
  const titleMatch = lines.find(line => line.startsWith('# '));
  if (!titleMatch) {
    console.warn(`⚠️  No title found in ${filename}`);
    return null;
  }

  const titleLine = titleMatch.substring(2).trim();
  const documentId = filename.replace('.md', '');

  return {
    type: 'arch',
    documentId,
    title: titleLine,
    status: extractField(content, 'Status') || DEFAULT_ARCH_STATUS,
    date: extractField(content, 'Date') || DEFAULT_DATE,
    lastUpdated: extractField(content, 'Last Updated') || extractField(content, 'Date') || DEFAULT_DATE,
    owner: extractField(content, 'Owner') || DEFAULT_OWNER,
    assistance: extractField(content, 'Assistance') || DEFAULT_ASSISTANCE,
    category: extractField(content, 'Category') || DEFAULT_ARCH_CATEGORY,
    related: extractRelatedLinks(content),
  };
}

/**
 * Format ADR header
 */
function formatADRHeader(meta) {
  const relatedSection = meta.related.length > 0
    ? `**Related:**\n${meta.related.join('\n')}`
    : '**Related:**\n';

  return `# ADR-${meta.number}: ${meta.title}

**Status:** ${meta.status}
**Date:** ${meta.date}
**Last Updated:** ${meta.lastUpdated}
**Owner:** ${meta.owner}
**Assistance:** ${meta.assistance}
${relatedSection}

---
`;
}

/**
 * Format Architecture header
 */
function formatArchHeader(meta) {
  const relatedSection = meta.related.length > 0
    ? `**Related:**\n${meta.related.join('\n')}`
    : '**Related:**\n';

  return `# ${meta.title}

**Document ID:** ${meta.documentId}
**Status:** ${meta.status}
**Date:** ${meta.date}
**Last Updated:** ${meta.lastUpdated}
**Owner:** ${meta.owner}
**Assistance:** ${meta.assistance}
**Category:** ${meta.category}
${relatedSection}

---
`;
}

/**
 * Extract document body (content after header)
 */
function extractBody(content) {
  const lines = content.split('\n');

  // Find the separator line (---)
  let separatorIndex = -1;
  for (let i = 0; i < lines.length; i++) {
    if (lines[i].trim() === '---') {
      separatorIndex = i;
      break;
    }
  }

  if (separatorIndex === -1) {
    // No separator found, try to find the end of metadata section
    let metaEndIndex = 0;
    for (let i = 1; i < lines.length; i++) {
      const line = lines[i].trim();
      // Look for first non-metadata line
      if (line !== '' && !line.startsWith('**') && !line.startsWith('-') && !line.startsWith('#')) {
        metaEndIndex = i;
        break;
      }
      // If we hit a second heading or other markdown, that's the body
      if (i > 5 && line.startsWith('##')) {
        metaEndIndex = i;
        break;
      }
    }

    return lines.slice(metaEndIndex).join('\n').trim();
  }

  return lines.slice(separatorIndex + 1).join('\n').trim();
}

/**
 * Format a single document
 */
function formatDocument(filePath) {
  const filename = basename(filePath);
  const content = readFileSync(filePath, 'utf-8');

  // Skip template files
  if (filename.includes('TEMPLATE')) {
    console.log(`⏭️  Skipping template: ${filename}`);
    return;
  }

  const isADR = filename.startsWith('ADR-');

  // Extract metadata
  const metadata = isADR
    ? extractADRMetadata(content, filename)
    : extractArchMetadata(content, filename);

  if (!metadata) {
    console.error(`❌ Failed to extract metadata from ${filename}`);
    return;
  }

  // Format header
  const header = metadata.type === 'adr'
    ? formatADRHeader(metadata)
    : formatArchHeader(metadata);

  // Extract body
  const body = extractBody(content);

  // Combine header and body
  const formatted = `${header}\n${body}\n`;

  // Write back to file
  writeFileSync(filePath, formatted, 'utf-8');

  console.log(`✅ Formatted: ${filename}`);
}

/**
 * Process all documents in a directory
 */
function processDirectory(dirPath) {
  const files = readdirSync(dirPath);

  for (const file of files) {
    if (file.endsWith('.md')) {
      const filePath = join(dirPath, file);
      try {
        formatDocument(filePath);
      } catch (error) {
        console.error(`❌ Error formatting ${file}:`, error.message);
      }
    }
  }
}

/**
 * Main execution
 */
function main() {
  console.log('📝 Document Header Formatter\n');

  const adrDir = join(projectRoot, 'docs', 'adr');
  const archDir = join(projectRoot, 'docs', 'architecture');

  console.log('Processing ADR documents...');
  processDirectory(adrDir);

  console.log('\nProcessing Architecture documents...');
  processDirectory(archDir);

  console.log('\n✨ Done! All documents have been formatted.');
}

// Run the script
main();
