import type { Meta, StoryObj } from '@storybook/react';
import { AdrViewer } from '../../viewers/docs/AdrViewer';

type Story = StoryObj;

const meta: Meta = {
  title: 'Docs/ADR/ADR-0009',
  parameters: { layout: 'fullscreen' },
  tags: ['autodocs']
};

export default meta;

export const AVETokenRuleProfileAwareVisualEncoding: Story = {
  name: 'AVE Token Rule — Profile-Aware Visual Encoding',
  render: () => (
    <AdrViewer
      adrNumber="0009"
      title="AVE Token Rule — Profile-Aware Visual Encoding"
      status="Accepted (Architectural Rule)"
      date="2025-12-16"
    />
  )
};
