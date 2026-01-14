import type { Meta, StoryObj } from '@storybook/react';
import { AdrViewer } from '../../viewers/docs/AdrViewer';

type Story = StoryObj;

const meta: Meta = {
  title: 'Docs/ADR',
  parameters: { layout: 'fullscreen' }
};

export default meta;

export const LayeredTokenArchitectureforContextsandThemes: Story = {
  name: 'ADR-0017 Layered Token Architecture for Contexts and Themes',
  render: () => (
    <AdrViewer
      adrNumber="0017"
      title="Layered Token Architecture for Contexts and Themes"
      status="Superseded by [ADR-0037](./ADR-0037-canonical-token-architecture-locked.md)"
      date="2025-12-20"
    />
  )
};
