import type { Meta, StoryObj } from '@storybook/react';
import { DocViewer } from '../../viewers/docs/DocViewer';
import { getSectionParameters } from '../../../.storybook/preview';

type Story = StoryObj;

const meta: Meta = {
  title: 'Docs/Architecture',
  parameters: {
    ...getSectionParameters('Docs/Architecture'),
    layout: 'fullscreen',
    controls: { hidden: true },
    actions: { hidden: true },
    interactions: { hidden: true },
    a11y: { hidden: true }
  }
};

export default meta;

export const ArchTokensNum005SignalPatternAuthoringRules: Story = {
  name: 'ARCH-TOKENS-005 Signal Pattern Authoring Rules',
  render: () => (
    <DocViewer
      markdownPath="/docs/architecture/ARCH-tokens-005-signal-pattern-authoring-rules.md"
      status="Active"
      lastUpdated="2026-04-06"
      fallback="Loading ARCH-TOKENS-005 Signal Pattern Authoring Rules..."
    />
  )
};
