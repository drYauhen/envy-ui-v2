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

export const TokenFirstContractLayerandRendererAgnosticModel: Story = {
  parameters: {
    interactions: { hidden: true },
    controls: { hidden: true },
    actions: { hidden: true },
    a11y: { hidden: true }
  },
  name: 'ADR-0015 Token-First Contract Layer and Renderer-Agnostic Model',
  render: () => (
    <AdrViewer
      adrNumber="0015"
      title="Token-First Contract Layer and Renderer-Agnostic Model"
      status="Accepted"
      date="2025-12-18"
    />
  )
};
