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

export const unknown: Story = {
  name: 'ADR-0000 Unknown',
  render: () => (
    <DocViewer
      markdownPath="/docs/adr/ADR-TEMPLATE.md"
      title="Unknown"
      status="<Proposed | Accepted | Superseded>"
      date="2025-01-01"
      owner="Eugene Goncharov"
      assistance="AI-assisted drafting (human-reviewed)"
      fallback="Loading ADR-0000 Unknown..."
    />
  )
};
