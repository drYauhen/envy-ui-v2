import type { Meta, StoryObj } from '@storybook/react';
import { AdrViewer } from '../../viewers/docs/AdrViewer';

type Story = StoryObj;

const meta: Meta = {
  title: 'Docs/ADR/ADR-0019',
  parameters: { layout: 'fullscreen' },
  tags: ['autodocs']
};

export default meta;

export const LayoutComponentsArchitecture: Story = {
  name: 'Layout Components Architecture',
  render: () => (
    <AdrViewer
      adrNumber="0019"
      title="Layout Components Architecture"
      status="Accepted"
      date="2025-12-21"
    />
  )
};
