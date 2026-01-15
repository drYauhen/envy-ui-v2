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

export const ArchSystemNum005StorybookStoryStructureStandard: Story = {
  name: 'ARCH-SYSTEM-005 Storybook Story Structure Standard',
  render: () => (
    <DocViewer
      markdownPath="/docs/architecture/ARCH-system-005-storybook-story-structure-standard.md"
      title="Storybook Story Structure Standard"
      status="Active"
      date="2026-01-14"
      lastUpdated="2026-01-14"
      fallback="Loading ARCH-SYSTEM-005 Storybook Story Structure Standard..."
    />
  )
};
