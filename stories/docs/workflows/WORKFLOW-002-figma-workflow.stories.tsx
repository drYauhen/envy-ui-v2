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

export const figmaWorkflow: Story = {
  name: 'WORKFLOW-002 Figma Workflow',
  render: () => (
    <DocViewer
      markdownPath="/docs/workflows/WORKFLOW-002-figma-workflow.md"
      status="Active"
      lastUpdated="2026-01-15"
      fallback="Loading WORKFLOW-002 Figma Workflow..."
    />
  )
};
