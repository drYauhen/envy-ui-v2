import type { Meta, StoryObj } from '@storybook/react';
import { AdrViewer } from '../../viewers/docs/AdrViewer';

type Story = StoryObj;

const meta: Meta = {
  title: 'Docs/ADR/ADR-0007',
  parameters: { layout: 'fullscreen' },
  tags: ['autodocs']
};

export default meta;

export const FocusTokenSeparationandPolicyMapping: Story = {
  name: 'Focus Token Separation and Policy Mapping',
  render: () => (
    <AdrViewer
      adrNumber="0007"
      title="Focus Token Separation and Policy Mapping"
      status="Accepted"
      date="2025-12-16"
    />
  )
};
