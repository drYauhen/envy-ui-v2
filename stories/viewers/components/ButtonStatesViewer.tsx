import type { CSSProperties, ReactNode } from 'react';
import { useState } from 'react';
import { Highlight, themes, type Language } from 'prism-react-renderer';
// CSS is already imported globally in .storybook/preview.tsx

// For code display, we'll use a simplified version or reference
// The actual CSS is imported globally and will be applied to the page
const buttonCssReference = `/* Full CSS available at: src/ui/button.css */
/* This is a reference - the actual styles are imported globally in .storybook/preview.tsx */`;

/**
 * Button configuration for the states viewer
 * Defines which button variant to display with all its states
 */
type ButtonConfig = {
  intent?: 'primary' | 'secondary' | 'accent';
  size?: 'sm' | 'md' | 'lg';
  shape?: 'default' | 'round' | 'circle';
  label?: string;
};

/**
 * Props for ButtonStatesViewer component
 * Displays a button in all possible states (normal, hover, active, focus, disabled)
 * with code examples below
 */
type ButtonStatesViewerProps = {
  config: ButtonConfig;
  title?: string;
  description?: string;
};

const containerStyle: CSSProperties = {
  display: 'flex',
  flexDirection: 'column',
  gap: '1.5rem',
  padding: '1.5rem',
  background: '#ffffff',
  border: '1px solid #e2e8f0',
  borderRadius: '8px'
};

const headerStyle: CSSProperties = {
  display: 'flex',
  flexDirection: 'column',
  gap: '0.5rem'
};

const titleStyle: CSSProperties = {
  margin: 0,
  fontSize: '1.125rem',
  fontWeight: 700,
  color: '#0f172a'
};

const descriptionStyle: CSSProperties = {
  margin: 0,
  fontSize: '0.875rem',
  color: '#64748b'
};

const statesRowStyle: CSSProperties = {
  display: 'flex',
  gap: '1rem',
  alignItems: 'center',
  flexWrap: 'wrap',
  padding: '1rem',
  background: '#f8fafc',
  borderRadius: '6px',
  border: '1px solid #e2e8f0'
};

const stateItemStyle: CSSProperties = {
  display: 'flex',
  flexDirection: 'column',
  gap: '0.5rem',
  alignItems: 'center'
};

const stateLabelStyle: CSSProperties = {
  fontSize: '0.75rem',
  fontWeight: 600,
  color: '#475569',
  textTransform: 'uppercase',
  letterSpacing: '0.05em'
};

// ============================================================================
// Code Panel Styles
// ============================================================================
// Expandable code panel container (details/summary element)
const codePanelStyle: CSSProperties = {
  /* Original: padding: 1.5rem; */
  padding: '1rem', /* Reduced to save space */
  display: 'flex',
  flexDirection: 'column',
  gap: '0.75rem',
  borderRadius: '8px',
  border: '1px solid #e2e8f0',
  background: '#f8fafc',
  color: '#0f172a'
};

// Summary/header of the expandable code panel ("Expand to inspect code")
const summaryStyle: CSSProperties = {
  cursor: 'pointer',
  fontWeight: 400,
  padding: '0.75rem 1rem',
  borderBottom: '1px solid #e2e8f0',
  background: '#f1f5f9',
  color: '#64748b'
};

// Tab bar container (HTML/CSS tabs)
const tabsStyle: CSSProperties = {
  display: 'flex',
  gap: '0.5rem',
  padding: '0.5rem 0.75rem',
  borderBottom: '1px solid #e2e8f0',
  background: '#f8fafc'
};

// Individual tab button styling (changes based on active state)
const tabStyle = (active: boolean): CSSProperties => ({
  appearance: 'none',
  border: `1px solid ${active ? '#cbd5e1' : 'transparent'}`,
  borderRadius: '6px',
  background: active ? '#ffffff' : 'transparent',
  color: '#0f172a',
  fontSize: '0.75rem',
  fontWeight: 600,
  padding: '0.25rem 0.6rem',
  cursor: 'pointer'
});

// Code block container with syntax highlighting
const codeWrapStyle: CSSProperties = {
  padding: '0.75rem 1rem 1rem',
  fontFamily: 'ui-monospace, SFMono-Regular, Menlo, Monaco, Consolas, "Liberation Mono", "Courier New", monospace',
  fontSize: '0.78rem',
  lineHeight: 1.6,
  margin: 0,
  whiteSpace: 'pre-wrap',
  wordBreak: 'break-word',
  overflowX: 'hidden'
};

// ============================================================================
// Helper Functions
// ============================================================================

/**
 * Builds HTML attributes object for a button element
 * @param config - Button configuration (intent, size, shape, label)
 * @param state - Optional state to simulate (hover, active, focus, disabled)
 * @returns Object with button attributes ready for JSX spread
 */
const buildButtonAttrs = (config: ButtonConfig, state?: string): Record<string, string | boolean> => {
  const attrs: Record<string, string | boolean> = {
    className: 'eui-button'
  };

  // Add intent attribute (primary/secondary)
  if (config.intent) {
    attrs['data-eui-intent'] = config.intent;
  }
  // Add size attribute (sm/md/lg)
  if (config.size) {
    attrs['data-eui-size'] = config.size;
  }
  // Add shape attribute (default/round/circle)
  if (config.shape) {
    attrs['data-eui-shape'] = config.shape;
  }
  // Add state attribute for simulation (hover, active, focus)
  // Note: disabled is handled separately as a boolean attribute
  if (state && state !== 'disabled') {
    attrs['data-state'] = state;
  }
  // Add disabled attribute (boolean, not string)
  if (state === 'disabled') {
    attrs['disabled'] = true;
  }

  return attrs;
};

/**
 * Generates HTML markup string for code display
 * Creates a representative example showing the button structure
 * @param config - Button configuration
 * @returns HTML string for display in code panel
 */
const generateMarkup = (config: ButtonConfig): string => {
  const attrs = buildButtonAttrs(config);
  const attrsString = Object.entries(attrs)
    .map(([key, value]) => {
      if (key === 'className') {
        return `class="${value}"`;
      }
      if (key === 'disabled' && value === 'true') {
        return 'disabled';
      }
      return `${key}="${value}"`;
    })
    .join(' ');

  return `<div data-eui-context="app">
  <button ${attrsString}>
    ${config.label || 'Button'}
  </button>
</div>`;
};

// ============================================================================
// State Definitions
// ============================================================================
// All possible button states to display in the viewer
// Note: These are simulated via data-state attributes for visual demonstration
// Real hover/focus states require actual user interaction
const states = [
  { id: 'normal', label: 'Normal' },
  { id: 'hover', label: 'Hover' },
  { id: 'active', label: 'Active' },
  { id: 'focus', label: 'Focus' },
  { id: 'disabled', label: 'Disabled' }
];

// ============================================================================
// Main Component
// ============================================================================

/**
 * ButtonStatesViewer Component
 * 
 * Displays a button in all possible states (KSS-style documentation):
 * - Shows all states in a single row: Normal, Hover, Active, Focus, Disabled
 * - Includes expandable code panel with HTML/CSS tabs
 * - Uses data-state attributes to simulate states (Storybook-only)
 * 
 * This component is designed for documentation purposes and demonstrates
 * how the button looks in different states without requiring user interaction.
 */
export const ButtonStatesViewer = ({ config, title, description }: ButtonStatesViewerProps) => {
  // Tab state for code panel (HTML or CSS)
  const [activeTab, setActiveTab] = useState<'html' | 'css'>('html');
  
  // Generate markup for code display
  const markup = generateMarkup(config);
  const css = buttonCssReference;
  const code = activeTab === 'html' ? markup : css;
  const language = (activeTab === 'html' ? 'markup' : 'css') as Language;
  const label = activeTab === 'html' ? 'HTML' : 'CSS';
  
  // Unique IDs for accessibility (ARIA)
  const htmlTabId = `button-states-${config.intent || 'default'}-html`;
  const cssTabId = `button-states-${config.intent || 'default'}-css`;
  const panelId = `button-states-${config.intent || 'default'}-panel`;

  // Auto-generate title if not provided
  const displayTitle = title || `${config.intent || 'Default'} ${config.size || 'md'} ${config.shape || 'default'}`;

  return (
    <div style={containerStyle}>
      {/* Header Section: Title and Description */}
      {(title || description) && (
        <div style={headerStyle}>
          {title && <h3 style={titleStyle}>{displayTitle}</h3>}
          {description && <p style={descriptionStyle}>{description}</p>}
        </div>
      )}

      {/* Button States Display Section */}
      <div data-eui-context="app">
        {/* 
          Storybook-only CSS for state simulation
          These styles simulate hover/active/focus states via data-state attributes
          In real usage, these states are triggered by actual user interaction
        */}
        <style
          dangerouslySetInnerHTML={{
            __html: `
          /* Storybook-only: simulate states via data-state attribute */
          [data-eui-context] .eui-button[data-state='hover'] {
            background-color: color-mix(in srgb, var(--eui-button-bg-base), white 8%);
            border-color: color-mix(in srgb, var(--eui-button-border-base), white 8%);
          }
          [data-eui-context] .eui-button[data-state='active'] {
            background-color: color-mix(in srgb, var(--eui-button-bg-base), black 8%);
            border-color: color-mix(in srgb, var(--eui-button-border-base), black 12%);
            transform: translateY(1px);
          }
          [data-eui-context] .eui-button[data-state='focus'] {
            box-shadow: 0 0 0 var(--eui-button-focus-ring-width-accessible) var(--eui-button-focus-color-accessible);
            z-index: 1;
          }
        `
          }}
        />
        
        {/* States Row: Display all button states side by side */}
        <div style={statesRowStyle}>
          {states.map((state) => {
            const isDisabled = state.id === 'disabled';
            // Circle shape buttons show a dot instead of text
            const buttonLabel = config.shape === 'circle' ? '●' : config.label || 'Button';

            return (
              <div key={state.id} style={stateItemStyle}>
                {/* State label (e.g. "NORMAL", "HOVER") */}
                <span style={stateLabelStyle}>{state.label}</span>
                
                {/* Button with state simulation */}
                <button
                  className="eui-button"
                  data-eui-intent={config.intent}
                  data-eui-size={config.size}
                  data-eui-shape={config.shape}
                  // data-state attribute simulates hover/active/focus (Storybook-only)
                  data-state={state.id !== 'normal' && !isDisabled ? state.id : undefined}
                  disabled={isDisabled}
                  aria-label={`${state.label} state`}
                >
                  {buttonLabel}
                </button>
              </div>
            );
          })}
        </div>
      </div>

      {/* Code Panel Section: Expandable code viewer with HTML/CSS tabs */}
      <details style={codePanelStyle}>
        <summary style={summaryStyle}>Expand to inspect code</summary>
        
        {/* Tab Navigation: Switch between HTML and CSS views */}
        <div role="tablist" aria-label="Code tabs" style={tabsStyle}>
          <button
            type="button"
            role="tab"
            id={htmlTabId}
            aria-selected={activeTab === 'html'}
            aria-controls={panelId}
            onClick={() => setActiveTab('html')}
            style={tabStyle(activeTab === 'html')}
          >
            HTML
          </button>
          <button
            type="button"
            role="tab"
            id={cssTabId}
            aria-selected={activeTab === 'css'}
            aria-controls={panelId}
            onClick={() => setActiveTab('css')}
            style={tabStyle(activeTab === 'css')}
          >
            CSS
          </button>
        </div>
        
        {/* Code Display: Syntax-highlighted code block */}
        <Highlight code={code} language={language} theme={themes.vsLight}>
          {({ className, style, tokens, getLineProps, getTokenProps }) => (
            <pre
              id={panelId}
              role="tabpanel"
              aria-labelledby={activeTab === 'html' ? htmlTabId : cssTabId}
              aria-label={`${label} code`}
              className={className}
              style={{ ...style, ...codeWrapStyle, background: 'transparent' }}
            >
              {tokens.map((line, lineIndex) => (
                <div key={lineIndex} {...getLineProps({ line })}>
                  {line.map((token, tokenIndex) => (
                    <span key={tokenIndex} {...getTokenProps({ token })} />
                  ))}
                </div>
              ))}
            </pre>
          )}
        </Highlight>
      </details>
    </div>
  );
};

