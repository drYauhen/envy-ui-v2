/**
 * Unified Documentation Types
 *
 * Defines the unified metadata structure for all documentation types
 * in the Envy UI system (ADR, Architecture, Workflow, Token, Guide).
 */

export type DocCategory = 'adr' | 'architecture' | 'workflow' | 'token' | 'guide';

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
