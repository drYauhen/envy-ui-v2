import type { CSSProperties } from 'react';
import React from 'react';
import { Highlight, themes } from 'prism-react-renderer';

/**
 * Button group configuration
 */
type ButtonGroupConfig = {
  orientation?: 'horizontal' | 'vertical';
  intent?: 'primary' | 'secondary' | 'accent';
  size?: 'sm' | 'md' | 'lg';
  shape?: 'default' | 'round' | 'circle';
};

/**
 * Props for ButtonGroupViewer component
 * Displays button groups with different counts (2, 3, 4 buttons) in a row
 */
type ButtonGroupViewerProps = {
  config: ButtonGroupConfig;
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
  fontSize: '1.25rem',
  fontWeight: 600,
  color: '#1e293b'
};

const descriptionStyle: CSSProperties = {
  margin: 0,
  fontSize: '0.875rem',
  color: '#64748b'
};

const previewStyle: CSSProperties = {
  padding: '1.5rem',
  background: '#f8fafc',
  borderRadius: '6px',
  border: '1px solid #e2e8f0'
};

// Container with data-eui-context="app" should have flex and gap
const contextContainerStyle: CSSProperties = {
  display: 'flex',
  flexDirection: 'row',
  gap: '2rem',
  flexWrap: 'wrap',
  alignItems: 'flex-start'
};

// Removed marginRight - gap in previewStyle handles spacing
const groupWrapperStyle: CSSProperties = {
  display: 'inline-flex'
};

const codeContainerStyle: CSSProperties = {
  display: 'flex',
  flexDirection: 'column',
  gap: '0.75rem'
};

const codeTabContainerStyle: CSSProperties = {
  display: 'flex',
  gap: '0.5rem',
  borderBottom: '1px solid #e2e8f0'
};

const codeTabStyle: CSSProperties = {
  padding: '0.5rem 1rem',
  background: 'transparent',
  border: 'none',
  borderBottom: '2px solid transparent',
  cursor: 'pointer',
  fontSize: '0.875rem',
  color: '#64748b',
  transition: 'all 0.2s'
};

const codeTabActiveStyle: CSSProperties = {
  ...codeTabStyle,
  color: '#1e293b',
  borderBottomColor: '#3b82f6'
};

const codeBlockStyle: CSSProperties = {
  padding: '1rem',
  background: '#1e293b',
  borderRadius: '6px',
  overflow: 'auto',
  fontSize: '0.875rem',
  lineHeight: '1.6'
};

export function ButtonGroupViewer({ config, title, description }: ButtonGroupViewerProps) {
  const [activeTab, setActiveTab] = React.useState<'html' | 'css'>('html');

  const { orientation = 'horizontal', intent = 'primary', size = 'md', shape = 'default' } = config;

  // Generate button groups with different counts (2, 3, 4 buttons)
  const generateButtonGroup = (count: number) => {
    const labels = ['One', 'Two', 'Three', 'Four'];
    const buttons = [];
    for (let i = 0; i < count; i++) {
      let position: 'first' | 'middle' | 'last';
      if (count === 2) {
        position = i === 0 ? 'first' : 'last';
      } else {
        position = i === 0 ? 'first' : i === count - 1 ? 'last' : 'middle';
      }
      buttons.push({
        label: labels[i],
        position
      });
    }
    return buttons;
  };

  const groups2 = generateButtonGroup(2);
  const groups3 = generateButtonGroup(3);
  const groups4 = generateButtonGroup(4);

  // Generate HTML code for all three variants (2, 3, 4 buttons)
  const generateHtmlForGroup = (buttons: Array<{ label: string; position: 'first' | 'middle' | 'last' }>) => {
    const orientationAttr = orientation === 'vertical' ? ' data-orientation="vertical"' : '';
    const intentAttr = intent ? ` data-eui-intent="${intent}"` : '';
    const sizeAttr = size ? ` data-eui-size="${size}"` : '';
    const shapeAttr = shape ? ` data-eui-shape="${shape}"` : '';
    
    return `  <div class="eui-button-group"${orientationAttr}>
${buttons
  .map((btn) => {
    const orientationDataAttr = orientation === 'vertical' ? ' data-group-orientation="vertical"' : '';
    return `    <button class="eui-button" data-group-position="${btn.position}"${orientationDataAttr}${intentAttr}${sizeAttr}${shapeAttr}>${btn.label}</button>`;
  })
  .join('\n')}
  </div>`;
  };

  const htmlCode = `<div>
${generateHtmlForGroup(groups2)}

${generateHtmlForGroup(groups3)}

${generateHtmlForGroup(groups4)}
</div>`;

  // Generate CSS reference (CSS is already imported globally)
  const cssCode = `/* Button Group CSS is already imported globally in Storybook */
/* Full CSS available at: src/ui/button.css */

/* Key properties: */
.eui-button-group {
  display: inline-flex;
  isolation: isolate;  /* Creates stacking context for z-index */
  position: relative;
  gap: 0;
}

.eui-button-group[data-orientation='vertical'] {
  flex-direction: column;
  width: max-content;
}

.eui-button-group .eui-button {
  z-index: 0;  /* Default z-index */
}

.eui-button-group .eui-button:focus,
.eui-button-group .eui-button:focus-visible,
.eui-button-group .eui-button:active {
  z-index: 1;  /* Raised when focused/active (isolated within group) */
}`;

  return (
    <div style={containerStyle}>
      {(title || description) && (
        <div style={headerStyle}>
          {title && <h3 style={titleStyle}>{title}</h3>}
          {description && <p style={descriptionStyle}>{description}</p>}
        </div>
      )}

      <div style={previewStyle}>
        <div style={contextContainerStyle}>
          {/* 2 buttons group */}
          <div style={groupWrapperStyle}>
            <div className="eui-button-group" data-orientation={orientation === 'vertical' ? 'vertical' : undefined}>
              {groups2.map((btn, idx) => (
                <button
                  key={`2-${idx}`}
                  className="eui-button"
                  data-group-position={btn.position}
                  data-group-orientation={orientation === 'vertical' ? 'vertical' : undefined}
                  data-eui-intent={intent}
                  data-eui-size={size}
                  data-eui-shape={shape}
                >
                  {btn.label}
                </button>
              ))}
            </div>
          </div>

          {/* 3 buttons group */}
          <div style={groupWrapperStyle}>
            <div className="eui-button-group" data-orientation={orientation === 'vertical' ? 'vertical' : undefined}>
              {groups3.map((btn, idx) => (
                <button
                  key={`3-${idx}`}
                  className="eui-button"
                  data-group-position={btn.position}
                  data-group-orientation={orientation === 'vertical' ? 'vertical' : undefined}
                  data-eui-intent={intent}
                  data-eui-size={size}
                  data-eui-shape={shape}
                >
                  {btn.label}
                </button>
              ))}
            </div>
          </div>

          {/* 4 buttons group */}
          <div style={groupWrapperStyle}>
            <div className="eui-button-group" data-orientation={orientation === 'vertical' ? 'vertical' : undefined}>
              {groups4.map((btn, idx) => (
                <button
                  key={`4-${idx}`}
                  className="eui-button"
                  data-group-position={btn.position}
                  data-group-orientation={orientation === 'vertical' ? 'vertical' : undefined}
                  data-eui-intent={intent}
                  data-eui-size={size}
                  data-eui-shape={shape}
                >
                  {btn.label}
                </button>
              ))}
            </div>
          </div>
        </div>
      </div>

      <div style={codeContainerStyle}>
        <div style={codeTabContainerStyle}>
          <button
            style={activeTab === 'html' ? codeTabActiveStyle : codeTabStyle}
            onClick={() => setActiveTab('html')}
          >
            HTML
          </button>
          <button
            style={activeTab === 'css' ? codeTabActiveStyle : codeTabStyle}
            onClick={() => setActiveTab('css')}
          >
            CSS
          </button>
        </div>

        <div style={codeBlockStyle}>
          <Highlight
            theme={themes.vsDark}
            code={activeTab === 'html' ? htmlCode : cssCode}
            language={activeTab === 'html' ? 'html' : 'css'}
          >
            {({ className, style, tokens, getLineProps, getTokenProps }) => (
              <pre className={className} style={style}>
                {tokens.map((line, i) => (
                  <div key={i} {...getLineProps({ line })}>
                    {line.map((token, key) => (
                      <span key={key} {...getTokenProps({ token })} />
                    ))}
                  </div>
                ))}
              </pre>
            )}
          </Highlight>
        </div>
      </div>
    </div>
  );
}


