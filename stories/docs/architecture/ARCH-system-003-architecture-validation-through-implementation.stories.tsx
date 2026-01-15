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

export const ArchSystem003ArchitectureValidationThroughImplementation: Story = {
  name: 'ARCH-SYSTEM-003 Architecture Validation Through Implementation',
  render: () => (
    <DocViewer
      markdownPath="/docs/architecture/ARCH-system-003-architecture-validation-through-implementation.md"
      title="Architecture Validation Through Implementation"
      status="Mandatory"
      date="2026-01-09"
      lastUpdated="2026-01-14"
      owner="Eugene Goncharov"
      fallback="Loading ARCH-SYSTEM-003 Architecture Validation Through Implementation..."
    />
  )
};
