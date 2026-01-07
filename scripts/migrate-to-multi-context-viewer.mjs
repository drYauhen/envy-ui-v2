#!/usr/bin/env node

/**
 * Migration script: Convert story files from ContextThemeScope to MultiContextViewer
 *
 * This script automatically migrates Storybook story files to use the unified
 * MultiContextViewer component instead of direct ContextThemeScope usage.
 *
 * Usage: node scripts/migrate-to-multi-context-viewer.mjs [file-pattern]
 * Example: node scripts/migrate-to-multi-context-viewer.mjs "stories/components/*.stories.tsx"
 */

import fs from 'fs';
import path from 'path';
import { glob } from 'glob';
import { fileURLToPath } from 'url';

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);
const rootDir = path.resolve(__dirname, '..');

// ANSI color codes for terminal output
const colors = {
  reset: '\x1b[0m',
  green: '\x1b[32m',
  yellow: '\x1b[33m',
  blue: '\x1b[34m',
  red: '\x1b[31m',
  cyan: '\x1b[36m'
};

function log(message, color = 'reset') {
  console.log(`${colors[color]}${message}${colors.reset}`);
}

/**
 * Update imports in the file
 */
function updateImports(content) {
  // Replace ContextThemeScope import with MultiContextViewer
  const patterns = [
    // Pattern 1: from '../utils/context-theme'
    {
      regex: /import\s+\{\s*ContextThemeScope\s*\}\s+from\s+['"]\.\.\/utils\/context-theme['"]/g,
      replacement: "import { MultiContextViewer } from '../utils/multi-context-viewer'"
    },
    // Pattern 2: from '../../utils/context-theme'
    {
      regex: /import\s+\{\s*ContextThemeScope\s*\}\s+from\s+['"]\.\.\/\.\.\/utils\/context-theme['"]/g,
      replacement: "import { MultiContextViewer } from '../../utils/multi-context-viewer'"
    },
    // Pattern 3: from '../../../utils/context-theme'
    {
      regex: /import\s+\{\s*ContextThemeScope\s*\}\s+from\s+['"]\.\.\/\.\.\/\.\.\/utils\/context-theme['"]/g,
      replacement: "import { MultiContextViewer } from '../../../utils/multi-context-viewer'"
    }
  ];

  for (const { regex, replacement } of patterns) {
    if (regex.test(content)) {
      content = content.replace(regex, replacement);
      break;
    }
  }

  return content;
}

/**
 * Detect multi-context scenario (stories with multiple ContextThemeScope usages)
 */
function hasMultipleContexts(content) {
  const contextMatches = [...content.matchAll(/<ContextThemeScope[^>]+data-eui-context=['"](\w+)['"]/g)];
  const contexts = new Set(contextMatches.map(m => m[1]));
  return contexts.size > 1;
}

/**
 * Wrap story render function with MultiContextViewer
 */
function wrapStoryWithViewer(storyContent) {
  // Extract the story export structure
  const storyMatch = storyContent.match(/(export const \w+: Story = \{[\s\S]*?parameters:[^}]*\},?\s*)(render:\s*\(\)\s*=>\s*\(([\s\S]*?)\)\s*}\s*;)/);

  if (!storyMatch) {
    return storyContent;
  }

  const [fullMatch, preRender, renderSection, renderBody] = storyMatch;

  // Check if already wrapped
  if (renderBody.trim().startsWith('<MultiContextViewer')) {
    return storyContent;
  }

  // Check if has ContextThemeScope inside
  const hasContextScope = renderBody.includes('ContextThemeScope');

  if (hasContextScope) {
    // This is a multi-context story - needs manual review
    return storyContent;
  }

  // Simple story - wrap with single app context
  const wrappedRender = `render: () => (
    <MultiContextViewer contexts={[{ context: 'app' }]}>
      {() => (
${renderBody}
      )}
    </MultiContextViewer>
  )};`;

  return storyContent.replace(renderSection, wrappedRender);
}

/**
 * Convert multi-context stories (with side-by-side ContextThemeScope sections)
 */
function convertMultiContextStory(storyContent) {
  // Pattern: Story with multiple <ContextThemeScope data-eui-context="X"> sections
  // This needs to become MultiContextViewer with contexts array

  // Extract contexts used
  const contextMatches = [...storyContent.matchAll(/<ContextThemeScope[^>]+data-eui-context=['"](\w+)['"]/g)];
  const contexts = [...new Set(contextMatches.map(m => m[1]))];

  if (contexts.length <= 1) {
    return storyContent; // Not a multi-context story
  }

  // Check if the story name contains "Context" (typical for multi-context stories)
  const isContextComparisonStory = /name:\s*['"].*Context/i.test(storyContent);

  if (!isContextComparisonStory) {
    return storyContent; // Not a typical multi-context comparison story
  }

  log(`    ⚠️  Multi-context story detected with contexts: ${contexts.join(', ')} - needs manual review`, 'yellow');

  return storyContent;
}

/**
 * Process a single story file
 */
function processFile(filePath) {
  const relativePath = path.relative(rootDir, filePath);

  try {
    let content = fs.readFileSync(filePath, 'utf-8');
    const originalContent = content;

    // Check if file uses ContextThemeScope
    if (!content.includes('ContextThemeScope')) {
      log(`  ⊘ Skipping ${relativePath} - no ContextThemeScope usage`, 'cyan');
      return { processed: false, changed: false };
    }

    // Check if already uses MultiContextViewer
    if (content.includes('MultiContextViewer')) {
      log(`  ✓ Skipping ${relativePath} - already uses MultiContextViewer`, 'green');
      return { processed: false, changed: false };
    }

    log(`  → Processing ${relativePath}`, 'blue');

    // Step 1: Update imports
    content = updateImports(content);

    // Step 2: Check for multi-context stories
    const isMultiContext = hasMultipleContexts(content);

    if (isMultiContext) {
      log(`    ⚠️  Multi-context usage detected - manual migration recommended`, 'yellow');
      // For now, just update the import and let user handle the conversion
      const changed = content !== originalContent;

      if (changed) {
        fs.writeFileSync(filePath, content, 'utf-8');
        log(`    ✓ Updated imports only (manual review needed)`, 'yellow');
      }

      return { processed: true, changed, needsReview: true };
    }

    // Step 3: Split content into story exports
    const storyExportRegex = /(export const \w+: Story = \{[\s\S]*?\n\};)/g;
    let stories = [];
    let lastIndex = 0;
    let match;

    while ((match = storyExportRegex.exec(content)) !== null) {
      const before = content.slice(lastIndex, match.index);
      const story = match[1];
      stories.push({ before, story, index: match.index });
      lastIndex = match.index + story.length;
    }

    const after = content.slice(lastIndex);

    // Step 4: Process each story
    let newContent = '';
    for (let i = 0; i < stories.length; i++) {
      const { before, story } = stories[i];
      newContent += before;

      // Wrap story with MultiContextViewer if needed
      const wrappedStory = wrapStoryWithViewer(story);
      newContent += wrappedStory;
    }
    newContent += after;

    const changed = newContent !== originalContent;

    if (changed) {
      fs.writeFileSync(filePath, newContent, 'utf-8');
      log(`  ✓ Migrated ${relativePath}`, 'green');
    } else {
      log(`  − No changes needed for ${relativePath}`, 'yellow');
    }

    return { processed: true, changed };

  } catch (error) {
    log(`  ✗ Error processing ${relativePath}: ${error.message}`, 'red');
    return { processed: false, changed: false, error };
  }
}

/**
 * Main migration function
 */
async function migrate(pattern) {
  log('\n🔄 Starting MultiContextViewer migration...\n', 'cyan');

  const files = await glob(pattern, { cwd: rootDir });

  if (files.length === 0) {
    log('No files found matching pattern: ' + pattern, 'yellow');
    return;
  }

  log(`Found ${files.length} file(s) to process\n`, 'blue');

  const results = {
    total: files.length,
    processed: 0,
    changed: 0,
    skipped: 0,
    needsReview: 0,
    errors: 0
  };

  for (const file of files) {
    const filePath = path.resolve(rootDir, file);
    const result = processFile(filePath);

    if (result.error) {
      results.errors++;
    } else if (result.needsReview) {
      results.needsReview++;
      results.processed++;
    } else if (result.changed) {
      results.changed++;
      results.processed++;
    } else if (result.processed) {
      results.processed++;
    } else {
      results.skipped++;
    }
  }

  log('\n' + '='.repeat(60), 'cyan');
  log('Migration Summary:', 'cyan');
  log('='.repeat(60), 'cyan');
  log(`Total files:         ${results.total}`, 'blue');
  log(`Processed:           ${results.processed}`, 'green');
  log(`Changed:             ${results.changed}`, 'green');
  log(`Needs manual review: ${results.needsReview}`, 'yellow');
  log(`Skipped:             ${results.skipped}`, 'yellow');
  log(`Errors:              ${results.errors}`, results.errors > 0 ? 'red' : 'green');
  log('='.repeat(60) + '\n', 'cyan');

  if (results.changed > 0) {
    log('✓ Migration complete! Review changes and test the stories.', 'green');
  }

  if (results.needsReview > 0) {
    log('\n⚠️  Some files need manual review for multi-context scenarios.', 'yellow');
  }
}

// CLI execution
const args = process.argv.slice(2);
const pattern = args[0] || 'stories/**/*.stories.tsx';

migrate(pattern).catch(error => {
  log(`\n✗ Migration failed: ${error.message}`, 'red');
  console.error(error);
  process.exit(1);
});
