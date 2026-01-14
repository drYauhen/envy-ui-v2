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
  // ACCESSIBILITY (alphabetically sorted)
  {
    id: 'ARCH-accessibility-001-accessibility-reference',
    title: 'ARCH-Accessibility-001 Accessibility Reference',
    filename: 'ARCH-accessibility-001-accessibility-reference.md',
    storybookId: 'docs-architecture--ARCH-accessibility-001-accessibility-reference'
  },
  // COMPONENTS (alphabetically sorted)
  {
    id: 'ARCH-components-001-component-css-architecture',
    title: 'ARCH-Components-001 Component Css Architecture',
    filename: 'ARCH-components-001-component-css-architecture.md',
    storybookId: 'docs-architecture--ARCH-components-001-component-css-architecture'
  },
  {
    id: 'ARCH-components-002-component-naming-conventions',
    title: 'ARCH-Components-002 Component Naming Conventions',
    filename: 'ARCH-components-002-component-naming-conventions.md',
    storybookId: 'docs-architecture--ARCH-components-002-component-naming-conventions'
  },
  {
    id: 'ARCH-components-003-componentfeature-architecture',
    title: 'ARCH-Components-003 Componentfeature Architecture',
    filename: 'ARCH-components-003-componentfeature-architecture.md',
    storybookId: 'docs-architecture--ARCH-components-003-componentfeature-architecture'
  },
  // LAYOUT (alphabetically sorted)
  {
    id: 'ARCH-layout-001-layout-composition-guide',
    title: 'ARCH-Layout-001 Layout Composition Guide',
    filename: 'ARCH-layout-001-layout-composition-guide.md',
    storybookId: 'docs-architecture--ARCH-layout-001-layout-composition-guide',
    status: 'in-progress'
  },
  // SYSTEM (alphabetically sorted with sequential numbering)
  {
    id: 'ARCH-system-001-architecture-documentation',
    title: 'ARCH-System-001 Architecture Documentation',
    filename: 'ARCH-system-001-architecture-documentation.md',
    storybookId: 'docs-architecture--ARCH-system-001-architecture-documentation'
  },
  {
    id: 'ARCH-system-002-architecture-documentation-guide',
    title: 'ARCH-System-002 Architecture Documentation Guide',
    filename: 'ARCH-system-002-architecture-documentation-guide.md',
    storybookId: 'docs-architecture--ARCH-system-002-architecture-documentation-guide'
  },
  {
    id: 'ARCH-system-003-architecture-validation-through-implementation',
    title: 'ARCH-System-003 Architecture Validation Through Implementation',
    filename: 'ARCH-system-003-architecture-validation-through-implementation.md',
    storybookId: 'docs-architecture--ARCH-system-003-architecture-validation-through-implementation'
  },
  {
    id: 'ARCH-system-004-dev-app-architecture',
    title: 'ARCH-System-004 Dev App Architecture',
    filename: 'ARCH-system-004-dev-app-architecture.md',
    storybookId: 'docs-architecture--ARCH-system-004-dev-app-architecture'
  },
  {
    id: 'ARCH-system-005-storybook-story-structure-standard',
    title: 'ARCH-System-005 Storybook Story Structure Standard',
    filename: 'ARCH-system-005-storybook-story-structure-standard.md',
    storybookId: 'docs-architecture--ARCH-system-005-storybook-story-structure-standard'
  },
  {
    id: 'ARCH-system-006-system-prefix',
    title: 'ARCH-System-006 System Prefix',
    filename: 'ARCH-system-006-system-prefix.md',
    storybookId: 'docs-architecture--ARCH-system-006-system-prefix'
  },
  // THEME (alphabetically sorted)
  {
    id: 'ARCH-theme-001-hero-section-theme-architecture',
    title: 'ARCH-Theme-001 Hero Section Theme Architecture',
    filename: 'ARCH-theme-001-hero-section-theme-architecture.md',
    storybookId: 'docs-architecture--ARCH-theme-001-hero-section-theme-architecture'
  },
  {
    id: 'ARCH-theme-002-theme-structure-analysis-composition-vs-semantic-breakdown',
    title: 'ARCH-Theme-002 Theme Structure Analysis Composition Vs Semantic Breakdown',
    filename: 'ARCH-theme-002-theme-structure-analysis-composition-vs-semantic-breakdown.md',
    storybookId: 'docs-architecture--ARCH-theme-002-theme-structure-analysis-composition-vs-semantic-breakdown'
  },
  // TOKENS (alphabetically sorted)
  {
    id: 'ARCH-tokens-001-color-system-architecture-rules',
    title: 'ARCH-Tokens-001 Color System Architecture Rules',
    filename: 'ARCH-tokens-001-color-system-architecture-rules.md',
    exportName: 'ColorSystemArchitectureRules',
    storybookId: 'docs-architecture--ARCH-tokens-001-color-system-architecture-rules'
  },
  {
    id: 'ARCH-tokens-002-css-token-output-rules',
    title: 'ARCH-Tokens-002 Css Token Output Rules',
    filename: 'ARCH-tokens-002-css-token-output-rules.md',
    storybookId: 'docs-architecture--ARCH-tokens-002-css-token-output-rules'
  },
  {
    id: 'ARCH-tokens-003-token-architecture',
    title: 'ARCH-Tokens-003 Token Architecture',
    filename: 'ARCH-tokens-003-token-architecture.md',
    storybookId: 'docs-architecture--ARCH-tokens-003-token-architecture'
  },
  {
    id: 'ARCH-tokens-004-token-usage-rules',
    title: 'ARCH-Tokens-004 Token Usage Rules',
    filename: 'ARCH-tokens-004-token-usage-rules.md',
    storybookId: 'docs-architecture--ARCH-tokens-004-token-usage-rules'
  }
];
