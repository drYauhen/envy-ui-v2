/**
 * CollapsibleSection - Shared component for collapsible content sections
 * 
 * Reusable component for creating expandable/collapsible sections in Storybook viewers.
 * Uses native HTML details/summary elements for accessibility.
 */

import type { CSSProperties, ReactNode } from 'react';

export type CollapsibleSectionProps = {
  /**
   * Content to display when expanded
   */
  children: ReactNode;
  
  /**
   * Title/summary text shown in collapsed state
   */
  title: string;
  
  /**
   * Whether section should be open by default
   * @default false
   */
  defaultOpen?: boolean;
  
  /**
   * Custom styles for the container
   */
  containerStyle?: CSSProperties;
  
  /**
   * Custom styles for the summary/header
   */
  summaryStyle?: CSSProperties;
};

// Default container styles
const defaultContainerStyle: CSSProperties = {
  display: 'flex',
  flexDirection: 'column',
  gap: '0.75rem',
  borderRadius: '8px',
  border: '1px solid #e2e8f0',
  background: '#f8fafc',
  color: '#0f172a',
  padding: '1rem'
};

// Default summary/header styles
const defaultSummaryStyle: CSSProperties = {
  cursor: 'pointer',
  fontWeight: 600,
  padding: '0.75rem 1rem',
  margin: '-1rem -1rem 0.75rem -1rem',
  borderBottom: '1px solid #e2e8f0',
  background: '#f1f5f9',
  color: '#64748b',
  fontSize: '0.875rem',
  listStyle: 'none', // Remove default marker
  userSelect: 'none'
};

/**
 * CollapsibleSection Component
 * 
 * Creates an expandable/collapsible section using native HTML details/summary.
 * Accessible by default and works without JavaScript.
 * 
 * @example
 * <CollapsibleSection title="Show Details">
 *   <p>This content is hidden by default</p>
 * </CollapsibleSection>
 * 
 * @example
 * <CollapsibleSection title="Configuration" defaultOpen>
 *   <pre>{JSON.stringify(config, null, 2)}</pre>
 * </CollapsibleSection>
 */
export const CollapsibleSection = ({
  children,
  title,
  defaultOpen = false,
  containerStyle: customContainerStyle,
  summaryStyle: customSummaryStyle
}: CollapsibleSectionProps) => {
  const containerStyle = customContainerStyle 
    ? { ...defaultContainerStyle, ...customContainerStyle }
    : defaultContainerStyle;
  
  const summaryStyle = customSummaryStyle
    ? { ...defaultSummaryStyle, ...customSummaryStyle }
    : defaultSummaryStyle;

  return (
    <details style={containerStyle} open={defaultOpen}>
      <summary style={summaryStyle}>{title}</summary>
      {children}
    </details>
  );
};

