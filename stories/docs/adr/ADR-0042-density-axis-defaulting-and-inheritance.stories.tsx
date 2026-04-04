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

export const densityAxisDefaultingandInheritance: Story = {
  name: 'ADR-0042 Density Axis Defaulting and Inheritance',
  render: () => (
    <DocViewer
      markdownPath="/docs/adr/ADR-0042-density-axis-defaulting-and-inheritance.md"
      status="Accepted (Partially Implemented)"
      lastUpdated="2026-02-05"
      fallback="Loading ADR-0042 Density Axis Defaulting and Inheritance..."
    />
  )
};
