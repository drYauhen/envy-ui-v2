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

export const contextAwareUiComponentsAndProjectionModel: Story = {
  name: 'ADR-0004 Context Aware Ui Components And Projection Model',
  render: () => (
    <DocViewer
      markdownPath="/docs/adr/ADR-0004-context-aware-ui-components-and-projection-model.md"
      title="Context Aware Ui Components And Projection Model"
      status="Accepted (Implemented)"
      date="2025-12-15"
      lastUpdated="2026-01-08"
      owner="Eugene Goncharov"
      assistance="AI-assisted drafting (human-reviewed)"
      fallback="Loading ADR-0004 Context Aware Ui Components And Projection Model..."
    />
  )
};
