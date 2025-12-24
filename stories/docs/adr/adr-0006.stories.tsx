import type { Meta, StoryObj } from '@storybook/react';
import { AdrViewer } from '../../viewers/docs/AdrViewer';

type Story = StoryObj;

const meta: Meta = {
  title: 'Docs/ADR/ADR-0006',
  parameters: { layout: 'fullscreen' },
  tags: ['autodocs']
};

export default meta;

export const FocusPolicyArchitectureDrivenwithSystemFocus: Story = {
  name: 'Focus Policy Architecture Driven with System Focus',
  render: () => (
    <AdrViewer
      adrNumber="0006"
      title="Focus Policy Architecture Driven with System Focus"
      status="Accepted"
      date="2025-12-15"
    />
  )
};
