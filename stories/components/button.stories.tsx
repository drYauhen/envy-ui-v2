import type { Meta, StoryObj } from '@storybook/react';
import { useState } from 'react';
import { Highlight, themes, type Language } from 'prism-react-renderer';

const markupExample = `<button
  class="ui-button"
  data-variant="primary"
  data-size="md"
>
  Button
</button>`;

const cssSource = `.ui-button {
  --ui-button-height: 40px;
  --ui-button-padding-inline: 20px;
  --ui-button-font-size: 0.95rem;
  --ui-button-font-weight: 600;

  display: inline-flex;
  align-items: center;
  justify-content: center;
  gap: 0.4rem;
  height: var(--ui-button-height);
  min-width: var(--ui-button-height);
  padding-inline: var(--ui-button-padding-inline);
  border-radius: var(--env2-ui-radius-pill, 999px);
  border: 1px solid transparent;
  background-color: transparent;
  color: inherit;
  font-size: var(--ui-button-font-size);
  font-weight: var(--ui-button-font-weight);
  font-family: inherit;
  line-height: 1;
  letter-spacing: 0.01em;
  cursor: pointer;
  transition: background-color 120ms ease, color 120ms ease, border-color 120ms ease, box-shadow 120ms ease;
  outline: none;
}

.ui-button[data-size="md"] {
  --ui-button-height: 40px;
  --ui-button-padding-inline: 20px;
  --ui-button-font-size: 0.95rem;
  --ui-button-font-weight: 600;
}

.ui-button[data-variant="primary"] {
  background-color: var(--env2-ui-button-primary-background-base, var(--env2-ui-color-brand-primary, #066a8d));
  color: var(--env2-ui-button-primary-label-base, var(--env2-ui-color-neutral-white, #ffffff));
}

.ui-button[data-variant="secondary"] {
  background-color: var(--env2-ui-button-secondary-background-base, #ffffff);
  color: var(--env2-ui-button-secondary-label-base, var(--env2-ui-color-neutral-900, #0f172a));
  border-color: var(--env2-ui-button-secondary-border-base, var(--env2-ui-color-neutral-300, #cbd5e1));
}

.ui-button[data-state="hover"] {
  background-color: color-mix(in srgb, currentColor 6%, transparent);
  border-color: color-mix(in srgb, currentColor 12%, transparent);
}

.ui-button[data-state="active"] {
  background-color: color-mix(in srgb, currentColor 12%, transparent);
  border-color: color-mix(in srgb, currentColor 18%, transparent);
}

.ui-button[data-state="focus-visible"] {
  box-shadow: 0 0 0 3px color-mix(in srgb, currentColor, transparent 25%);
}

.ui-button[data-state="disabled"],
.ui-button:disabled {
  cursor: not-allowed;
  opacity: 0.7;
}`;

const meta: Meta = {
  title: 'HTML + CSS/Components/Button',
  tags: ['autodocs']
};

export default meta;

type Story = StoryObj;

const viewerLayoutStyle = {
  display: 'grid',
  gap: '1.5rem'
} as const;

const codePanelStyle = {
  borderRadius: '8px',
  border: '1px solid #e2e8f0',
  background: '#f8fafc',
  color: '#0f172a'
} as const;

const summaryStyle = {
  cursor: 'pointer',
  fontWeight: 400,
  padding: '0.75rem 1rem',
  borderBottom: '1px solid #e2e8f0',
  background: '#f1f5f9',
  color: '#64748b'
} as const;

const tabsStyle = {
  display: 'flex',
  gap: '0.5rem',
  padding: '0.5rem 0.75rem',
  borderBottom: '1px solid #e2e8f0',
  background: '#f8fafc'
} as const;

const tabStyle = (active: boolean) =>
  ({
    appearance: 'none',
    border: `1px solid ${active ? '#cbd5e1' : 'transparent'}`,
    borderRadius: '6px',
    background: active ? '#ffffff' : 'transparent',
    color: '#0f172a',
    fontSize: '0.75rem',
    fontWeight: 600,
    padding: '0.25rem 0.6rem',
    cursor: 'pointer'
  }) as const;

const codeWrapStyle = {
  padding: '0.75rem 1rem 1rem',
  fontFamily:
    'ui-monospace, SFMono-Regular, Menlo, Monaco, Consolas, "Liberation Mono", "Courier New", monospace',
  fontSize: '0.78rem',
  lineHeight: 1.6,
  margin: 0,
  whiteSpace: 'pre-wrap',
  wordBreak: 'break-word',
  overflowX: 'hidden'
} as const;

type HtmlCssCodeTabsViewerProps = {
  preview: JSX.Element;
  markup: string;
  css: string;
  styleText?: string;
};

const HtmlCssCodeTabsViewer = ({ preview, markup, css, styleText }: HtmlCssCodeTabsViewerProps) => {
  const [activeTab, setActiveTab] = useState<'html' | 'css'>('html');
  const code = activeTab === 'html' ? markup : css;
  const language = (activeTab === 'html' ? 'markup' : 'css') as Language;
  const label = activeTab === 'html' ? 'HTML' : 'CSS';
  const htmlTabId = 'html-css-button-code-html';
  const cssTabId = 'html-css-button-code-css';
  const panelId = 'html-css-button-code-panel';

  return (
    <div style={viewerLayoutStyle}>
      {styleText ? <style>{styleText}</style> : null}
      {preview}
      <details style={codePanelStyle} className="html-css-code-viewer">
        <summary style={summaryStyle}>Expand to inspect code</summary>
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

const preview = (
  <div style={{ display: 'flex', gap: '0.75rem', alignItems: 'center', flexWrap: 'wrap' }}>
    <button className="ui-button" data-variant="primary" data-size="md">
      Primary
    </button>
    <button className="ui-button" data-variant="secondary" data-size="md">
      Secondary
    </button>
    <button className="ui-button" data-variant="primary" data-size="md" data-state="hover" aria-label="Hover sample">
      Hover (sample)
    </button>
    <button className="ui-button" data-variant="primary" data-size="md" data-state="active" aria-label="Active sample">
      Active (sample)
    </button>
    <button
      className="ui-button"
      data-variant="secondary"
      data-size="md"
      data-state="disabled"
      disabled
      aria-label="Disabled sample"
    >
      Disabled
    </button>
  </div>
);

export const Button: Story = {
  name: 'Button (HTML + CSS)',
  parameters: {
    docs: {
      canvas: { sourceState: 'none' },
      codePanel: false
    }
  },
  render: () => (
    <HtmlCssCodeTabsViewer preview={preview} markup={markupExample} css={cssSource} styleText={cssSource} />
  )
};
