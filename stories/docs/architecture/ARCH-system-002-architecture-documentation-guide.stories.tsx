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

export const ARCHSystem002ArchitectureDocumentationGuide: Story = {
  name: 'ARCH-System-002 Architecture Documentation Guide',
  render: () => (
    <DocViewer
      markdownPath="/docs/architecture/ARCH-system-002-architecture-documentation-guide.md"
      fallback="Loading arch-system-002 architecture documentation guide..."
    />
  )
};
