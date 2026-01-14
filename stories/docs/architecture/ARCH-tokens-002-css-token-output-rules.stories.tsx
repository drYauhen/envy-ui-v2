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

export const ARCHTokens002CssTokenOutputRules: Story = {
  name: 'ARCH-Tokens-002 Css Token Output Rules',
  render: () => (
    <DocViewer
      markdownPath="/docs/architecture/ARCH-tokens-002-css-token-output-rules.md"
      fallback="Loading arch-tokens-002 css token output rules..."
    />
  )
};
