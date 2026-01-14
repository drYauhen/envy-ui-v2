import type { Meta, StoryObj } from '@storybook/react';
import { DocViewer } from '../../viewers/docs/DocViewer';
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

export const ARCHTokens001ColorSystemArchitectureRules: Story = {
  name: 'ARCH-Tokens-001 Color System Architecture Rules',
  render: () => (
    <DocViewer
      markdownPath="/docs/architecture/ARCH-tokens-001-color-system-architecture-rules.md"
      fallback="Loading arch-tokens-001 color system architecture rules..."
    />
  )
};
