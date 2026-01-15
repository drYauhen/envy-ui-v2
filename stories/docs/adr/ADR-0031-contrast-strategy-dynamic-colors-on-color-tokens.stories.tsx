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

export const contrastStrategyDynamicColorsonColorTokens: Story = {
  name: 'ADR-0031 Contrast Strategy Dynamic Colors on Color Tokens',
  render: () => (
    <DocViewer
      markdownPath="/docs/adr/ADR-0031-contrast-strategy-dynamic-colors-on-color-tokens.md"
      status="Proposed"
      lastUpdated="2026-01-05"
      fallback="Loading ADR-0031 Contrast Strategy Dynamic Colors on Color Tokens..."
    />
  )
};
