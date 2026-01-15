import type { Meta, StoryObj } from '@storybook/react';
import { DocViewer } from '../../viewers/docs/DocViewer';
import { getSectionParameters } from '../../../.storybook/preview';

type Story = StoryObj;

const meta: Meta = {
  title: 'Docs/ADR',
  parameters: {
    ...getSectionParameters('Docs/ADR'),
    layout: 'fullscreen',
    controls: { hidden: true },
    actions: { hidden: true },
    interactions: { hidden: true },
    a11y: { hidden: true }
  }
};

export default meta;

export const accessibilityStrategyThemeSwitchingAcrossContexts: Story = {
  name: 'ADR-0033 Accessibility Strategy Theme Switching Across Contexts',
  render: () => (
    <DocViewer
      markdownPath="/docs/adr/ADR-0033-accessibility-strategy-theme-switching-across-contexts.md"
      status="Proposed"
      lastUpdated="2026-01-05"
      fallback="Loading ADR-0033 Accessibility Strategy Theme Switching Across Contexts..."
    />
  )
};
