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

export const ArchLayoutNum001LayoutCompositionGuide: Story = {
  name: 'ARCH-LAYOUT-001 Layout Composition Guide',
  render: () => (
    <DocViewer
      markdownPath="/docs/architecture/ARCH-layout-001-layout-composition-guide.md"
      status="Guide (Advisory)"
      lastUpdated="2026-01-14"
      fallback="Loading ARCH-LAYOUT-001 Layout Composition Guide..."
    />
  )
};
