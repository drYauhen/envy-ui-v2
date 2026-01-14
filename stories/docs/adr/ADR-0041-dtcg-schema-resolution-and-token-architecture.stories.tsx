import type { Meta, StoryObj } from '@storybook/react';
import { AdrViewer } from '../../viewers/docs/AdrViewer';

type Story = StoryObj;

const meta: Meta = {
  title: 'Docs/ADR',
  parameters: { layout: 'fullscreen' }
};

export default meta;

export const DTCGSchemaResolutionAndTokenArchitecture: Story = {
  name: 'ADR-0041 DTCG Schema Resolution and Token Architecture Improvements',
  render: () => (
    <AdrViewer
      adrNumber="0041"
      title="DTCG Schema Resolution and Token Architecture Improvements"
      status="Accepted"
      date="2026-01-07"
    />
  )
};
