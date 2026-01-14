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

export const ARCHSystem006SystemPrefix: Story = {
  name: 'ARCH-System-006 System Prefix',
  render: () => (
    <DocViewer
      markdownPath="/docs/architecture/ARCH-system-006-system-prefix.md"
      fallback="Loading arch-system-006 system prefix..."
    />
  )
};
