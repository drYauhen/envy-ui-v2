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

export const ArchTokensNum003TokenArchitecture: Story = {
  name: 'ARCH-TOKENS-003 Token Architecture',
  render: () => (
    <DocViewer
      markdownPath="/docs/architecture/ARCH-tokens-003-token-architecture.md"
      status="Draft"
      lastUpdated="2026-04-04"
      fallback="Loading ARCH-TOKENS-003 Token Architecture..."
    />
  )
};
