import type { Meta, StoryObj } from '@storybook/react';
import { DocViewer } from '../../viewers/docs/DocViewer';
import { getSectionParameters } from '../../../.storybook/preview';

type Story = StoryObj;

const meta: Meta = {
  title: 'Docs/Architecture',
  parameters: {
    ...getSectionParameters('Docs/Architecture'),
    layout: 'fullscreen',
    controls: { hidden: true },
    actions: { hidden: true },
    interactions: { hidden: true },
    a11y: { hidden: true }
  }
};

export default meta;

export const ArchTokensNum002CssTokenOutputRules: Story = {
  name: 'ARCH-TOKENS-002 CSS Token Output Rules',
  render: () => (
    <DocViewer
      markdownPath="/docs/architecture/ARCH-tokens-002-css-token-output-rules.md"
      status="Draft"
      lastUpdated="2026-01-14"
      fallback="Loading ARCH-TOKENS-002 CSS Token Output Rules..."
    />
  )
};
