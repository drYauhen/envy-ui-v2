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

export const TokenOrganizationContextandThemeSeparation: Story = {
  name: 'ADR-0023 Token Organization - Context and Theme Separation',
  render: () => (
    <AdrViewer
      adrNumber="0023"
      title="Token Organization - Context and Theme Separation"
      status="Accepted"
      date="2025-12-26"
    />
  )
};
