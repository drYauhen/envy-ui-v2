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

export const TokenDrivenComponentContractsv1Exploratory: Story = {
  name: 'ADR-0011 Token-Driven Component Contracts (v1, Exploratory)',
  render: () => (
    <AdrViewer
      adrNumber="0011"
      title="Token-Driven Component Contracts (v1, Exploratory)"
      status="Accepted (Exploratory)"
      date="2025-12-16"
    />
  )
};
