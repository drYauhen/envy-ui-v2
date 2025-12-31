import type { Meta, StoryObj } from '@storybook/react';
import { AdrViewer } from '../../viewers/docs/AdrViewer';

type Story = StoryObj;

const meta: Meta = {
  title: 'Docs/ADR',
  parameters: { layout: 'fullscreen' }
};

export default meta;

export const FocusPolicyArchitectureDrivenwithSystemFocus: Story = {
  name: 'ADR-0006 Focus Policy Architecture Driven with System Focus',
  render: () => (
    <AdrViewer
      adrNumber="0006"
      title="Focus Policy Architecture Driven with System Focus"
      status="Accepted"
      date="2025-12-15"
    />
  )
};
