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

export const ComponentCssArchitecture: Story = {
  name: 'Component CSS Architecture',
  render: () => (
    <DocViewer
      markdownPath="/docs/architecture/component-css-architecture.md"
      fallback="Loading Component CSS Architecture..."
    />
  )
};
