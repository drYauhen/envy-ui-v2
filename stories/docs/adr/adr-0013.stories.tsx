import type { Meta, StoryObj } from '@storybook/react';
import { AdrViewer } from '../../viewers/docs/AdrViewer';

type Story = StoryObj;

const meta: Meta = {
  title: 'Docs/ADR/ADR-0013',
  parameters: { layout: 'fullscreen' },
  tags: ['autodocs']
};

export default meta;

export const CurrentArchitecturalIntentExploratoryEnvyUIv2: Story = {
  name: 'Current Architectural Intent (Exploratory) — Envy UI v2',
  render: () => (
    <AdrViewer
      adrNumber="0013"
      title="Current Architectural Intent (Exploratory) — Envy UI v2"
      status="Proposed (Exploratory)"
      date="2025-12-16"
    />
  )
};
