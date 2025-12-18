import type { Meta, StoryObj } from '@storybook/react';
import type { CSSProperties } from 'react';
import neutral from '../../../tokens/foundations/colors/neutral.json';
import brand from '../../../tokens/foundations/colors/brand.json';
import accent from '../../../tokens/foundations/colors/accent.json';

type Story = StoryObj;

const meta: Meta = {
  title: 'Tokens/Foundations/Colors',
  tags: ['autodocs'],
  parameters: { layout: 'fullscreen' }
};

export default meta;

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

const scales: Record<string, Record<string, { $value: string }>> = {
  neutral: (neutral as any).ui.color.neutral,
  brand: (brand as any).ui.color.brand,
  accent: (accent as any).ui.color.accent
};

const steps = ['50', '100', '200', '300', '400', '500', '600', '700', '800', '900'];

const Swatches = ({ family }: { family: string }) => {
  const tokens = scales[family] ?? {};
  return (
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
              <span style={{ color: '#475569', fontSize: '0.9rem' }}>{token?.$value ?? '—'}</span>
            </div>
          </div>
        );
      })}
    </div>
  );
};

const renderFamily = (family: string) => (
  <div style={pageStyle}>
    <div style={cardStyle}>
      <h3 style={headingStyle}>Foundations / Colors — {family}</h3>
      <p style={subStyle}>Inspection-only. Base tones (50–900) projected directly from tokens/foundations/colors.</p>
    </div>
    <section style={{ ...cardStyle, display: 'flex', flexDirection: 'column', gap: '0.5rem' }}>
      <div>
        <h4 style={{ margin: 0, fontSize: '1rem', fontWeight: 700 }}>{family}</h4>
        <p style={subStyle}>Base tones for {family}, steps 50–900.</p>
      </div>
      <Swatches family={family} />
    </section>
  </div>
);

export const Neutral: Story = {
  name: 'Neutral',
  render: () => renderFamily('neutral')
};

export const Brand: Story = {
  name: 'Brand',
  render: () => renderFamily('brand')
};

export const Accent: Story = {
  name: 'Accent',
  render: () => renderFamily('accent')
};
