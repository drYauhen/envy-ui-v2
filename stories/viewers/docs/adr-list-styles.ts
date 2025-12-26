import type { CSSProperties } from 'react';

/**
 * Shared styles for documentation list viewers.
 * These styles can be reused across different documentation sections.
 */

export const docsContainerStyle: CSSProperties = {
  padding: '24px',
  maxWidth: 1200,
  margin: '0 auto',
  fontFamily: 'system-ui, -apple-system, BlinkMacSystemFont, "Segoe UI", sans-serif',
  color: '#0f172a'
};

export const docsTitleStyle: CSSProperties = {
  margin: '0 0 24px',
  fontSize: '28px',
  fontWeight: 600,
  color: '#0f172a'
};

export const docsDescriptionStyle: CSSProperties = {
  margin: '0 0 32px',
  fontSize: '16px',
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
  background: '#fff',
  border: '1px solid #e2e8f0',
  borderRadius: '8px',
  boxShadow: '0 1px 3px rgba(15, 23, 42, 0.08)',
  transition: 'all 0.2s ease'
};

export const docsLinkStyle: CSSProperties = {
  color: '#0f172a',
  textDecoration: 'none',
  display: 'block'
};

export const docsItemTitleStyle: CSSProperties = {
  margin: '0 0 8px',
  fontSize: '18px',
  fontWeight: 600,
  color: '#0f172a'
};

export const docsItemMetaStyle: CSSProperties = {
  display: 'flex',
  gap: '12px',
  fontSize: '14px',
  color: '#64748b',
  marginTop: '8px'
};

export const statusBadgeStyle: CSSProperties = {
  display: 'inline-block',
  padding: '2px 8px',
  borderRadius: '4px',
  fontSize: '11px',
  fontWeight: 600,
  textTransform: 'uppercase'
};

/**
 * Get status badge style based on status value
 */
export const getStatusStyle = (status: string): CSSProperties => {
  const base = { ...statusBadgeStyle };
  switch (status.toLowerCase()) {
    case 'accepted':
      return { ...base, background: '#d1fae5', color: '#065f46' };
    case 'exploratory':
      return { ...base, background: '#dbeafe', color: '#1e40af' };
    case 'proposed (exploratory)':
      return { ...base, background: '#e0e7ff', color: '#3730a3' };
    case 'superseded':
      return { ...base, background: '#f3f4f6', color: '#374151' };
    default:
      return { ...base, background: '#fef3c7', color: '#92400e' };
  }
};

