/**
 * CodeBlock - Shared component for displaying code with syntax highlighting
 * 
 * Reusable component for code display in Storybook viewers.
 * Supports syntax highlighting via prism-react-renderer and optional collapsible mode.
 */

import type { CSSProperties } from 'react';
import { Highlight, themes, type Language } from 'prism-react-renderer';

export type CodeBlockProps = {
  /**
   * Code content to display
   */
  code: string;
  
  /**
   * Programming language for syntax highlighting
   * @default 'tsx'
   */
  language?: Language;
  
  /**
   * Title/label for the code block (shown in collapsible summary)
   * If not provided, code block is always visible
   */
  title?: string;
  
  /**
   * Whether the code block should be collapsible (requires title)
   * @default false
   */
  collapsible?: boolean;
  
  /**
   * Whether collapsible block should be open by default
   * Only applies when collapsible={true}
   * @default false
   */
  defaultOpen?: boolean;
  
  /**
   * Custom theme for syntax highlighting
   * @default themes.vsLight
   */
  theme?: typeof themes.vsLight;
};

// Container styles
const containerStyle: CSSProperties = {
  display: 'flex',
  flexDirection: 'column',
  gap: '0.75rem',
  borderRadius: '8px',
  border: '1px solid #e2e8f0',
  background: '#f8fafc',
  color: '#0f172a'
};

// Summary/header style for collapsible blocks
const summaryStyle: CSSProperties = {
  cursor: 'pointer',
  fontWeight: 600,
  padding: '0.75rem 1rem',
  borderBottom: '1px solid #e2e8f0',
  background: '#f1f5f9',
  color: '#64748b',
  fontSize: '0.875rem'
};

// Code block wrapper style
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

// Simple pre style (for non-highlighted code)
const simplePreStyle: CSSProperties = {
  background: '#0f172a',
  color: '#e2e8f0',
  padding: '12px',
  borderRadius: '8px',
  fontSize: '0.85rem',
  lineHeight: 1.5,
  whiteSpace: 'pre-wrap',
  wordBreak: 'break-word',
  overflowX: 'hidden',
  margin: 0
};

/**
 * CodeBlock Component
 * 
 * Displays code with optional syntax highlighting and collapsible mode.
 * 
 * @example
 * // Simple code block
 * <CodeBlock code="const x = 1;" language="javascript" />
 * 
 * @example
 * // Collapsible code block
 * <CodeBlock 
 *   code="<button>Click me</button>" 
 *   language="html"
 *   title="HTML Code"
 *   collapsible
 * />
 */
export const CodeBlock = ({
  code,
  language = 'tsx',
  title,
  collapsible = false,
  defaultOpen = false,
  theme = themes.vsLight
}: CodeBlockProps) => {
  // If collapsible and has title, wrap in details
  if (collapsible && title) {
    return (
      <details style={containerStyle} open={defaultOpen}>
        <summary style={summaryStyle}>{title}</summary>
        <CodeBlockContent code={code} language={language} theme={theme} />
      </details>
    );
  }
  
  // If has title but not collapsible, show title above
  if (title && !collapsible) {
    return (
      <div style={containerStyle}>
        <div style={{ padding: '0.75rem 1rem', borderBottom: '1px solid #e2e8f0', fontWeight: 600, fontSize: '0.875rem', color: '#64748b' }}>
          {title}
        </div>
        <CodeBlockContent code={code} language={language} theme={theme} />
      </div>
    );
  }
  
  // Simple code block without title
  return (
    <div style={containerStyle}>
      <CodeBlockContent code={code} language={language} theme={theme} />
    </div>
  );
};

/**
 * Internal component for code content rendering
 */
function CodeBlockContent({ code, language, theme }: { code: string; language: Language; theme: typeof themes.vsLight }) {
  // Use syntax highlighting if language is supported
  if (language && language !== 'text' && language !== 'plaintext') {
    return (
      <Highlight code={code} language={language} theme={theme}>
        {({ className, style, tokens, getLineProps, getTokenProps }) => (
          <pre
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
    );
  }
  
  // Fallback to simple code display
  return (
    <pre style={simplePreStyle}>
      <code>{code}</code>
    </pre>
  );
}

