/**
 * Workflow Documentation Metadata
 *
 * ⚠️ SINGLE SOURCE OF TRUTH ⚠️
 *
 * This file contains the raw metadata for all workflow documentation.
 * Processing logic transforms this into registry entries.
 *
 * **CRITICAL:** When creating or modifying workflow documents:
 * 1. Update this file FIRST with metadata
 * 2. Processing happens automatically in docs-registry.ts
 * 3. Run `npm run docs:validate` to check all links
 *
 * Format: Clean metadata without processing logic
 * - id: Unique identifier (e.g., "workflow-adr", "workflow-storybook")
 * - title: Document title (must match the title in the markdown file)
 * - filename: Filename in the directory (e.g., "adr-workflow.md", "README.md")
 * - storybookId: (optional) Storybook story ID for navigation
 * - status: (optional) "active", "draft", "in-progress"
 * - aliases: (optional) Alternative paths for renamed files
 */

export type WorkflowMetadata = {
  id: string;
  title: string;
  filename: string;
  storybookId?: string;
  status?: 'active' | 'draft' | 'in-progress';
  aliases?: string[];
};

export const workflows: WorkflowMetadata[] = [
  {
    id: 'workflow-adr',
    title: 'ADR Workflow',
    filename: 'adr-workflow.md',
    storybookId: 'docs-workflows--adr-workflow'
  },
  {
    id: 'workflow-figma',
    title: 'Figma Workflow',
    filename: 'figma-workflow.md',
    storybookId: 'docs-workflows--figma-workflow'
  },
  {
    id: 'workflow-storybook',
    title: 'Storybook Workflow',
    filename: 'storybook-workflow.md',
    storybookId: 'docs-workflows--storybook-workflow'
  },
  {
    id: 'workflow-scripts',
    title: 'Scripts Reference',
    filename: 'scripts-reference.md',
    storybookId: 'docs-workflows--scripts-reference'
  },
  {
    id: 'workflow-tokens',
    title: 'Tokens Workflow',
    filename: 'tokens-workflow.md',
    storybookId: 'docs-workflows--tokens-workflow'
  },
  {
    id: 'workflow-layer-generation',
    title: 'Layer Generation Workflow',
    filename: 'layer-generation-workflow.md',
    storybookId: 'docs-workflows--layer-generation-workflow'
  },
  {
    id: 'workflow-dev-app',
    title: 'Dev App Workflow',
    filename: 'dev-app-workflow.md',
    storybookId: 'docs-workflows--dev-app-workflow'
  },
  {
    id: 'workflow-readme',
    title: 'Workflows Documentation',
    filename: 'README.md',
    storybookId: 'docs-workflows--workflows-documentation'
  }
];
