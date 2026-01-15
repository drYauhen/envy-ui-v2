import type { Meta, StoryObj } from '@storybook/react';
import { DocViewer } from '../../viewers/docs/DocViewer';
import { getSectionParameters } from '../../../.storybook/preview';

type Story = StoryObj;

const meta: Meta = {
  title: 'Docs/ADR',
  parameters: {
    ...getSectionParameters('Docs/ADR'),
    layout: 'fullscreen',
    controls: { hidden: true },
    actions: { hidden: true },
    interactions: { hidden: true },
    a11y: { hidden: true }
  }
};

export default meta;

export const tokenDrivenComponentContractsV1Exploratory: Story = {
  name: 'ADR-0011 Token Driven Component Contracts V1 Exploratory',
  render: () => (
    <DocViewer
      markdownPath="/docs/adr/ADR-0011-token-driven-component-contracts-v1-exploratory.md"
      status="Accepted (Exploratory)"
      lastUpdated="2025-12-16"
      fallback="Loading ADR-0011 Token Driven Component Contracts V1 Exploratory..."
    />
  )
};
