import type { Meta, StoryObj } from '@storybook/react';
import { AdrViewer } from '../../viewers/docs/AdrViewer';

type Story = StoryObj;

const meta: Meta = {
  title: 'Docs/ADR',
  parameters: { layout: 'fullscreen' }
};

export default meta;

export const ContextAwareUIComponentsandProjectionModel: Story = {
  name: 'ADR-0004 Context-Aware UI Components and Projection Model',
  render: () => (
    <AdrViewer
      adrNumber="0004"
      title="Context-Aware UI Components and Projection Model"
      status="Accepted (Conceptual)"
      date="2025-12-15"
    />
  )
};
