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

export const ArchThemeNum001HeroSectionThemeArchitecture: Story = {
  name: 'ARCH-THEME-001 Hero Section Theme Architecture',
  render: () => (
    <DocViewer
      markdownPath="/docs/architecture/ARCH-theme-001-hero-section-theme-architecture.md"
      title="Hero Section Theme Architecture"
      status="Active"
      date="2026-01-14"
      lastUpdated="2026-01-14"
      fallback="Loading ARCH-THEME-001 Hero Section Theme Architecture..."
    />
  )
};
