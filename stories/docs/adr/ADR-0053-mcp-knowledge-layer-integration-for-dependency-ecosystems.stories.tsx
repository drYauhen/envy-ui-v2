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

export const mcpKnowledgeLayerIntegrationforDependencyEcosystems: Story = {
  name: 'ADR-0053 MCP Knowledge Layer Integration for Dependency Ecosystems',
  render: () => (
    <DocViewer
      markdownPath="/docs/adr/ADR-0053-mcp-knowledge-layer-integration-for-dependency-ecosystems.md"
      status="Accepted (Implementation Started)"
      lastUpdated="2026-04-15"
      fallback="Loading ADR-0053 MCP Knowledge Layer Integration for Dependency Ecosystems..."
    />
  )
};
