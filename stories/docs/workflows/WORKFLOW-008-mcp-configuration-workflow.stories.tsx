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

export const mcpConfigurationWorkflow: Story = {
  name: 'WORKFLOW-008 MCP Configuration Workflow',
  render: () => (
    <DocViewer
      markdownPath="/docs/workflows/WORKFLOW-008-mcp-configuration-workflow.md"
      status="Active"
      lastUpdated="2026-04-02"
      fallback="Loading WORKFLOW-008 MCP Configuration Workflow..."
    />
  )
};
