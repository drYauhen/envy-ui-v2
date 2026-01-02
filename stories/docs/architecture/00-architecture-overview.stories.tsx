import type { Meta, StoryObj } from '@storybook/react';
import { MarkdownViewer } from '../../viewers/tokens/MarkdownViewer';

type Story = StoryObj;

const meta: Meta = {
  title: 'Docs/Architecture',
  parameters: { 
    layout: 'fullscreen',
    controls: { hidden: true },
    actions: { hidden: true },
    interactions: { hidden: true },
    a11y: { hidden: true }
  }
};

export default meta;

export const ArchitectureOverview: Story = {
  name: 'Architecture Documentation Overview',
  render: () => (
    <MarkdownViewer 
      markdownPath="/docs/architecture/README.md"
      fallback="Loading architecture documentation..."
    />
  )
};
