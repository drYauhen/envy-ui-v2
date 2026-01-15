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

export const currentArchitecturalIntentExploratory: Story = {
  name: 'ADR-0013 Current Architectural Intent Exploratory',
  render: () => (
    <DocViewer
      markdownPath="/docs/adr/ADR-0013-current-architectural-intent-exploratory.md"
      status="Proposed (Exploratory)"
      lastUpdated="2025-12-16"
      fallback="Loading ADR-0013 Current Architectural Intent Exploratory..."
    />
  )
};
