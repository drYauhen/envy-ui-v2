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

export const prefixUnificationEui: Story = {
  name: 'ADR-0016 Prefix Unification Eui',
  render: () => (
    <DocViewer
      markdownPath="/docs/adr/ADR-0016-prefix-unification-eui.md"
      title="Prefix Unification Eui"
      status="Accepted (Implemented)"
      date="2025-12-19"
      lastUpdated="2026-01-08"
      owner="Eugene Goncharov"
      assistance="AI-assisted drafting (human-reviewed)"
      fallback="Loading ADR-0016 Prefix Unification Eui..."
    />
  )
};
