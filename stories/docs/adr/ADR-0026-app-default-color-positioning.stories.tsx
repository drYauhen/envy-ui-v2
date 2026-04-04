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

export const appDefaultColorPositioning: Story = {
  name: 'ADR-0026 App Default Color Positioning',
  render: () => (
    <DocViewer
      markdownPath="/docs/adr/ADR-0026-app-default-color-positioning.md"
      status="Superseded by [ADR-0037](ADR-0037-canonical-token-architecture-locked.md)"
      lastUpdated="2025-12-29"
      fallback="Loading ADR-0026 App Default Color Positioning..."
    />
  )
};
