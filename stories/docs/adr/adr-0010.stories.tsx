import type { Meta, StoryObj } from '@storybook/react';
import { AdrViewer } from '../../viewers/docs/AdrViewer';

type Story = StoryObj;

const meta: Meta = {
  title: 'Docs/ADR',
  parameters: { 
    layout: 'fullscreen',
    // Hide addon panels for documentation (not needed for ADR documents)
    controls: { hidden: true },
    actions: { hidden: true },
    interactions: { hidden: true },
    a11y: { hidden: true }
  }
};

export default meta;

export const ButtonTSXReactAriav2Alpha: Story = {
  parameters: {
    interactions: { hidden: true },
    controls: { hidden: true },
    actions: { hidden: true },
    a11y: { hidden: true }
  },
  name: 'ADR-0010 Button TSX + React Aria v2 (Alpha)',
  render: () => (
    <AdrViewer
      adrNumber="0010"
      title="Button TSX + React Aria v2 (Alpha)"
      status="Accepted (Alpha)"
      date="2025-12-16"
    />
  )
};
