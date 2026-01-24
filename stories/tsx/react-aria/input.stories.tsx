import type { Meta, StoryObj } from '@storybook/react';
import { Input, InputDate } from '../../../src/ui';
import { getSectionParameters } from '../../../.storybook/preview';

const meta: Meta = {
  title: 'TSX + React Aria/Components/Input',
  tags: ['autodocs'],
  parameters: {
    ...getSectionParameters('TSX + React Aria/Components/Input'),
    layout: 'padded'
  }
};

export default meta;

type Story = StoryObj;

const containerStyle = {
  display: 'flex',
  flexDirection: 'column' as const,
  gap: '1.5rem',
  maxWidth: '360px'
};

const rowStyle = {
  display: 'flex',
  flexDirection: 'column' as const,
  gap: '0.75rem'
};

export const Default: Story = {
  render: () => (
    <div style={containerStyle}>
      <Input placeholder="Enter text" aria-label="Default input" />
    </div>
  )
};

export const States: Story = {
  render: () => (
    <div style={containerStyle}>
      <div style={rowStyle}>
        <Input placeholder="Default" aria-label="Default state" />
        <Input placeholder="Disabled" aria-label="Disabled" isDisabled />
        <Input placeholder="Error" aria-label="Error" isInvalid defaultValue="invalid" />
      </div>
    </div>
  )
};

export const Sizes: Story = {
  render: () => (
    <div style={containerStyle}>
      <Input placeholder="Small" aria-label="Small" size="sm" />
      <Input placeholder="Medium" aria-label="Medium" size="md" />
      <Input placeholder="Large" aria-label="Large" size="lg" />
    </div>
  )
};

export const DateField: Story = {
  name: 'Date field (React Aria)',
  render: () => (
    <div style={containerStyle}>
      <InputDate aria-label="Date" style={{ width: '180px' }} />
    </div>
  )
};
