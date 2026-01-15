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

export const focusPolicyArchitecture: Story = {
  name: 'ADR-0006 Focus Policy Architecture',
  render: () => (
    <DocViewer
      markdownPath="/docs/adr/ADR-0006-focus-policy-architecture.md"
      title="Focus Policy Architecture"
      status="Accepted (Partially Implemented)"
      date="2025-12-15"
      lastUpdated="2026-01-08"
      owner="Eugene Goncharov"
      assistance="AI-assisted drafting (human-reviewed)"
      fallback="Loading ADR-0006 Focus Policy Architecture..."
    />
  )
};
