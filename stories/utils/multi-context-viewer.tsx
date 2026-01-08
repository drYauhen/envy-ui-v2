import * as React from 'react';
import { ContextThemeScope, useContextTheme, type ContextName } from './context-theme';

export type ViewerContext = {
  context: ContextName;
  label?: string;
};

export type MultiContextViewerProps = {
  /** Array of contexts to display (1-3 contexts) */
  contexts: ViewerContext[];
  /** Render function that receives context and current theme */
  children: (context: ContextName, theme: string) => React.ReactNode;
  /** Optional container style override */
  containerStyle?: React.CSSProperties;
  /** Whether to show context labels */
  showLabels?: boolean;
  /** Whether to make preset details collapsible (default: true) */
  collapsiblePresets?: boolean;
};

const defaultContainerStyle: React.CSSProperties = {
  background: 'var(--eui-color-background-base)',
  padding: '1.5rem',
  borderRadius: 'var(--eui-radius-large)'
};

/**
 * Context Wrapper Component
 *
 * Internal component that wraps each context and provides theme via hook
 */
const ContextWrapper: React.FC<{
  context: ContextName;
  label?: string;
  showLabels: boolean;
  containerStyle: React.CSSProperties;
  children: (context: ContextName, theme: string) => React.ReactNode;
}> = ({ context, label, showLabels, containerStyle, children }) => {
  const theme = useContextTheme(context);

  return (
    <ContextThemeScope
      context={context}
      className="eui-theme"
      style={containerStyle}
    >
      <div className="eui-stack" data-eui-gap="xs">
        {showLabels && (
          <>
            <div className="eui-inline" data-eui-gap="sm" data-eui-justify="end">
              <span className="eui-badge" data-eui-variant="outline" data-eui-tone="neutral">
                context: {context}
              </span>
              <span className="eui-badge" data-eui-variant="outline" data-eui-tone="info">
                theme: {theme}
              </span>
            </div>
            <hr className="eui-divider" data-eui-orientation="horizontal" data-eui-variant="subtle" />
          </>
        )}
        {children(context, theme)}
      </div>
    </ContextThemeScope>
  );
};

/**
 * Multi-Context Viewer
 *
 * **THE RECOMMENDED WAY** to display components in Storybook stories.
 * This is a unified viewer that works consistently for 1, 2, or 3 contexts.
 *
 * Displays components across theme contexts (app, website, report) in a responsive
 * grid layout. Always shows context and theme badges for clarity.
 *
 * **Key Features:**
 * - Unified API for all stories (single context or multi-context)
 * - Always displays context/theme badges using native Envy UI components
 * - Themes read dynamically from global Storybook theme switcher
 * - Automatic responsive layout based on number of contexts
 *
 * **IMPORTANT:** Do not hardcode theme values - they are read dynamically
 * from the global theme switcher and will be ignored if provided.
 *
 * @example Single context (most common)
 * ```tsx
 * <MultiContextViewer contexts={[{ context: 'app' }]}>
 *   {(context, theme) => <YourComponent />}
 * </MultiContextViewer>
 * ```
 *
 * @example Multiple contexts for comparison
 * ```tsx
 * <MultiContextViewer
 *   contexts={[
 *     { context: 'app' },
 *     { context: 'website' },
 *     { context: 'report' }
 *   ]}
 * >
 *   {(context, theme) => <YourComponent context={context} theme={theme} />}
 * </MultiContextViewer>
 * ```
 */
export const MultiContextViewer: React.FC<MultiContextViewerProps> = ({
  contexts,
  children,
  containerStyle = defaultContainerStyle,
  showLabels = true
}) => {
  if (contexts.length === 0 || contexts.length > 3) {
    throw new Error('MultiContextViewer requires 1-3 contexts');
  }

  const gridColumns = contexts.length === 1
    ? '1fr'
    : contexts.length === 2
    ? 'repeat(2, 1fr)'
    : 'repeat(auto-fit, minmax(500px, 1fr))';

  return (
    <div
      style={{
        padding: '2rem',
        display: 'grid',
        gridTemplateColumns: gridColumns,
        gap: '2rem'
      }}
    >
      {contexts.map((ctx) => (
        <ContextWrapper
          key={ctx.context}
          context={ctx.context}
          label={ctx.label}
          showLabels={showLabels}
          containerStyle={containerStyle}
        >
          {children}
        </ContextWrapper>
      ))}
    </div>
  );
};

/**
 * Preset Details Display
 *
 * Helper component for showing loaded preset configuration.
 * Can be collapsible or always visible.
 */
export const PresetDetails: React.FC<{
  presets: Record<string, unknown> | null;
  collapsible?: boolean;
}> = ({ presets, collapsible = true }) => {
  if (!presets) return null;

  const content = (
    <pre
      style={{
        marginTop: '0.5rem',
        fontSize: '0.7rem',
        background: 'rgba(0,0,0,0.05)',
        padding: '0.5rem',
        borderRadius: '4px',
        overflow: 'auto',
        maxHeight: '200px'
      }}
    >
      {JSON.stringify(presets, null, 2)}
    </pre>
  );

  if (collapsible) {
    return (
      <details style={{ fontSize: '0.75rem', marginBottom: '0.5rem' }}>
        <summary style={{ cursor: 'pointer', opacity: 0.8 }}>View Presets</summary>
        {content}
      </details>
    );
  }

  return (
    <div style={{ fontSize: '0.75rem', marginBottom: '1rem' }}>
      <strong>Theme Presets Loaded:</strong>
      {content}
    </div>
  );
};
