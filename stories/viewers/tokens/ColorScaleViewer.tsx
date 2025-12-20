import type { CSSProperties } from 'react';

type TokenValue = { $value?: string };

type ColorScaleViewerProps = {
  family: string;
  tokens: Record<string, TokenValue>;
  steps: string[];
  title: string;
  description: string;
};

const pageStyle: CSSProperties = {
  padding: '1.5rem',
  display: 'flex',
  flexDirection: 'column',
  gap: '0.75rem',
  background: '#f8fafc',
  color: '#0f172a'
};

const cardStyle: CSSProperties = {
  padding: '1rem 1.25rem',
  background: '#ffffff'
};

const headingStyle: CSSProperties = { margin: 0, fontSize: '1rem', fontWeight: 700 };
const subStyle: CSSProperties = { margin: '0.25rem 0 0', color: '#475569', fontSize: '0.9rem' };

export const ColorScaleViewer = ({ family, tokens, steps, title, description }: ColorScaleViewerProps) => (
  <div style={pageStyle}>
    <div style={cardStyle}>
      <h3 style={headingStyle}>{title}</h3>
      <p style={subStyle}>{description}</p>
    </div>
    <section style={{ ...cardStyle, display: 'flex', flexDirection: 'column', gap: '0.5rem' }}>
      <div>
        <h4 style={{ margin: 0, fontSize: '1rem', fontWeight: 700 }}>{family}</h4>
        <p style={subStyle}>Base tones for {family}, steps 50-900.</p>
      </div>
      <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(120px, 1fr))', gap: '0.5rem' }}>
        {steps.map((step) => {
          const token = tokens[step];
          return (
            <div key={step} style={{ padding: '0.5rem 0.25rem 0.25rem', display: 'flex', flexDirection: 'column', gap: '0.35rem' }}>
              <div
                style={{
                  height: '96px',
                  borderRadius: '12px',
                  background: token?.$value ?? '#e2e8f0'
                }}
              />
              <div style={{ display: 'flex', flexDirection: 'column', gap: '0.15rem' }}>
                <span style={{ fontWeight: 700 }}>{family}.{step}</span>
                <span style={{ color: '#475569', fontSize: '0.9rem' }}>{token?.$value ?? '-'}</span>
              </div>
            </div>
          );
        })}
      </div>
    </section>
  </div>
);
