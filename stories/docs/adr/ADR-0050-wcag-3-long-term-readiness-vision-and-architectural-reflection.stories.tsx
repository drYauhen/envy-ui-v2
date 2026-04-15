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

export const wCAG3LongTermReadinessVisionandArchitecturalReflection: Story = {
  name: 'ADR-0050 WCAG 3 Long Term Readiness Vision and Architectural Reflection',
  render: () => (
    <DocViewer
      markdownPath="/docs/adr/ADR-0050-wcag-3-long-term-readiness-vision-and-architectural-reflection.md"
      status="Proposed (Exploratory - Long-term Vision)"
      lastUpdated="2026-04-14"
      fallback="Loading ADR-0050 WCAG 3 Long Term Readiness Vision and Architectural Reflection..."
    />
  )
};
