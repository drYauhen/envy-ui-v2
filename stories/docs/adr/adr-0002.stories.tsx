import type { Meta, StoryObj } from '@storybook/react';
import { AdrViewer } from '../../viewers/docs/AdrViewer';

type Story = StoryObj;

const meta: Meta = {
  title: 'Docs/ADR/ADR-0002',
  parameters: { layout: 'fullscreen' },
  tags: ['autodocs']
};

export default meta;

export const DataDrivenStorybookPipelineviaStyleDictionary: Story = {
  name: 'Data-Driven Storybook Pipeline via Style Dictionary',
  render: () => (
    <AdrViewer
      adrNumber="0002"
      title="Data-Driven Storybook Pipeline via Style Dictionary"
      status="Accepted"
      date="2025-12-15"
    />
  )
};
