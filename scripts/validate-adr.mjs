#!/usr/bin/env node

import { readFileSync, readdirSync, existsSync } from 'fs';
import { join } from 'path';

const adrDir = 'docs/adr';
const adrListPath = 'stories/viewers/docs/adr-list-data.ts';

let errors = [];
let warnings = [];

/**
 * Parse adr-list-data.ts to extract ADR metadata
 * This file is the SINGLE SOURCE OF TRUTH for ADR metadata
 * Now uses DocMetadata format with additional fields
 */
function parseAdrListData() {
  const content = readFileSync(adrListPath, 'utf-8');
  const adrMap = new Map();

  // Extract ADR entries from the array - new DocMetadata format
  // Pattern matches the JSON-like structure from the data file
  const adrPattern = /"number":\s*"([\d]+)",\s*"title":\s*"([^"]+)"(?:[^}]*"exportName":\s*"([^"]+)")?/g;

  let match;
  while ((match = adrPattern.exec(content)) !== null) {
    const [, number, title, exportName] = match;
    adrMap.set(number, {
      number,
      title,
      exportName: exportName || null
    });
  }

  return adrMap;
}

// Check all ADR files (exclude TEMPLATE)
const adrFiles = readdirSync(adrDir)
  .filter(f => f.startsWith('ADR-') && f.endsWith('.md') && !f.includes('TEMPLATE'))
  .sort();

console.log(`\n🔍 Validating ${adrFiles.length} ADR files...\n`);

// Load ADR list data as source of truth
const adrListContent = readFileSync(adrListPath, 'utf-8');
const adrListData = parseAdrListData();

adrFiles.forEach(file => {
  const match = file.match(/^ADR-(\d+)-(.+)\.md$/);
  if (!match) {
    errors.push(`❌ Invalid filename format: ${file}`);
    return;
  }

  const [, number, title] = match;
  const normalizeLinkPath = (value) => value.trim().replace(/^\.\//, '').replace(/\\/g, '/');

  // Check ADR list (DocMetadata format now includes "number" field)
  if (!adrListContent.includes(`"number": "${number}"`)) {
    errors.push(`❌ Missing in ADR list: ADR-${number} (${file})`);
  }
  
  // Check story file (current canonical name + legacy fallback)
  const canonicalStoryFile = `stories/docs/adr/ADR-${number}-${title}.stories.tsx`;
  const legacyStoryFile = `stories/docs/adr/adr-${number.toLowerCase()}.stories.tsx`;
  const storyFile = existsSync(canonicalStoryFile) ? canonicalStoryFile : legacyStoryFile;
  if (!existsSync(storyFile)) {
    warnings.push(`⚠️  Story file missing: ${canonicalStoryFile}`);
  } else {
    // NEW: Validate exportName matches actual export in story file
    const storyContent = readFileSync(storyFile, 'utf-8');
    const exportMatch = storyContent.match(/export const (\w+): Story =/);
    if (exportMatch) {
      const actualExportName = exportMatch[1];
      const adrData = adrListData.get(number);
      
      if (adrData && adrData.exportName) {
        // If exportName is specified in adr-list-data.ts, it must match
        if (adrData.exportName !== actualExportName) {
          errors.push(`❌ ADR-${number}: exportName mismatch. Expected '${adrData.exportName}' (from adr-list-data.ts) but found '${actualExportName}' in story file. Run 'npm run adr:generate' to fix.`);
        }
      } else {
        // If no exportName in adr-list-data.ts, suggest adding it for reliable linking
        warnings.push(`⚠️  ADR-${number}: Consider adding exportName: '${actualExportName}' to adr-list-data.ts for reliable linking`);
      }
    }
  }
  
  // Check Mermaid syntax
  const content = readFileSync(join(adrDir, file), 'utf-8');
  if (content.includes('```mermaid')) {
    // Check for common errors
    if (content.includes('strokeWidth:')) {
      errors.push(`❌ ADR-${number}: Use 'stroke-width' not 'strokeWidth'`);
    }
    if (content.includes('graph LR')) {
      warnings.push(`⚠️  ADR-${number}: Consider using 'graph TD' instead of 'graph LR'`);
    }
    
    // Check for header format
    const headerMatch = content.match(/^# ADR-(\d+):\s*(.+)$/m);
    if (!headerMatch) {
      errors.push(`❌ ADR-${number}: Missing or incorrect header format (should be: # ADR-${number}: Title)`);
    } else {
      const [, headerNumber, headerTitle] = headerMatch;
      if (headerNumber !== number) {
        errors.push(`❌ ADR-${number}: Header number mismatch (found ADR-${headerNumber})`);
      }
    }
  }
  
  // Check for status and date
  if (!content.match(/\*\*Status:\*\*\s*(.+)/)) {
    errors.push(`❌ ADR-${number}: Missing Status field`);
  }
  if (!content.match(/\*\*Date:\*\*\s*(.+)/)) {
    errors.push(`❌ ADR-${number}: Missing Date field`);
  }
  
  // Check Related field formatting
  const relatedMatch = content.match(/\*\*Related:\*\*[ \t]*\n([\s\S]*?)(\n---|\n## |$)/);
  const relatedLinkSet = new Set();
  if (relatedMatch) {
    const relatedContent = relatedMatch[1];
    
    // Check if Related is on one line (should be multi-line with markers)
    // Allow for blank line after Related: before list items
    const hasListMarkers = relatedContent.includes('\n-') || relatedContent.trim().startsWith('-');
    const hasInlineLinks = relatedContent.includes('[') && relatedContent.includes('](');
    
    if (hasInlineLinks && !hasListMarkers && relatedContent.trim().length > 0) {
      errors.push(`❌ ADR-${number}: Related field should use multi-line format with '-' markers, not single line`);
    }
    
    // Check for wrong marker type
    if (relatedContent.includes('\n*') && !relatedContent.match(/^\s*\*/m)) {
      errors.push(`❌ ADR-${number}: Related field should use '-' markers, not '*'`);
    }
    
    // Check for wrong field name
    if (content.includes('**Related ADRs:**')) {
      errors.push(`❌ ADR-${number}: Should use '**Related:**' not '**Related ADRs:**'`);
    }
    
    // Check format: should be "- [DOC-ID](path) — Title"
    const relatedLines = relatedContent.split('\n').filter(l => /^-\s+/.test(l.trim()));
    relatedLines.forEach((line, index) => {
      const trimmed = line.trim();
      const relatedLinkMatch = trimmed.match(/^-\s+\[([^\]]+)\]\(([^)]+)\)(.*)$/);
      if (!relatedLinkMatch) {
        warnings.push(`⚠️  ADR-${number}: Related entry should use '- [DOC-ID](path) — Title' format (line ${index + 1})`);
        return;
      }

      const [, , linkPath, rawSuffix] = relatedLinkMatch;
      relatedLinkSet.add(normalizeLinkPath(linkPath));

      const suffix = rawSuffix.trim();
      const hasTitleAfterLink = /^—\s+\S+/.test(suffix);
      if (!hasTitleAfterLink) {
        if (/^-\s+\S+/.test(suffix)) {
          warnings.push(`⚠️  ADR-${number}: Related entries should use em-dash separator: '- [Link](path) — Title' (line ${index + 1})`);
        } else {
          warnings.push(`⚠️  ADR-${number}: Related entry should include title text after link using '— Title' format (line ${index + 1})`);
        }
      }
    });
  } else {
    // Check if Related field exists but with wrong name
    if (content.includes('**Related ADRs:**')) {
      errors.push(`❌ ADR-${number}: Should use '**Related:**' not '**Related ADRs:**'`);
    }
  }

  // Check References -> Internal Documents formatting
  const internalDocsSectionMatch = content.match(/### Internal Documents\s*([\s\S]*?)(\n### |\n## |$)/);
  const internalDocsLinkSet = new Set();
  if (internalDocsSectionMatch) {
    const internalDocsContent = internalDocsSectionMatch[1];
    const internalDocLines = internalDocsContent
      .split('\n')
      .map(line => line.trim())
      .filter(line => /^-\s+/.test(line));

    internalDocLines.forEach((line, index) => {
      // Require: - [LINK](path) — Title
      const linkLineMatch = line.match(/^-\s+\[([^\]]+)\]\(([^)]+)\)(.*)$/);
      if (!linkLineMatch) return;

      const [, , linkPath, rawSuffix] = linkLineMatch;
      internalDocsLinkSet.add(normalizeLinkPath(linkPath));

      const suffix = rawSuffix.trim();
      const hasTitleAfterLink = /^—\s+\S+/.test(suffix);
      if (!hasTitleAfterLink) {
        if (/^-\s+\S+/.test(suffix)) {
          warnings.push(`⚠️  ADR-${number}: References/Internal Documents should use em-dash separator: '- [Link](path) — Title' (line ${index + 1})`);
        } else {
          warnings.push(`⚠️  ADR-${number}: References/Internal Documents entry should include title text after link using '— Title' format (line ${index + 1})`);
        }
      }
    });
  }

  // If References/Internal Documents exists, Related links must be a subset of it
  if (relatedLinkSet.size > 0 && internalDocsLinkSet.size > 0) {
    for (const relatedLink of relatedLinkSet) {
      if (!internalDocsLinkSet.has(relatedLink)) {
        warnings.push(`⚠️  ADR-${number}: Related link '${relatedLink}' should also be listed in References -> Internal Documents`);
      }
    }
  }
});

// Report results
if (errors.length > 0) {
  console.log('❌ ERRORS:\n');
  errors.forEach(e => console.log(`  ${e}`));
  console.log('');
}

if (warnings.length > 0) {
  console.log('⚠️  WARNINGS:\n');
  warnings.forEach(w => console.log(`  ${w}`));
  console.log('');
}

if (errors.length === 0 && warnings.length === 0) {
  console.log('✅ All ADRs validated successfully!\n');
  process.exit(0);
} else {
  console.log(`\nFound ${errors.length} error(s) and ${warnings.length} warning(s).\n`);
  process.exit(errors.length > 0 ? 1 : 0);
}
