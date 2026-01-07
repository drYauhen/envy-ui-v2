import type { Meta, StoryObj } from '@storybook/react';
import { AdrViewer } from '../../viewers/docs/AdrViewer';

type Story = StoryObj;

const meta: Meta = {
  title: 'Docs/ADR',
  parameters: { layout: 'fullscreen' }
};

export default meta;

export const AIFirstComponentArchitectureVision: Story = {
  name: 'ADR-0036 AI-First Component Architecture Vision',
  render: () => (
    <AdrViewer
      adrNumber="0036"
      title="AI-First Component Architecture Vision"
      status="Proposed (Evolutionary)"
      date="2026-01-07"
    />
  )
};
