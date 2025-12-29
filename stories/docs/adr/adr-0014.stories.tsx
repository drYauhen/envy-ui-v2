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

export const ColorModelTonalScalesandContextualArchitecture: Story = {
  parameters: {
    interactions: { hidden: true },
    controls: { hidden: true },
    actions: { hidden: true },
    a11y: { hidden: true }
  },
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
