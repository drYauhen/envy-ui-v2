/**
 * AccessibilityPanel - Shared component for accessibility inspection
 * 
 * Placeholder component for future accessibility inspection features.
 * Can be used to display accessibility information or integrate with Storybook's a11y addon.
 */

import type { CSSProperties, ReactNode } from 'react';

export type AccessibilityPanelProps = {
  /**
   * Content to display in the panel
   */
  children?: ReactNode;
  
  /**
   * Title for the accessibility panel
   * @default "Accessibility"
   */
  title?: string;
  
  /**
   * Whether panel should be collapsible
   * @default true
   */
  collapsible?: boolean;
  
  /**
   * Whether panel should be open by default
   * @default false
   */
  defaultOpen?: boolean;
};

// Panel container styles
const panelStyle: CSSProperties = {
  display: 'flex',
  flexDirection: 'column',
  gap: '0.75rem',
  borderRadius: '8px',
  border: '1px solid #e2e8f0',
  background: '#f8fafc',
  color: '#0f172a',
  padding: '1rem'
};

// Summary/header styles
const summaryStyle: CSSProperties = {
  cursor: 'pointer',
  fontWeight: 600,
  padding: '0.75rem 1rem',
  margin: '-1rem -1rem 0.75rem -1rem',
  borderBottom: '1px solid #e2e8f0',
  background: '#f1f5f9',
  color: '#64748b',
  fontSize: '0.875rem',
  listStyle: 'none',
  userSelect: 'none'
};

/**
 * AccessibilityPanel Component
 * 
 * Placeholder component for accessibility inspection features.
 * Currently displays children content in a styled panel.
 * 
 * Future enhancements:
 * - Integration with Storybook's @storybook/addon-a11y
 * - Automatic accessibility checks
 * - ARIA attributes display
 * - Keyboard navigation testing
 * 
 * @example
 * <AccessibilityPanel>
 *   <p>Accessibility information will be displayed here</p>
 * </AccessibilityPanel>
 */
export const AccessibilityPanel = ({
  children,
  title = 'Accessibility',
  collapsible = true,
  defaultOpen = false
}: AccessibilityPanelProps) => {
  if (collapsible) {
    return (
      <details style={panelStyle} open={defaultOpen}>
        <summary style={summaryStyle}>{title}</summary>
        {children || (
          <p style={{ margin: 0, color: '#64748b', fontSize: '0.875rem' }}>
            Accessibility inspection features coming soon.
          </p>
        )}
      </details>
    );
  }
  
  return (
    <div style={panelStyle}>
      <div style={{ fontWeight: 600, fontSize: '0.875rem', color: '#64748b', marginBottom: '0.5rem' }}>
        {title}
      </div>
      {children || (
        <p style={{ margin: 0, color: '#64748b', fontSize: '0.875rem' }}>
          Accessibility inspection features coming soon.
        </p>
      )}
    </div>
  );
};

