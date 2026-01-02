#!/usr/bin/env node

import { readFileSync, readdirSync, existsSync } from 'fs';
import { join, dirname, resolve } from 'path';
import { fileURLToPath } from 'url';

const __filename = fileURLToPath(import.meta.url);
const __dirname = dirname(__filename);
const repoRoot = resolve(__dirname, '..');

/**
 * Parse docs-registry.ts to get all registered documents
 * Uses simple regex parsing (not a full TypeScript parser)
 * Also parses ADR documents from adr-list-data.ts and adr-filename-map.ts
 */
function parseDocsRegistry() {
  const registryPath = join(repoRoot, 'stories/viewers/docs/docs-registry.ts');
  const adrListPath = join(repoRoot, 'stories/viewers/docs/adr-list-data.ts');
  const adrFilenameMapPath = join(repoRoot, 'stories/viewers/docs/adr-filename-map.ts');
  
  const docsMap = new Map(); // path -> DocRegistryItem
  const idMap = new Map(); // id -> DocRegistryItem
  
  // First, parse ADR filename map
  const filenameMapContent = readFileSync(adrFilenameMapPath, 'utf-8');
  const filenameMap = {};
  const filenamePattern = /"(\d{4})":\s*"([^"]+)"/g;
  let match;
  while ((match = filenamePattern.exec(filenameMapContent)) !== null) {
    filenameMap[match[1]] = match[2];
  }
  
  // Parse ADR list data
  const adrListContent = readFileSync(adrListPath, 'utf-8');
  const adrPattern = /\{\s*number:\s*['"](\d{4})['"],\s*title:\s*['"]([^'"]+)['"],\s*status:\s*['"]([^'"]+)['"],\s*date:\s*['"]([^'"]+)['"](?:,\s*exportName:\s*['"]([^'"]+)['"])?\s*\}/g;
  
  while ((match = adrPattern.exec(adrListContent)) !== null) {
    const [, number, title, status, date, exportName] = match;
    const filename = filenameMap[number] || `ADR-${number}.md`;
    const doc = {
      id: `adr-${number}`,
      path: `adr/${filename}`,
      title,
      category: 'adr',
      exportName: exportName || null,
      aliases: []
    };
    
    docsMap.set(doc.path, doc);
    idMap.set(doc.id, doc);
  }
  
  // Parse registry file for non-ADR documents
  const registryContent = readFileSync(registryPath, 'utf-8');
  // Pattern: { id: '...', path: '...', title: '...', category: '...' }
  const docPattern = /\{\s*id:\s*['"]([^'"]+)['"],\s*path:\s*['"]([^'"]+)['"],\s*title:\s*['"]([^'"]+)['"],\s*category:\s*['"]([^'"]+)['"](?:,\s*exportName:\s*['"]([^'"]+)['"])?(?:,\s*aliases:\s*\[([^\]]+)\])?\s*\}/g;
  
  while ((match = docPattern.exec(registryContent)) !== null) {
    const [, id, path, title, category, exportName, aliasesStr] = match;
    // Skip ADR documents (already parsed)
    if (id.startsWith('adr-') && category === 'adr') {
      continue;
    }
    
    const aliases = aliasesStr 
      ? aliasesStr.split(',').map(a => a.trim().replace(/['"]/g, '').trim()).filter(Boolean)
      : [];
    
    const doc = {
      id,
      path,
      title,
      category,
      exportName: exportName || null,
      aliases
    };
    
    docsMap.set(path, doc);
    idMap.set(id, doc);
    
    // Also register aliases
    aliases.forEach(alias => {
      docsMap.set(alias, doc);
    });
  }
  
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
  
  console.log(`\n🔍 Validating links in ${allFiles.length} documentation files...\n`);
  console.log(`📋 Found ${docsMap.size} registered documents in registry\n`);
  
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
                               link.resolvedPath.includes('descriptive-title');
        
        if (isTemplateLink) {
          return; // Skip template links
        }
        
        // Check if link points outside docs/ directory
        const isExternalLink = !link.resolvedPath.startsWith('adr/') && 
                               !link.resolvedPath.startsWith('architecture/') && 
                               !link.resolvedPath.startsWith('workflows/') &&
                               !link.resolvedPath.startsWith('tasks/') &&
                               !link.resolvedPath.startsWith('steps/') &&
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
      // Skip template files and guides
      if (!relativePath.includes('TEMPLATE') && !relativePath.includes('AGENT-GUIDE') && !relativePath.includes('README')) {
        info.push(`ℹ️  ${relativePath}: File exists but is not registered in docs-registry.ts`);
      }
    }
  });
  
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

