import type { Meta, StoryObj } from '@storybook/react';
import { AdrViewer } from '../../viewers/docs/AdrViewer';

type Story = StoryObj;

const meta: Meta = {
  title: 'Docs/ADR/ADR-0016',
  parameters: { layout: 'fullscreen' },
  tags: ['autodocs']
};

export default meta;

export const PrefixUnificationtoeui: Story = {
  name: 'Prefix Unification to eui',
  render: () => (
    <AdrViewer
      adrNumber="0016"
      title="Prefix Unification to eui"
      status="Accepted"
      date="2025-12-19"
    />
  )
};
