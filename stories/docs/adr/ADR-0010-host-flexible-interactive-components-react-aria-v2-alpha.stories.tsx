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

export const hostFlexibleInteractiveComponentsReactAriaV2Alpha: Story = {
  name: 'ADR-0010 Host Flexible Interactive Components React Aria V2 Alpha',
  render: () => (
    <DocViewer
      markdownPath="/docs/adr/ADR-0010-host-flexible-interactive-components-react-aria-v2-alpha.md"
      title="Host Flexible Interactive Components React Aria V2 Alpha"
      status="Accepted (Implemented)"
      date="2025-12-16"
      lastUpdated="2026-01-08"
      owner="Eugene Goncharov"
      assistance="AI-assisted drafting (human-reviewed)"
      fallback="Loading ADR-0010 Host Flexible Interactive Components React Aria V2 Alpha..."
    />
  )
};
