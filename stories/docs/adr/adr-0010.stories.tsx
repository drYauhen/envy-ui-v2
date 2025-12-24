import type { Meta, StoryObj } from '@storybook/react';
import { AdrViewer } from '../../viewers/docs/AdrViewer';

type Story = StoryObj;

const meta: Meta = {
  title: 'Docs/ADR/ADR-0010',
  parameters: { layout: 'fullscreen' },
  tags: ['autodocs']
};

export default meta;

export const ButtonTSXReactAriav2Alpha: Story = {
  name: 'Button TSX + React Aria v2 (Alpha)',
  render: () => (
    <AdrViewer
      adrNumber="0010"
      title="Button TSX + React Aria v2 (Alpha)"
      status="Accepted (Alpha)"
      date="2025-12-16"
    />
  )
};
