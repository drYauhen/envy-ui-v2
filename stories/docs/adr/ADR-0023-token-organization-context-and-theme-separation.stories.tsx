import type { Meta, StoryObj } from '@storybook/react';
import { AdrViewer } from '../../viewers/docs/AdrViewer';

type Story = StoryObj;

const meta: Meta = {
  title: 'Docs/ADR',
  parameters: { layout: 'fullscreen' }
};

export default meta;

export const TokenOrganizationContextandThemeSeparation: Story = {
  name: 'ADR-0023 Token Organization - Context and Theme Separation',
  render: () => (
    <AdrViewer
      adrNumber="0023"
      title="Token Organization - Context and Theme Separation"
      status="Superseded by [ADR-0037](./ADR-0037-canonical-token-architecture-locked.md)"
      date="2025-12-26"
    />
  )
};
