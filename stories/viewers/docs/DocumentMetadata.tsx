import React from 'react';
import { docsRegistryByPath } from './docs-registry';

/**
 * Resolve document path relative to the current document
 */
function resolveDocPath(href: string, basePath: string): string | null {
  if (!href || !basePath || typeof window === 'undefined') {
    return null;
  }

  try {
    const baseUrl = new URL(basePath, window.location.origin);
    const resolved = new URL(href, baseUrl);
    if (resolved.origin !== window.location.origin) {
      return null;
    }
    return resolved.pathname;
  } catch {
    return null;
  }
}

/**
 * Resolve document story path from resolved document path
 */
function resolveDocStoryPath(resolvedDocPath: string | null): string | null {
  if (!resolvedDocPath) return null;
  const normalizedPath = resolvedDocPath
    .replace(/^\/docs\//, '')
    .replace(/^\/+/, '');
  const docEntry = docsRegistryByPath.get(normalizedPath);
  if (docEntry?.storybookId) {
    return `?path=/story/${docEntry.storybookId}`;
  }
  return null;
}

export type DocumentMetadataFields = {
  // Common fields
  status?: string;
  date?: string;
  lastUpdated?: string;
  owner?: string;
  assistance?: string;

  // ADR-specific
  // (none currently)

  // Architecture-specific
  documentId?: string;
  category?: string;

  // Related documents
  related?: Array<{
    text: string;
    href: string;
    description?: string;
  }>;
};

type DocumentMetadataProps = {
  fields: DocumentMetadataFields;
  variant?: 'adr' | 'architecture';
  markdownPath?: string; // Used to resolve relative links
};

/**
 * Component for displaying document metadata in a structured format.
 * Renders as a definition list with labels on the left and values on the right.
 */
export const DocumentMetadata = ({ fields, variant = 'adr', markdownPath }: DocumentMetadataProps) => {
  const hasRelated = fields.related && fields.related.length > 0;

  // Resolve links to Storybook paths
  const resolvedLinks = fields.related?.map(link => {
    if (!markdownPath || !link.href.endsWith('.md')) {
      return link;
    }

    const resolvedDocPath = resolveDocPath(link.href, markdownPath);
    const storybookPath = resolveDocStoryPath(resolvedDocPath);

    return {
      ...link,
      href: storybookPath || link.href
    };
  });

  return (
    <div className="eui-callout eui-docs-metadata" data-eui-tone="neutral">
      <dl className="eui-docs-metadata-list">
        {/* Architecture-specific: Document ID */}
        {variant === 'architecture' && fields.documentId && (
          <>
            <dt className="eui-docs-metadata-label">Document ID</dt>
            <dd className="eui-docs-metadata-value eui-text-body-sm">
              <code className="eui-code-block" data-eui-variant="inline">
                {fields.documentId}
              </code>
            </dd>
          </>
        )}

        {/* Status */}
        {fields.status && (
          <>
            <dt className="eui-docs-metadata-label">Status</dt>
            <dd className="eui-docs-metadata-value eui-text-body-sm">{fields.status}</dd>
          </>
        )}

        {/* Date */}
        {fields.date && (
          <>
            <dt className="eui-docs-metadata-label">Date</dt>
            <dd className="eui-docs-metadata-value eui-text-body-sm">{fields.date}</dd>
          </>
        )}

        {/* Last Updated */}
        {fields.lastUpdated && (
          <>
            <dt className="eui-docs-metadata-label">Last Updated</dt>
            <dd className="eui-docs-metadata-value eui-text-body-sm">{fields.lastUpdated}</dd>
          </>
        )}

        {/* Owner */}
        {fields.owner && (
          <>
            <dt className="eui-docs-metadata-label">Owner</dt>
            <dd className="eui-docs-metadata-value eui-text-body-sm">{fields.owner}</dd>
          </>
        )}

        {/* Assistance */}
        {fields.assistance && (
          <>
            <dt className="eui-docs-metadata-label">Assistance</dt>
            <dd className="eui-docs-metadata-value eui-text-body-sm">{fields.assistance}</dd>
          </>
        )}

        {/* Architecture-specific: Category */}
        {variant === 'architecture' && fields.category && (
          <>
            <dt className="eui-docs-metadata-label">Category</dt>
            <dd className="eui-docs-metadata-value eui-text-body-sm">{fields.category}</dd>
          </>
        )}

        {/* Related documents */}
        {hasRelated && (
          <>
            <dt className="eui-docs-metadata-label">Related</dt>
            <dd className="eui-docs-metadata-value eui-text-body-sm">
              <ul className="eui-docs-metadata-related-list">
                {resolvedLinks!.map((link, index) => (
                  <li key={index}>
                    <a href={link.href} className="eui-button" data-eui-intent="link">
                      {link.text}
                    </a>
                    {link.description && (
                      <span className="eui-docs-metadata-related-description">
                        {' — '}
                        {link.description}
                      </span>
                    )}
                  </li>
                ))}
              </ul>
            </dd>
          </>
        )}
      </dl>
    </div>
  );
};
