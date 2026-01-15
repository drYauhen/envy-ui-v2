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

  // Check ADR list (DocMetadata format now includes "number" field)
  if (!adrListContent.includes(`"number": "${number}"`)) {
    errors.push(`❌ Missing in ADR list: ADR-${number} (${file})`);
  }
  
  // Check story file
  const storyFile = `stories/docs/adr/adr-${number.toLowerCase()}.stories.tsx`;
  if (!existsSync(storyFile)) {
    warnings.push(`⚠️  Story file missing: ${storyFile}`);
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
  
  // Check Assistance field formatting
  const assistanceMatch = content.match(/\*\*Assistance:\*\*\s*(.+?)(\n|$)/);
  if (assistanceMatch) {
    // Check for trailing spaces (should have 2 spaces for markdown line break)
    const assistanceLine = assistanceMatch[0];
    if (!assistanceLine.endsWith('  \n') && !assistanceLine.endsWith('  \r\n') && !assistanceLine.endsWith('  ')) {
      warnings.push(`⚠️  ADR-${number}: Assistance field should end with 2 spaces for markdown line break`);
    }
  }
  
  // Check Related field formatting
  const relatedMatch = content.match(/\*\*Related:\*\*\s*(.+?)(\n\n|---)/s);
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
    
    // Check format: should be "- [ADR-XXXX](./file.md) — Title"
    const relatedLines = relatedContent.split('\n').filter(l => l.trim().startsWith('-'));
    relatedLines.forEach((line, index) => {
      // Allow flexible format but check for basic structure
      if (!line.match(/^-\s+\[ADR-\d+\]\(\.\/ADR-\d+-.+\.md\)/)) {
        warnings.push(`⚠️  ADR-${number}: Related link format should be: '- [ADR-XXXX](./file.md) — Title' (line ${index + 1})`);
      }
    });
  } else {
    // Check if Related field exists but with wrong name
    if (content.includes('**Related ADRs:**')) {
      errors.push(`❌ ADR-${number}: Should use '**Related:**' not '**Related ADRs:**'`);
    }
  }
  
  // Check for proper spacing after header fields
  const headerSection = content.match(/# ADR-\d+:.*?\n\n(.*?)(\n\n---|\n\n##)/s);
  if (headerSection) {
    const headerFields = headerSection[1];
    // Check that each field ends with 2 spaces (for markdown line break)
    const fieldPatterns = [
      { name: 'Status', pattern: /\*\*Status:\*\*\s*(.+?)(\n|$)/ },
      { name: 'Date', pattern: /\*\*Date:\*\*\s*(.+?)(\n|$)/ },
      { name: 'Owner', pattern: /\*\*Owner:\*\*\s*(.+?)(\n|$)/ },
      { name: 'Assistance', pattern: /\*\*Assistance:\*\*\s*(.+?)(\n|$)/ },
      { name: 'Related', pattern: /\*\*Related:\*\*\s*(.+?)(\n|$)/ }
    ];
    
    fieldPatterns.forEach(({ name, pattern }) => {
      const match = headerFields.match(pattern);
      if (match) {
        const line = match[0];
        // Check if line doesn't end with 2 spaces (unless it's the last field before blank line)
        if (!line.endsWith('  \n') && !line.endsWith('  \r\n') && name !== 'Related') {
          // Allow if next line is blank or Related field
          const nextLineIndex = headerFields.indexOf(line) + line.length;
          const nextChar = headerFields[nextLineIndex];
          if (nextChar !== '\n' && nextChar !== undefined) {
            warnings.push(`⚠️  ADR-${number}: ${name} field should end with 2 spaces for markdown line break`);
          }
        }
      }
    });
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

