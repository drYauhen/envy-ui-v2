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

export const contrastStrategyDynamicColorsOnColorTokens: Story = {
  name: 'ADR-0031 Contrast Strategy Dynamic Colors On Color Tokens',
  render: () => (
    <DocViewer
      markdownPath="/docs/adr/ADR-0031-contrast-strategy-dynamic-colors-on-color-tokens.md"
      title="Contrast Strategy Dynamic Colors On Color Tokens"
      status="Proposed"
      date="2026-01-05"
      owner="Eugene Goncharov"
      assistance="AI-assisted drafting (human-reviewed)"
      fallback="Loading ADR-0031 Contrast Strategy Dynamic Colors On Color Tokens..."
    />
  )
};
