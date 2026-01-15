import type { Meta, StoryObj } from '@storybook/react';
import { DocListViewer } from '../../viewers/docs/DocListViewer';
import { architectures } from '../../viewers/docs/architecture-data';
import { getSectionParameters } from '../../../.storybook/preview';

type Story = StoryObj;

const meta: Meta = {
  title: 'Docs/Architecture',
  parameters: {
    // Apply section-specific parameters automatically
    ...getSectionParameters('Docs/Architecture'),
    layout: 'fullscreen',
    // Hide addon panels for documentation (not needed for ADR documents)
    controls: { hidden: true },
    actions: { hidden: true },
    interactions: { hidden: true },
    a11y: { hidden: true }
  }
};

export default meta;

export const Overview: Story = {
  name: 'Architecture Overview',
  render: () => <DocListViewer docs={architectures} category="architecture" />
};
