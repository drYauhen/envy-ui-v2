import type { Meta, StoryObj } from '@storybook/react';
import { AdrViewer } from '../../viewers/docs/AdrViewer';

type Story = StoryObj;

const meta: Meta = {
  title: 'Docs/ADR/ADR-0020',
  parameters: { layout: 'fullscreen' },
  tags: ['autodocs']
};

export default meta;

export const ElevationSystemArchitecture: Story = {
  name: 'Elevation System Architecture',
  render: () => (
    <AdrViewer
      adrNumber="0020"
      title="Elevation System Architecture"
      status="Accepted"
      date="2025-12-20"
    />
  )
};
