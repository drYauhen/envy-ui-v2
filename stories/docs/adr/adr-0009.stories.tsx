import type { Meta, StoryObj } from '@storybook/react';
import { AdrViewer } from '../../viewers/docs/AdrViewer';

type Story = StoryObj;

const meta: Meta = {
  title: 'Docs/ADR',
  parameters: { 
    layout: 'fullscreen',
    // Hide addon panels for documentation (not needed for ADR documents)
    controls: { hidden: true },
    actions: { hidden: true },
    interactions: { hidden: true },
    a11y: { hidden: true }
  }
};

export default meta;

export const AVETokenRuleProfileAwareVisualEncoding: Story = {
  parameters: {
    interactions: { hidden: true },
    controls: { hidden: true },
    actions: { hidden: true },
    a11y: { hidden: true }
  },
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
