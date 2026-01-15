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
      status="Accepted (v1)"
      lastUpdated="2026-01-15"
      fallback="Loading ADR-0040 Focus Ring Geometry V1..."
    />
  )
};
