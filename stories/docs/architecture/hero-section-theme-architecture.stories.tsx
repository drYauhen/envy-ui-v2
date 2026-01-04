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

export const HeroSectionThemeArchitecture: Story = {
  name: 'Hero Section Theme Architecture',
  render: () => (
    <DocViewer
      markdownPath="/docs/architecture/hero-section-theme-architecture.md"
      fallback="Loading hero section theme architecture..."
    />
  )
};
