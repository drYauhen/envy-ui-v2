import type { Meta, StoryObj } from '@storybook/react';
import { TypographyViewer } from '../../../viewers/tokens/TypographyViewer';
import { getSectionParameters } from '../../../../.storybook/preview';

type Story = StoryObj;

const meta: Meta = {
  title: 'Tokens/App/Foundations/Typography',
  tags: ['autodocs'],
  parameters: {
    // Apply section-specific parameters automatically
    ...getSectionParameters('Tokens/App/Foundations/Typography'),
    layout: 'fullscreen'
  }
};

export default meta;

export const Typography: Story = {
  name: 'Typography System',
  render: () => <TypographyViewer />
};

