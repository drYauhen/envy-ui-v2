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

export const ArchTokens003TokenArchitecture: Story = {
  name: 'ARCH-TOKENS-003 Token Architecture',
  render: () => (
    <DocViewer
      markdownPath="/docs/architecture/ARCH-tokens-003-token-architecture.md"
      title="Token Architecture"
      status="Active"
      date="2026-01-14"
      lastUpdated="2026-01-14"
      fallback="Loading ARCH-TOKENS-003 Token Architecture..."
    />
  )
};
