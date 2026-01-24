import type { Meta, StoryObj } from '@storybook/react';
import { InputClean, InputDateClean, InputGroupClean } from '../../../packages/tsx';
import { getSectionParameters } from '../../../.storybook/preview';

const meta: Meta = {
  title: 'TSX (Clean)/Components/Input',
  tags: ['autodocs'],
  parameters: {
    ...getSectionParameters('TSX (Clean)/Components/Input'),
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
      <InputClean placeholder="Enter text" aria-label="Default input" />
    </div>
  )
};

export const States: Story = {
  render: () => (
    <div style={containerStyle}>
      <div style={rowStyle}>
        <InputClean placeholder="Default" aria-label="Default state" />
        <InputClean placeholder="Disabled" aria-label="Disabled" disabled />
        <InputClean placeholder="Error" aria-label="Error" state="error" defaultValue="invalid" />
      </div>
    </div>
  )
};

export const Sizes: Story = {
  render: () => (
    <div style={containerStyle}>
      <InputClean placeholder="Small" aria-label="Small" size="sm" />
      <InputClean placeholder="Medium" aria-label="Medium" size="md" />
      <InputClean placeholder="Large" aria-label="Large" size="lg" />
    </div>
  )
};

export const Date: Story = {
  name: 'Date (native)',
  render: () => (
    <div style={containerStyle}>
      <InputDateClean aria-label="Date" style={{ width: '180px' }} />
    </div>
  )
};

export const Grouped: Story = {
  name: 'Input group',
  render: () => (
    <div style={containerStyle}>
      <InputGroupClean
        prefix={<span aria-hidden="true">@</span>}
        suffix={(
          <button
            type="button"
            aria-label="Clear"
            style={{ background: 'none', border: 'none', padding: 0, cursor: 'pointer', fontSize: '0.9rem' }}
          >
            x
          </button>
        )}
      >
        <InputClean placeholder="email@example.com" aria-label="Email" />
      </InputGroupClean>
    </div>
  )
};
