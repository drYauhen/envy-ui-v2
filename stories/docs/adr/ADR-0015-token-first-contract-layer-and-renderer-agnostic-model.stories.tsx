import type { Meta, StoryObj } from '@storybook/react';
import { DocViewer } from '../../viewers/docs/DocViewer';
import { getSectionParameters } from '../../../.storybook/preview';

type Story = StoryObj;

const meta: Meta = {
  title: 'Docs/ADR',
  parameters: {
    ...getSectionParameters('Docs/ADR'),
    layout: 'fullscreen',
    controls: { hidden: true },
    actions: { hidden: true },
    interactions: { hidden: true },
    a11y: { hidden: true }
  }
};

export default meta;

export const tokenFirstContractLayerandRendererAgnosticModel: Story = {
  name: 'ADR-0015 Token First Contract Layer and Renderer Agnostic Model',
  render: () => (
    <DocViewer
      markdownPath="/docs/adr/ADR-0015-token-first-contract-layer-and-renderer-agnostic-model.md"
      status="Accepted (Implemented)"
      lastUpdated="2026-01-08"
      fallback="Loading ADR-0015 Token First Contract Layer and Renderer Agnostic Model..."
    />
  )
};
