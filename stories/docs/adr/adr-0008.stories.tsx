import type { Meta, StoryObj } from '@storybook/react';
import { AdrViewer } from '../../viewers/docs/AdrViewer';
import { getSectionParameters } from '../../../.storybook/preview';

type Story = StoryObj;

const meta: Meta = {
  title: 'Docs/ADR',
  parameters: {
    // Apply section-specific parameters automatically
    ...getSectionParameters('Docs/ADR'), layout: 'fullscreen' }
};

export default meta;

export const TSXLayerReactAriaandStorybookLayering: Story = {
  name: 'ADR-0008 TSX Layer (React Aria) and Storybook Layering',
  render: () => (
    <AdrViewer
      adrNumber="0008"
      title="TSX Layer (React Aria) and Storybook Layering"
      status="Accepted"
      date="2025-12-16"
    />
  )
};
