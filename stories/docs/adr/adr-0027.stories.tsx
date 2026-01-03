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

export const FigmaFilesStructureandOrganization: Story = {
  name: 'ADR-0027 Figma Files Structure and Organization',
  render: () => (
    <AdrViewer
      adrNumber="0027"
      title="Figma Files Structure and Organization"
      status="Accepted"
      date="2025-12-31"
    />
  )
};
