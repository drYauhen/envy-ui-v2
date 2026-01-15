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

export const ArchSystemNum006SystemPrefix: Story = {
  name: 'ARCH-SYSTEM-006 System Prefix',
  render: () => (
    <DocViewer
      markdownPath="/docs/architecture/ARCH-system-006-system-prefix.md"
      title="System Prefix"
      status="Active"
      date="2026-01-14"
      lastUpdated="2026-01-14"
      fallback="Loading ARCH-SYSTEM-006 System Prefix..."
    />
  )
};
