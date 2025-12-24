import type { Meta, StoryObj } from '@storybook/react';
import { AdrViewer } from '../../viewers/docs/AdrViewer';

type Story = StoryObj;

const meta: Meta = {
  title: 'Docs/ADR/ADR-0014',
  parameters: { layout: 'fullscreen' },
  tags: ['autodocs']
};

export default meta;

export const ColorModelTonalScalesandContextualArchitecture: Story = {
  name: 'Color Model, Tonal Scales, and Contextual Architecture',
  render: () => (
    <AdrViewer
      adrNumber="0014"
      title="Color Model, Tonal Scales, and Contextual Architecture"
      status="Unknown"
      date="Unknown"
    />
  )
};
