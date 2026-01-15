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

export const figmaFilesStructureandOrganization: Story = {
  name: 'ADR-0027 Figma Files Structure and Organization',
  render: () => (
    <DocViewer
      markdownPath="/docs/adr/ADR-0027-figma-files-structure-and-organization.md"
      status="Accepted"
      lastUpdated="2025-12-31"
      fallback="Loading ADR-0027 Figma Files Structure and Organization..."
    />
  )
};
