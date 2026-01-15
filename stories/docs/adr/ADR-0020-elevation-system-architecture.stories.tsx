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

export const elevationSystemArchitecture: Story = {
  name: 'ADR-0020 Elevation System Architecture',
  render: () => (
    <DocViewer
      markdownPath="/docs/adr/ADR-0020-elevation-system-architecture.md"
      title="Elevation System Architecture"
      status="Accepted (Implemented)"
      date="2025-12-20"
      lastUpdated="2026-01-08"
      owner="Eugene Goncharov"
      assistance="AI-assisted drafting (human-reviewed)"
      fallback="Loading ADR-0020 Elevation System Architecture..."
    />
  )
};
