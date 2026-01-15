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

export const ArchAccessibilityNum001AccessibilityReference: Story = {
  name: 'ARCH-ACCESSIBILITY-001 Accessibility Reference',
  render: () => (
    <DocViewer
      markdownPath="/docs/architecture/ARCH-accessibility-001-accessibility-reference.md"
      title="Accessibility Reference"
      status="Active"
      date="2026-01-14"
      lastUpdated="2026-01-14"
      fallback="Loading ARCH-ACCESSIBILITY-001 Accessibility Reference..."
    />
  )
};
