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

export const LayoutCompositionGuide: Story = {
  name: 'Layout Composition Guide',
  render: () => (
    <DocViewer
      markdownPath="/docs/architecture/layout-composition-guide.md"
      fallback="Loading layout composition guide..."
      badges={[{ label: 'In progress', tone: 'warning' }]}
    />
  )
};
