/**
 * Unified Documentation Types
 *
 * Defines the unified metadata structure for all documentation types
 * in the Envy UI system (ADR, Architecture, Workflow, Token, Guide).
 */

export type DocCategory = 'adr' | 'architecture' | 'workflow' | 'token' | 'guide' | 'migration';

export type DocMetadata = {
  // Core identification
  id?: string;                  // Optional unique identifier (for backward compatibility)
  number: string;               // Universal sequential number: '0001', '0002', '001', '002', etc.
  title: string;                // Display title
  category: DocCategory;        // Documentation category

  // Universal status (interpreted differently per category)
  status?: string;              // ADR status ('Accepted'), doc status ('active'), or null

  // Common metadata
  date?: string;                // Creation date
  lastUpdated?: string;         // Last update date
  owner?: string;               // Document owner
  assistance?: string;          // Assistance needed

  // Type-specific extensions
  majorCategory?: string;       // Architecture only: 'ACCESSIBILITY', 'COMPONENTS', etc.

  // File path
  markdownPath?: string;        // Path to markdown file (e.g., '/docs/adr/ADR-0001.md')

  // Storybook integration
  storybookId?: string;         // Storybook story ID
  exportName?: string;          // Story export name

  // Advanced features
  tags?: string[];              // For filtering/search
  aliases?: string[];           // For renamed files
  dependencies?: string[];      // Document dependencies
};

/**
 * Document registry item structure
 * Used in docs-registry.ts to create unified document lookup
 */
export type DocRegistryItem = {
  /** Unique document identifier (e.g., 'adr-0001', 'arch-tokens-001') */
  id: string;

  /** File path relative to docs/ (e.g., 'adr/ADR-0001-react-aria-headless.md') */
  path: string;

  /** Document title */
  title: string;

  /** Document category - allows both DocCategory values and legacy registry values */
  category: DocCategory | 'workflows' | 'other';

  /** Export name for Storybook story (optional) */
  exportName?: string;

  /** Document status (optional) */
  status?: string;

  /** Storybook story ID for link resolution (required for story-backed docs) */
  storybookId?: string;

  /** Alternative paths that resolve to this document */
  aliases?: string[];
};
