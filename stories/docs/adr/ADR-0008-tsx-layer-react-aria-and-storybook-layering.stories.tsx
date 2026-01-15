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

export const tsxLayerReactAriaAndStorybookLayering: Story = {
  name: 'ADR-0008 Tsx Layer React Aria And Storybook Layering',
  render: () => (
    <DocViewer
      markdownPath="/docs/adr/ADR-0008-tsx-layer-react-aria-and-storybook-layering.md"
      title="Tsx Layer React Aria And Storybook Layering"
      status="Accepted (Implemented)"
      date="2025-12-16"
      lastUpdated="2026-01-08"
      owner="Eugene Goncharov"
      assistance="AI-assisted drafting (human-reviewed)"
      fallback="Loading ADR-0008 Tsx Layer React Aria And Storybook Layering..."
    />
  )
};
