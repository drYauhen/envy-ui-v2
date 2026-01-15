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

export const contextAwareUIComponentsandProjectionModel: Story = {
  name: 'ADR-0004 Context Aware UI Components and Projection Model',
  render: () => (
    <DocViewer
      markdownPath="/docs/adr/ADR-0004-context-aware-ui-components-and-projection-model.md"
      status="Accepted (Implemented)"
      lastUpdated="2026-01-08"
      fallback="Loading ADR-0004 Context Aware UI Components and Projection Model..."
    />
  )
};
