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

export const ButtonEvolutionLayeredArchitectureandContextsExploratorySnapshot: Story = {
  parameters: {
    interactions: { hidden: true },
    controls: { hidden: true },
    actions: { hidden: true },
    a11y: { hidden: true }
  },
  name: 'ADR-0012 Button Evolution, Layered Architecture, and Contexts (Exploratory Snapshot)',
  render: () => (
    <AdrViewer
      adrNumber="0012"
      title="Button Evolution, Layered Architecture, and Contexts (Exploratory Snapshot)"
      status="Proposed (Exploratory)"
      date="2025-12-16"
    />
  )
};
