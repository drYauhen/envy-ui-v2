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

export const AVETokenRuleProfileAwareVisualEncoding: Story = {
  name: 'ADR-0009 AVE Token Rule — Profile-Aware Visual Encoding',
  render: () => (
    <AdrViewer
      adrNumber="0009"
      title="AVE Token Rule — Profile-Aware Visual Encoding"
      status="Accepted (Architectural Rule)"
      date="2025-12-16"
    />
  )
};
