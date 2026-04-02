import type { Meta, StoryObj } from '@storybook/react';
import { DocViewer } from '../../viewers/docs/DocViewer';
import { getSectionParameters } from '../../../.storybook/preview';

type Story = StoryObj;

const meta: Meta = {
  title: 'Docs/Architecture',
  parameters: {
    ...getSectionParameters('Docs/Architecture'),
    layout: 'fullscreen',
    controls: { hidden: true },
    actions: { hidden: true },
    interactions: { hidden: true },
    a11y: { hidden: true }
  }
};

export default meta;

export const ArchI18nNum001TranslationArchitecture: Story = {
  name: 'ARCH-I18N-001 Translation Architecture',
  render: () => (
    <DocViewer
      markdownPath="/docs/architecture/ARCH-i18n-001-translation-architecture.md"
      status="Proposed"
      lastUpdated="2026-01-25"
      fallback="Loading ARCH-I18N-001 Translation Architecture..."
    />
  )
};
