import type { Meta, StoryObj } from '@storybook/react';
import { Input, InputGroup } from '../../../src/ui';
import { getSectionParameters } from '../../../.storybook/preview';

const meta: Meta = {
  title: 'TSX + React Aria/Components/InputGroup',
  tags: ['autodocs'],
  parameters: {
    ...getSectionParameters('TSX + React Aria/Components/InputGroup'),
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

export const Overview: Story = {
  render: () => (
    <div style={containerStyle}>
      <InputGroup
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
        <Input placeholder="email@example.com" aria-label="Email" />
      </InputGroup>
    </div>
  )
};

export const Sizes: Story = {
  render: () => (
    <div style={containerStyle}>
      <InputGroup size="sm" prefix={<span aria-hidden="true">@</span>}>
        <Input placeholder="Small" aria-label="Small" />
      </InputGroup>
      <InputGroup size="md" prefix={<span aria-hidden="true">@</span>}>
        <Input placeholder="Medium" aria-label="Medium" />
      </InputGroup>
      <InputGroup size="lg" prefix={<span aria-hidden="true">@</span>}>
        <Input placeholder="Large" aria-label="Large" />
      </InputGroup>
    </div>
  )
};
