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

export const LayeredTokenArchitectureforContextsandThemes: Story = {
  name: 'ADR-0017 Layered Token Architecture for Contexts and Themes',
  render: () => (
    <AdrViewer
      adrNumber="0017"
      title="Layered Token Architecture for Contexts and Themes"
      status="Accepted"
      date="2025-12-20"
    />
  )
};
