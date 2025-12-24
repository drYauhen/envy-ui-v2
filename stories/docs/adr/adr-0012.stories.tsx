import type { Meta, StoryObj } from '@storybook/react';
import { AdrViewer } from '../../viewers/docs/AdrViewer';

type Story = StoryObj;

const meta: Meta = {
  title: 'Docs/ADR/ADR-0012',
  parameters: { layout: 'fullscreen' },
  tags: ['autodocs']
};

export default meta;

export const ButtonEvolutionLayeredArchitectureandContextsExploratorySnapshot: Story = {
  name: 'Button Evolution, Layered Architecture, and Contexts (Exploratory Snapshot)',
  render: () => (
    <AdrViewer
      adrNumber="0012"
      title="Button Evolution, Layered Architecture, and Contexts (Exploratory Snapshot)"
      status="Proposed (Exploratory)"
      date="2025-12-16"
    />
  )
};
