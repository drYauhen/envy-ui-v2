import type { Meta, StoryObj } from '@storybook/react';
import { AdrViewer } from '../../viewers/docs/AdrViewer';
import { getSectionParameters } from '../../../.storybook/preview';

type Story = StoryObj;

const meta: Meta = {
  title: 'Docs/ADR',
  parameters: {
    // Apply section-specific parameters automatically
    ...getSectionParameters('Docs/ADR'),
    layout: 'fullscreen'
  }
};

export default meta;

export const ReactAriaasHeadlessAccessibilityFoundation: Story = {
  name: 'ADR-0001 React Aria as Headless Accessibility Foundation',
  render: () => (
    <AdrViewer
      adrNumber="0001"
      title="React Aria as Headless Accessibility Foundation"
      status="Accepted"
      date="2025-12-15"
    />
  )
};
