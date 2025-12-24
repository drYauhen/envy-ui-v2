import type { Meta, StoryObj } from '@storybook/react';
import { AdrViewer } from '../../viewers/docs/AdrViewer';

type Story = StoryObj;

const meta: Meta = {
  title: 'Docs/ADR/ADR-0017',
  parameters: { layout: 'fullscreen' },
  tags: ['autodocs']
};

export default meta;

export const LayeredTokenArchitectureforContextsandThemes: Story = {
  name: 'Layered Token Architecture for Contexts and Themes',
  render: () => (
    <AdrViewer
      adrNumber="0017"
      title="Layered Token Architecture for Contexts and Themes"
      status="Accepted"
      date="2025-12-20"
    />
  )
};
