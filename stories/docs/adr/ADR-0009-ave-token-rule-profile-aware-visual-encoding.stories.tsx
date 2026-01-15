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

export const aveTokenRuleProfileAwareVisualEncoding: Story = {
  name: 'ADR-0009 Ave Token Rule Profile Aware Visual Encoding',
  render: () => (
    <DocViewer
      markdownPath="/docs/adr/ADR-0009-ave-token-rule-profile-aware-visual-encoding.md"
      status="Accepted (Architectural Rule)"
      lastUpdated="2026-01-08"
      fallback="Loading ADR-0009 Ave Token Rule Profile Aware Visual Encoding..."
    />
  )
};
