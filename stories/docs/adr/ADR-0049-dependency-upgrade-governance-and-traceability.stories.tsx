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

export const dependencyUpgradeGovernanceandTraceability: Story = {
  name: 'ADR-0049 Dependency Upgrade Governance and Traceability',
  render: () => (
    <DocViewer
      markdownPath="/docs/adr/ADR-0049-dependency-upgrade-governance-and-traceability.md"
      status="Accepted"
      lastUpdated="2026-04-08"
      fallback="Loading ADR-0049 Dependency Upgrade Governance and Traceability..."
    />
  )
};
