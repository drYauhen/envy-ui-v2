/**
 * Architecture Documentation Metadata
 *
 * ⚠️ SINGLE SOURCE OF TRUTH ⚠️
 *
 * This file contains the raw metadata for all architecture documentation.
 * Processing logic transforms this into registry entries.
 *
 * **CRITICAL:** When creating or modifying architecture documents:
 * 1. Update this file FIRST with metadata
 * 2. Processing happens automatically in docs-registry.ts
 * 3. Run `npm run docs:validate` to check all links
 *
 * Format: Clean metadata without processing logic
 * - id: Unique identifier (e.g., "arch-readme", "arch-token-architecture")
 * - title: Document title (must match the title in the markdown file)
 * - filename: Filename in the directory (e.g., "README.md", "token-architecture.md")
 * - storybookId: (optional) Storybook story ID for navigation
 * - exportName: (optional) Storybook export name
 * - status: (optional) "active", "draft", "in-progress"
 * - aliases: (optional) Alternative paths for renamed files
 */

export type ArchitectureMetadata = {
  id: string;
  title: string;
  filename: string;
  storybookId?: string;
  exportName?: string;
  status?: 'active' | 'draft' | 'in-progress';
  aliases?: string[];
};

export const architectures: ArchitectureMetadata[] = [
  {
    id: 'arch-readme',
    title: 'Architecture Documentation Overview',
    filename: 'README.md',
    storybookId: 'docs-architecture--architecture-overview'
  },
  {
    id: 'arch-accessibility',
    title: 'Accessibility Reference',
    filename: 'accessibility-reference.md',
    storybookId: 'docs-architecture--accessibility-reference'
  },
  {
    id: 'arch-token-usage',
    title: 'Token Usage Rules',
    filename: 'token-usage-rules.md',
    storybookId: 'docs-architecture--token-usage-rules'
  },
  {
    id: 'arch-component-naming',
    title: 'Component Naming Conventions',
    filename: 'component-naming-conventions.md',
    storybookId: 'docs-architecture--component-naming-conventions'
  },
  {
    id: 'arch-layout-composition',
    title: 'Layout Composition Guide',
    filename: 'layout-composition-guide.md',
    storybookId: 'docs-architecture--layout-composition-guide',
    status: 'in-progress'
  },
  {
    id: 'arch-system-prefix',
    title: 'System Prefix',
    filename: 'system-prefix.md',
    storybookId: 'docs-architecture--system-prefix'
  },
  {
    id: 'arch-hero-theme',
    title: 'Hero Section Theme Architecture',
    filename: 'hero-section-theme-architecture.md',
    storybookId: 'docs-architecture--hero-section-theme-architecture'
  },
  {
    id: 'arch-dev-app',
    title: 'Dev App Architecture',
    filename: 'dev-app-architecture.md',
    storybookId: 'docs-architecture--dev-app-architecture'
  },
  {
    id: 'arch-theme-structure',
    title: 'Theme Structure Analysis: Composition vs Semantic Breakdown',
    filename: '../theme-structure-analysis.md'  // Note: in parent directory
  },
  {
    id: 'arch-component-css',
    title: 'Component CSS Architecture',
    filename: 'component-css-architecture.md',
    storybookId: 'docs-architecture--component-css-architecture'
  },
  {
    id: 'arch-adr-validation',
    title: 'ADR Validation and Implementation',
    filename: 'adr-validation-and-implementation.md',
    storybookId: 'docs-architecture--adr-validation-and-implementation'
  },
  {
    id: 'arch-token-architecture',
    title: 'Token Architecture',
    filename: 'token-architecture.md'
  },
  {
    id: 'arch-color-system',
    title: 'Color System Architecture Rules',
    filename: 'color-system-architecture.md',
    exportName: 'ColorSystemArchitectureRules',
    storybookId: 'docs-architecture--color-system-architecture-rules'
  }
];
