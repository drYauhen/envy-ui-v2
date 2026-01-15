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

export const cssNamingConventionsClassNamesVsDataAttributes: Story = {
  name: 'ADR-0035 Css Naming Conventions Class Names Vs Data Attributes',
  render: () => (
    <DocViewer
      markdownPath="/docs/adr/ADR-0035-css-naming-conventions-class-names-vs-data-attributes.md"
      title="Css Naming Conventions Class Names Vs Data Attributes"
      status="Accepted"
      date="2026-01-07"
      owner="Eugene Goncharov"
      assistance="AI-assisted drafting (human-reviewed)"
      fallback="Loading ADR-0035 Css Naming Conventions Class Names Vs Data Attributes..."
    />
  )
};
