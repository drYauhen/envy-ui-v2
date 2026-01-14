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

export const ARCHTheme002ThemeStructureAnalysisCompositionVsSemanticBreakdown: Story = {
  name: 'ARCH-Theme-002 Theme Structure Analysis Composition Vs Semantic Breakdown',
  render: () => (
    <DocViewer
      markdownPath="/docs/architecture/ARCH-theme-002-theme-structure-analysis-composition-vs-semantic-breakdown.md"
      fallback="Loading arch-theme-002 theme structure analysis composition vs semantic breakdown..."
    />
  )
};
