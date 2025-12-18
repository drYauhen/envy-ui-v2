import type { Meta, StoryObj } from '@storybook/react';
import type { CSSProperties, ReactNode } from 'react';

type Story = StoryObj;

const meta: Meta = {
  title: 'Architecture/Themes',
  parameters: { layout: 'fullscreen' },
  tags: ['autodocs']
};

export default meta;

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

const heading = (text: string) => <h2 style={{ margin: '0 0 4px', fontSize: '18px' }}>{text}</h2>;
const sub = (text: string) => <p style={{ margin: '0 0 8px', color: '#475569', lineHeight: 1.5 }}>{text}</p>;

const Placeholder = ({ title, children }: { title: string; children: ReactNode }) => (
  <div style={card}>
    {heading(title)}
    <div style={{ display: 'flex', flexDirection: 'column', gap: 8 }}>{children}</div>
  </div>
);

export const Overview: Story = {
  name: 'Overview',
  render: () => (
    <div style={page}>
      <Placeholder title="Themes — Structural Placeholder">
        {sub('Themes represent visual identity layers that may remap semantic tokens within a given context.')}
        {sub('They are distinct from contexts (environment). Themes define expression; contexts define constraints.')}
        {sub('No theme tokens or switching logic exist yet. These stories communicate future extension points only.')}
      </Placeholder>
    </div>
  )
};

export const ThemeA: Story = {
  name: 'Theme A (Placeholder)',
  render: () => (
    <div style={page}>
      <Placeholder title="Theme A">
        {sub('Theme A is a future visual theme.')}
        {sub('Themes are expected to override or remap semantic tokens within a context.')}
        {sub('This is a structural placeholder only; no runtime theming is implemented.')}
      </Placeholder>
    </div>
  )
};

export const ThemeB: Story = {
  name: 'Theme B (Placeholder)',
  render: () => (
    <div style={page}>
      <Placeholder title="Theme B">
        {sub('Theme B is a future visual theme.')}
        {sub('It will coexist with other themes and contexts but is not wired yet.')}
        {sub('Under construction: static text only, no controls or switching behavior.')}
      </Placeholder>
    </div>
  )
};
