/**
 * Documentation Registry
 *
 * ⚠️ SINGLE SOURCE OF TRUTH ⚠️
 *
 * This file aggregates documentation metadata from individual data files.
 * Each document category has its own data file following the ADR pattern.
 *
 * **CRITICAL:** When creating, renaming, or moving documents:
 * 1. Update the appropriate data file FIRST (e.g., architecture-data.ts)
 * 2. Run `npm run docs:validate` to check all links
 * 3. Fix any broken links
 *
 * Data File Organization:
 * - adr-list-data.ts - ADR documents (existing)
 * - architecture-data.ts - Architecture documents
 * - workflow-data.ts - Workflow documents
 * - guide-data.ts - General guide documents
 */

import { DocRegistryItem } from './doc-types';
import { adrs } from './adr-list-data';
import { architectures } from './architecture-data';
import { workflows } from './workflow-data';
import { guides } from './guide-data';
import { tokens } from './tokens-data';

// Auto-generate ADR entries from adr-list-data.ts
const adrDocs: DocRegistryItem[] = adrs.map(adr => ({
  id: `adr-${adr.number}`,
  path: adr.markdownPath?.replace('/docs/', '') || `adr/ADR-${adr.number}.md`,
  title: adr.title,
  category: adr.category || 'adr',
  exportName: adr.exportName,
  status: adr.status
}));

// Transform architecture metadata into registry entries
const architectureDocs: DocRegistryItem[] = architectures.map(arch => ({
  id: `arch-${arch.majorCategory}-${arch.number}`,
  path: arch.markdownPath?.replace('/docs/', '') || `architecture/ARCH-${arch.majorCategory}-${arch.number}.md`,
  title: arch.title,
  category: arch.category || 'architecture',
  exportName: arch.exportName,
  status: arch.status
}));

// Transform workflow metadata into registry entries
const workflowDocs: DocRegistryItem[] = workflows.map(workflow => ({
  id: workflow.id,
  path: `workflows/${workflow.filename}`,
  title: workflow.title,
  category: 'workflows' as const,
  storybookId: workflow.storybookId,
  status: workflow.status,
  aliases: workflow.aliases
}));

// Transform guide metadata into registry entries
const guideDocs: DocRegistryItem[] = guides.map(guide => ({
  id: guide.id,
  path: guide.filename,  // Root level files don't need directory prefix
  title: guide.title,
  category: 'other' as const,
  storybookId: guide.storybookId,
  status: guide.status,
  aliases: guide.aliases
}));

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

// Architecture guide documents (supporting docs for architecture system)
const architectureGuideDocs: DocRegistryItem[] = [
  {
    id: 'architecture-readme',
    path: 'architecture/README.md',
    title: 'Architecture Documentation',
    category: 'architecture'
  },
  {
    id: 'architecture-guide',
    path: 'architecture/ARCHITECTURE-GUIDE.md',
    title: 'Architecture Documentation Guide',
    category: 'architecture'
  },
  {
    id: 'architecture-template',
    path: 'architecture/ARCHITECTURE-TEMPLATE.md',
    title: 'Architecture Document Template',
    category: 'architecture'
  }
];

// Workflow guide documents (supporting docs for workflow system)
const workflowGuideDocs: DocRegistryItem[] = [
  {
    id: 'workflows-readme',
    path: 'workflows/README.md',
    title: 'Workflows Documentation',
    category: 'workflows'
  },
  {
    id: 'workflows-guide',
    path: 'workflows/WORKFLOWS-GUIDE.md',
    title: 'Workflows Documentation Guide',
    category: 'workflows'
  },
  {
    id: 'workflows-template',
    path: 'workflows/WORKFLOWS-TEMPLATE.md',
    title: 'Workflow Document Template',
    category: 'workflows'
  }
];

// Tokens guide documents (supporting docs for token system)
const tokensGuideDocs: DocRegistryItem[] = [
  {
    id: 'tokens-readme',
    path: 'tokens/README.md',
    title: 'Token System Documentation',
    category: 'other'
  },
  {
    id: 'tokens-guide',
    path: 'tokens/TOKENS-GUIDE.md',
    title: 'Tokens Documentation Guide',
    category: 'other'
  },
  {
    id: 'tokens-template',
    path: 'tokens/TOKENS-TEMPLATE.md',
    title: 'Token Document Template',
    category: 'other'
  }
];

// Guide guide documents (meta supporting docs for guide system)
const guideGuideDocs: DocRegistryItem[] = [
  {
    id: 'docs-main-guide',
    path: 'DOCS-GUIDE.md',
    title: 'Documentation Guide',
    category: 'other'
  },
  {
    id: 'guides-guide',
    path: 'GUIDES-GUIDE.md',
    title: 'Guides Documentation Guide',
    category: 'other'
  },
  {
    id: 'guides-template',
    path: 'GUIDES-TEMPLATE.md',
    title: 'Guide Document Template',
    category: 'other'
  }
];

// Transform tokens metadata into registry entries
const tokensDocs: DocRegistryItem[] = tokens.map(token => ({
  id: token.id,
  path: `tokens/${token.filename}`,
  title: token.title,
  category: 'other' as const,
  storybookId: token.storybookId,
  status: token.status,
  aliases: token.aliases
}));

// Combine all documents from data files
export const docsRegistry: DocRegistryItem[] = [
  ...adrDocs,
  ...adrGuideDocs,
  ...architectureDocs,
  ...architectureGuideDocs,
  ...workflowDocs,
  ...workflowGuideDocs,
  ...tokensDocs,
  ...tokensGuideDocs,
  ...guideDocs,
  ...guideGuideDocs
];

// =============================================================================
// 📚 PUBLIC API - Helper Functions for Registry Access
// =============================================================================
// These functions provide the public interface for interacting with the docs registry.
// They can be imported and used by other parts of the system.
//
// Example usage:
// import { getDocById, docsRegistryByPath } from './docs-registry';
// const doc = getDocById('arch-readme');
// =============================================================================

/**
 * Get a document by its unique ID
 *
 * @param id - The unique document identifier (e.g., 'arch-readme', 'adr-0023')
 * @returns The document registry item if found, undefined otherwise
 *
 * @example
 * ```typescript
 * const doc = getDocById('arch-token-architecture');
 * if (doc) {
 *   console.log(`Found: ${doc.title} at ${doc.path}`);
 * }
 * ```
 */
export function getDocById(id: string): DocRegistryItem | undefined {
  return docsRegistry.find(doc => doc.id === id);
}

/**
 * Get a document by its file path
 *
 * Searches both the primary path and any alias paths for the document.
 *
 * @param path - The file path relative to docs/ (e.g., 'architecture/README.md')
 * @returns The document registry item if found, undefined otherwise
 *
 * @example
 * ```typescript
 * const doc = getDocByPath('architecture/token-architecture.md');
 * if (doc) {
 *   console.log(`Category: ${doc.category}, Status: ${doc.status || 'active'}`);
 * }
 * ```
 */
export function getDocByPath(path: string): DocRegistryItem | undefined {
  return docsRegistry.find(doc => {
    if (doc.path === path) return true;
    if (doc.aliases?.includes(path)) return true;
    return false;
  });
}

/**
 * Fast lookup map for documents by path
 *
 * Provides O(1) lookup performance for path-based searches.
 * Includes both primary paths and alias paths as keys.
 *
 * @example
 * ```typescript
 * // Check if a path exists
 * if (docsRegistryByPath.has('architecture/README.md')) {
 *   const doc = docsRegistryByPath.get('architecture/README.md');
 *   console.log(`Found document: ${doc.title}`);
 * }
 *
 * // Iterate through all paths
 * for (const [path, doc] of docsRegistryByPath) {
 *   console.log(`${path} -> ${doc.title}`);
 * }
 * ```
 */
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
