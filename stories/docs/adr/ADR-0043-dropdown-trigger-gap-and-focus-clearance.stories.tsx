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

export const dropdownTriggerGapandFocusClearance: Story = {
  name: 'ADR-0043 Dropdown Trigger Gap and Focus Clearance',
  render: () => (
    <DocViewer
      markdownPath="/docs/adr/ADR-0043-dropdown-trigger-gap-and-focus-clearance.md"
      status="Accepted"
      lastUpdated="2026-02-18"
      fallback="Loading ADR-0043 Dropdown Trigger Gap and Focus Clearance..."
    />
  )
};
