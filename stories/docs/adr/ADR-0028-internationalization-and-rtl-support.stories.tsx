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

export const internationalizationAndRtlSupport: Story = {
  name: 'ADR-0028 Internationalization And Rtl Support',
  render: () => (
    <DocViewer
      markdownPath="/docs/adr/ADR-0028-internationalization-and-rtl-support.md"
      title="Internationalization And Rtl Support"
      status="Proposed"
      date="2025-01-01"
      owner="Eugene Goncharov"
      assistance="AI-assisted drafting (human-reviewed)"
      fallback="Loading ADR-0028 Internationalization And Rtl Support..."
    />
  )
};
