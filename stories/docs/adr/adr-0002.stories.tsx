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

export const DataDrivenStorybookPipelineviaStyleDictionary: Story = {
  name: 'ADR-0002 Data-Driven Storybook Pipeline via Style Dictionary',
  render: () => (
    <AdrViewer
      adrNumber="0002"
      title="Data-Driven Storybook Pipeline via Style Dictionary"
      status="Accepted"
      date="2025-12-15"
    />
  )
};
