import type { Meta, StoryObj } from '@storybook/react';
import { AdrViewer } from '../../viewers/docs/AdrViewer';

type Story = StoryObj;

const meta: Meta = {
  title: 'Docs/ADR',
  parameters: { layout: 'fullscreen' }
};

export default meta;

export const TokenDrivenButtonContractsv1Exploratory: Story = {
  name: 'ADR-0011 Token-Driven Button Contracts (v1, Exploratory)',
  render: () => (
    <AdrViewer
      adrNumber="0011"
      title="Token-Driven Button Contracts (v1, Exploratory)"
      status="Accepted (Exploratory)"
      date="2025-12-16"
    />
  )
};
