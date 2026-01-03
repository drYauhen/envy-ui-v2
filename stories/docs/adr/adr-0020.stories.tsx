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

export const ElevationSystemArchitecture: Story = {
  name: 'ADR-0020 Elevation System Architecture',
  render: () => (
    <AdrViewer
      adrNumber="0020"
      title="Elevation System Architecture"
      status="Accepted"
      date="2025-12-20"
    />
  )
};
