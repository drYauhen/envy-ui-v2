import type { Meta, StoryObj } from '@storybook/react';
import { AdrViewer } from '../../viewers/docs/AdrViewer';
import { getSectionParameters } from '../../../.storybook/preview';

type Story = StoryObj;

const meta: Meta = {
  title: 'Docs/ADR',
  parameters: {
    // Apply section-specific parameters automatically
    ...getSectionParameters('Docs/ADR'), layout: 'fullscreen' }
};

export default meta;

export const Internationalizationi18nandRTLSupportArchitecture: Story = {
  name: 'ADR-0028 Internationalization (i18n) and RTL Support Architecture',
  render: () => (
    <AdrViewer
      adrNumber="0028"
      title="Internationalization (i18n) and RTL Support Architecture"
      status="Proposed"
      date="2025-01-01"
    />
  )
};
