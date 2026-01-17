import type { Meta, StoryObj } from '@storybook/react';
import { DocViewer } from '../../viewers/docs/DocViewer';
import { getSectionParameters } from '../../../.storybook/preview';

type Story = StoryObj;

const meta: Meta = {
  title: 'Docs/Tokens',
  parameters: {
    ...getSectionParameters('Docs/Tokens'),
    layout: 'fullscreen',
    controls: { hidden: true },
    actions: { hidden: true },
    interactions: { hidden: true },
    a11y: { hidden: true }
  }
};

export default meta;

export const tokenSystemTooling: Story = {
  name: 'TOKENS-001 Token System Tooling',
  render: () => (
    <DocViewer
      markdownPath="/docs/tokens/TOKENS-001-token-system-tooling.md"
      status="Active"
      lastUpdated="2026-01-13"
      fallback="Loading TOKENS-001 Token System Tooling..."
    />
  )
};
