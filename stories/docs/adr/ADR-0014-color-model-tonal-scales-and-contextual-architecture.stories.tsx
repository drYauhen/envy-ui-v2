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

export const colorModelTonalScalesandContextualArchitecture: Story = {
  name: 'ADR-0014 Color Model Tonal Scales and Contextual Architecture',
  render: () => (
    <DocViewer
      markdownPath="/docs/adr/ADR-0014-color-model-tonal-scales-and-contextual-architecture.md"
      status="Accepted"
      lastUpdated="2026-01-09"
      fallback="Loading ADR-0014 Color Model Tonal Scales and Contextual Architecture..."
    />
  )
};
