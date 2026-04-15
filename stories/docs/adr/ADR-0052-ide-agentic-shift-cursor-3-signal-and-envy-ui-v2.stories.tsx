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

export const ideAgenticShiftCursor3SignalandEnvyUIV2: Story = {
  name: 'ADR-0052 IDE Agentic Shift Cursor 3 Signal and Envy UI V2',
  render: () => (
    <DocViewer
      markdownPath="/docs/adr/ADR-0052-ide-agentic-shift-cursor-3-signal-and-envy-ui-v2.md"
      status="Proposed (Reflective Benchmark)"
      lastUpdated="2026-04-15"
      fallback="Loading ADR-0052 IDE Agentic Shift Cursor 3 Signal and Envy UI V2..."
    />
  )
};
