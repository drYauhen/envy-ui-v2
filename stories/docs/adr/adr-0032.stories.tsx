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

export const TokenOverrideStrategyforMultiTenantandGenerativeUI: Story = {
  name: 'ADR-0032 Token Override Strategy for Multi-Tenant and Generative UI',
  render: () => (
    <AdrViewer
      adrNumber="0032"
      title="Token Override Strategy for Multi-Tenant and Generative UI"
      status="Proposed"
      date="2026-01-06"
    />
  )
};
