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

export const colorModelTonalScalesAndContextualArchitecture: Story = {
  name: 'ADR-0014 Color Model Tonal Scales And Contextual Architecture',
  render: () => (
    <DocViewer
      markdownPath="/docs/adr/ADR-0014-color-model-tonal-scales-and-contextual-architecture.md"
      title="Color Model Tonal Scales And Contextual Architecture"
      status="Accepted"
      date="2025-12-18"
      lastUpdated="2026-01-09"
      owner="Eugene Goncharov"
      assistance="AI-assisted drafting (human-reviewed)"
      fallback="Loading ADR-0014 Color Model Tonal Scales And Contextual Architecture..."
    />
  )
};
