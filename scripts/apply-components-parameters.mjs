#!/usr/bin/env node

/**
 * Script to apply section parameters to all stories in HTML + CSS and TSX + React Aria sections
 * Adds getSectionParameters import and applies parameters via spread operator
 */

import { readFileSync, writeFileSync } from 'fs';
import { glob } from 'glob';
import { join, dirname, relative } from 'path';
import { fileURLToPath } from 'url';

const __filename = fileURLToPath(import.meta.url);
const __dirname = dirname(__filename);
const projectRoot = join(__dirname, '..');

// Find all story files in components and tsx sections
const componentFiles = glob.sync('stories/components/**/*.stories.tsx', {
  cwd: projectRoot,
  absolute: true
});

const tsxFiles = glob.sync('stories/tsx/**/*.stories.tsx', {
  cwd: projectRoot,
  absolute: true
});

const storyFiles = [...componentFiles, ...tsxFiles];

console.log(`Found ${storyFiles.length} story files in components sections`);
console.log(`  - Components (HTML + CSS): ${componentFiles.length}`);
console.log(`  - TSX: ${tsxFiles.length}`);

let updated = 0;
let skipped = 0;
let errors = 0;

for (const filePath of storyFiles) {
  try {
    let content = readFileSync(filePath, 'utf-8');
    const originalContent = content;
    
    // Extract title from meta
    const titleMatch = content.match(/title:\s*['"]([^'"]+)['"]/);
    if (!titleMatch) {
      console.warn(`⚠️  No title found in ${relative(projectRoot, filePath)}`);
      skipped++;
      continue;
    }
    
    const title = titleMatch[1];
    
    // Skip if title doesn't start with "HTML + CSS" or "TSX + React Aria" or "TSX (Clean)"
    if (!title.startsWith('HTML + CSS/') && 
        !title.startsWith('TSX + React Aria/') && 
        !title.startsWith('TSX (Clean)/')) {
      skipped++;
      continue;
    }
    
    // Check if already has getSectionParameters
    if (content.includes('getSectionParameters')) {
      console.log(`✓ Already updated: ${relative(projectRoot, filePath)}`);
      skipped++;
      continue;
    }
    
    // Calculate relative path to .storybook/preview.tsx
    const fileDir = dirname(filePath);
    const relativeToStorybook = relative(fileDir, join(projectRoot, '.storybook', 'preview.tsx'));
    const importPath = relativeToStorybook.replace(/\\/g, '/').replace(/\.tsx$/, '');
    
    // Add import at the top (after existing imports)
    const importLine = `import { getSectionParameters } from '${importPath}';`;
    
    // Find the last import statement
    const importRegex = /^import\s+.*$/gm;
    const imports = content.match(importRegex);
    
    if (imports && imports.length > 0) {
      const lastImport = imports[imports.length - 1];
      const lastImportIndex = content.lastIndexOf(lastImport);
      const insertIndex = lastImportIndex + lastImport.length;
      content = content.slice(0, insertIndex) + '\n' + importLine + content.slice(insertIndex);
    } else {
      // No imports found, add at the beginning
      content = importLine + '\n' + content;
    }
    
    // Add parameters to meta.parameters
    // Find parameters object in meta
    const parametersMatch = content.match(/(parameters:\s*\{)([^}]*)(\})/s);
    
    if (parametersMatch) {
      // Parameters object exists, add getSectionParameters call
      const beforeParams = parametersMatch[1];
      const paramsContent = parametersMatch[2];
      const afterParams = parametersMatch[3];
      
      // Check if already has getSectionParameters call
      if (paramsContent.includes('getSectionParameters')) {
        skipped++;
        continue;
      }
      
      // Add getSectionParameters call at the beginning of parameters
      // But preserve existing parameters (like layout, etc.)
      const newParams = `${beforeParams}\n    // Apply section-specific parameters automatically\n    ...getSectionParameters('${title}'),${paramsContent}${afterParams}`;
      content = content.replace(parametersMatch[0], newParams);
    } else {
      // No parameters object, need to add one
      // Find meta object
      const metaMatch = content.match(/(const meta:\s*Meta\s*=\s*\{)([^}]*)(\};)/s);
      
      if (metaMatch) {
        const beforeMeta = metaMatch[1];
        const metaContent = metaMatch[2];
        const afterMeta = metaMatch[3];
        
        // Add parameters object
        const newMeta = `${beforeMeta}${metaContent}\n  parameters: {\n    // Apply section-specific parameters automatically\n    ...getSectionParameters('${title}'),\n    layout: 'padded'\n  }${afterMeta}`;
        content = content.replace(metaMatch[0], newMeta);
      } else {
        console.warn(`⚠️  Could not find meta object in ${relative(projectRoot, filePath)}`);
        skipped++;
        continue;
      }
    }
    
    // Only write if content changed
    if (content !== originalContent) {
      writeFileSync(filePath, content, 'utf-8');
      console.log(`✓ Updated: ${relative(projectRoot, filePath)}`);
      updated++;
    } else {
      skipped++;
    }
  } catch (error) {
    console.error(`✗ Error processing ${relative(projectRoot, filePath)}:`, error.message);
    errors++;
  }
}

console.log(`\n✅ Summary:`);
console.log(`   Updated: ${updated}`);
console.log(`   Skipped: ${skipped}`);
console.log(`   Errors: ${errors}`);

