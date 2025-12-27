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

export const ContextAwareUIComponentsandProjectionModel: Story = {
  parameters: {
    interactions: { hidden: true },
    controls: { hidden: true },
    actions: { hidden: true },
    a11y: { hidden: true }
  },
  name: 'ADR-0004 Context-Aware UI Components and Projection Model',
  render: () => (
    <AdrViewer
      adrNumber="0004"
      title="Context-Aware UI Components and Projection Model"
      status="Accepted (Conceptual)"
      date="2025-12-15"
    />
  )
};
