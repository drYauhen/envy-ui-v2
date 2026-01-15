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

export const ArchSystemNum001ArchitectureDocumentation: Story = {
  name: 'ARCH-SYSTEM-001 Architecture Documentation',
  render: () => (
    <DocViewer
      markdownPath="/docs/architecture/ARCH-system-001-architecture-documentation.md"
      title="Architecture Documentation"
      status="Active"
      date="2026-01-14"
      lastUpdated="2026-01-14"
      fallback="Loading ARCH-SYSTEM-001 Architecture Documentation..."
    />
  )
};
