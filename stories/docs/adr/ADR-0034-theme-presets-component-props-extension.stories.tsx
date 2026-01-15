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

export const themePresetsComponentPropsExtension: Story = {
  name: 'ADR-0034 Theme Presets Component Props Extension',
  render: () => (
    <DocViewer
      markdownPath="/docs/adr/ADR-0034-theme-presets-component-props-extension.md"
      status="Proposed"
      lastUpdated="2026-01-06"
      fallback="Loading ADR-0034 Theme Presets Component Props Extension..."
    />
  )
};
