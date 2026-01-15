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

export const tokenOrganizationContextandThemeSeparation: Story = {
  name: 'ADR-0023 Token Organization Context and Theme Separation',
  render: () => (
    <DocViewer
      markdownPath="/docs/adr/ADR-0023-token-organization-context-and-theme-separation.md"
      status="Superseded by [ADR-0037](./ADR-0037-canonical-token-architecture-locked.md)"
      lastUpdated="2026-01-10"
      fallback="Loading ADR-0023 Token Organization Context and Theme Separation..."
    />
  )
};
