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

export const tokenFirstContractLayerAndRendererAgnosticModel: Story = {
  name: 'ADR-0015 Token First Contract Layer And Renderer Agnostic Model',
  render: () => (
    <DocViewer
      markdownPath="/docs/adr/ADR-0015-token-first-contract-layer-and-renderer-agnostic-model.md"
      title="Token First Contract Layer And Renderer Agnostic Model"
      status="Accepted (Implemented)"
      date="2025-12-18"
      lastUpdated="2026-01-08"
      owner="Eugene Goncharov"
      assistance="AI-assisted drafting (human-reviewed)"
      fallback="Loading ADR-0015 Token First Contract Layer And Renderer Agnostic Model..."
    />
  )
};
