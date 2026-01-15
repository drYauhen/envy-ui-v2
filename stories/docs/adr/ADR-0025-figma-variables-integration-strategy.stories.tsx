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

export const figmaVariablesIntegrationStrategy: Story = {
  name: 'ADR-0025 Figma Variables Integration Strategy',
  render: () => (
    <DocViewer
      markdownPath="/docs/adr/ADR-0025-figma-variables-integration-strategy.md"
      status="Accepted"
      lastUpdated="2025-12-26"
      fallback="Loading ADR-0025 Figma Variables Integration Strategy..."
    />
  )
};
