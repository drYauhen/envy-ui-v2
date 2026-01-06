/**
 * Documentation Registry
 * 
 * ⚠️ SINGLE SOURCE OF TRUTH ⚠️
 * 
 * This file is the SINGLE SOURCE OF TRUTH for all documentation files in docs/.
 * 
 * **CRITICAL:** When creating, renaming, or moving documents:
 * 1. Update this file FIRST
 * 2. Then run `npm run docs:validate` to check all links
 * 3. Fix any broken links
 * 
 * Structure:
 * - Each document has a unique `id` (used for stable references)
 * - `path` is the relative path from docs/ root
 * - `title` is the document title (from markdown header)
 * - `category` is the directory (adr, architecture, workflows, etc.)
 * - `exportName` (optional) is for Storybook story exports (if applicable)
 * - `storybookId` (optional) is for Storybook story IDs (if applicable)
 * - `aliases` (optional) are alternative paths (for renamed files)
 */

import { adrs } from './adr-list-data';
import { adrFilenameMap } from './adr-filename-map';

export type DocRegistryItem = {
  id: string; // Unique identifier (e.g., "adr-0023", "arch-accessibility")
  path: string; // Relative path from docs/ (e.g., "adr/ADR-0023-title.md")
  title: string; // Document title
  category: 'adr' | 'architecture' | 'workflows' | 'tasks' | 'steps' | 'other';
  exportName?: string; // Optional: Storybook export name
  storybookId?: string; // Optional: Storybook story id (e.g., "docs-architecture--accessibility-reference")
  status?: 'in-progress';
  aliases?: string[]; // Optional: alternative paths (for renamed files)
};

// Auto-generate ADR entries from adr-list-data.ts
const adrDocs: DocRegistryItem[] = adrs.map(adr => {
  const filename = adrFilenameMap[adr.number] || `ADR-${adr.number}.md`;
  return {
    id: `adr-${adr.number}`,
    path: `adr/${filename}`,
    title: adr.title,
    category: 'adr',
    exportName: adr.exportName
  };
});

// Architecture documents
const architectureDocs: DocRegistryItem[] = [
  {
    id: 'arch-readme',
    path: 'architecture/README.md',
    title: 'Architecture Documentation Overview',
    category: 'architecture',
    storybookId: 'docs-architecture--architecture-overview'
  },
  {
    id: 'arch-accessibility',
    path: 'architecture/accessibility-reference.md',
    title: 'Accessibility Reference',
    category: 'architecture',
    storybookId: 'docs-architecture--accessibility-reference'
  },
  {
    id: 'arch-token-usage',
    path: 'architecture/token-usage-rules.md',
    title: 'Token Usage Rules',
    category: 'architecture',
    storybookId: 'docs-architecture--token-usage-rules'
  },
  {
    id: 'arch-component-naming',
    path: 'architecture/component-naming-conventions.md',
    title: 'Component Naming Conventions',
    category: 'architecture',
    storybookId: 'docs-architecture--component-naming-conventions'
  },
  {
    id: 'arch-layout-composition',
    path: 'architecture/layout-composition-guide.md',
    title: 'Layout Composition Guide',
    category: 'architecture',
    storybookId: 'docs-architecture--layout-composition-guide',
    status: 'in-progress'
  },
  {
    id: 'arch-system-prefix',
    path: 'architecture/system-prefix.md',
    title: 'System Prefix',
    category: 'architecture',
    storybookId: 'docs-architecture--system-prefix'
  },
  {
    id: 'arch-hero-theme',
    path: 'architecture/hero-section-theme-architecture.md',
    title: 'Hero Section Theme Architecture',
    category: 'architecture',
    storybookId: 'docs-architecture--hero-section-theme-architecture'
  },
  {
    id: 'arch-dev-app',
    path: 'architecture/dev-app-architecture.md',
    title: 'Dev App Architecture',
    category: 'architecture',
    storybookId: 'docs-architecture--dev-app-architecture'
  }
];

// Workflow documents
const workflowDocs: DocRegistryItem[] = [
  {
    id: 'workflow-adr',
    path: 'workflows/adr-workflow.md',
    title: 'ADR Workflow',
    category: 'workflows',
    storybookId: 'docs-workflows--adr-workflow'
  },
  {
    id: 'workflow-figma',
    path: 'workflows/figma-workflow.md',
    title: 'Figma Workflow',
    category: 'workflows',
    storybookId: 'docs-workflows--figma-workflow'
  },
  {
    id: 'workflow-storybook',
    path: 'workflows/storybook-workflow.md',
    title: 'Storybook Workflow',
    category: 'workflows',
    storybookId: 'docs-workflows--storybook-workflow'
  },
  {
    id: 'workflow-scripts',
    path: 'workflows/scripts-reference.md',
    title: 'Scripts Reference',
    category: 'workflows',
    storybookId: 'docs-workflows--scripts-reference'
  },
  {
    id: 'workflow-tokens',
    path: 'workflows/tokens-workflow.md',
    title: 'Tokens Workflow',
    category: 'workflows',
    storybookId: 'docs-workflows--tokens-workflow'
  },
  {
    id: 'workflow-dev-app',
    path: 'workflows/dev-app-workflow.md',
    title: 'Dev App Workflow',
    category: 'workflows',
    storybookId: 'docs-workflows--dev-app-workflow'
  },
  {
    id: 'workflow-readme',
    path: 'workflows/README.md',
    title: 'Workflows Documentation',
    category: 'workflows',
    storybookId: 'docs-workflows--workflows-documentation'
  }
];

// ADR guide documents (in adr/ directory but not ADRs themselves)
const adrGuideDocs: DocRegistryItem[] = [
  {
    id: 'adr-readme',
    path: 'adr/README.md',
    title: 'Architectural Decision Records (ADR)',
    category: 'adr'
  },
  {
    id: 'adr-agent-guide',
    path: 'adr/AGENT-GUIDE.md',
    title: 'ADR Agent Guide',
    category: 'adr'
  },
  {
    id: 'adr-template',
    path: 'adr/ADR-TEMPLATE.md',
    title: 'ADR Template',
    category: 'adr'
  }
];

// Tokens documents
const tokensDocs: DocRegistryItem[] = [
  {
    id: 'tokens-readme',
    path: 'tokens/README.md',
    title: 'Token System Tooling',
    category: 'other',
    storybookId: 'docs-tokens--token-tooling'
  },
  {
    id: 'tokens-reference',
    path: 'tokens/reference.md',
    title: 'Token Reference',
    category: 'other',
    storybookId: 'docs-tokens--token-reference'
  },
  {
    id: 'tokens-use-cases',
    path: 'tokens/use-cases.md',
    title: 'Token Utilities Use Cases',
    category: 'other',
    storybookId: 'docs-tokens--token-use-cases'
  }
];

const generalDocs: DocRegistryItem[] = [
  {
    id: 'docs-guide',
    path: 'DOCS-GUIDE.md',
    title: 'Documentation Guide',
    category: 'other',
    storybookId: 'docs-workflows--documentation-guide'
  }
];

// Combine all documents
export const docsRegistry: DocRegistryItem[] = [
  ...adrDocs,
  ...adrGuideDocs,
  ...architectureDocs,
  ...workflowDocs,
  ...tokensDocs,
  ...generalDocs
];

// Helper functions for lookup
export function getDocById(id: string): DocRegistryItem | undefined {
  return docsRegistry.find(doc => doc.id === id);
}

export function getDocByPath(path: string): DocRegistryItem | undefined {
  return docsRegistry.find(doc => {
    if (doc.path === path) return true;
    if (doc.aliases?.includes(path)) return true;
    return false;
  });
}

// Create a map for fast lookup by path
export const docsRegistryByPath: Map<string, DocRegistryItem> = new Map(
  docsRegistry.flatMap(doc => {
    const entries: [string, DocRegistryItem][] = [[doc.path, doc]];
    if (doc.aliases) {
      doc.aliases.forEach(alias => {
        entries.push([alias, doc]);
      });
    }
    return entries;
  })
);
