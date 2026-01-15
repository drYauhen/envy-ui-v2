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

export const hostFlexibleInteractiveComponentsReactARIAV2Alpha: Story = {
  name: 'ADR-0010 Host Flexible Interactive Components React ARIA V2 Alpha',
  render: () => (
    <DocViewer
      markdownPath="/docs/adr/ADR-0010-host-flexible-interactive-components-react-aria-v2-alpha.md"
      status="Accepted (Implemented)"
      lastUpdated="2026-01-08"
      fallback="Loading ADR-0010 Host Flexible Interactive Components React ARIA V2 Alpha..."
    />
  )
};
