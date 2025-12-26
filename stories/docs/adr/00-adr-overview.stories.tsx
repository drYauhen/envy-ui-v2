import type { Meta, StoryObj } from '@storybook/react';
import { AdrListViewer } from '../../viewers/docs/AdrListViewer';

type Story = StoryObj;

const meta: Meta = {
  title: 'Docs/ADR',
  parameters: { layout: 'fullscreen' }
};

export default meta;

export const Overview: Story = {
  name: 'ADR Overview',
  render: () => <AdrListViewer />
};
