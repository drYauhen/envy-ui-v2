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

export const CSSLayerStrategyForContextPriority: Story = {
  name: 'ADR-0024 CSS Layer Strategy for Context Priority',
  parameters: {
    interactions: { hidden: true },
    controls: { hidden: true },
    actions: { hidden: true },
    a11y: { hidden: true }
  },
  render: () => (
    <AdrViewer
      adrNumber="0024"
      title="CSS Layer Strategy for Context Priority"
      status="Accepted"
      date="2025-12-26"
    />
  )
};


