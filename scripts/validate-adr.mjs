#!/usr/bin/env node

import { readFileSync, readdirSync, existsSync } from 'fs';
import { join } from 'path';

const adrDir = 'docs/adr';
const filenameMapPath = 'stories/viewers/docs/adr-filename-map.ts';
const adrListPath = 'stories/viewers/docs/adr-list-data.ts';

let errors = [];
let warnings = [];

// Check all ADR files (exclude TEMPLATE)
const adrFiles = readdirSync(adrDir)
  .filter(f => f.startsWith('ADR-') && f.endsWith('.md') && !f.includes('TEMPLATE'))
  .sort();

console.log(`\n🔍 Validating ${adrFiles.length} ADR files...\n`);

// Check filename mapping
const filenameMapContent = readFileSync(filenameMapPath, 'utf-8');
const adrListContent = readFileSync(adrListPath, 'utf-8');

adrFiles.forEach(file => {
  const match = file.match(/^ADR-(\d+)-(.+)\.md$/);
  if (!match) {
    errors.push(`❌ Invalid filename format: ${file}`);
    return;
  }
  
  const [, number, title] = match;
  
  // Check filename mapping
  if (!filenameMapContent.includes(`"${number}": "${file}"`)) {
    errors.push(`❌ Missing in filename map: ADR-${number} (${file})`);
  }
  
  // Check ADR list
  if (!adrListContent.includes(`number: '${number}'`)) {
    errors.push(`❌ Missing in ADR list: ADR-${number} (${file})`);
  }
  
  // Check story file
  const storyFile = `stories/docs/adr/adr-${number.toLowerCase()}.stories.tsx`;
  if (!existsSync(storyFile)) {
    warnings.push(`⚠️  Story file missing: ${storyFile}`);
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

