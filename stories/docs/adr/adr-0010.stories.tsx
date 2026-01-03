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

export const HostFlexibleInteractiveComponentsReactAriav2Alpha: Story = {
  name: 'ADR-0010 Host-Flexible Interactive Components (React Aria v2, Alpha)',
  render: () => (
    <AdrViewer
      adrNumber="0010"
      title="Host-Flexible Interactive Components (React Aria v2, Alpha)"
      status="Accepted (Alpha)"
      date="2025-12-16"
    />
  )
};
