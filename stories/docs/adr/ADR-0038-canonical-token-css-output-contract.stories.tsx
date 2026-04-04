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

export const canonicalTokenCSSOutputContract: Story = {
  name: 'ADR-0038 Canonical Token CSS Output Contract',
  render: () => (
    <DocViewer
      markdownPath="/docs/adr/ADR-0038-canonical-token-css-output-contract.md"
      status="Accepted"
      lastUpdated="2026-04-04"
      fallback="Loading ADR-0038 Canonical Token CSS Output Contract..."
    />
  )
};
