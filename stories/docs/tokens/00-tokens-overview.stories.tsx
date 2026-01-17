import type { Meta, StoryObj } from '@storybook/react';
import { DocListViewer } from '../../viewers/docs/DocListViewer';
import { tokens } from '../../viewers/docs/tokens-data';
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

export const Overview: Story = {
  name: 'Tokens Overview',
  render: () => <DocListViewer docs={tokens} category="token" />
};
