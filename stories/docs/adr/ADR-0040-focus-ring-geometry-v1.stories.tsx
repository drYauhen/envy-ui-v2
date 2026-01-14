import type { Meta, StoryObj } from '@storybook/react';
import { AdrViewer } from '../../viewers/docs/AdrViewer';

type Story = StoryObj;

const meta: Meta = {
  title: 'Docs/ADR',
  parameters: { layout: 'fullscreen' }
};

export default meta;

export const FocusRingGeometryCanonv1: Story = {
  name: 'ADR-0040 Focus Ring Geometry Canon v1',
  render: () => (
    <AdrViewer
      adrNumber="0040"
      title="Focus Ring Geometry Canon v1"
      status="Accepted (v1)"
      date="2026-01-15"
    />
  )
};
