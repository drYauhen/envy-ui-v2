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

export const layeredTokenArchitectureContextsAndThemes: Story = {
  name: 'ADR-0017 Layered Token Architecture Contexts And Themes',
  render: () => (
    <DocViewer
      markdownPath="/docs/adr/ADR-0017-layered-token-architecture-contexts-and-themes.md"
      title="Layered Token Architecture Contexts And Themes"
      status="Superseded by [ADR-0037](./ADR-0037-canonical-token-architecture-locked.md)"
      date="2025-12-20"
      lastUpdated="2026-01-10"
      owner="Eugene Goncharov"
      assistance="AI-assisted drafting (human-reviewed)"
      fallback="Loading ADR-0017 Layered Token Architecture Contexts And Themes..."
    />
  )
};
