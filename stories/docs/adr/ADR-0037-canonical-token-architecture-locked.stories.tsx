import type { Meta, StoryObj } from '@storybook/react';
import { AdrViewer } from '../../viewers/docs/AdrViewer';

type Story = StoryObj;

const meta: Meta = {
  title: 'Docs/ADR',
  parameters: { layout: 'fullscreen' }
};

export default meta;

export const CanonicalTokenArchitectureLocked: Story = {
  name: 'ADR-0037 Canonical Token Architecture - Locked',
  render: () => (
    <AdrViewer
      adrNumber="0037"
      title="Canonical Token Architecture - Locked"
      status="Accepted (Implemented)"
      date="2026-01-10"
    />
  )
};
