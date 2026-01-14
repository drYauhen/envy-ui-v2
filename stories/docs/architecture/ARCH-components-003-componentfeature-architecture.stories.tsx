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

export const ARCHComponents003ComponentfeatureArchitecture: Story = {
  name: 'ARCH-Components-003 Componentfeature Architecture',
  render: () => (
    <DocViewer
      markdownPath="/docs/architecture/ARCH-components-003-componentfeature-architecture.md"
      fallback="Loading arch-components-003 componentfeature architecture..."
    />
  )
};
