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
  style: CSSProperties;
  description?: string;
};

const headingExamples: TextStyleExample[] = [
  {
    label: 'Heading 1',
    token: '--eui-typography-text-style-heading-1-font-size',
    style: {
      fontSize: 'var(--eui-typography-text-style-heading-1-font-size)',
      fontWeight: 'var(--eui-typography-text-style-heading-1-font-weight)',
      lineHeight: 'var(--eui-typography-text-style-heading-1-line-height)',
      margin: 0
    },
    description: 'Page title, hero heading'
  },
  {
    label: 'Heading 2',
    token: '--eui-typography-text-style-heading-2-font-size',
    style: {
      fontSize: 'var(--eui-typography-text-style-heading-2-font-size)',
      fontWeight: 'var(--eui-typography-text-style-heading-2-font-weight)',
      lineHeight: 'var(--eui-typography-text-style-heading-2-line-height)',
      margin: 0
    },
    description: 'Section heading'
  },
  {
    label: 'Heading 3',
    token: '--eui-typography-text-style-heading-3-font-size',
    style: {
      fontSize: 'var(--eui-typography-text-style-heading-3-font-size)',
      fontWeight: 'var(--eui-typography-text-style-heading-3-font-weight)',
      lineHeight: 'var(--eui-typography-text-style-heading-3-line-height)',
      margin: 0
    },
    description: 'Subsection heading'
  },
  {
    label: 'Heading 4',
    token: '--eui-typography-text-style-heading-4-font-size',
    style: {
      fontSize: 'var(--eui-typography-text-style-heading-4-font-size)',
      fontWeight: 'var(--eui-typography-text-style-heading-4-font-weight)',
      lineHeight: 'var(--eui-typography-text-style-heading-4-line-height)',
      margin: 0
    },
    description: 'Card title, medium heading'
  },
  {
    label: 'Heading 5',
    token: '--eui-typography-text-style-heading-5-font-size',
    style: {
      fontSize: 'var(--eui-typography-text-style-heading-5-font-size)',
      fontWeight: 'var(--eui-typography-text-style-heading-5-font-weight)',
      lineHeight: 'var(--eui-typography-text-style-heading-5-line-height)',
      margin: 0
    },
    description: 'Small heading'
  },
  {
    label: 'Heading 6',
    token: '--eui-typography-text-style-heading-6-font-size',
    style: {
      fontSize: 'var(--eui-typography-text-style-heading-6-font-size)',
      fontWeight: 'var(--eui-typography-text-style-heading-6-font-weight)',
      lineHeight: 'var(--eui-typography-text-style-heading-6-line-height)',
      margin: 0
    },
    description: 'Smallest heading, emphasized text'
  }
];

const bodyExamples: TextStyleExample[] = [
  {
    label: 'Body Large',
    token: '--eui-typography-text-style-body-large-font-size',
    style: {
      fontSize: 'var(--eui-typography-text-style-body-large-font-size)',
      fontWeight: 'var(--eui-typography-text-style-body-large-font-weight)',
      lineHeight: 'var(--eui-typography-text-style-body-large-line-height)',
      margin: 0
    },
    description: 'Large body text - emphasized content'
  },
  {
    label: 'Body Base',
    token: '--eui-typography-text-style-body-base-font-size',
    style: {
      fontSize: 'var(--eui-typography-text-style-body-base-font-size)',
      fontWeight: 'var(--eui-typography-text-style-body-base-font-weight)',
      lineHeight: 'var(--eui-typography-text-style-body-base-line-height)',
      margin: 0
    },
    description: 'Base body text - default for application UI'
  },
  {
    label: 'Body Small',
    token: '--eui-typography-text-style-body-small-font-size',
    style: {
      fontSize: 'var(--eui-typography-text-style-body-small-font-size)',
      fontWeight: 'var(--eui-typography-text-style-body-small-font-weight)',
      lineHeight: 'var(--eui-typography-text-style-body-small-line-height)',
      margin: 0
    },
    description: 'Small body text - helper text, secondary content'
  }
];

const captionExample: TextStyleExample = {
  label: 'Caption',
  token: '--eui-typography-text-style-caption-font-size',
  style: {
    fontSize: 'var(--eui-typography-text-style-caption-font-size)',
    fontWeight: 'var(--eui-typography-text-style-caption-font-weight)',
    lineHeight: 'var(--eui-typography-text-style-caption-line-height)',
    margin: 0
  },
  description: 'Caption text - labels, metadata, counters in buttons'
};

const codeExamples: TextStyleExample[] = [
  {
    label: 'Code Base',
    token: '--eui-typography-text-style-code-base-font-size',
    style: {
      fontSize: 'var(--eui-typography-text-style-code-base-font-size)',
      fontWeight: 'var(--eui-typography-text-style-code-base-font-weight)',
      lineHeight: 'var(--eui-typography-text-style-code-base-line-height)',
      fontFamily: 'var(--eui-typography-text-style-code-base-font-family)',
      margin: 0
    },
    description: 'Code inline text - default size'
  },
  {
    label: 'Code Small',
    token: '--eui-typography-text-style-code-small-font-size',
    style: {
      fontSize: 'var(--eui-typography-text-style-code-small-font-size)',
      fontWeight: 'var(--eui-typography-text-style-code-small-font-weight)',
      lineHeight: 'var(--eui-typography-text-style-code-small-line-height)',
      fontFamily: 'var(--eui-typography-text-style-code-small-font-family)',
      margin: 0
    },
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
    <div style={example.style}>
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
          <h3 style={sectionHeadingStyle}>Body Text</h3>
          {bodyExamples.map(renderExample)}
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
          <h3 style={sectionHeadingStyle}>Code</h3>
          {codeExamples.map(renderExample)}
        </div>
      </div>
    </div>
  );
};

