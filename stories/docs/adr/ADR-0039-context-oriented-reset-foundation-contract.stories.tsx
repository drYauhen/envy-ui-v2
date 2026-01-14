import type { Meta, StoryObj } from '@storybook/react';
import { AdrViewer } from '../../viewers/docs/AdrViewer';

type Story = StoryObj;

const meta: Meta = {
  title: 'Docs/ADR',
  parameters: { layout: 'fullscreen' }
};

export default meta;

export const ContextOrientedResetasFoundationContract: Story = {
  name: 'ADR-0039 Context-Oriented Reset as Foundation Contract',
  render: () => (
    <AdrViewer
      adrNumber="0039"
      title="Context-Oriented Reset as Foundation Contract"
      status="Accepted"
      date="2026-01-13"
    />
  )
};
