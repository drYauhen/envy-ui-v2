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
  /** Optional container style override or className */
  containerStyle?: React.CSSProperties | string;
  /** Whether to show context labels */
  showLabels?: boolean;
  /** Whether to make preset details collapsible (default: true) */
  collapsiblePresets?: boolean;
};

const defaultContainerStyle: React.CSSProperties | string | undefined = undefined;
const CONTEXT_ORDER: ContextName[] = ['app', 'website', 'report'];

/**
 * Context Wrapper Component
 *
 * Internal component that wraps each context and provides theme via hook
 */
const ContextWrapper: React.FC<{
  context: ContextName;
  label?: string;
  showLabels: boolean;
  containerStyle?: React.CSSProperties | string;
  children: (context: ContextName, theme: string) => React.ReactNode;
}> = ({ context, label, showLabels, containerStyle, children }) => {
  const theme = useContextTheme(context);
  const isAppDefault = context === 'app' && theme === 'default';

  const isClassName = typeof containerStyle === 'string';
  const className = containerStyle ? (isClassName ? `eui-theme ${containerStyle}` : 'eui-theme') : 'eui-theme';
  const style = containerStyle && !isClassName ? containerStyle : undefined;
  const content = children(context, theme);

  return (
    <div className="eui-stack" data-eui-gap="lg">
      {showLabels && (
        <div className="eui-stack" data-eui-gap="xs">
          <hr className="eui-divider" data-eui-orientation="horizontal" data-eui-variant="subtle" />
          <div className="eui-inline" data-eui-gap="sm" data-eui-justify="end">
            <span className="eui-badge" data-eui-variant="outline" data-eui-tone="neutral">
              context: {context}
            </span>
            <span className="eui-badge" data-eui-variant="outline" data-eui-tone="info">
              theme: {theme}
            </span>
          </div>
        </div>
      )}
      {/* Only this block should receive dynamic context theme (app/default passes through). */}
      {isAppDefault ? (
        <div className={className} style={style} data-testid="component-under-test">
          {content}
        </div>
      ) : (
        <ContextThemeScope
          context={context}
          className={className}
          style={style}
          data-testid="component-under-test"
        >
          {content}
        </ContextThemeScope>
      )}
      {/* Only this block should receive dynamic context theme. */}
    </div>
  );
};

/**
 * Multi-Context Viewer
 *
 * **THE RECOMMENDED WAY** to display components in Storybook stories.
 * This is a unified viewer that works consistently for 1, 2, or 3 contexts.
 *
 * Features a **shell wrapper** with configurable context+theme for viewer UI elements
 * (badges, dividers, etc.), containing up to 3 different context-themed components
 * in a vertical stack layout.
 *
 * **Key Features:**
 * - Shell wrapper with configurable context+theme for consistent viewer styling
 * - Up to 3 component contexts stacked vertically inside the shell
 * - Component themes controlled by Storybook theme switcher
 * - Always displays context/theme badges using native Envy UI components
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
 * @example Multiple contexts (themes controlled by Storybook switcher)
 * ```tsx
 * <MultiContextViewer
 *   contexts={[
 *     { context: 'app', label: 'App Context' },
 *     { context: 'website', label: 'Website Context' },
 *     { context: 'report', label: 'Report Context' }
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
  const orderedContexts = CONTEXT_ORDER
    .map((context) => contexts.find((ctx) => ctx.context === context))
    .filter((ctx): ctx is ViewerContext => Boolean(ctx));

  return (
    <ContextThemeScope
      style={{ padding: '2rem' }}
    >
      <div className="eui-stack" data-eui-gap="lg">
        {orderedContexts.map((ctx) => (
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
    </ContextThemeScope>
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
