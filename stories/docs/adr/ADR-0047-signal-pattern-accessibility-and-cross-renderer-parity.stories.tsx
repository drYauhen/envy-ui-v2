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

export const signalPatternAccessibilityandCrossRendererParity: Story = {
  name: 'ADR-0047 Signal Pattern Accessibility and Cross Renderer Parity',
  render: () => (
    <DocViewer
      markdownPath="/docs/adr/ADR-0047-signal-pattern-accessibility-and-cross-renderer-parity.md"
      status="Accepted (Implemented v1)"
      lastUpdated="2026-04-06"
      fallback="Loading ADR-0047 Signal Pattern Accessibility and Cross Renderer Parity..."
    />
  )
};
