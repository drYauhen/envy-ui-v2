import type { Meta, StoryObj } from '@storybook/react';
import { TypographyViewer } from '../../../viewers/tokens/TypographyViewer';

type Story = StoryObj;

const meta: Meta = {
  title: 'Tokens/App/Foundations/Typography',
  tags: ['autodocs'],
  parameters: {
    layout: 'fullscreen'
  }
};

export default meta;

export const Typography: Story = {
  name: 'Typography System',
  render: () => <TypographyViewer />
};

