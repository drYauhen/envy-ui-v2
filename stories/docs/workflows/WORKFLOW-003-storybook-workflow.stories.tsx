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

export const storybookWorkflow: Story = {
  name: 'WORKFLOW-003 Storybook Workflow',
  render: () => (
    <DocViewer
      markdownPath="/docs/workflows/WORKFLOW-003-storybook-workflow.md"
      status="Active"
      lastUpdated="2026-01-13"
      fallback="Loading WORKFLOW-003 Storybook Workflow..."
    />
  )
};
