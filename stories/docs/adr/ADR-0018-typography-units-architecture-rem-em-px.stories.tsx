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

export const typographyUnitsArchitectureRemEmPx: Story = {
  name: 'ADR-0018 Typography Units Architecture Rem Em Px',
  render: () => (
    <DocViewer
      markdownPath="/docs/adr/ADR-0018-typography-units-architecture-rem-em-px.md"
      status="Accepted (Partially Implemented)"
      lastUpdated="2026-01-08"
      fallback="Loading ADR-0018 Typography Units Architecture Rem Em Px..."
    />
  )
};
