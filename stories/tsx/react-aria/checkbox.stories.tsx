import type { Meta, StoryObj } from '@storybook/react';
import { Checkbox } from '../../../src/ui';
import { getSectionParameters } from '../../../.storybook/preview';

const meta: Meta = {
  title: 'TSX + React Aria/Components/Checkbox',
  tags: ['autodocs'],
  parameters: {
    ...getSectionParameters('TSX + React Aria/Components/Checkbox'),
    layout: 'padded'
  }
};

export default meta;

type Story = StoryObj;

const containerStyle = {
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
    <div style={containerStyle}>
      <div style={rowStyle}>
        <Checkbox>Unchecked</Checkbox>
        <Checkbox defaultSelected>Checked</Checkbox>
        <Checkbox isDisabled>Disabled</Checkbox>
        <Checkbox defaultSelected isDisabled>
          Checked & disabled
        </Checkbox>
        <Checkbox isIndeterminate>Indeterminate</Checkbox>
        <Checkbox isIndeterminate isDisabled>
          Indeterminate & disabled
        </Checkbox>
      </div>
    </div>
  )
};

export const Sizes: Story = {
  render: () => (
    <div style={containerStyle}>
      <div style={rowStyle}>
        <Checkbox size="sm">Small</Checkbox>
        <Checkbox size="md" defaultSelected>
          Medium
        </Checkbox>
        <Checkbox size="lg" defaultSelected>
          Large
        </Checkbox>
      </div>
    </div>
  )
};
