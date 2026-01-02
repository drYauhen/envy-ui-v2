import type { Meta, StoryObj } from '@storybook/react';
import { AdrViewer } from '../../viewers/docs/AdrViewer';

type Story = StoryObj;

const meta: Meta = {
  title: 'Docs/ADR',
  parameters: { layout: 'fullscreen' }
};

export default meta;

export const ThirdPartyLibraryIntegrationStrategy: Story = {
  name: 'ADR-0030 Third-Party Library Integration Strategy',
  render: () => (
    <AdrViewer
      adrNumber="0030"
      title="Third-Party Library Integration Strategy"
      status="Accepted"
      date="2025-01-02"
    />
  )
};

