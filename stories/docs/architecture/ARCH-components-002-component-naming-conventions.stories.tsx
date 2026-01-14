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

export const ARCHComponents002ComponentNamingConventions: Story = {
  name: 'ARCH-Components-002 Component Naming Conventions',
  render: () => (
    <DocViewer
      markdownPath="/docs/architecture/ARCH-components-002-component-naming-conventions.md"
      fallback="Loading arch-components-002 component naming conventions..."
    />
  )
};
