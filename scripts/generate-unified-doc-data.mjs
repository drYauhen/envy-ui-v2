#!/usr/bin/env node

import { readFileSync, readdirSync, writeFileSync } from 'fs';
import { join, dirname } from 'path';
import { fileURLToPath } from 'url';
import { toTitleCase } from './utils/title-case.mjs';
import { isTechnicalAcronym } from './utils/acronyms.mjs';

const __filename = fileURLToPath(import.meta.url);
const __dirname = dirname(__filename);
const repoRoot = join(__dirname, '..');

// Same sanitization logic as story generation
const sanitizeStoryIdPart = (input) => input
  .toLowerCase()
  .replace(/[^a-z0-9]+/g, '-')
  .replace(/-+/g, '-')
  .replace(/^-+|-+$/g, '');

const storyNameFromExport = (exportName) => exportName
  .replace(/_/g, ' ')
  .replace(/([a-z0-9])([A-Z])/g, '$1 $2')
  .replace(/([A-Z]+)([A-Z][a-z])/g, '$1 $2')
  .replace(/([a-zA-Z])([0-9])/g, '$1 $2')
  .replace(/([0-9])([a-zA-Z])/g, '$1 $2')
  .trim();

const toStoryId = (title, exportName) => (
  `${sanitizeStoryIdPart(title)}--${sanitizeStoryIdPart(storyNameFromExport(exportName))}`
);

/**
 * Parse metadata from markdown content
 * Extracts fields in format: **Field:** Value
 */
function parseMarkdownMetadata(content) {
  const metadata = {};

  // Extract fields from markdown: **Field:** Value
  const statusMatch = content.match(/\*\*Status:\*\*\s*(.+)/);
  const dateMatch = content.match(/\*\*Date:\*\*\s*(\d{4}-\d{2}-\d{2})/);
  const lastUpdatedMatch = content.match(/\*\*Last Updated:\*\*\s*(\d{4}-\d{2}-\d{2})/);
  const ownerMatch = content.match(/\*\*Owner:\*\*\s*(.+)/);
  const assistanceMatch = content.match(/\*\*Assistance:\*\*\s*(.+)/);

  if (statusMatch) metadata.status = statusMatch[1].trim();
  if (dateMatch) metadata.date = dateMatch[1];
  if (lastUpdatedMatch) metadata.lastUpdated = lastUpdatedMatch[1];
  if (ownerMatch) metadata.owner = ownerMatch[1].trim();
  if (assistanceMatch) metadata.assistance = assistanceMatch[1].trim();

  return metadata;
}

/**
 * Extract title from ADR filename
 * ADR-XXXX-title-slug.md -> Title Slug
 */
function extractAdrTitle(filename) {
  const match = filename.match(/^ADR-\d{4}-(.+)\.md$/);
  if (!match) return 'Unknown';

  const titleSlug = match[1]
    .split('-')
    .join(' ')
    .replace(/([a-z0-9])([A-Z])/g, '$1 $2')  // Split camelCase
    .replace(/([A-Z]+)([A-Z][a-z])/g, '$1 $2'); // Split abbreviations

  return toTitleCase(titleSlug);
}

/**
 * Extract title from Architecture filename
 * ARCH-category-XXX-title-slug.md -> Title Slug
 */
function extractArchitectureTitle(filename) {
  const match = filename.match(/^ARCH-[^-]+-\d{3}-(.+)\.md$/);
  if (!match) return 'Unknown';

  const titleSlug = match[1]
    .split('-')
    .join(' ')
    .replace(/([a-z0-9])([A-Z])/g, '$1 $2')  // Split camelCase
    .replace(/([A-Z]+)([A-Z][a-z])/g, '$1 $2'); // Split abbreviations

  return toTitleCase(titleSlug);
}

/**
 * Generate consistent exportName from title
 */
function generateExportName(title) {
  const words = title
    .replace(/[^a-zA-Z0-9\s]/g, ' ') // Remove special chars
    .trim()
    .split(/\s+/)
    .filter(Boolean);

  if (words.length === 0) return '';

  const [firstWord, ...restWords] = words;
  const first = isTechnicalAcronym(firstWord)
    ? firstWord.toLowerCase()
    : firstWord.charAt(0).toLowerCase() + firstWord.slice(1);

  return [first, ...restWords].join('');
}

/**
 * Generate storybookId from title and category
 */
function generateStorybookId(title, category) {
  const exportName = generateExportName(title);
  return toStoryId(`Docs/${category.charAt(0).toUpperCase() + category.slice(1)}`, exportName);
}

/**
 * Generate architecture exportName from filename
 * ARCH-category-xxx-title-slug.stories.tsx -> ArchCategoryNum###TitleSlug
 * The "Num" prefix ensures proper kebab-case conversion (arch-category-num-###-title-slug)
 */
function generateArchitectureExportName(filename) {
  const match = filename.match(/^ARCH-([^-]+)-(\d{3})-(.+)\.stories\.tsx$/);
  if (!match) return 'Unknown';

  const [, category, sequential, titleSlug] = match;

  // Convert category to PascalCase
  const categoryPascal = category.charAt(0).toUpperCase() + category.slice(1);

  // Convert title slug to PascalCase
  const titlePascal = titleSlug
    .split('-')
    .map(word => word.charAt(0).toUpperCase() + word.slice(1))
    .join('');

  // Add "Num" prefix to sequential for clear camelCase boundary
  return `Arch${categoryPascal}Num${sequential}${titlePascal}`;
}

/**
 * Generate ADR data from docs/adr/ directory
 *
 * CRITICAL: All ADR entries MUST include storybookId field.
 * Without it, links to ADRs in Related sections will be broken.
 *
 * Validation: Run `npm run docs:validate` to verify all entries have storybookId.
 */
function generateAdrData() {
  const adrDir = join(repoRoot, 'docs/adr');
  const files = readdirSync(adrDir)
    .filter(file =>
      file.endsWith('.md') &&
      file.startsWith('ADR-') &&
      !file.includes('TEMPLATE') // Exclude template files
    )
    .sort();

  return files.map(filename => {
    const match = filename.match(/^ADR-(\d{4})-.+\.md$/);
    const number = match ? match[1] : '0000';
    const title = extractAdrTitle(filename);
    const exportName = generateExportName(title);

    // Read markdown file and extract metadata
    const filePath = join(adrDir, filename);
    const content = readFileSync(filePath, 'utf-8');
    const metadata = parseMarkdownMetadata(content);

    // Generate storybookId for link resolution
    const storybookId = toStoryId('Docs/ADR', exportName);

    // Return full DocMetadata structure
    return {
      number: number.padStart(4, '0'),
      title,
      category: 'adr',
      status: metadata.status || 'Accepted',
      date: metadata.date || '2025-01-01',
      lastUpdated: metadata.lastUpdated || undefined,
      owner: metadata.owner || undefined,
      assistance: metadata.assistance || undefined,
      exportName,
      markdownPath: `/docs/adr/${filename}`,
      storybookId
    };
  });
}


/**
 * Generate Architecture data from docs/architecture/ directory
 *
 * CRITICAL: All Architecture entries MUST include storybookId field.
 * Without it, links to Architecture docs in Related sections will be broken.
 *
 * Validation: Run `npm run docs:validate` to verify all entries have storybookId.
 */
function generateArchitectureData() {
  const archDir = join(repoRoot, 'docs/architecture');
  const files = readdirSync(archDir)
    .filter(file => file.endsWith('.md') && file.startsWith('ARCH-'))
    .sort();

  return files.map(filename => {
    const match = filename.match(/^ARCH-([^-]+)-(\d{3})-.+\.md$/);
    if (!match) return null;

    const [, categoryPart, sequential] = match;
    const majorCategory = categoryPart.toUpperCase();
    const title = extractArchitectureTitle(filename);
    const exportName = generateArchitectureExportName(filename.replace('.md', '.stories.tsx'));

    // Read markdown file and extract metadata
    const filePath = join(archDir, filename);
    const content = readFileSync(filePath, 'utf-8');
    const metadata = parseMarkdownMetadata(content);

    // Generate storybookId for link resolution
    const storybookId = toStoryId('Docs/Architecture', exportName);

    // Return full DocMetadata structure
    return {
      number: sequential,
      title,
      category: 'architecture',
      majorCategory,
      status: metadata.status || 'Active',
      date: metadata.date || metadata.lastUpdated || '2025-01-01',
      lastUpdated: metadata.lastUpdated || undefined,
      owner: metadata.owner || undefined,
      assistance: metadata.assistance || undefined,
      exportName,
      markdownPath: `/docs/architecture/${filename}`,
      storybookId
    };
  }).filter(Boolean);
}

/**
 * Generate ADR data source file
 */
function generateAdrDataFile() {
  const adrData = generateAdrData();

  const content = `// Auto-generated ADR data - DO NOT EDIT MANUALLY
// Generated by: npm run docs:regenerate-data

import { DocMetadata } from './doc-types';

export const adrs: DocMetadata[] = ${JSON.stringify(adrData, null, 2)};
`;

  const outputPath = join(repoRoot, 'stories/viewers/docs/adr-list-data.ts');
  writeFileSync(outputPath, content, 'utf-8');
  console.log(`✅ Generated ADR data: ${adrData.length} items → ${outputPath}`);
}

/**
 * Generate Architecture data source file
 */
function generateArchitectureDataFile() {
  const archData = generateArchitectureData();

  const content = `// Auto-generated Architecture data - DO NOT EDIT MANUALLY
// Generated by: npm run docs:regenerate-data

import { DocMetadata } from './doc-types';

export const architectures: DocMetadata[] = ${JSON.stringify(archData, null, 2)};
`;

  const outputPath = join(repoRoot, 'stories/viewers/docs/architecture-data.ts');
  writeFileSync(outputPath, content, 'utf-8');
  console.log(`✅ Generated Architecture data: ${archData.length} items → ${outputPath}`);
}

/**
 * Generate a single story file from DocMetadata
 */
function generateStoryFile(doc, category) {
  const categoryTitle = category === 'adr' ? 'ADR' : category.charAt(0).toUpperCase() + category.slice(1);

  // Build display name
  let displayName;
  if (category === 'adr') {
    displayName = `ADR-${doc.number} ${doc.title}`;
  } else if (category === 'architecture') {
    displayName = `ARCH-${doc.majorCategory}-${doc.number} ${doc.title}`;
  } else {
    displayName = doc.title;
  }

  // Build props array - simplified preview header (only status + lastUpdated)
  const props = [];
  props.push(`markdownPath="${doc.markdownPath}"`);
  if (doc.status) props.push(`status="${doc.status}"`);
  if (doc.lastUpdated) props.push(`lastUpdated="${doc.lastUpdated}"`);
  props.push(`fallback="Loading ${displayName}..."`);

  const propsString = props.join('\n      ');

  return `import type { Meta, StoryObj } from '@storybook/react';
import { DocViewer } from '../../viewers/docs/DocViewer';
import { getSectionParameters } from '../../../.storybook/preview';

type Story = StoryObj;

const meta: Meta = {
  title: 'Docs/${categoryTitle}',
  parameters: {
    ...getSectionParameters('Docs/${categoryTitle}'),
    layout: 'fullscreen',
    controls: { hidden: true },
    actions: { hidden: true },
    interactions: { hidden: true },
    a11y: { hidden: true }
  }
};

export default meta;

export const ${doc.exportName}: Story = {
  name: '${displayName}',
  render: () => (
    <DocViewer
      ${propsString}
    />
  )
};
`;
}

/**
 * Generate all story files for a category
 */
function generateAllStoryFiles(category, docs) {
  const categoryDir = category === 'adr' ? 'adr' : 'architecture';
  const outputDir = join(repoRoot, `stories/docs/${categoryDir}`);

  let generated = 0;
  docs.forEach(doc => {
    // Extract filename from markdownPath
    const mdFilename = doc.markdownPath.split('/').pop();
    const storyFilename = mdFilename.replace('.md', '.stories.tsx');
    const outputPath = join(outputDir, storyFilename);

    const content = generateStoryFile(doc, category);
    writeFileSync(outputPath, content, 'utf-8');
    generated++;
  });

  console.log(`✅ Generated ${generated} ${category} story files in ${outputDir}`);
}

/**
 * Generate ADR story files
 */
function generateAdrStoryFiles() {
  const adrData = generateAdrData();
  generateAllStoryFiles('adr', adrData);
}

/**
 * Generate Architecture story files
 */
function generateArchitectureStoryFiles() {
  const archData = generateArchitectureData();
  generateAllStoryFiles('architecture', archData);
}

// Main execution
const [,, docType, ...flags] = process.argv;
const generateStories = flags.includes('--stories');

if (docType === 'adr') {
  generateAdrDataFile();
  if (generateStories) generateAdrStoryFiles();
} else if (docType === 'architecture') {
  generateArchitectureDataFile();
  if (generateStories) generateArchitectureStoryFiles();
} else if (docType === 'all') {
  generateAdrDataFile();
  generateArchitectureDataFile();
  if (generateStories) {
    generateAdrStoryFiles();
    generateArchitectureStoryFiles();
  }
} else {
  console.log('Usage:');
  console.log('  node scripts/generate-unified-doc-data.mjs adr            # Generate ADR data only');
  console.log('  node scripts/generate-unified-doc-data.mjs architecture   # Generate Architecture data only');
  console.log('  node scripts/generate-unified-doc-data.mjs all            # Generate all data');
  console.log('  node scripts/generate-unified-doc-data.mjs all --stories  # Generate all data and story files');
  process.exit(1);
}
