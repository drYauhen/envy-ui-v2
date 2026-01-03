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

export const PrefixUnificationtoeui: Story = {
  name: 'ADR-0016 Prefix Unification to eui',
  render: () => (
    <AdrViewer
      adrNumber="0016"
      title="Prefix Unification to eui"
      status="Accepted"
      date="2025-12-19"
    />
  )
};
