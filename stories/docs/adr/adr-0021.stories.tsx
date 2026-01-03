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

export const WebComponentsasFrameworkAgnosticImplementationLayer: Story = {
  name: 'ADR-0021 Web Components as Framework-Agnostic Implementation Layer',
  render: () => (
    <AdrViewer
      adrNumber="0021"
      title="Web Components as Framework-Agnostic Implementation Layer"
      status="Exploratory"
      date="2025-01-XX"
    />
  )
};
