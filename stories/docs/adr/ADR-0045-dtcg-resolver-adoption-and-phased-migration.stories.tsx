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

export const dtcgResolverAdoptionandPhasedMigration: Story = {
  name: 'ADR-0045 DTCG Resolver Adoption and Phased Migration',
  render: () => (
    <DocViewer
      markdownPath="/docs/adr/ADR-0045-dtcg-resolver-adoption-and-phased-migration.md"
      status="Accepted (Implemented)"
      lastUpdated="2026-04-04"
      fallback="Loading ADR-0045 DTCG Resolver Adoption and Phased Migration..."
    />
  )
};
