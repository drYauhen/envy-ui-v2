#!/usr/bin/env node

/**
 * Copies documentation files from docs/ to public/ for Storybook static serving
 * This allows fetch() to load markdown files in a framework-agnostic way
 */

import { cpSync, mkdirSync, existsSync } from 'fs';
import { join, dirname } from 'path';
import { fileURLToPath } from 'url';

const __filename = fileURLToPath(import.meta.url);
const __dirname = dirname(__filename);
const repoRoot = join(__dirname, '..');

const sourceDir = join(repoRoot, 'docs', 'adr');
const targetDir = join(repoRoot, 'public', 'docs', 'adr');

try {
  // Create target directory if it doesn't exist
  if (!existsSync(targetDir)) {
    mkdirSync(targetDir, { recursive: true });
    console.log(`Created directory: ${targetDir}`);
  }

    // Copy all .md files from docs/adr/ to public/docs/adr/
    if (existsSync(sourceDir)) {
      const { readdirSync } = await import('fs');
      const files = readdirSync(sourceDir);
      let copiedCount = 0;
      let shortNameCount = 0;

      for (const file of files) {
        if (file.endsWith('.md') && file.startsWith('ADR-')) {
          const sourceFile = join(sourceDir, file);
          const targetFile = join(targetDir, file);
          
          // Copy with original name
          cpSync(sourceFile, targetFile, { overwrite: true });
          copiedCount++;
          
          // Also create a short name version (ADR-XXXX.md) for easier fetch access
          // Extract ADR number (e.g., "0019" from "ADR-0019-layout-components-architecture.md")
          const match = file.match(/^ADR-(\d{4})/);
          if (match) {
            const adrNumber = match[1];
            const shortName = `ADR-${adrNumber}.md`;
            const shortTargetFile = join(targetDir, shortName);
            
            // Only create short name if it doesn't exist or is different from original
            if (file !== shortName) {
              cpSync(sourceFile, shortTargetFile, { overwrite: true });
              shortNameCount++;
            }
          }
        }
      }

      console.log(`✓ Copied ${copiedCount} ADR markdown files to public/docs/adr/`);
      if (shortNameCount > 0) {
        console.log(`✓ Created ${shortNameCount} short-name aliases (ADR-XXXX.md) for fetch access`);
      }
    } else {
      console.warn(`⚠ Source directory not found: ${sourceDir}`);
    }
} catch (error) {
  console.error('Error copying docs:', error);
  process.exit(1);
}

