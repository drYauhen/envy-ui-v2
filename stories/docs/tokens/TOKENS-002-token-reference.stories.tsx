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

export const tokenReference: Story = {
  name: 'TOKENS-002 Token Reference',
  render: () => (
    <DocViewer
      markdownPath="/docs/tokens/TOKENS-002-token-reference.md"
      status="Active"
      lastUpdated="2026-01-13"
      fallback="Loading TOKENS-002 Token Reference..."
    />
  )
};
