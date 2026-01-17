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

export const tokenUtilitiesUseCases: Story = {
  name: 'TOKENS-003 Token Utilities Use Cases',
  render: () => (
    <DocViewer
      markdownPath="/docs/tokens/TOKENS-003-token-utilities-use-cases.md"
      status="Active"
      lastUpdated="2026-01-13"
      fallback="Loading TOKENS-003 Token Utilities Use Cases..."
    />
  )
};
