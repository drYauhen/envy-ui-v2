import type { Meta, StoryObj } from '@storybook/react';
import { AdrViewer } from '../../viewers/docs/AdrViewer';

type Story = StoryObj;

const meta: Meta = {
  title: 'Docs/ADR/ADR-0018',
  parameters: { layout: 'fullscreen' },
  tags: ['autodocs']
};

export default meta;

export const TypographyUnitsArchitectureREMEMandPX: Story = {
  name: 'Typography Units Architecture - REM, EM, and PX',
  render: () => (
    <AdrViewer
      adrNumber="0018"
      title="Typography Units Architecture - REM, EM, and PX"
      status="Accepted"
      date="2025-01-21"
    />
  )
};
