/**
 * Tokens Documentation Metadata
 *
 * ⚠️ SINGLE SOURCE OF TRUTH ⚠️
 *
 * This file contains the raw metadata for all tokens documentation.
 * Processing logic transforms this into registry entries.
 *
 * **CRITICAL:** When creating or modifying tokens documents:
 * 1. Update this file FIRST with metadata
 * 2. Processing happens automatically in docs-registry.ts
 * 3. Run `npm run docs:validate` to check all links
 *
 * Format: Clean metadata without processing logic
 * - id: Unique identifier (e.g., "tokens-readme", "tokens-reference")
 * - title: Document title (must match the title in the markdown file)
 * - filename: Filename in the directory (e.g., "README.md", "reference.md")
 * - storybookId: (optional) Storybook story ID for navigation
 * - status: (optional) "active", "draft", "in-progress"
 * - aliases: (optional) Alternative paths for renamed files
 */

export type TokensMetadata = {
  id: string;
  title: string;
  filename: string;
  storybookId?: string;
  status?: 'active' | 'draft' | 'in-progress';
  aliases?: string[];
};

export const tokens: TokensMetadata[] = [
  {
    id: 'tokens-readme',
    title: 'Token System Tooling',
    filename: 'README.md',
    storybookId: 'docs-tokens--token-tooling'
  },
  {
    id: 'tokens-reference',
    title: 'Token Reference',
    filename: 'reference.md',
    storybookId: 'docs-tokens--token-reference'
  },
  {
    id: 'tokens-use-cases',
    title: 'Token Utilities Use Cases',
    filename: 'use-cases.md',
    storybookId: 'docs-tokens--token-use-cases'
  }
];