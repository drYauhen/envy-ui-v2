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

export const dtcgSchemaResolutionandTokenArchitecture: Story = {
  name: 'ADR-0041 Dtcg Schema Resolution and Token Architecture',
  render: () => (
    <DocViewer
      markdownPath="/docs/adr/ADR-0041-dtcg-schema-resolution-and-token-architecture.md"
      status="Accepted"
      lastUpdated="2026-01-07"
      fallback="Loading ADR-0041 Dtcg Schema Resolution and Token Architecture..."
    />
  )
};
