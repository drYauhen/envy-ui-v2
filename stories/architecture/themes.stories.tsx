import type { Meta, StoryObj } from '@storybook/react';
import { PlaceholderPage } from '../viewers/architecture/PlaceholderPage';

type Story = StoryObj;

const meta: Meta = {
  title: 'Architecture/Themes',
  parameters: { layout: 'fullscreen' },
  tags: ['autodocs']
};

export default meta;

export const Overview: Story = {
  name: 'Overview',
  render: () => (
    <PlaceholderPage
      title="Themes — Structural Placeholder"
      lines={[
        'Themes represent visual identity layers that may remap semantic tokens within a given context.',
        'They are distinct from contexts (environment). Themes define expression; contexts define constraints.',
        'No theme tokens or switching logic exist yet. These stories communicate future extension points only.'
      ]}
    />
  )
};

export const ThemeA: Story = {
  name: 'Theme A (Placeholder)',
  render: () => (
    <PlaceholderPage
      title="Theme A"
      lines={[
        'Theme A is a future visual theme.',
        'Themes are expected to override or remap semantic tokens within a context.',
        'This is a structural placeholder only; no runtime theming is implemented.'
      ]}
    />
  )
};

export const ThemeB: Story = {
  name: 'Theme B (Placeholder)',
  render: () => (
    <PlaceholderPage
      title="Theme B"
      lines={[
        'Theme B is a future visual theme.',
        'It will coexist with other themes and contexts but is not wired yet.',
        'Under construction: static text only, no controls or switching behavior.'
      ]}
    />
  )
};
