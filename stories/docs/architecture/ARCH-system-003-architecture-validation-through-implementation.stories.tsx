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

export const ARCHSystem003ArchitectureValidationThroughImplementation: Story = {
  name: 'ARCH-System-003 Architecture Validation Through Implementation',
  render: () => (
    <DocViewer
      markdownPath="/docs/architecture/ARCH-system-003-architecture-validation-through-implementation.md"
      fallback="Loading arch-system-003 architecture validation through implementation..."
    />
  )
};
