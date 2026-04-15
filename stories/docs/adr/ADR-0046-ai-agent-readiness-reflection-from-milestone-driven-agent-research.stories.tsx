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

export const aiAgentReadinessReflectionfromMilestoneDrivenAgentResearch: Story = {
  name: 'ADR-0046 AI Agent Readiness Reflection from Milestone Driven Agent Research',
  render: () => (
    <DocViewer
      markdownPath="/docs/adr/ADR-0046-ai-agent-readiness-reflection-from-milestone-driven-agent-research.md"
      status="Accepted (Reflective Baseline)"
      lastUpdated="2026-04-04"
      fallback="Loading ADR-0046 AI Agent Readiness Reflection from Milestone Driven Agent Research..."
    />
  )
};
