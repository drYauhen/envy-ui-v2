import type { Meta, StoryObj } from '@storybook/react';
import type { CSSProperties, ReactNode } from 'react';

type Story = StoryObj;

const meta: Meta = {
  title: 'Architecture/Contexts',
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
      <Placeholder title="Contexts — Architectural Placeholder">
        {sub(
          'Contexts describe environmental constraints for the UI system (application shell, embedded CMS/content areas, printable or export surfaces).'
        )}
        {sub(
          'They are expected to influence color profiles, density, and behavior. No runtime context switching or providers are implemented yet.'
        )}
        {sub('These stories reserve space for future context-aware rendering and help communicate the intended extension points.')}
      </Placeholder>
    </div>
  )
};

export const ApplicationContext: Story = {
  name: 'Application Context',
  render: () => (
    <div style={page}>
      <Placeholder title="Application Context">
        {sub('This is a placeholder for the Application Context.')}
        {sub('Contexts define environmental constraints (color profiles, output targets, density rules).')}
        {sub('No runtime logic or switching is implemented at this stage.')}
      </Placeholder>
    </div>
  )
};

export const ContentContext: Story = {
  name: 'Content / CMS Context',
  render: () => (
    <div style={page}>
      <Placeholder title="Content / CMS Context">
        {sub('This is a placeholder for the Content / CMS Context.')}
        {sub('Contexts capture embedded or authored surfaces that may differ in density or output requirements.')}
        {sub('No functional wiring exists yet; this story documents intent only.')}
      </Placeholder>
    </div>
  )
};

export const PrintExportContext: Story = {
  name: 'Print / Export Context',
  render: () => (
    <div style={page}>
      <Placeholder title="Print / Export Context">
        {sub('This is a placeholder for the Print / Export Context.')}
        {sub('Contexts are expected to influence color mapping and layout constraints for non-interactive outputs.')}
        {sub('Under construction: no switching, providers, or token overrides are active today.')}
      </Placeholder>
    </div>
  )
};
