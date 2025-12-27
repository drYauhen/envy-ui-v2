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

export const CurrentArchitecturalIntentExploratoryEnvyUIv2: Story = {
  parameters: {
    interactions: { hidden: true },
    controls: { hidden: true },
    actions: { hidden: true },
    a11y: { hidden: true }
  },
  name: 'ADR-0013 Current Architectural Intent (Exploratory) — Envy UI v2',
  render: () => (
    <AdrViewer
      adrNumber="0013"
      title="Current Architectural Intent (Exploratory) — Envy UI v2"
      status="Proposed (Exploratory)"
      date="2025-12-16"
    />
  )
};
