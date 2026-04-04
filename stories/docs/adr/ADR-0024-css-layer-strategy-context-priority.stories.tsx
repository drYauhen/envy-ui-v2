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

export const cSSLayerStrategyContextPriority: Story = {
  name: 'ADR-0024 CSS Layer Strategy Context Priority',
  render: () => (
    <DocViewer
      markdownPath="/docs/adr/ADR-0024-css-layer-strategy-context-priority.md"
      status="Superseded by [ADR-0038](ADR-0038-canonical-token-css-output-contract.md)"
      lastUpdated="2025-12-26"
      fallback="Loading ADR-0024 CSS Layer Strategy Context Priority..."
    />
  )
};
