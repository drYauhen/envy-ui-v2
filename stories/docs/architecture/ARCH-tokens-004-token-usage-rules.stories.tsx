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

export const ArchTokens004TokenUsageRules: Story = {
  name: 'ARCH-TOKENS-004 Token Usage Rules',
  render: () => (
    <DocViewer
      markdownPath="/docs/architecture/ARCH-tokens-004-token-usage-rules.md"
      title="Token Usage Rules"
      status="Active"
      date="2026-01-14"
      lastUpdated="2026-01-14"
      fallback="Loading ARCH-TOKENS-004 Token Usage Rules..."
    />
  )
};
