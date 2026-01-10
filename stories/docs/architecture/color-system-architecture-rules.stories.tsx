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

export const ColorSystemArchitectureRules: Story = {
  name: 'Color System Architecture Rules',
  render: () => (
    <DocViewer
      markdownPath="/docs/architecture/color-system-architecture.md"
      fallback="Loading color system architecture rules..."
    />
  )
};