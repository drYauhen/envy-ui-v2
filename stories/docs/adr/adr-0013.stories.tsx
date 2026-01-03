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

export const CurrentArchitecturalIntentExploratoryEnvyUIv2: Story = {
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
