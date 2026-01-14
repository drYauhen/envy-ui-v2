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

export const ARCHTheme001HeroSectionThemeArchitecture: Story = {
  name: 'ARCH-Theme-001 Hero Section Theme Architecture',
  render: () => (
    <DocViewer
      markdownPath="/docs/architecture/ARCH-theme-001-hero-section-theme-architecture.md"
      fallback="Loading arch-theme-001 hero section theme architecture..."
    />
  )
};
