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

export const AccessibilityArchitectureandDecisionFramework: Story = {
  name: 'ADR-0029 Accessibility Architecture and Decision Framework',
  render: () => (
    <AdrViewer
      adrNumber="0029"
      title="Accessibility Architecture and Decision Framework"
      status="Accepted"
      date="2025-12-31"
    />
  )
};
