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

export const StorybookModelasAIAgentOrientedArchitectureLayer: Story = {
  name: 'ADR-0022 Storybook Model as AI-Agent-Oriented Architecture Layer',
  parameters: {
    interactions: { hidden: true },
    controls: { hidden: true },
    actions: { hidden: true },
    a11y: { hidden: true }
  },
  render: () => (
    <AdrViewer
      adrNumber="0022"
      title="Storybook Model as AI-Agent-Oriented Architecture Layer"
      status="Proposed (Exploratory)"
      date="2025-12-25"
    />
  )
};
