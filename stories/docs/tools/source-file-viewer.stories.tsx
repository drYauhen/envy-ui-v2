import type { Meta, StoryObj } from '@storybook/react';
import { getSectionParameters } from '../../../.storybook/preview';
import { SourceFileViewer } from '../../viewers/code/SourceFileViewer';

type Story = StoryObj;

const meta: Meta = {
  title: 'Docs/Tools',
  parameters: {
    ...getSectionParameters('Docs/Tools'),
    layout: 'fullscreen',
    controls: { hidden: true },
    actions: { hidden: true },
    interactions: { hidden: true },
    a11y: { hidden: true }
  }
};

export default meta;

export const sourceFileViewer: Story = {
  name: 'Source File Viewer',
  render: () => <SourceFileViewer />
};
