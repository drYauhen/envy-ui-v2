import type { Meta, StoryObj } from '@storybook/react';
import { DocViewer} from '../../viewers/docs/DocViewer';
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

export const tokensWorkflow: Story = {
  name: 'WORKFLOW-005 Tokens Workflow',
  render: () => (
    <DocViewer
      markdownPath="/docs/workflows/WORKFLOW-005-tokens-workflow.md"
      status="Active"
      lastUpdated="2026-01-13"
      fallback="Loading WORKFLOW-005 Tokens Workflow..."
    />
  )
};
