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

export const interactiveComponentsEvolutionLayeredArchitectureandContexts: Story = {
  name: 'ADR-0012 Interactive Components Evolution Layered Architecture and Contexts',
  render: () => (
    <DocViewer
      markdownPath="/docs/adr/ADR-0012-interactive-components-evolution-layered-architecture-and-contexts.md"
      status="Proposed (Exploratory)"
      lastUpdated="2026-01-08"
      fallback="Loading ADR-0012 Interactive Components Evolution Layered Architecture and Contexts..."
    />
  )
};
