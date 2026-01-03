import type { Meta, StoryObj } from '@storybook/react';
import { MarkdownViewer } from '../../viewers/tokens/MarkdownViewer';
import { getSectionParameters } from '../../../.storybook/preview';

type Story = StoryObj;

const meta: Meta = {
  title: 'Docs/Architecture',
  parameters: {
    // Apply section-specific parameters automatically
    ...getSectionParameters('Docs/Architecture'), 
    layout: 'fullscreen',
    controls: { hidden: true },
    actions: { hidden: true },
    interactions: { hidden: true },
    a11y: { hidden: true }
  }
};

export default meta;

export const TokenUsageRules: Story = {
  name: 'Token Usage Rules',
  render: () => (
    <MarkdownViewer 
      markdownPath="/docs/architecture/token-usage-rules.md"
      fallback="Loading token usage rules..."
    />
  )
};

