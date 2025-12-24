import type { Meta, StoryObj } from '@storybook/react';
import { AdrViewer } from '../../viewers/docs/AdrViewer';

type Story = StoryObj;

const meta: Meta = {
  title: 'Docs/ADR/ADR-0015',
  parameters: { layout: 'fullscreen' },
  tags: ['autodocs']
};

export default meta;

export const TokenFirstContractLayerandRendererAgnosticModel: Story = {
  name: 'Token-First Contract Layer and Renderer-Agnostic Model',
  render: () => (
    <AdrViewer
      adrNumber="0015"
      title="Token-First Contract Layer and Renderer-Agnostic Model"
      status="Accepted"
      date="2025-12-18"
    />
  )
};
