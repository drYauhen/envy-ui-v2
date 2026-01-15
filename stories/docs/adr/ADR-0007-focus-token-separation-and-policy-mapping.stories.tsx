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

export const focusTokenSeparationandPolicyMapping: Story = {
  name: 'ADR-0007 Focus Token Separation and Policy Mapping',
  render: () => (
    <DocViewer
      markdownPath="/docs/adr/ADR-0007-focus-token-separation-and-policy-mapping.md"
      status="Accepted (Partially Implemented)"
      lastUpdated="2026-01-08"
      fallback="Loading ADR-0007 Focus Token Separation and Policy Mapping..."
    />
  )
};
