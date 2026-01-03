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

export const TokenFirstContractLayerandRendererAgnosticModel: Story = {
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
