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

export const fluent2ReflectionvsEnvyUIV2: Story = {
  name: 'ADR-0051 Fluent 2 Reflection vs Envy UI V2',
  render: () => (
    <DocViewer
      markdownPath="/docs/adr/ADR-0051-fluent-2-reflection-vs-envy-ui-v2.md"
      status="Proposed (Reflective Benchmark)"
      lastUpdated="2026-04-14"
      fallback="Loading ADR-0051 Fluent 2 Reflection vs Envy UI V2..."
    />
  )
};
