import type { CSSProperties } from 'react';

/**
 * Shared styles for documentation list viewers.
 * These styles can be reused across different documentation sections.
 */

export const docsContainerStyle: CSSProperties = {
  padding: '24px',
  maxWidth: 1200,
  margin: '0 auto',
  color: '#0f172a'
};

export const docsTitleStyle: CSSProperties = {
  margin: '0 0 24px',
  color: '#0f172a'
};

export const docsDescriptionStyle: CSSProperties = {
  margin: '0 0 32px',
  color: '#475569',
  lineHeight: 1.6,
  maxWidth: '800px'
};

export const docsListStyle: CSSProperties = {
  display: 'grid',
  gap: '12px',
  listStyle: 'none',
  padding: 0,
  margin: 0
};

export const docsListItemStyle: CSSProperties = {
  padding: '16px',
  transition: 'transform 0.2s ease, box-shadow 0.2s ease'
};

export const docsLinkStyle: CSSProperties = {
  color: '#0f172a',
  textDecoration: 'none',
  display: 'block'
};

export const docsItemTitleStyle: CSSProperties = {
  margin: '0 0 8px',
  color: '#0f172a'
};

export const docsItemMetaStyle: CSSProperties = {
  display: 'flex',
  gap: '12px',
  color: '#64748b',
  marginTop: '8px'
};
