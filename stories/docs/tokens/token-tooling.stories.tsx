import type { Meta, StoryObj } from '@storybook/react';
import { MarkdownViewer } from '../../viewers/tokens/MarkdownViewer';
import { getSectionParameters } from '../../../.storybook/preview';

type Story = StoryObj;

const meta: Meta = {
  title: 'Docs/Tokens',
  parameters: {
    // Apply section-specific parameters automatically
    ...getSectionParameters('Docs/Tokens'), 
    layout: 'fullscreen',
    controls: { hidden: true },
    actions: { hidden: true },
    interactions: { hidden: true },
    a11y: { hidden: true }
  }
};

export default meta;

export const TokenTooling: Story = {
  name: 'Token System Tooling',
  render: () => (
    <MarkdownViewer 
      markdownPath="/docs/tokens/README.md"
      fallback="Loading token tooling documentation..."
    />
  )
};

export const TokenUseCases: Story = {
  name: 'Token Utilities Use Cases',
  render: () => (
    <MarkdownViewer 
      markdownPath="/docs/tokens/use-cases.md"
      fallback="Loading token use cases..."
    />
  )
};

export const TokenReference: Story = {
  name: 'Token Reference',
  render: () => (
    <MarkdownViewer 
      markdownPath="/docs/tokens/reference.md"
      fallback="Loading token reference..."
    />
  )
};

