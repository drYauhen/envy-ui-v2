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

export const ARCHTokens003TokenArchitecture: Story = {
  name: 'ARCH-Tokens-003 Token Architecture',
  render: () => (
    <DocViewer
      markdownPath="/docs/architecture/ARCH-tokens-003-token-architecture.md"
      fallback="Loading arch-tokens-003 token architecture..."
    />
  )
};
