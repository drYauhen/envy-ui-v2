import type { Meta, StoryObj } from '@storybook/react';
import { AdrViewer } from '../../viewers/docs/AdrViewer';

type Story = StoryObj;

const meta: Meta = {
  title: 'Docs/ADR',
  parameters: { layout: 'fullscreen' }
};

export default meta;

export const AppDefaultColorPositioningandSemanticTokenOptimization: Story = {
  name: 'ADR-0026 App-Default Color Positioning and Semantic Token Optimization',
  render: () => (
    <AdrViewer
      adrNumber="0026"
      title="App-Default Color Positioning and Semantic Token Optimization"
      status="Accepted"
      date="2025-12-29"
    />
  )
};
