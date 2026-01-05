import type { CSSProperties } from 'react';

const pageStyle: CSSProperties = {
  padding: '1.5rem',
  display: 'flex',
  flexDirection: 'column',
  gap: '1.5rem',
  background: '#f8fafc',
  color: '#0f172a'
};

const cardStyle: CSSProperties = {
  padding: '1.5rem',
  background: '#ffffff',
  borderRadius: '8px',
  boxShadow: '0 1px 3px rgba(0, 0, 0, 0.1)'
};

const headingStyle: CSSProperties = { 
  margin: '0 0 0.5rem', 
  fontSize: '1.5rem', 
  fontWeight: 700,
  lineHeight: 1.2
};

const subStyle: CSSProperties = { 
  margin: '0 0 1.5rem', 
  color: '#475569', 
  fontSize: '0.875rem',
  lineHeight: 1.5
};

const sectionStyle: CSSProperties = {
  marginBottom: '2rem'
};

const sectionHeadingStyle: CSSProperties = {
  margin: '0 0 1rem',
  fontSize: '1.125rem',
  fontWeight: 600,
  color: '#1e293b'
};

const exampleStyle: CSSProperties = {
  padding: '1rem',
  background: '#f8fafc',
  borderRadius: '4px',
  marginBottom: '0.75rem',
  border: '1px solid #e2e8f0'
};

const labelStyle: CSSProperties = {
  fontSize: '0.75rem',
  color: '#64748b',
  fontWeight: 600,
  textTransform: 'uppercase',
  letterSpacing: '0.05em',
  marginBottom: '0.5rem',
  fontFamily: 'monospace'
};

const tokenInfoStyle: CSSProperties = {
  fontSize: '0.75rem',
  color: '#64748b',
  marginTop: '0.5rem',
  fontFamily: 'monospace'
};

type TextStyleExample = {
  label: string;
  token: string;
  className: string;
  style?: CSSProperties;
  description?: string;
};

const headingExamples: TextStyleExample[] = [
  {
    label: 'Heading 1',
    token: '--eui-typography-text-style-heading-1-font-size',
    className: 'eui-text-heading-1',
    description: 'Page title, hero heading'
  },
  {
    label: 'Heading 2',
    token: '--eui-typography-text-style-heading-2-font-size',
    className: 'eui-text-heading-2',
    description: 'Section heading'
  },
  {
    label: 'Heading 3',
    token: '--eui-typography-text-style-heading-3-font-size',
    className: 'eui-text-heading-3',
    description: 'Subsection heading'
  },
  {
    label: 'Heading 4',
    token: '--eui-typography-text-style-heading-4-font-size',
    className: 'eui-text-heading-4',
    description: 'Card title, medium heading'
  },
  {
    label: 'Heading 5',
    token: '--eui-typography-text-style-heading-5-font-size',
    className: 'eui-text-heading-5',
    description: 'Small heading'
  },
  {
    label: 'Heading 6',
    token: '--eui-typography-text-style-heading-6-font-size',
    className: 'eui-text-heading-6',
    description: 'Smallest heading, emphasized text'
  }
];

const titleExamples: TextStyleExample[] = [
  {
    label: 'Title Large',
    token: '--eui-typography-text-style-title-lg-font-size',
    className: 'eui-text-title-lg',
    description: 'Large title - section headers, panels'
  },
  {
    label: 'Title Medium',
    token: '--eui-typography-text-style-title-md-font-size',
    className: 'eui-text-title-md',
    description: 'Medium title - cards, collapsible headers'
  },
  {
    label: 'Title Small',
    token: '--eui-typography-text-style-title-sm-font-size',
    className: 'eui-text-title-sm',
    description: 'Small title - dense UI headers'
  }
];

const bodyExamples: TextStyleExample[] = [
  {
    label: 'Body Large',
    token: '--eui-typography-text-style-body-large-font-size',
    className: 'eui-text-body-lg',
    description: 'Large body text - emphasized content'
  },
  {
    label: 'Body Base',
    token: '--eui-typography-text-style-body-base-font-size',
    className: 'eui-text-body',
    description: 'Base body text - default for application UI'
  },
  {
    label: 'Body Small',
    token: '--eui-typography-text-style-body-small-font-size',
    className: 'eui-text-body-sm',
    description: 'Small body text - helper text, secondary content'
  }
];

const bodyStrongExamples: TextStyleExample[] = [
  {
    label: 'Body Strong Base',
    token: '--eui-typography-text-style-body-strong-base-font-size',
    className: 'eui-text-body-strong',
    description: 'Emphasized body text'
  },
  {
    label: 'Body Strong Small',
    token: '--eui-typography-text-style-body-strong-small-font-size',
    className: 'eui-text-body-strong-sm',
    description: 'Emphasized small text'
  }
];

const labelExamples: TextStyleExample[] = [
  {
    label: 'Label Medium',
    token: '--eui-typography-text-style-label-md-font-size',
    className: 'eui-text-label-md',
    description: 'Form labels, button text'
  },
  {
    label: 'Label Small',
    token: '--eui-typography-text-style-label-sm-font-size',
    className: 'eui-text-label-sm',
    description: 'Secondary labels'
  }
];

const captionExample: TextStyleExample = {
  label: 'Caption',
  token: '--eui-typography-text-style-caption-font-size',
  className: 'eui-text-caption',
  description: 'Caption text - labels, metadata, counters in buttons'
};

const overlineExample: TextStyleExample = {
  label: 'Overline',
  token: '--eui-typography-text-style-overline-font-size',
  className: 'eui-text-overline',
  description: 'Uppercase label for small UI headers'
};

const codeExamples: TextStyleExample[] = [
  {
    label: 'Code Base',
    token: '--eui-typography-text-style-code-base-font-size',
    className: 'eui-text-code-base',
    description: 'Code inline text - default size'
  },
  {
    label: 'Code Small',
    token: '--eui-typography-text-style-code-small-font-size',
    className: 'eui-text-code-sm',
    description: 'Small code text'
  }
];

const fontSizeScale = [
  { name: 'xs', token: '--eui-typography-font-size-xs', description: '12px at 14px base' },
  { name: 'sm', token: '--eui-typography-font-size-sm', description: '14px at 16px base' },
  { name: 'base', token: '--eui-typography-font-size-base', description: '14px at 14px base (adapts to context)' },
  { name: 'md', token: '--eui-typography-font-size-md', description: '16px at 14px base' },
  { name: 'lg', token: '--eui-typography-font-size-lg', description: '17.5px at 14px base' },
  { name: 'xl', token: '--eui-typography-font-size-xl', description: '21px at 14px base' },
  { name: '2xl', token: '--eui-typography-font-size-2xl', description: '26.25px at 14px base' },
  { name: '3xl', token: '--eui-typography-font-size-3xl', description: '31.5px at 14px base' },
  { name: '4xl', token: '--eui-typography-font-size-4xl', description: '42px at 14px base' },
  { name: '5xl', token: '--eui-typography-font-size-5xl', description: '52.5px at 14px base' },
  { name: '6xl', token: '--eui-typography-font-size-6xl', description: '63px at 14px base' }
];

const renderExample = (example: TextStyleExample) => (
  <div key={example.label} style={exampleStyle}>
    <div style={labelStyle}>{example.label}</div>
    <div className={example.className} style={{ margin: 0, ...example.style }}>
      {example.description || 'The quick brown fox jumps over the lazy dog'}
    </div>
    {example.description && (
      <div style={tokenInfoStyle}>{example.description}</div>
    )}
    <div style={tokenInfoStyle}>{example.token}</div>
  </div>
);

export const TypographyViewer = () => {
  return (
    <div style={pageStyle}>
      <div style={cardStyle}>
        <h2 style={headingStyle}>Typography System</h2>
        <p style={subStyle}>
          Typography foundation tokens and semantic text styles. Base font size adapts to theme:
          <strong> 14px</strong> for default theme, <strong>16px</strong> for accessibility theme.
        </p>
      </div>

      <div style={cardStyle}>
        <div style={sectionStyle}>
          <h3 style={sectionHeadingStyle}>Font Size Scale</h3>
          <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(200px, 1fr))', gap: '0.75rem' }}>
            {fontSizeScale.map(({ name, token, description }) => (
              <div key={name} style={exampleStyle}>
                <div style={labelStyle}>{name}</div>
                <div style={{ 
                  fontSize: `var(${token})`,
                  fontWeight: 600,
                  marginBottom: '0.25rem'
                }}>
                  Aa
                </div>
                <div style={tokenInfoStyle}>{token}</div>
                <div style={{ ...tokenInfoStyle, fontSize: '0.7rem', marginTop: '0.25rem' }}>
                  {description}
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>

      <div style={cardStyle}>
        <div style={sectionStyle}>
          <h3 style={sectionHeadingStyle}>Headings</h3>
          {headingExamples.map(renderExample)}
        </div>
      </div>

      <div style={cardStyle}>
        <div style={sectionStyle}>
          <h3 style={sectionHeadingStyle}>Titles</h3>
          {titleExamples.map(renderExample)}
        </div>
      </div>

      <div style={cardStyle}>
        <div style={sectionStyle}>
          <h3 style={sectionHeadingStyle}>Body Text</h3>
          {bodyExamples.map(renderExample)}
        </div>
      </div>

      <div style={cardStyle}>
        <div style={sectionStyle}>
          <h3 style={sectionHeadingStyle}>Body Strong</h3>
          {bodyStrongExamples.map(renderExample)}
        </div>
      </div>

      <div style={cardStyle}>
        <div style={sectionStyle}>
          <h3 style={sectionHeadingStyle}>Labels</h3>
          {labelExamples.map(renderExample)}
        </div>
      </div>

      <div style={cardStyle}>
        <div style={sectionStyle}>
          <h3 style={sectionHeadingStyle}>Caption</h3>
          {renderExample(captionExample)}
        </div>
      </div>

      <div style={cardStyle}>
        <div style={sectionStyle}>
          <h3 style={sectionHeadingStyle}>Overline</h3>
          {renderExample(overlineExample)}
        </div>
      </div>

      <div style={cardStyle}>
        <div style={sectionStyle}>
          <h3 style={sectionHeadingStyle}>Code</h3>
          {codeExamples.map(renderExample)}
        </div>
      </div>
    </div>
  );
};
