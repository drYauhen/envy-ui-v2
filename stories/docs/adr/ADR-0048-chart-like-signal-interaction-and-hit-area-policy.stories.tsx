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

export const chartLikeSignalInteractionandHitAreaPolicy: Story = {
  name: 'ADR-0048 Chart Like Signal Interaction and Hit Area Policy',
  render: () => (
    <DocViewer
      markdownPath="/docs/adr/ADR-0048-chart-like-signal-interaction-and-hit-area-policy.md"
      status="Accepted"
      lastUpdated="2026-04-06"
      fallback="Loading ADR-0048 Chart Like Signal Interaction and Hit Area Policy..."
    />
  )
};
