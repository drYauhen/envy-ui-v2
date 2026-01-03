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

export const StorybookModelasAIAgentOrientedArchitectureLayer: Story = {
  name: 'ADR-0022 Storybook Model as AI-Agent-Oriented Architecture Layer',
  render: () => (
    <AdrViewer
      adrNumber="0022"
      title="Storybook Model as AI-Agent-Oriented Architecture Layer"
      status="Proposed (Exploratory)"
      date="2025-12-25"
    />
  )
};
