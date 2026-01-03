import type { Meta, StoryObj } from '@storybook/react';
import { AdrViewer } from '../../viewers/docs/AdrViewer';
import { getSectionParameters } from '../../../.storybook/preview';

type Story = StoryObj;

const meta: Meta = {
  title: 'Docs/ADR',
  parameters: {
    // Apply section-specific parameters automatically
    ...getSectionParameters('Docs/ADR'), layout: 'fullscreen' }
};

export default meta;

export const LayoutComponentsArchitecture: Story = {
  name: 'ADR-0019 Layout Components Architecture',
  render: () => (
    <AdrViewer
      adrNumber="0019"
      title="Layout Components Architecture"
      status="Accepted"
      date="2025-12-21"
    />
  )
};
