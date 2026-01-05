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

export const ContrastStrategyforDynamicColorsandOnColorTokens: Story = {
  name: 'ADR-0031 Contrast Strategy for Dynamic Colors and On-Color Tokens',
  render: () => (
    <AdrViewer
      adrNumber="0031"
      title="Contrast Strategy for Dynamic Colors and On-Color Tokens"
      status="Proposed"
      date="2026-01-05"
    />
  )
};
