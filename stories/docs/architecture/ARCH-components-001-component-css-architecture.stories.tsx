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

export const ArchComponentsNum001ComponentCssArchitecture: Story = {
  name: 'ARCH-COMPONENTS-001 Component Css Architecture',
  render: () => (
    <DocViewer
      markdownPath="/docs/architecture/ARCH-components-001-component-css-architecture.md"
      title="Component Css Architecture"
      status="Mandatory"
      date="2026-01-14"
      lastUpdated="2026-01-14"
      fallback="Loading ARCH-COMPONENTS-001 Component Css Architecture..."
    />
  )
};
