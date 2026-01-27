import type { Meta, StoryObj } from '@storybook/react';
import { Switch } from '../../../src/ui';
import { getSectionParameters } from '../../../.storybook/preview';

const meta: Meta = {
  title: 'TSX + React Aria/Components/Switch',
  tags: ['autodocs'],
  parameters: {
    ...getSectionParameters('TSX + React Aria/Components/Switch'),
    layout: 'padded'
  }
};

export default meta;

type Story = StoryObj;

const stackStyle = {
  display: 'flex',
  flexDirection: 'column' as const,
  gap: '1.5rem'
};

const rowStyle = {
  display: 'flex',
  flexWrap: 'wrap' as const,
  gap: '1rem',
  alignItems: 'center' as const
};

export const States: Story = {
  render: () => (
    <div style={stackStyle}>
      <div style={rowStyle}>
        <Switch>Off</Switch>
        <Switch defaultSelected>On</Switch>
        <Switch isDisabled>Disabled</Switch>
        <Switch defaultSelected isDisabled>
          Disabled on
        </Switch>
      </div>
    </div>
  )
};

export const Sizes: Story = {
  render: () => (
    <div style={stackStyle}>
      <div style={rowStyle}>
        <Switch size="sm">Small</Switch>
        <Switch size="md" defaultSelected>
          Medium
        </Switch>
        <Switch size="lg" defaultSelected>
          Large
        </Switch>
      </div>
    </div>
  )
};
