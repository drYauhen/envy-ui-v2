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

export const ARCHSystem001ArchitectureDocumentation: Story = {
  name: 'ARCH-System-001 Architecture Documentation',
  render: () => (
    <DocViewer
      markdownPath="/docs/architecture/ARCH-system-001-architecture-documentation.md"
      fallback="Loading arch-system-001 architecture documentation..."
    />
  )
};
