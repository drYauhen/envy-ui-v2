import React from 'react';
import type { DocMetadata } from './doc-types';

type DocListViewerProps = {
  title?: string;
  description?: React.ReactNode;
  docs: DocMetadata[];
  category: 'adr' | 'architecture' | 'workflow' | 'token' | 'guide';
};

/**
 * Unified DocListViewer Component
 *
 * Displays a list of documents for any category (ADR, Architecture, Workflow, etc.)
 * Follows the ADR overview pattern but works for all document types.
 *
 * This replaces both AdrListViewer and DocSectionListViewer with a single,
 * consistent component that adapts to different document categories.
 */
export const DocListViewer: React.FC<DocListViewerProps> = ({
  title,
  description,
  docs,
  category
}) => {
  const defaultTitle = getDefaultTitle(category);
  const defaultDescription = getDefaultDescription(category);

  return (
    <div
      className="eui-docs eui-docs-container eui-container eui-stack"
      data-eui-container="standard"
      data-eui-gap="lg"
    >
      <h1 className="eui-text-heading-5 eui-docs-title">{title || defaultTitle}</h1>
      <div className="eui-text-body eui-docs-description">
        {description || defaultDescription}
      </div>
      <ul className="eui-docs-list eui-stack" data-eui-gap="sm">
        {docs.map((doc) => (
          <DocListItem key={doc.number} doc={doc} category={category} />
        ))}
      </ul>
    </div>
  );
};

const DocListItem: React.FC<{ doc: DocMetadata; category: string }> = ({ doc, category }) => {
  const statusBadge = doc.status ? (
    <span className="eui-badge" data-eui-variant="subtle" data-eui-tone={getStatusTone(doc.status, category)}>
      {doc.status}
    </span>
  ) : null;
  const storyPath = getDocStoryPath(doc, category);

  // Render title with styled prefix for ADR and Architecture
  let titleElement: React.ReactNode;

  if (category === 'adr') {
    titleElement = (
      <>
        <span className="eui-text-muted">ADR-{doc.number}: </span>
        {doc.title}
      </>
    );
  } else if (category === 'architecture') {
    titleElement = (
      <>
        <span className="eui-text-muted">ARCH-{doc.majorCategory}-{doc.number}: </span>
        {doc.title}
      </>
    );
  } else {
    titleElement = getDocTitle(doc, category);
  }

  return (
    <li>
      <a
        href={storyPath}
        className="eui-card eui-docs-list-link"
        data-eui-variant="elevated"
      >
        <div className="eui-card__body eui-stack" data-eui-gap="xs">
          <div className="eui-text-title-md">
            {titleElement}
          </div>
          <div
            className="eui-inline eui-text-caption eui-docs-item-meta"
            data-eui-gap="sm"
            data-eui-wrap="true"
          >
            {statusBadge}
            {doc.date && <span>Updated: {doc.date}</span>}
          </div>
        </div>
      </a>
    </li>
  );
};

// Helper functions for category-specific logic
function getDefaultTitle(category: string): string {
  switch (category) {
    case 'adr': return 'Architectural Decision Records (ADR)';
    case 'architecture': return 'Architecture Documentation';
    case 'workflow': return 'Workflow Documentation';
    case 'token': return 'Token Documentation';
    case 'guide': return 'Guide Documentation';
    default: return `${category.charAt(0).toUpperCase() + category.slice(1)} Documentation`;
  }
}

function getDefaultDescription(category: string): React.ReactNode {
  switch (category) {
    case 'adr':
      return (
        <>
          <p>
            Architectural Decision Records (ADR) capture the history of architectural reasoning and decision-making over time.
            They reflect how thinking evolved at specific moments and are not guaranteed to describe the current or final state of the system.
          </p>
          <p>
            ADR documents serve as a historical record of architectural thinking, context for understanding why certain approaches were explored,
            and reference material for reflection and analysis.
          </p>
        </>
      );
    case 'architecture':
      return (
        <>
          <p>Current architectural rules, standards, and references for Envy UI.</p>
          <p>Use this list to navigate all architecture documents in Storybook.</p>
        </>
      );
    case 'workflow':
      return (
        <>
          <p>Workflow documentation for working with the Envy UI system.</p>
          <p>Learn how to contribute, maintain, and extend the design system.</p>
        </>
      );
    default:
      return (
        <p>Documentation for {category} in the Envy UI system.</p>
      );
  }
}

function getDocTitle(doc: DocMetadata, category: string): string {
  switch (category) {
    case 'adr':
      return `ADR-${doc.number}: ${doc.title}`;
    case 'architecture':
      return doc.title; // Already includes ARCH- prefix
    default:
      return `${doc.title}`;
  }
}

function getStatusTone(status: string, category: string): string {
  const normalized = status.toLowerCase();

  if (category === 'adr') {
    if (normalized.startsWith('accepted')) return 'success';
    if (normalized.startsWith('exploratory')) return 'info';
    if (normalized.startsWith('proposed')) return 'warning';
    if (normalized.startsWith('rejected')) return 'error';
    if (normalized.startsWith('superseded')) return 'neutral';
  }

  if (category === 'architecture') {
    if (normalized === 'active') return 'success';
    if (normalized === 'draft') return 'neutral';
    if (normalized === 'in-progress') return 'info';
  }

  // Default neutral for unknown status values
  return 'neutral';
}

function getDocStoryPath(doc: DocMetadata, category: string): string {
  const storyId = getStoryId(doc, category);
  return `./?path=/story/docs-${category}--${storyId}`;
}

// Storybook ID generation utilities (same as validation script)
const sanitizeStoryIdPart = (str: string): string => (
  str
    .replace(/[^a-zA-Z0-9]/g, '-')
    .replace(/-+/g, '-')
    .replace(/^-|-$/g, '')
    .toLowerCase()
);

const storyNameFromExport = (exportName: string): string => (
  exportName
    .replace(/([a-z])([A-Z])/g, '$1-$2')          // lowercase to uppercase
    .replace(/([A-Z])([A-Z][a-z])/g, '$1-$2')    // acronym to word
    .replace(/([0-9])([A-Z])/g, '$1-$2')         // digit to uppercase
    .replace(/([a-zA-Z])([0-9])/g, '$1-$2')      // letter to digit
    .toLowerCase()
);

const toStoryId = (title: string, exportName: string): string => (
  `${sanitizeStoryIdPart(title)}--${sanitizeStoryIdPart(storyNameFromExport(exportName))}`
);

function getStoryId(doc: DocMetadata, category: string): string {
  if (doc.exportName) {
      return storyNameFromExport(doc.exportName);
  }

  // Fallback for documents without exportName
  return doc.id || doc.number || 'unknown';
}
