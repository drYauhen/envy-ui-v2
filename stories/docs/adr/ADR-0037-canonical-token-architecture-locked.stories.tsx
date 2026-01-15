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

export const canonicalTokenArchitectureLocked: Story = {
  name: 'ADR-0037 Canonical Token Architecture Locked',
  render: () => (
    <DocViewer
      markdownPath="/docs/adr/ADR-0037-canonical-token-architecture-locked.md"
      title="Canonical Token Architecture Locked"
      status="Accepted (Implemented)"
      date="2026-01-10"
      lastUpdated="2026-01-10"
      owner="Eugene Goncharov"
      assistance="AI-assisted drafting (human-reviewed)"
      fallback="Loading ADR-0037 Canonical Token Architecture Locked..."
    />
  )
};
