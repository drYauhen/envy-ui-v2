/**
 * Canonical Document Metadata System
 *
 * Unified schema for all document types with mandatory and optional fields.
 * Ensures consistent formatting and validation across ADR, Architecture, Workflows, etc.
 */

// =============================================================================
// CANONICAL METADATA SCHEMA - Single source of truth for all document types
// =============================================================================

export const CANONICAL_METADATA_SCHEMA = {
  // Identity & Tracking
  documentId: 'Document ID',        // Auto-generated unique identifier
  category: 'Category',             // Document categorization (ADR, Architecture, Workflow, etc.)

  // Status & Lifecycle
  status: 'Status',                 // Current status (Accepted, Proposed, Draft, etc.)
  date: 'Date',                     // Creation date
  lastUpdated: 'Last Updated',      // Last modification date

  // Ownership & Attribution
  owner: 'Owner',                   // Primary owner/responsible person
  assistance: 'Assistance',         // AI assistance acknowledgment

  // Relationships
  related: 'Related',               // Related documents, ADRs, issues

  // Future extensions (optional)
  tags: 'Tags',                     // Search/filtering tags
  reviewers: 'Reviewers',           // Review process participants
  priority: 'Priority'              // Implementation/business priority
} as const;

// =============================================================================
// DOCUMENT TYPE CONFIGURATIONS - Required vs Optional fields per type
// =============================================================================

export const DOCUMENT_TYPE_CONFIGS = {
  adr: {
    required: ['status', 'date', 'lastUpdated', 'owner'] as const,
    optional: ['assistance', 'related', 'tags', 'reviewers'] as const,
    autoGenerate: ['documentId'] as const
  },
  architecture: {
    required: ['category', 'lastUpdated', 'owner'] as const,
    optional: ['related', 'tags', 'reviewers', 'priority'] as const,
    autoGenerate: ['documentId'] as const
  },
  workflow: {
    required: ['category', 'lastUpdated', 'owner'] as const,
    optional: ['related', 'tags', 'reviewers', 'priority'] as const,
    autoGenerate: ['documentId'] as const
  },
  guide: {
    required: ['category', 'lastUpdated', 'owner'] as const,
    optional: ['related', 'tags', 'reviewers'] as const,
    autoGenerate: ['documentId'] as const
  },
  token: {
    required: ['category', 'lastUpdated', 'owner'] as const,
    optional: ['related', 'tags'] as const,
    autoGenerate: ['documentId'] as const
  }
} as const;

// =============================================================================
// TYPE DEFINITIONS
// =============================================================================

export type MetadataField = keyof typeof CANONICAL_METADATA_SCHEMA;
export type DocumentType = keyof typeof DOCUMENT_TYPE_CONFIGS;

export type DocumentMetadata = {
  [K in MetadataField]?: string;
};

// =============================================================================
// METADATA GENERATION HELPERS
// =============================================================================

/**
 * Generate canonical metadata block for any document type
 */
export function generateCanonicalMetadata(
  docType: DocumentType,
  data: DocumentMetadata
): string {
  const config = DOCUMENT_TYPE_CONFIGS[docType];
  const lines: string[] = [];

  // Add all fields in canonical order
  const allFields = [
    'documentId', 'category', 'status', 'date', 'lastUpdated',
    'owner', 'assistance', 'related', 'tags', 'reviewers', 'priority'
  ] as const;

  for (const field of allFields) {
    const value = data[field];
    if (value !== undefined && value !== '') {
      const label = CANONICAL_METADATA_SCHEMA[field];
      lines.push(`**${label}:** ${value}`);
    }
  }

  return lines.length > 0 ? lines.join('\n') + '\n\n---\n\n' : '';
}

/**
 * Generate document ID based on type and context
 */
export function generateDocumentId(
  docType: DocumentType,
  filename: string,
  category?: string
): string {
  const baseName = filename.replace(/\.(md|json)$/i, '');

  switch (docType) {
    case 'adr':
      // ADR-XXXX format
      const adrMatch = baseName.match(/ADR-(\d{4})/);
      return adrMatch ? `adr-${adrMatch[1]}` : `adr-${baseName.toLowerCase()}`;

    case 'architecture':
      return `arch-${baseName.toLowerCase().replace(/[^a-z0-9]+/g, '-')}`;

    case 'workflow':
      return `workflow-${baseName.toLowerCase().replace(/[^a-z0-9]+/g, '-')}`;

    case 'guide':
      return `guide-${baseName.toLowerCase().replace(/[^a-z0-9]+/g, '-')}`;

    case 'token':
      return `token-${baseName.toLowerCase().replace(/[^a-z0-9]+/g, '-')}`;

    default:
      return `${docType}-${baseName.toLowerCase().replace(/[^a-z0-9]+/g, '-')}`;
  }
}

// =============================================================================
// VALIDATION HELPERS
// =============================================================================

/**
 * Validate metadata completeness for a document type
 */
export function validateMetadataCompleteness(
  docType: DocumentType,
  metadata: DocumentMetadata
): { valid: boolean; missing: MetadataField[]; extra: MetadataField[] } {
  const config = DOCUMENT_TYPE_CONFIGS[docType];

  // Check required fields
  const missing: MetadataField[] = [];
  for (const field of config.required) {
    if (!metadata[field] || metadata[field]?.trim() === '') {
      missing.push(field);
    }
  }

  // Check for unexpected fields
  const expectedFields = new Set([
    ...config.required,
    ...config.optional,
    ...config.autoGenerate
  ]);
  const extra: MetadataField[] = [];
  for (const field of Object.keys(metadata) as MetadataField[]) {
    if (!expectedFields.has(field)) {
      extra.push(field);
    }
  }

  return {
    valid: missing.length === 0 && extra.length === 0,
    missing,
    extra
  };
}

/**
 * Parse metadata from markdown frontmatter
 */
export function parseMarkdownMetadata(content: string): DocumentMetadata {
  const metadata: DocumentMetadata = {};
  const lines = content.split('\n');

  for (const line of lines) {
    // Look for **Field:** value pattern
    const match = line.match(/^\*\*([^*]+):\*\*\s*(.+)$/);
    if (match) {
      const [, label, value] = match;

      // Find which field this corresponds to
      for (const [fieldKey, fieldLabel] of Object.entries(CANONICAL_METADATA_SCHEMA)) {
        if (fieldLabel === label.trim()) {
          metadata[fieldKey as MetadataField] = value.trim();
          break;
        }
      }
    }

    // Stop at content separator
    if (line.trim() === '---') {
      break;
    }
  }

  return metadata;
}

/**
 * Remove metadata from markdown content and return clean content
 */
export function stripMetadataFromMarkdown(content: string): string {
  const lines = content.split('\n');
  const result: string[] = [];
  let inMetadata = true;

  for (const line of lines) {
    if (inMetadata) {
      // Check if this line is metadata (starts with **Field:**)
      const isMetadata = line.match(/^\*\*([^*]+):\*\*/);
      const isSeparator = line.trim() === '---';

      if (isMetadata) {
        // Skip metadata lines
        continue;
      } else if (isSeparator && result.length === 0) {
        // First --- separator, skip it too
        continue;
      } else {
        // End of metadata section
        inMetadata = false;
        // Include non-metadata lines
        if (line.trim() !== '') {
          result.push(line);
        }
      }
    } else {
      result.push(line);
    }
  }

  return result.join('\n').trim();
}

// =============================================================================
// TEMPLATE GENERATORS FOR EACH DOCUMENT TYPE
// =============================================================================

export function generateAdrTemplate(data: {
  number: string;
  title: string;
  status: string;
  date: string;
  owner: string;
  assistance?: string;
  related?: string;
}): string {
  const metadata: DocumentMetadata = {
    documentId: `adr-${data.number}`,
    status: data.status,
    date: data.date,
    lastUpdated: new Date().toISOString().split('T')[0],
    owner: data.owner,
    assistance: data.assistance,
    related: data.related
  };

  return `# ADR-${data.number}: ${data.title}

${generateCanonicalMetadata('adr', metadata)}`;
}

export function generateArchitectureTemplate(data: {
  title: string;
  category: string;
  owner: string;
  related?: string;
}): string {
  const metadata: DocumentMetadata = {
    category: data.category,
    lastUpdated: new Date().toISOString().split('T')[0],
    owner: data.owner,
    related: data.related
  };

  return `# ${data.title}

${generateCanonicalMetadata('architecture', metadata)}`;
}

export function generateWorkflowTemplate(data: {
  title: string;
  category: string;
  owner: string;
  related?: string;
}): string {
  const metadata: DocumentMetadata = {
    category: data.category,
    lastUpdated: new Date().toISOString().split('T')[0],
    owner: data.owner,
    related: data.related
  };

  return `# ${data.title}

${generateCanonicalMetadata('workflow', metadata)}`;
}
