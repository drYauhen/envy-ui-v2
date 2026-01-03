import type { Meta, StoryObj } from '@storybook/react';
import { AdrViewer } from '../../viewers/docs/AdrViewer';
import { getSectionParameters } from '../../../.storybook/preview';

type Story = StoryObj;

const meta: Meta = {
  title: 'Docs/ADR',
  parameters: {
    // Apply section-specific parameters automatically
    ...getSectionParameters('Docs/ADR'), layout: 'fullscreen' }
};

export default meta;

export const InteractiveComponentsEvolutionLayeredArchitectureandContextsExploratorySnapshot: Story = {
  name: 'ADR-0012 Interactive Components Evolution, Layered Architecture, and Contexts (Exploratory Snapshot)',
  render: () => (
    <AdrViewer
      adrNumber="0012"
      title="Interactive Components Evolution, Layered Architecture, and Contexts (Exploratory Snapshot)"
      status="Proposed (Exploratory)"
      date="2025-12-16"
    />
  )
};
