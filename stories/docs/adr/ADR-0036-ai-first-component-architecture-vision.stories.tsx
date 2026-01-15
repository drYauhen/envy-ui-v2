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

export const aiFirstComponentArchitectureVision: Story = {
  name: 'ADR-0036 Ai First Component Architecture Vision',
  render: () => (
    <DocViewer
      markdownPath="/docs/adr/ADR-0036-ai-first-component-architecture-vision.md"
      title="Ai First Component Architecture Vision"
      status="Proposed (Evolutionary)"
      date="2026-01-07"
      owner="Eugene Goncharov"
      assistance="AI-assisted drafting (human-reviewed)"
      fallback="Loading ADR-0036 Ai First Component Architecture Vision..."
    />
  )
};
