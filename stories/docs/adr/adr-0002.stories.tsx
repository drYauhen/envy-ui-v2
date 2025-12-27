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

export const DataDrivenStorybookPipelineviaStyleDictionary: Story = {
  parameters: {
    interactions: { hidden: true },
    controls: { hidden: true },
    actions: { hidden: true },
    a11y: { hidden: true }
  },
  name: 'ADR-0002 Data-Driven Storybook Pipeline via Style Dictionary',
  render: () => (
    <AdrViewer
      adrNumber="0002"
      title="Data-Driven Storybook Pipeline via Style Dictionary"
      status="Accepted"
      date="2025-12-15"
    />
  )
};
