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

export const thirdPartyLibraryIntegrationStrategy: Story = {
  name: 'ADR-0030 Third Party Library Integration Strategy',
  render: () => (
    <DocViewer
      markdownPath="/docs/adr/ADR-0030-third-party-library-integration-strategy.md"
      title="Third Party Library Integration Strategy"
      status="Accepted"
      date="2025-01-02"
      owner="Eugene Goncharov"
      assistance="AI-assisted drafting (human-reviewed)"
      fallback="Loading ADR-0030 Third Party Library Integration Strategy..."
    />
  )
};
