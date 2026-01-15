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

export const cssLayerStrategyContextPriority: Story = {
  name: 'ADR-0024 Css Layer Strategy Context Priority',
  render: () => (
    <DocViewer
      markdownPath="/docs/adr/ADR-0024-css-layer-strategy-context-priority.md"
      title="Css Layer Strategy Context Priority"
      status="Superseded by [ADR-0038](./ADR-0038-canonical-token-css-output-contract.md)"
      date="2025-12-26"
      owner="Eugene Goncharov"
      assistance="AI-assisted drafting (human-reviewed)"
      fallback="Loading ADR-0024 Css Layer Strategy Context Priority..."
    />
  )
};
