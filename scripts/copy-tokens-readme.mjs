#!/usr/bin/env node

/**
 * Copies README.md files from tokens/ to public/tokens/ for Storybook static serving
 * This allows fetch() to load markdown files in a framework-agnostic way
 */

import { cpSync, mkdirSync, existsSync } from 'fs';
import { join, dirname } from 'path';
import { fileURLToPath } from 'url';

const __filename = fileURLToPath(import.meta.url);
const __dirname = dirname(__filename);
const repoRoot = join(__dirname, '..');

const sourceDirs = [
  join(repoRoot, 'tokens'),
  join(repoRoot, 'tokens', 'app'),
  join(repoRoot, 'tokens', 'app', 'themes'),
  join(repoRoot, 'tokens', 'website'),
  join(repoRoot, 'tokens', 'website', 'themes'),
  join(repoRoot, 'tokens', 'report'),
  join(repoRoot, 'tokens', 'report', 'themes')
];

const targetBase = join(repoRoot, 'public', 'tokens');

try {
  let copiedCount = 0;

  for (const sourceDir of sourceDirs) {
    const readmeFile = join(sourceDir, 'README.md');
    
    if (existsSync(readmeFile)) {
      // Calculate relative path from tokens/ to maintain structure
      const relativePath = sourceDir.replace(join(repoRoot, 'tokens'), '').replace(/^[\/\\]/, '') || '.';
      const targetDir = join(targetBase, relativePath);
      const targetFile = join(targetDir, 'README.md');
      
      // Create target directory if it doesn't exist
      if (!existsSync(targetDir)) {
        mkdirSync(targetDir, { recursive: true });
      }
      
      // Copy README.md file
      cpSync(readmeFile, targetFile, { overwrite: true });
      copiedCount++;
    }
  }

  if (copiedCount > 0) {
    console.log(`✓ Copied ${copiedCount} README.md files to public/tokens/`);
  } else {
    console.log('⚠ No README.md files found in tokens/');
  }
} catch (error) {
  console.error('Error copying tokens README files:', error);
  process.exit(1);
}

