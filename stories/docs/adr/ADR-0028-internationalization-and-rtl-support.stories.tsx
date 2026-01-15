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

export const internationalizationandRtlSupport: Story = {
  name: 'ADR-0028 Internationalization and Rtl Support',
  render: () => (
    <DocViewer
      markdownPath="/docs/adr/ADR-0028-internationalization-and-rtl-support.md"
      status="Proposed"
      lastUpdated="2025-01-01"
      fallback="Loading ADR-0028 Internationalization and Rtl Support..."
    />
  )
};
