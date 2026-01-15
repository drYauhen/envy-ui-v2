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

export const storybookModelAiAgentOrientedArchitecture: Story = {
  name: 'ADR-0022 Storybook Model Ai Agent Oriented Architecture',
  render: () => (
    <DocViewer
      markdownPath="/docs/adr/ADR-0022-storybook-model-ai-agent-oriented-architecture.md"
      title="Storybook Model Ai Agent Oriented Architecture"
      status="Proposed (Exploratory - Future Vision)"
      date="2025-12-25"
      lastUpdated="2026-01-08"
      owner="Eugene Goncharov"
      assistance="AI-assisted drafting (human-reviewed)"
      fallback="Loading ADR-0022 Storybook Model Ai Agent Oriented Architecture..."
    />
  )
};
