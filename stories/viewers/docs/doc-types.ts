/**
 * Shared Types for Documentation Registry
 *
 * This file contains the common type definitions used across all documentation data files.
 */

export type DocCategory = 'adr' | 'architecture' | 'workflows' | 'tasks' | 'steps' | 'other';

export type DocRegistryItem = {
  id: string; // Unique identifier (e.g., "adr-0023", "arch-accessibility")
  path: string; // Relative path from docs/ (e.g., "adr/ADR-0023-title.md")
  title: string; // Document title
  category: DocCategory;
  exportName?: string; // Optional: Storybook export name
  storybookId?: string; // Optional: Storybook story id (e.g., "docs-architecture--accessibility-reference")
  status?: 'active' | 'draft' | 'in-progress';
  aliases?: string[]; // Optional: alternative paths (for renamed files)
  tags?: string[]; // Optional: tags for filtering
};