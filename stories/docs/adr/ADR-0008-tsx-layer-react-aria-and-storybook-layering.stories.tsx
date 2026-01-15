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

export const tSXLayerReactARIAandStorybookLayering: Story = {
  name: 'ADR-0008 TSX Layer React ARIA and Storybook Layering',
  render: () => (
    <DocViewer
      markdownPath="/docs/adr/ADR-0008-tsx-layer-react-aria-and-storybook-layering.md"
      status="Accepted (Implemented)"
      lastUpdated="2026-01-08"
      fallback="Loading ADR-0008 TSX Layer React ARIA and Storybook Layering..."
    />
  )
};
