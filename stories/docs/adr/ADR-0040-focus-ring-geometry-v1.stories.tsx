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

export const focusRingGeometryV1: Story = {
  name: 'ADR-0040 Focus Ring Geometry V1',
  render: () => (
    <DocViewer
      markdownPath="/docs/adr/ADR-0040-focus-ring-geometry-v1.md"
      title="Focus Ring Geometry V1"
      status="Accepted (v1)"
      date="2026-01-15"
      owner="Eugene Goncharov"
      fallback="Loading ADR-0040 Focus Ring Geometry V1..."
    />
  )
};
