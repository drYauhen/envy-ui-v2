import type { Meta, StoryObj } from '@storybook/react';
import { PlaceholderPage } from '../viewers/architecture/PlaceholderPage';

type Story = StoryObj;

const meta: Meta = {
  title: 'Architecture/Contexts',
  parameters: { layout: 'fullscreen' },
  tags: ['autodocs']
};

export default meta;

export const Overview: Story = {
  name: 'Overview',
  render: () => (
    <PlaceholderPage
      title="Contexts — Architectural Placeholder"
      lines={[
        'Contexts describe environmental constraints for the UI system (application shell, embedded CMS/content areas, printable or export surfaces).',
        'They are expected to influence color profiles, density, and behavior. No runtime context switching or providers are implemented yet.',
        'These stories reserve space for future context-aware rendering and help communicate the intended extension points.'
      ]}
    />
  )
};

export const ApplicationContext: Story = {
  name: 'Application Context',
  render: () => (
    <PlaceholderPage
      title="Application Context"
      lines={[
        'This is a placeholder for the Application Context.',
        'Contexts define environmental constraints (color profiles, output targets, density rules).',
        'No runtime logic or switching is implemented at this stage.'
      ]}
    />
  )
};

export const ContentContext: Story = {
  name: 'Content / CMS Context',
  render: () => (
    <PlaceholderPage
      title="Content / CMS Context"
      lines={[
        'This is a placeholder for the Content / CMS Context.',
        'Contexts capture embedded or authored surfaces that may differ in density or output requirements.',
        'No functional wiring exists yet; this story documents intent only.'
      ]}
    />
  )
};

export const PrintExportContext: Story = {
  name: 'Print / Export Context',
  render: () => (
    <PlaceholderPage
      title="Print / Export Context"
      lines={[
        'This is a placeholder for the Print / Export Context.',
        'Contexts are expected to influence color mapping and layout constraints for non-interactive outputs.',
        'Under construction: no switching, providers, or token overrides are active today.'
      ]}
    />
  )
};
