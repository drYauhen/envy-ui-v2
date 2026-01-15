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

export const dataDrivenFigmaVariablesPipeline: Story = {
  name: 'ADR-0003 Data Driven Figma Variables Pipeline',
  render: () => (
    <DocViewer
      markdownPath="/docs/adr/ADR-0003-data-driven-figma-variables-pipeline.md"
      title="Data Driven Figma Variables Pipeline"
      status="Accepted"
      date="2025-12-15"
      owner="Eugene Goncharov"
      assistance="AI-assisted drafting (human-reviewed)"
      fallback="Loading ADR-0003 Data Driven Figma Variables Pipeline..."
    />
  )
};
