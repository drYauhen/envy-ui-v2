import type { Meta, StoryObj } from '@storybook/react';
import { DocViewer } from '../../viewers/docs/DocViewer';
import { getSectionParameters } from '../../../.storybook/preview';

type Story = StoryObj;

const meta: Meta = {
  title: 'Docs/Workflows',
  parameters: {
    ...getSectionParameters('Docs/Workflows'),
    layout: 'fullscreen',
    controls: { hidden: true },
    actions: { hidden: true },
    interactions: { hidden: true },
    a11y: { hidden: true }
  }
};

export default meta;

export const layerGenerationWorkflow: Story = {
  name: 'WORKFLOW-006 Layer Generation Workflow',
  render: () => (
    <DocViewer
      markdownPath="/docs/workflows/WORKFLOW-006-layer-generation-workflow.md"
      status="Active"
      lastUpdated="2026-01-12"
      fallback="Loading WORKFLOW-006 Layer Generation Workflow..."
    />
  )
};
