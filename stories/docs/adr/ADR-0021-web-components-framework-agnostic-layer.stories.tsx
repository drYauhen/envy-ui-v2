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

export const webComponentsFrameworkAgnosticLayer: Story = {
  name: 'ADR-0021 Web Components Framework Agnostic Layer',
  render: () => (
    <DocViewer
      markdownPath="/docs/adr/ADR-0021-web-components-framework-agnostic-layer.md"
      status="Exploratory (Proof-of-Concept Implemented)"
      lastUpdated="2026-01-08"
      fallback="Loading ADR-0021 Web Components Framework Agnostic Layer..."
    />
  )
};
