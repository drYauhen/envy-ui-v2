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

export const ColorModelTonalScalesandContextualArchitecture: Story = {
  name: 'ADR-0014 Color Model, Tonal Scales, and Contextual Architecture',
  render: () => (
    <AdrViewer
      adrNumber="0014"
      title="Color Model, Tonal Scales, and Contextual Architecture"
      status="Accepted"
      date="2025-12-18"
    />
  )
};
