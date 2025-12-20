import type { CSSProperties } from 'react';

type PlaceholderPageProps = {
  title: string;
  lines: string[];
};

const page: CSSProperties = {
  padding: '24px',
  maxWidth: 960,
  margin: '0 auto',
  display: 'flex',
  flexDirection: 'column',
  gap: '16px',
  fontFamily: 'system-ui, -apple-system, BlinkMacSystemFont, "Segoe UI", sans-serif',
  color: '#0f172a'
};

const card: CSSProperties = {
  padding: '16px',
  border: '1px solid #e2e8f0',
  borderRadius: 12,
  background: '#fff',
  boxShadow: '0 1px 3px rgba(15, 23, 42, 0.08)'
};

const headingStyle: CSSProperties = { margin: '0 0 4px', fontSize: '18px' };
const subStyle: CSSProperties = { margin: '0 0 8px', color: '#475569', lineHeight: 1.5 };

export const PlaceholderPage = ({ title, lines }: PlaceholderPageProps) => (
  <div style={page}>
    <div style={card}>
      <h2 style={headingStyle}>{title}</h2>
      <div style={{ display: 'flex', flexDirection: 'column', gap: 8 }}>
        {lines.map((line) => (
          <p key={line} style={subStyle}>
            {line}
          </p>
        ))}
      </div>
    </div>
  </div>
);
