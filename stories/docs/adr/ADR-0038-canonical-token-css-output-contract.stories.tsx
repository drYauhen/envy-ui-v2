import type { Meta, StoryObj } from '@storybook/react';
import { AdrViewer } from '../../viewers/docs/AdrViewer';

type Story = StoryObj;

const meta: Meta = {
  title: 'Docs/ADR',
  parameters: { layout: 'fullscreen' }
};

export default meta;

export const CanonicalTokenCSSOutputContract: Story = {
  name: 'ADR-0038 Canonical Token CSS Output Contract',
  render: () => (
    <AdrViewer
      adrNumber="0038"
      title="Canonical Token CSS Output Contract"
      status="Accepted"
      date="2026-01-10"
    />
  )
};
