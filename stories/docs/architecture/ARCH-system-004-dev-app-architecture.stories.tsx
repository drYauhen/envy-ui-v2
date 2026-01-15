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

export const ArchSystemNum004DevAppArchitecture: Story = {
  name: 'ARCH-SYSTEM-004 Dev App Architecture',
  render: () => (
    <DocViewer
      markdownPath="/docs/architecture/ARCH-system-004-dev-app-architecture.md"
      status="Draft"
      lastUpdated="2026-01-14"
      fallback="Loading ARCH-SYSTEM-004 Dev App Architecture..."
    />
  )
};
