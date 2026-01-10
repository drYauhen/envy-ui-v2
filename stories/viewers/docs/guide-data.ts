/**
 * Guide Documentation Metadata
 *
 * ⚠️ SINGLE SOURCE OF TRUTH ⚠️
 *
 * This file contains the raw metadata for all guide documentation.
 * Processing logic transforms this into registry entries.
 *
 * **CRITICAL:** When creating or modifying guide documents:
 * 1. Update this file FIRST with metadata
 * 2. Processing happens automatically in docs-registry.ts
 * 3. Run `npm run docs:validate` to check all links
 *
 * Format: Clean metadata without processing logic
 * - id: Unique identifier (e.g., "guide-docs-guide", "guide-theme-structure")
 * - title: Document title (must match the title in the markdown file)
 * - filename: Filename in the directory (e.g., "DOCS-GUIDE.md")
 * - storybookId: (optional) Storybook story ID for navigation
 * - status: (optional) "active", "draft", "in-progress"
 * - aliases: (optional) Alternative paths for renamed files
 */

export type GuideMetadata = {
  id: string;
  title: string;
  filename: string;
  storybookId?: string;
  status?: 'active' | 'draft' | 'in-progress';
  aliases?: string[];
};

export const guides: GuideMetadata[] = [
  {
    id: 'guide-docs-guide',
    title: 'Documentation Guide',
    filename: 'DOCS-GUIDE.md',
    storybookId: 'docs-workflows--documentation-guide'
  }
];
