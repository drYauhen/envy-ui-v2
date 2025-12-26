import type { Meta, StoryObj } from '@storybook/react';
import { AdrViewer } from '../../viewers/docs/AdrViewer';

type Story = StoryObj;

const meta: Meta = {
  title: 'Docs/ADR',
  parameters: { layout: 'fullscreen' }
};

export default meta;

export const DataDrivenFigmaVariablesPipelineviaAdapterJSON: Story = {
  name: 'ADR-0003 Data-Driven Figma Variables Pipeline via Adapter JSON',
  render: () => (
    <AdrViewer
      adrNumber="0003"
      title="Data-Driven Figma Variables Pipeline via Adapter JSON"
      status="Accepted"
      date="2025-12-15"
    />
  )
};
