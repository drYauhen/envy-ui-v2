import type { Meta, StoryObj } from '@storybook/react';
import { AdrViewer } from '../../viewers/docs/AdrViewer';
import { getSectionParameters } from '../../../.storybook/preview';

type Story = StoryObj;

const meta: Meta = {
  title: 'Docs/ADR',
  parameters: {
    // Apply section-specific parameters automatically
    ...getSectionParameters('Docs/ADR'), layout: 'fullscreen' }
};

export default meta;

export const AccessibilityStrategyforThemeSwitchingAcrossContexts: Story = {
  name: 'ADR-0033 Accessibility Strategy for Theme Switching Across Contexts',
  render: () => (
    <AdrViewer
      adrNumber="0033"
      title="Accessibility Strategy for Theme Switching Across Contexts"
      status="Proposed"
      date="2026-01-05"
    />
  )
};
