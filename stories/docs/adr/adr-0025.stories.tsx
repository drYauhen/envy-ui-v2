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

export const FigmaVariablesIntegrationStrategy: Story = {
  name: 'ADR-0025 Figma Variables Integration Strategy',
  parameters: {
    interactions: { hidden: true },
    controls: { hidden: true },
    actions: { hidden: true },
    a11y: { hidden: true }
  },
  render: () => (
    <AdrViewer
      adrNumber="0025"
      title="Figma Variables Integration Strategy"
      status="Accepted"
      date="2025-12-26"
    />
  )
};



