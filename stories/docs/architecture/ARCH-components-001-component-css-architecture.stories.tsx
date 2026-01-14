import type { Meta, StoryObj } from '@storybook/react';
import { DocViewer } from '../../viewers/docs/DocViewer';
import { getSectionParameters } from '../../../.storybook/preview';

type Story = StoryObj;

const meta: Meta = {
  title: 'Docs/Architecture',
  parameters: {
    // Apply section-specific parameters automatically
    ...getSectionParameters('Docs/Architecture'),
    layout: 'fullscreen',
    controls: { hidden: true },
    actions: { hidden: true },
    interactions: { hidden: true },
    a11y: { hidden: true }
  }
};

export default meta;

export const ARCHComponents001ComponentCssArchitecture: Story = {
  name: 'ARCH-Components-001 Component Css Architecture',
  render: () => (
    <DocViewer
      markdownPath="/docs/architecture/ARCH-components-001-component-css-architecture.md"
      fallback="Loading arch-components-001 component css architecture..."
    />
  )
};
