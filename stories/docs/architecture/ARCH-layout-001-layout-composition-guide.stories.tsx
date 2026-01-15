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

export const ArchLayout001LayoutCompositionGuide: Story = {
  name: 'ARCH-LAYOUT-001 Layout Composition Guide',
  render: () => (
    <DocViewer
      markdownPath="/docs/architecture/ARCH-layout-001-layout-composition-guide.md"
      title="Layout Composition Guide"
      status="Guide (Advisory)"
      date="2026-01-06"
      lastUpdated="2026-01-14"
      fallback="Loading ARCH-LAYOUT-001 Layout Composition Guide..."
    />
  )
};
