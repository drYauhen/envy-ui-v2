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

export const FocusTokenSeparationandPolicyMapping: Story = {
  name: 'ADR-0007 Focus Token Separation and Policy Mapping',
  render: () => (
    <AdrViewer
      adrNumber="0007"
      title="Focus Token Separation and Policy Mapping"
      status="Accepted"
      date="2025-12-16"
    />
  )
};
