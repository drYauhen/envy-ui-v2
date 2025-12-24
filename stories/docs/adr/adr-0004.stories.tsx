import type { Meta, StoryObj } from '@storybook/react';
import { AdrViewer } from '../../viewers/docs/AdrViewer';

type Story = StoryObj;

const meta: Meta = {
  title: 'Docs/ADR/ADR-0004',
  parameters: { layout: 'fullscreen' },
  tags: ['autodocs']
};

export default meta;

export const ContextAwareUIComponentsandProjectionModel: Story = {
  name: 'Context-Aware UI Components and Projection Model',
  render: () => (
    <AdrViewer
      adrNumber="0004"
      title="Context-Aware UI Components and Projection Model"
      status="Accepted (Conceptual)"
      date="2025-12-15"
    />
  )
};
