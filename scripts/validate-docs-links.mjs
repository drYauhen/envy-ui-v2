#!/usr/bin/env node

import { readFileSync, readdirSync, existsSync } from 'fs';
import { join, dirname, resolve } from 'path';
import { fileURLToPath } from 'url';

const __filename = fileURLToPath(import.meta.url);
const __dirname = dirname(__filename);
const repoRoot = resolve(__dirname, '..');
const EXCLUDED_REGISTRY_PREFIXES = ['dirty/', 'tasks/', 'steps/'];
const STORY_FILE_EXTENSIONS = ['.stories.js', '.stories.jsx', '.stories.mjs', '.stories.ts', '.stories.tsx'];
const OVERVIEW_FILE_PATTERN = /docs\/[^/]+\/00-[^-]+-overview\.stories\.tsx$/;

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
 * Parse docs registry by loading all data files directly (same as docs-registry.ts)
 * This ensures we get the complete registry as built dynamically
 */
function parseDocsRegistry() {
  const docsMap = new Map(); // path -> DocRegistryItem
  const idMap = new Map(); // id -> DocRegistryItem

  // Load ADR data
  const adrListPath = join(repoRoot, 'stories/viewers/docs/adr-list-data.ts');

  // Parse ADR list data (new DocMetadata format with markdownPath and storybookId)
  const adrListContent = readFileSync(adrListPath, 'utf-8');
  // Extract each ADR object with markdownPath and storybookId
  const adrObjectPattern = /\{\s*"number":\s*"([^"]+)",[\s\S]*?"markdownPath":\s*"([^"]+)"[\s\S]*?"storybookId":\s*"([^"]+)"\s*\}/g;
  let match;

  while ((match = adrObjectPattern.exec(adrListContent)) !== null) {
    const [, number, markdownPath, storybookId] = match;
    const path = markdownPath.replace('/docs/', '');

    const doc = {
      id: `adr-${number}`,
      path,
      title: '', // Will be filled from full parse if needed
      category: 'adr',
      exportName: null,
      storybookId,
      aliases: []
    };

    docsMap.set(doc.path, doc);
    idMap.set(doc.id, doc);
  }

  // Parse architecture data (new DocMetadata format with markdownPath and storybookId)
  const archDataPath = join(repoRoot, 'stories/viewers/docs/architecture-data.ts');
  const archDataContent = readFileSync(archDataPath, 'utf-8');

  // Extract each architecture object with markdownPath and storybookId
  const archObjectPattern = /\{\s*"number":\s*"([^"]+)",[\s\S]*?"markdownPath":\s*"([^"]+)"[\s\S]*?"storybookId":\s*"([^"]+)"\s*\}/g;

  while ((match = archObjectPattern.exec(archDataContent)) !== null) {
    const [, number, markdownPath, storybookId] = match;
    const path = markdownPath.replace('/docs/', '');

    // Extract category and number from path (e.g., /docs/architecture/ARCH-components-001-title.md)
    const pathMatch = path.match(/ARCH-([^-]+)-(\d{3})/);
    const majorCategory = pathMatch ? pathMatch[1].toUpperCase() : 'UNKNOWN';

    const doc = {
      id: `arch-${majorCategory}-${number}`,
      path,
      title: '', // Will be filled from full parse if needed
      category: 'architecture',
      exportName: null,
      status: 'active',
      storybookId,
      aliases: []
    };

    docsMap.set(path, doc);
    idMap.set(doc.id, doc);
  }

  // Parse workflow data (new DocMetadata structure)
  const workflowDataPath = join(repoRoot, 'stories/viewers/docs/workflow-data.ts');
  const workflowDataContent = readFileSync(workflowDataPath, 'utf-8');
  // Match new DocMetadata structure: number, title, markdownPath, storybookId, aliases
  const workflowPattern = /\{\s*number:\s*"(\d+)",\s*title:\s*"([^"]+)",\s*category:\s*"([^"]+)",\s*status:\s*"([^"]+)",\s*date:\s*"[^"]+",\s*lastUpdated:\s*"[^"]+",\s*owner:\s*"[^"]+",\s*assistance:\s*"[^"]+",\s*exportName:\s*"([^"]+)",\s*markdownPath:\s*"([^"]+)",\s*storybookId:\s*"([^"]+)",\s*aliases:\s*(\[[^\]]*\])\s*\}/g;

  while ((match = workflowPattern.exec(workflowDataContent)) !== null) {
    const [, number, title, category, status, exportName, markdownPath, storybookId, aliasesStr] = match;
    const path = markdownPath.replace('/docs/', ''); // Remove /docs/ prefix
    const aliases = aliasesStr ? JSON.parse(aliasesStr.replace(/'/g, '"')) : [];

    const doc = {
      id: `workflow-${number}`,
      path,
      title,
      category,
      storybookId,
      status,
      exportName,
      aliases
    };

    docsMap.set(path, doc);
    idMap.set(doc.id, doc);
    aliases.forEach(alias => docsMap.set(alias, doc));
  }

  // Parse guide data
  const guideDataPath = join(repoRoot, 'stories/viewers/docs/guide-data.ts');
  const guideDataContent = readFileSync(guideDataPath, 'utf-8');
  // Support both JSON and TypeScript syntax: "key": "value" or key: 'value'
  const guidePattern = /\s*\{\s*(?:")?id(?:")?\s*:\s*['"]([^'"]+)['"]\s*,\s*(?:")?title(?:")?\s*:\s*['"]([^'"]+)['"]\s*,\s*(?:")?filename(?:")?\s*:\s*['"]([^'"]+)['"]\s*(?:,\s*(?:")?storybookId(?:")?\s*:\s*['"]([^'"]+)['"])?/g;

  while ((match = guidePattern.exec(guideDataContent)) !== null) {
    const [, id, title, filename, storybookId] = match;

    const doc = {
      id,
      path: filename, // Root level files
      title,
      category: 'other',
      storybookId: storybookId || undefined,
      status: 'active',
      aliases: []
    };

    docsMap.set(filename, doc);
    idMap.set(doc.id, doc);
  }

  // Parse tokens data (new DocMetadata structure)
  const tokensDataPath = join(repoRoot, 'stories/viewers/docs/tokens-data.ts');
  const tokensDataContent = readFileSync(tokensDataPath, 'utf-8');
  // Match new DocMetadata structure: number, title, markdownPath, storybookId, aliases
  const tokensPattern = /\{\s*number:\s*"(\d+)",\s*title:\s*"([^"]+)",\s*category:\s*"([^"]+)",\s*status:\s*"([^"]+)",\s*date:\s*"[^"]+",\s*lastUpdated:\s*"[^"]+",\s*owner:\s*"[^"]+",\s*assistance:\s*"[^"]+",\s*exportName:\s*"([^"]+)",\s*markdownPath:\s*"([^"]+)",\s*storybookId:\s*"([^"]+)",\s*aliases:\s*(\[[^\]]*\])\s*\}/g;

  while ((match = tokensPattern.exec(tokensDataContent)) !== null) {
    const [, number, title, category, status, exportName, markdownPath, storybookId, aliasesStr] = match;
    const path = markdownPath.replace('/docs/', ''); // Remove /docs/ prefix
    const aliases = aliasesStr ? JSON.parse(aliasesStr.replace(/'/g, '"')) : [];

    const doc = {
      id: `tokens-${number}`,
      path,
      title,
      category,
      storybookId,
      status,
      exportName,
      aliases
    };

    docsMap.set(path, doc);
    idMap.set(doc.id, doc);
    aliases.forEach(alias => docsMap.set(alias, doc));
  }

  // Add static guide documents (READMEs, templates, etc.)
  const staticDocs = [
    { id: 'adr-readme', path: 'adr/README.md', title: 'Architectural Decision Records (ADR)', category: 'adr' },
    { id: 'adr-agent-guide', path: 'adr/AGENT-GUIDE.md', title: 'ADR Agent Guide', category: 'adr' },
    { id: 'adr-template', path: 'adr/ADR-TEMPLATE.md', title: 'ADR Template', category: 'adr' },
    { id: 'architecture-readme', path: 'architecture/README.md', title: 'Architecture Documentation', category: 'architecture' },
    { id: 'architecture-guide', path: 'architecture/ARCHITECTURE-GUIDE.md', title: 'Architecture Documentation Guide', category: 'architecture' },
    { id: 'architecture-template', path: 'architecture/ARCHITECTURE-TEMPLATE.md', title: 'Architecture Document Template', category: 'architecture' },
    { id: 'workflows-readme', path: 'workflows/README.md', title: 'Workflows Documentation', category: 'workflows' },
    { id: 'workflows-guide', path: 'workflows/WORKFLOWS-GUIDE.md', title: 'Workflows Documentation Guide', category: 'workflows' },
    { id: 'workflows-template', path: 'workflows/WORKFLOWS-TEMPLATE.md', title: 'Workflow Document Template', category: 'workflows' },
    { id: 'tokens-readme', path: 'tokens/README.md', title: 'Token System Documentation', category: 'other' },
    { id: 'tokens-guide', path: 'tokens/TOKENS-GUIDE.md', title: 'Tokens Documentation Guide', category: 'other' },
    { id: 'tokens-template', path: 'tokens/TOKENS-TEMPLATE.md', title: 'Token Document Template', category: 'other' },
    { id: 'tokens-use-cases', path: 'tokens/use-cases.md', title: 'Token Use Cases', category: 'other' },
    { id: 'tokens-reference', path: 'tokens/reference.md', title: 'Token Reference', category: 'other' },
    { id: 'docs-main-guide', path: 'DOCS-GUIDE.md', title: 'Documentation Guide', category: 'other' },
    { id: 'guides-guide', path: 'GUIDES-GUIDE.md', title: 'Guides Documentation Guide', category: 'other' },
    { id: 'guides-template', path: 'GUIDES-TEMPLATE.md', title: 'Guide Document Template', category: 'other' },
    { id: 'guide-ai-agent-documentation', path: 'AI-AGENT-DOCUMENTATION-GUIDE.md', title: 'AI Agent Documentation Guide', category: 'other' },
    { id: 'guide-canonical-doc-format', path: 'CANONICAL-DOC-FORMAT.md', title: 'Canonical Documentation Format', category: 'other' },
    { id: 'guide-documentation-system-summary', path: 'DOCUMENTATION-SYSTEM-SUMMARY.md', title: 'Documentation System Summary', category: 'other' },
    { id: 'migration-unified-doc-processing', path: 'migrations/2026-01-14-unified-doc-processing.md', title: 'Unified Doc Processing Migration', category: 'other' }
  ];

  staticDocs.forEach(doc => {
    docsMap.set(doc.path, doc);
    idMap.set(doc.id, doc);
  });

  return { docsMap, idMap };
}

/**
 * Find all markdown files in docs/
 */
function findAllMarkdownFiles() {
  const docsDir = join(repoRoot, 'docs');
  const files = [];
  
  function walkDir(dir, basePath = '') {
    try {
      const entries = readdirSync(dir, { withFileTypes: true });
      
      for (const entry of entries) {
        // Skip hidden directories and node_modules
        if (entry.name.startsWith('.') || entry.name === 'node_modules') {
          continue;
        }
        
        const fullPath = join(dir, entry.name);
        const relativePath = basePath ? join(basePath, entry.name) : entry.name;
        
        if (entry.isDirectory()) {
          walkDir(fullPath, relativePath);
        } else if (entry.name.endsWith('.md')) {
          files.push({
            fullPath,
            relativePath: relativePath.replace(/\\/g, '/') // Normalize path separators
          });
        }
      }
    } catch (err) {
      // Skip directories we can't read
      console.warn(`Warning: Could not read directory ${dir}: ${err.message}`);
    }
  }
  
  walkDir(docsDir);
  return files;
}

/**
 * Find all Storybook story files in stories/
 */
function findAllStoryFiles() {
  const storiesDir = join(repoRoot, 'stories');
  const files = [];

  function walkDir(dir) {
    try {
      const entries = readdirSync(dir, { withFileTypes: true });
      for (const entry of entries) {
        if (entry.name.startsWith('.') || entry.name === 'node_modules') {
          continue;
        }
        const fullPath = join(dir, entry.name);
        if (entry.isDirectory()) {
          walkDir(fullPath);
          continue;
        }
        if (STORY_FILE_EXTENSIONS.some(ext => entry.name.endsWith(ext))) {
          files.push(fullPath);
        }
      }
    } catch (err) {
      console.warn(`Warning: Could not read directory ${dir}: ${err.message}`);
    }
  }

  walkDir(storiesDir);
  return files;
}

/**
 * Parse story files to collect Storybook ids
 */
function buildStoryIdSet() {
  const storyFiles = findAllStoryFiles();
  const storyIds = new Set();
  const missingTitle = [];
  const missingExports = [];

  storyFiles.forEach((filePath) => {
    const content = readFileSync(filePath, 'utf-8');
    const titleMatch = content.match(/title:\s*['"]([^'"]+)['"]/);
    if (!titleMatch) {
      missingTitle.push(filePath);
      return;
    }

    const storyTitle = titleMatch[1];
    const exportMatches = [...content.matchAll(/export const (\w+)\s*:\s*Story\w*/g)];
    if (exportMatches.length === 0) {
      missingExports.push(filePath);
      return;
    }

    exportMatches.forEach((match) => {
      const exportName = match[1];
      const storyId = toStoryId(storyTitle, exportName);
      storyIds.add(storyId);
    });
  });

  return { storyIds, missingTitle, missingExports };
}

/**
 * Find overview story files
 */
function findOverviewStoryFiles() {
  const storiesDir = join(repoRoot, 'stories');
  const overviewFiles = [];

  function walkDir(dir) {
    try {
      const entries = readdirSync(dir, { withFileTypes: true });
      for (const entry of entries) {
        if (entry.name.startsWith('.') || entry.name === 'node_modules') {
          continue;
        }
        const fullPath = join(dir, entry.name);
        if (entry.isDirectory()) {
          walkDir(fullPath);
          continue;
        }
        const relativePath = fullPath.replace(storiesDir + '/', '').replace(/\\/g, '/');
        if (OVERVIEW_FILE_PATTERN.test(relativePath)) {
          overviewFiles.push(fullPath);
        }
      }
    } catch (err) {
      console.warn(`Warning: Could not read directory ${dir}: ${err.message}`);
    }
  }

  walkDir(storiesDir);
  console.log(`Total overview files found: ${overviewFiles.length}`);
  return overviewFiles;
}

/**
 * Parse overview story files to extract DocListViewer usage and data sources
 */
function parseOverviewStories() {
  const overviewFiles = findOverviewStoryFiles();
  const overviewLinks = [];

  overviewFiles.forEach(filePath => {
    try {
      const content = readFileSync(filePath, 'utf-8');

      // Look for DocListViewer or DocSectionListViewer usage
      const docListViewerMatch = content.match(/<DocListViewer\s+docs=\{([^}]+)\}\s*category="([^"]+)"/);
      const docSectionListViewerMatch = content.match(/<DocSectionListViewer[\s\S]*?docs=\{([^}]+)\}/);
      let docsVar, category;
      if (docListViewerMatch) {
        [, docsVar, category] = docListViewerMatch;
      } else if (docSectionListViewerMatch) {
        [, docsVar] = docSectionListViewerMatch;
        category = 'workflows'; // Workflows use DocSectionListViewer
      } else {
        return; // Not using either viewer
      }

      // Find the data source (e.g., adrDocs, architectureDocs)
      const dataSourceMatch = content.match(new RegExp(`${docsVar}\\s*=\\s*([^;]+)\\.map\\(`));
      if (!dataSourceMatch) {
        return;
      }

      const [, sourceVar] = dataSourceMatch;

      // Parse the data source
      let docsData = [];
      if (sourceVar === 'adrs') {
        docsData = parseAdrData();
      } else if (sourceVar === 'architectures') {
        docsData = parseArchitectureData();
      } else if (sourceVar === 'docsRegistry') {
        // Workflows use docsRegistry.filter() directly
        docsData = parseWorkflowData();
      }

      // Generate expected story links for each document
      docsData.forEach(doc => {
        const storyId = getStoryIdForDoc(doc, category);
        const storyPath = `?path=/story/docs-${category}--${storyId}`;

        overviewLinks.push({
          overviewFile: filePath.replace(repoRoot + '/', ''),
          doc,
          category,
          generatedLink: storyPath,
          storyId
        });
      });

    } catch (err) {
      console.warn(`Warning: Could not parse overview file ${filePath}: ${err.message}`);
    }
  });

  return overviewLinks;
}

/**
 * Parse ADR data from adr-list-data.ts
 */
function parseAdrData() {
  const adrListPath = join(repoRoot, 'stories/viewers/docs/adr-list-data.ts');
  const content = readFileSync(adrListPath, 'utf-8');
  const docs = [];

  const pattern = /\{\s*number:\s*['"](\d{4})['"],\s*title:\s*['"]([^'"]+)['"],\s*status:\s*['"]([^'"]+)['"],\s*date:\s*['"]([^'"]+)['"](?:,\s*exportName:\s*['"]([^'"]+)['"])?\s*\}/g;

  let match;
  while ((match = pattern.exec(content)) !== null) {
    const [, number, title, status, date, exportName] = match;
    docs.push({
      number,
      title,
      category: 'adr',
      status,
      date,
      exportName: exportName || null
    });
  }

  return docs;
}

/**
 * Parse architecture data from architecture-data.ts
 */
function parseArchitectureData() {
  const archDataPath = join(repoRoot, 'stories/viewers/docs/architecture-data.ts');
  const content = readFileSync(archDataPath, 'utf-8');
  const docs = [];

  // Extract architectures array
  const arrayMatch = content.match(/export const architectures\s*=\s*\[([\s\S]*?)\];/);
  if (!arrayMatch) return docs;

  const arrayContent = arrayMatch[1];

  // Match objects with all fields, extracting number, title, majorCategory, and storybookId
  // Pattern matches the full object structure generated by docs:regenerate-data
  const itemPattern = /\{\s*"number":\s*"([^"]+)",\s*"title":\s*"([^"]+)",[\s\S]*?"majorCategory":\s*"([^"]+)",[\s\S]*?"storybookId":\s*"([^"]+)"\s*\}/g;

  let match;
  while ((match = itemPattern.exec(arrayContent)) !== null) {
    const [, number, title, majorCategory, storybookId] = match;
    const id = `arch-${majorCategory}-${number}`;
    docs.push({
      number,
      title,
      category: 'architecture',
      status: 'active',
      id,
      storybookId
    });
  }
  return docs;
}

/**
 * Parse workflow data from docs registry (filtered by workflows/)
 */
function parseWorkflowData() {
  const { docsMap } = parseDocsRegistry();
  const docs = [];

  docsMap.forEach((doc, path) => {
    if (path.startsWith('workflows/')) {
      docs.push({
        number: doc.id.split('-').pop() || '001',
        title: doc.title,
        category: 'workflows',
        status: 'active',
        id: doc.id,
        storybookId: doc.storybookId,
        path: doc.path
      });
    }
  });

  return docs;
}

/**
 * Generate story ID for a document (same logic as DocListViewer)
 */
function getStoryIdForDoc(doc, category) {
  if (category === 'adr') {
    return doc.exportName || `adr-${doc.number.toLowerCase()}`;
  } else if (category === 'architecture') {
    return doc.storybookId?.replace('docs-architecture--', '') || doc.id || doc.number;
  } else if (category === 'workflows') {
    return doc.storybookId?.replace('docs-workflows--', '') || doc.id || doc.number;
  }
  return doc.number;
}

/**
 * Extract all markdown links from content
 */
function extractLinks(content, filePath) {
  const links = [];
  // Match markdown links: [text](./path/to/file.md) or [text](../path/to/file.md)
  // Skip links in code blocks (```)
  const linkPattern = /\[([^\]]+)\]\((\.\.?\/[^)]+\.md)\)/g;
  
  // Check if we're inside a code block
  const codeBlockPattern = /```[\s\S]*?```/g;
  const codeBlocks = [];
  let codeMatch;
  while ((codeMatch = codeBlockPattern.exec(content)) !== null) {
    codeBlocks.push({ start: codeMatch.index, end: codeMatch.index + codeMatch[0].length });
  }
  
  const lines = content.split('\n');
  let match;
  while ((match = linkPattern.exec(content)) !== null) {
    // Skip links inside code blocks
    const isInCodeBlock = codeBlocks.some(block => 
      match.index >= block.start && match.index < block.end
    );
    if (isInCodeBlock) {
      continue;
    }
    
    const [, linkText, linkPath] = match;
    // Resolve relative path
    const fileDir = dirname(filePath);
    try {
      const resolvedPath = resolve(fileDir, linkPath);
      // Get relative path from docs/ root
      const docsDir = join(repoRoot, 'docs');
      const relativePath = resolvedPath.replace(docsDir + '/', '').replace(/\\/g, '/');
      
      links.push({
        text: linkText,
        path: linkPath,
        resolvedPath: relativePath,
        line: content.substring(0, match.index).split('\n').length
      });
    } catch (err) {
      // Invalid path
      links.push({
        text: linkText,
        path: linkPath,
        resolvedPath: null,
        line: content.substring(0, match.index).split('\n').length,
        error: err.message
      });
    }
  }
  
  return links;
}

// Main validation
let errors = [];
let warnings = [];
let info = [];

try {
  const { docsMap, idMap } = parseDocsRegistry();
  const allFiles = findAllMarkdownFiles();
  const { storyIds, missingTitle, missingExports } = buildStoryIdSet();
  
  console.log(`\n🔍 Validating links in ${allFiles.length} documentation files...\n`);
  console.log(`📋 Found ${docsMap.size} registered documents in registry\n`);
  console.log(`📚 Found ${storyIds.size} Storybook story ids\n`);
  
  allFiles.forEach(({ fullPath, relativePath }) => {
    try {
      const content = readFileSync(fullPath, 'utf-8');
      const links = extractLinks(content, fullPath);
      
      links.forEach(link => {
        // Check for path resolution errors
        if (link.error) {
          errors.push(`❌ ${relativePath}:${link.line}: Invalid link path '${link.path}' - ${link.error}`);
          return;
        }
        
        if (!link.resolvedPath) {
          errors.push(`❌ ${relativePath}:${link.line}: Could not resolve link path '${link.path}'`);
          return;
        }
        
        // Skip template/example links (XXXX, YYYY, file.md, descriptive-title)
        const isTemplateLink = link.resolvedPath.includes('XXXX') || 
                               link.resolvedPath.includes('YYYY') || 
                               link.resolvedPath.includes('file.md') ||
                               link.resolvedPath.includes('filename.md') ||
                               link.resolvedPath.includes('descriptive-title');
        
        if (isTemplateLink) {
          return; // Skip template links
        }
        
        // Check if link points outside docs/ directory
        const isExternalLink = !link.resolvedPath.startsWith('adr/') && 
                               !link.resolvedPath.startsWith('architecture/') && 
                               !link.resolvedPath.startsWith('workflows/') &&
                               !link.resolvedPath.startsWith('tokens/') &&
                               !link.resolvedPath.startsWith('tasks/') &&
                               !link.resolvedPath.startsWith('steps/') &&
                               !link.resolvedPath.startsWith('dirty/') &&
                               !link.resolvedPath.match(/^[^/]+\.md$/); // Root level files
        
        if (isExternalLink) {
          // Check if external file exists
          const externalPath = resolve(repoRoot, link.resolvedPath);
          if (!existsSync(externalPath)) {
            errors.push(`❌ ${relativePath}:${link.line}: Broken external link to '${link.path}' (resolved: ${link.resolvedPath})`);
          }
          return; // Don't check registration for external links
        }
        
        // Check if target file exists
        const targetPath = join(repoRoot, 'docs', link.resolvedPath);
        if (!existsSync(targetPath)) {
          errors.push(`❌ ${relativePath}:${link.line}: Broken link to '${link.path}' (resolved: ${link.resolvedPath})`);
          return;
        }
        
        // Check if target is registered in registry
        const targetRelative = link.resolvedPath;
        const isExcludedFromRegistry = EXCLUDED_REGISTRY_PREFIXES.some(prefix =>
          targetRelative.startsWith(prefix)
        );
        if (isExcludedFromRegistry) {
          return;
        }
        const registeredDoc = docsMap.get(targetRelative);
        
        if (!registeredDoc) {
          warnings.push(`⚠️  ${relativePath}:${link.line}: Link to '${link.path}' (${targetRelative}) is not registered in docs-registry.ts. Consider adding it for better link validation.`);
        }
      });
    } catch (err) {
      errors.push(`❌ ${relativePath}: Error reading file - ${err.message}`);
    }
  });
  
  // Check for unregistered files
  allFiles.forEach(({ relativePath }) => {
    if (!docsMap.get(relativePath)) {
      if (EXCLUDED_REGISTRY_PREFIXES.some(prefix => relativePath.startsWith(prefix))) {
        return;
      }
      // Skip template files and guides
      if (!relativePath.includes('TEMPLATE') && !relativePath.includes('AGENT-GUIDE') && !relativePath.includes('README')) {
        info.push(`ℹ️  ${relativePath}: File exists but is not registered in docs-registry.ts`);
      }
    }
  });

  // Validate docs registry storybookId entries
  const registeredDocs = new Map();
  idMap.forEach((doc) => registeredDocs.set(doc.id, doc));
  registeredDocs.forEach((doc) => {
    // Check if document has storybookId defined
    if (doc.storybookId) {
      // If storybookId is defined, verify it exists in actual story files
      if (!storyIds.has(doc.storybookId)) {
        errors.push(`❌ docs-registry.ts: Storybook id '${doc.storybookId}' not found in stories for '${doc.path}'`);
      }
    } else {
      // Warn/error if document doesn't have storybookId but should have one
      // Categories that typically should have Storybook stories:
      const shouldHaveStory = ['adr', 'architecture', 'workflows', 'other', 'tokens'].includes(doc.category);
      // Skip template/guide files and README files (these are meta-documentation)
      const isMetaDoc = doc.path.includes('TEMPLATE') ||
                        doc.path.includes('-GUIDE') ||
                        doc.path.includes('README');

      // Special handling for root-level guide files (DOCS-GUIDE.md, etc.)
      // These should have storybookId if they're meant to be viewable in Storybook
      const isRootGuide = /^[A-Z-]+\.md$/.test(doc.path);

      if (shouldHaveStory && !isMetaDoc) {
        // Critical categories (ADR, Architecture) require storybookId for link resolution
        const isCritical = ['adr', 'architecture'].includes(doc.category);
        const severity = isCritical ? '❌' : (isRootGuide ? '⚠️' : 'ℹ️');
        const message = isCritical
          ? `${severity} docs-registry.ts: Document '${doc.path}' (${doc.id}) MISSING required storybookId field. Links to this document will be broken in Storybook.`
          : (isRootGuide
              ? `${severity}  docs-registry.ts: Document '${doc.path}' (${doc.id}) should have storybookId for proper link resolution in Storybook.`
              : `${severity}  docs-registry.ts: Document '${doc.path}' (${doc.id}) doesn't have storybookId. Links from other docs may not work correctly.`);

        if (isCritical) {
          errors.push(message);
        } else {
          warnings.push(message);
        }
      }
    }
  });

  // Validate ADR story ids (Docs/ADR)
  registeredDocs.forEach((doc) => {
    if (doc.category !== 'adr' || !/^adr\/ADR-\d{4}/.test(doc.path)) {
      return;
    }
    if (!doc.exportName) {
      return;
    }
    const expectedId = toStoryId('Docs/ADR', doc.exportName);
    if (!storyIds.has(expectedId)) {
      errors.push(`❌ ADR story missing: expected '${expectedId}' for '${doc.path}'`);
    }
  });

  // Validate overview story links (check DocListViewer generated links)
  console.log(`🔍 Validating overview story links...\n`);
  const overviewLinks = parseOverviewStories();
  console.log(`📋 Found ${overviewLinks.length} overview story links to validate\n`);
  overviewLinks.forEach(link => {
    console.log(`   - ${link.overviewFile}: ${link.generatedLink} -> ${link.storyId}`);
    if (!storyIds.has(link.storyId)) {
      errors.push(`❌ ${link.overviewFile}: Broken overview link '${link.generatedLink}' - story ID '${link.storyId}' not found in generated stories`);
    }
  });
  console.log(`📋 Validated ${overviewLinks.length} overview story links\n`);

  if (missingTitle.length > 0) {
    warnings.push(`⚠️  ${missingTitle.length} story file(s) missing meta title: ${missingTitle.join(', ')}`);
  }
  if (missingExports.length > 0) {
    warnings.push(`⚠️  ${missingExports.length} story file(s) missing Story exports: ${missingExports.join(', ')}`);
  }

} catch (err) {
  console.error(`❌ Fatal error: ${err.message}`);
  console.error(err.stack);
  process.exit(1);
}

// Report results
if (errors.length > 0) {
  console.log('❌ BROKEN LINKS:\n');
  errors.forEach(e => console.log(`  ${e}`));
  console.log('');
}

if (warnings.length > 0) {
  console.log('⚠️  WARNINGS:\n');
  warnings.forEach(w => console.log(`  ${w}`));
  console.log('');
}

if (info.length > 0) {
  console.log('ℹ️  INFO (unregistered files):\n');
  info.forEach(i => console.log(`  ${i}`));
  console.log('');
}

if (errors.length === 0 && warnings.length === 0 && info.length === 0) {
  console.log('✅ All documentation links validated successfully!\n');
  process.exit(0);
} else {
  const summary = [];
  if (errors.length > 0) summary.push(`${errors.length} broken link(s)`);
  if (warnings.length > 0) summary.push(`${warnings.length} warning(s)`);
  if (info.length > 0) summary.push(`${info.length} unregistered file(s)`);
  console.log(`\nFound: ${summary.join(', ')}.\n`);
  process.exit(errors.length > 0 ? 1 : 0);
}
