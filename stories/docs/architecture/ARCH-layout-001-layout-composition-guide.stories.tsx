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

export const ARCHLayout001LayoutCompositionGuide: Story = {
  name: 'ARCH-Layout-001 Layout Composition Guide',
  render: () => (
    <DocViewer
      markdownPath="/docs/architecture/ARCH-layout-001-layout-composition-guide.md"
      fallback="Loading arch-layout-001 layout composition guide..."
    />
  )
};
