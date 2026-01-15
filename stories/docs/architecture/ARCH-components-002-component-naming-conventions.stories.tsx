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

export const ArchComponents002ComponentNamingConventions: Story = {
  name: 'ARCH-COMPONENTS-002 Component Naming Conventions',
  render: () => (
    <DocViewer
      markdownPath="/docs/architecture/ARCH-components-002-component-naming-conventions.md"
      title="Component Naming Conventions"
      status="Guide (Advisory)"
      date="2025-01-21"
      lastUpdated="2026-01-14"
      fallback="Loading ARCH-COMPONENTS-002 Component Naming Conventions..."
    />
  )
};
