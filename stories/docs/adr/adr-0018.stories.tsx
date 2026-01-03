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

export const TypographyUnitsArchitectureREMEMandPX: Story = {
  name: 'ADR-0018 Typography Units Architecture - REM, EM, and PX',
  render: () => (
    <AdrViewer
      adrNumber="0018"
      title="Typography Units Architecture - REM, EM, and PX"
      status="Accepted"
      date="2025-01-21"
    />
  )
};
