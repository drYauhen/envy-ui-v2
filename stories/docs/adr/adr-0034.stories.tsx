import type { Meta, StoryObj } from '@storybook/react';
import { AdrViewer } from '../../viewers/docs/AdrViewer';

type Story = StoryObj;

const meta: Meta = {
  title: 'Docs/ADR',
  parameters: { layout: 'fullscreen' }
};

export default meta;

export const ThemePresetsComponentPropsExtensionforThirdPartyIntegration: Story = {
  name: 'ADR-0034 Theme Presets - Component Props Extension for Third-Party Integration',
  render: () => (
    <AdrViewer
      adrNumber="0034"
      title="Theme Presets - Component Props Extension for Third-Party Integration"
      status="Proposed"
      date="2026-01-06"
    />
  )
};
