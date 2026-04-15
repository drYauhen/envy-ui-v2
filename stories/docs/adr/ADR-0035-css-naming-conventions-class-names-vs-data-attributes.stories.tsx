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

export const cssNamingConventionsClassNamesvsDataAttributes: Story = {
  name: 'ADR-0035 CSS Naming Conventions Class Names vs Data Attributes',
  render: () => (
    <DocViewer
      markdownPath="/docs/adr/ADR-0035-css-naming-conventions-class-names-vs-data-attributes.md"
      status="Accepted"
      lastUpdated="2026-01-07"
      fallback="Loading ADR-0035 CSS Naming Conventions Class Names vs Data Attributes..."
    />
  )
};
