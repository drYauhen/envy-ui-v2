import type { Meta, StoryObj } from '@storybook/react';
import { AdrViewer } from '../../viewers/docs/AdrViewer';

type Story = StoryObj;

const meta: Meta = {
  title: 'Docs/ADR/ADR-0008',
  parameters: { layout: 'fullscreen' },
  tags: ['autodocs']
};

export default meta;

export const TSXLayerReactAriaButtonv1andStorybookLayering: Story = {
  name: 'TSX Layer (React Aria) Button v1 and Storybook Layering',
  render: () => (
    <AdrViewer
      adrNumber="0008"
      title="TSX Layer (React Aria) Button v1 and Storybook Layering"
      status="Accepted"
      date="2025-12-16"
    />
  )
};
