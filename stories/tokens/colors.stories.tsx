import type { Meta, StoryObj } from '@storybook/react';
import type { CSSProperties } from 'react';
import colorsData from '../../build/storybook/colors.json';

const pageStyle: CSSProperties = {
  display: 'flex',
  flexDirection: 'column',
  gap: '2rem',
  padding: '2rem',
  fontFamily: "'Inter', system-ui, -apple-system, BlinkMacSystemFont, 'Segoe UI', sans-serif",
  backgroundColor: '#f8fafc',
  color: '#0f172a'
};

const groupTitleStyle: CSSProperties = {
  fontSize: '1rem',
  fontWeight: 600,
  marginBottom: '0.75rem',
  textTransform: 'uppercase',
  letterSpacing: '0.04em',
  color: '#475569'
};

const gridStyle: CSSProperties = {
  display: 'grid',
  gridTemplateColumns: 'repeat(auto-fit, minmax(180px, 1fr))',
  gap: '1rem'
};

const cardStyle: CSSProperties = {
  border: '1px solid #e2e8f0',
  borderRadius: '0.5rem',
  overflow: 'hidden',
  background: '#ffffff',
  boxShadow: '0 2px 6px rgba(15, 23, 42, 0.08)'
};

const swatchStyle: CSSProperties = {
  width: '100%',
  height: '96px',
  borderBottom: '1px solid #e2e8f0'
};

const meta: Meta = {
  title: 'Tokens/Colors',
  tags: ['autodocs'],
  parameters: {
    layout: 'fullscreen'
  }
};

export default meta;

type Story = StoryObj;

const TokenRenderer = () => (
  <div style={pageStyle}>
    {(colorsData.groups ?? []).map((group) => (
      <section key={group.id}>
        <h2 style={groupTitleStyle}>{group.title}</h2>
        <div style={gridStyle}>
          {group.tokens.map((token) => (
            <article key={`${group.id}-${token.id}`} style={cardStyle}>
              <div style={{ ...swatchStyle, backgroundColor: `var(${token.cssVar})` }} />
              <dl style={{ padding: '0.85rem', display: 'flex', flexDirection: 'column', gap: '0.35rem' }}>
                <div>
                  <dt style={{ fontSize: '0.75rem', textTransform: 'uppercase', color: '#94a3b8', letterSpacing: '0.08em' }}>Label</dt>
                  <dd style={{ margin: 0, fontSize: '0.95rem', fontWeight: 600 }}>{token.label ?? token.id}</dd>
                </div>
                <div>
                  <dt style={{ fontSize: '0.75rem', textTransform: 'uppercase', color: '#94a3b8', letterSpacing: '0.08em' }}>CSS Var</dt>
                  <dd style={{ margin: 0, fontSize: '0.8rem', color: '#475569' }}>{token.cssVar}</dd>
                </div>
                <div>
                  <dt style={{ fontSize: '0.75rem', textTransform: 'uppercase', color: '#94a3b8', letterSpacing: '0.08em' }}>Path</dt>
                  <dd style={{ margin: 0, fontSize: '0.75rem', color: '#64748b' }}>{token.path}</dd>
                </div>
                <div>
                  <dt style={{ fontSize: '0.75rem', textTransform: 'uppercase', color: '#94a3b8', letterSpacing: '0.08em' }}>Value</dt>
                  <dd style={{ margin: 0, fontSize: '0.85rem', color: '#0f172a' }}>{token.value}</dd>
                </div>
              </dl>
            </article>
          ))}
        </div>
      </section>
    ))}
  </div>
);

export const Colors: Story = {
  name: 'Design Tokens',
  render: () => <TokenRenderer />
};
