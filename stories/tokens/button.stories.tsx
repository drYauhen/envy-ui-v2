import type { Meta, StoryObj } from '@storybook/react';
import type { CSSProperties, ReactNode } from 'react';
import colorsData from '../../build/storybook/colors.json';
import manifest from '../../system.manifest.json';

type Story = StoryObj;

const pageStyle: CSSProperties = {
  display: 'flex',
  flexDirection: 'column',
  gap: '1.5rem',
  padding: '1.5rem',
  background: '#f8fafc',
  color: '#0f172a'
};

const sectionStyle: CSSProperties = {
  padding: '1rem',
  border: '1px solid #e2e8f0',
  borderRadius: '0.75rem',
  background: '#ffffff',
  boxShadow: '0 1px 3px rgba(15, 23, 42, 0.06)'
};

const headingStyle: CSSProperties = {
  margin: '0 0 0.5rem',
  fontSize: '1rem',
  fontWeight: 700,
  letterSpacing: '0.02em',
  color: '#0f172a'
};

const subtextStyle: CSSProperties = {
  margin: 0,
  fontSize: '0.9rem',
  color: '#475569',
  lineHeight: 1.5
};

const badge = (label: string, tone: 'success' | 'planned' | 'warning' = 'planned'): ReactNode => {
  const colors: Record<typeof tone, { bg: string; fg: string }> = {
    success: { bg: '#e0f2fe', fg: '#0ea5e9' },
    planned: { bg: '#fef3c7', fg: '#d97706' },
    warning: { bg: '#fee2e2', fg: '#b91c1c' }
  };
  const palette = colors[tone];

  return (
    <span
      style={{
        display: 'inline-flex',
        alignItems: 'center',
        gap: '0.35rem',
        padding: '0.25rem 0.55rem',
        borderRadius: '999px',
        background: palette.bg,
        color: palette.fg,
        fontSize: '0.8rem',
        fontWeight: 700,
        letterSpacing: '0.01em'
      }}
    >
      {label}
    </span>
  );
};

const meta: Meta = {
  title: 'Tokens/Button',
  tags: ['autodocs'],
  parameters: {
    layout: 'fullscreen'
  }
};

export default meta;

const buttonConfig = manifest.components?.button;
const tokenAggregation = buttonConfig?.tokenAggregation ?? {};
const manifestTokensLayerStatus = manifest.layers?.tokens?.status ?? 'planned';

const ColorGrid = () => (
  <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(180px, 1fr))', gap: '0.75rem' }}>
    {(colorsData.groups ?? []).map((group) => (
      <article key={group.id} style={{ ...sectionStyle, padding: '0.75rem' }}>
        <p style={{ ...headingStyle, fontSize: '0.95rem', marginBottom: '0.4rem' }}>{group.title}</p>
        <div style={{ display: 'grid', gap: '0.65rem' }}>
          {group.tokens.map((token) => (
            <div key={token.id} style={{ display: 'grid', gridTemplateColumns: '56px 1fr', gap: '0.65rem', alignItems: 'center' }}>
              <div
                style={{
                  width: '56px',
                  height: '40px',
                  borderRadius: '0.5rem',
                  border: '1px solid #e2e8f0',
                  background: `var(${token.cssVar})`
                }}
              />
              <div style={{ display: 'flex', flexDirection: 'column', gap: '0.2rem' }}>
                <span style={{ fontSize: '0.95rem', fontWeight: 700, color: '#0f172a' }}>{token.label ?? token.id}</span>
                <span style={{ fontSize: '0.8rem', color: '#475569' }}>{token.cssVar}</span>
              </div>
            </div>
          ))}
        </div>
      </article>
    ))}
  </div>
);

const Placeholder = ({ title, status }: { title: string; status: string }) => (
  <div style={sectionStyle}>
    <p style={headingStyle}>{title}</p>
    <div style={{ display: 'flex', alignItems: 'center', gap: '0.5rem' }}>
      {badge(status === 'implemented' ? 'Implemented' : 'Planned', status === 'implemented' ? 'success' : 'planned')}
      <p style={{ ...subtextStyle, margin: 0 }}>No token aggregation available yet for this category.</p>
    </div>
  </div>
);

export const Button: Story = {
  name: 'Button',
  render: () => {
    const hasColors = tokenAggregation.colors === true && (colorsData.groups?.length ?? 0) > 0;

    return (
      <div style={pageStyle}>
        <div style={sectionStyle}>
          <p style={headingStyle}>Overview</p>
          <p style={subtextStyle}>
            Aggregated token view for <strong>Button</strong>. Tokens remain defined by abstraction (colors, shape, states, sizes);
            this view is for inspection and reasoning only. The manifest marks the tokens layer as <strong>{manifestTokensLayerStatus}</strong>;
            categories not yet implemented are shown as planned placeholders.
          </p>
        </div>

        {hasColors ? (
          <div style={sectionStyle}>
            <div style={{ display: 'flex', alignItems: 'center', gap: '0.5rem', marginBottom: '0.5rem' }}>
              <p style={{ ...headingStyle, margin: 0 }}>Colors</p>
              {badge('Implemented', 'success')}
              <p style={{ ...subtextStyle, margin: 0 }}>
                Rendering available color tokens; no button-specific subset is defined in the manifest.
              </p>
            </div>
            <ColorGrid />
          </div>
        ) : (
          <Placeholder title="Colors" status="planned" />
        )}

        <Placeholder title="States" status={tokenAggregation.states ? 'planned' : 'planned'} />
        <Placeholder title="Sizes" status={tokenAggregation.sizes ? 'planned' : 'planned'} />
        <Placeholder title="Shape" status={tokenAggregation.shape ? 'planned' : 'planned'} />
      </div>
    );
  }
};
