import type { Meta, StoryObj } from '@storybook/react';
import { ButtonClean } from '../../../packages/tsx';
import type { ButtonIntent, ButtonShape, ButtonSize } from '../../../contracts/button.contract';

type ButtonStoryProps = {
  intent: ButtonIntent;
  shape: ButtonShape;
  size: ButtonSize;
  disabled?: boolean;
  selected?: boolean;
  label: string;
};

const meta: Meta<ButtonStoryProps> = {
  title: 'TSX (Clean)/Components/Button',
  tags: ['autodocs'],
  argTypes: {
    intent: { options: ['primary', 'secondary'], control: { type: 'radio' } },
    shape: { options: ['default', 'round', 'circle'], control: { type: 'radio' } },
    size: { options: ['sm', 'md', 'lg'], control: { type: 'radio' } },
    disabled: { control: { type: 'boolean' } },
    selected: { control: { type: 'boolean' } },
    label: { control: { type: 'text' } }
  },
  args: {
    intent: 'primary',
    shape: 'default',
    size: 'md',
    disabled: false,
    selected: false,
    label: 'Action'
  }
};

export default meta;

type Story = StoryObj<ButtonStoryProps>;

export const Default: Story = {
  render: ({ intent, shape, size, disabled, selected, label }) => (
    <div data-ui-context="app" style={{ display: 'inline-flex', gap: '1rem' }}>
      <ButtonClean intent={intent} shape={shape} size={size} disabled={disabled} selected={selected}>
        {shape === 'circle' ? label.slice(0, 1) : label}
      </ButtonClean>
    </div>
  )
};

export const Selected: Story = {
  args: { selected: true, label: 'Selected' },
  render: ({ intent, shape, size, disabled, selected, label }) => (
    <div data-ui-context="app" style={{ display: 'inline-flex', gap: '1rem' }}>
      <ButtonClean intent={intent} shape={shape} size={size} disabled={disabled} selected={selected}>
        {label}
      </ButtonClean>
    </div>
  )
};

export const Disabled: Story = {
  args: { disabled: true, label: 'Disabled' },
  render: ({ intent, shape, size, disabled, selected, label }) => (
    <div data-ui-context="app" style={{ display: 'inline-flex', gap: '1rem' }}>
      <ButtonClean intent={intent} shape={shape} size={size} disabled={disabled} selected={selected}>
        {label}
      </ButtonClean>
    </div>
  )
};

export const Grouped: Story = {
  name: 'Grouped (visual)',
  args: { intent: 'secondary', shape: 'default', size: 'md' },
  render: ({ intent, shape, size }) => (
    <div data-ui-context="app" style={{ display: 'flex', gap: '0px' }}>
      <ButtonClean intent={intent} shape={shape} size={size} data-group-position="first" aria-label="First">
        One
      </ButtonClean>
      <ButtonClean intent={intent} shape={shape} size={size} data-group-position="middle" aria-label="Middle">
        Two
      </ButtonClean>
      <ButtonClean intent={intent} shape={shape} size={size} data-group-position="last" aria-label="Last" selected>
        Three
      </ButtonClean>
    </div>
  )
};

export const GroupedVertical: Story = {
  name: 'Grouped vertical (visual)',
  args: { intent: 'secondary', shape: 'default', size: 'md' },
  render: ({ intent, shape, size }) => (
    <div data-ui-context="app" style={{ display: 'inline-flex', flexDirection: 'column', gap: '0px', width: '180px' }}>
      <ButtonClean
        intent={intent}
        shape={shape}
        size={size}
        data-group-position="first"
        data-group-orientation="vertical"
        aria-label="First"
      >
        One
      </ButtonClean>
      <ButtonClean
        intent={intent}
        shape={shape}
        size={size}
        data-group-position="middle"
        data-group-orientation="vertical"
        aria-label="Middle"
      >
        Two
      </ButtonClean>
      <ButtonClean
        intent={intent}
        shape={shape}
        size={size}
        data-group-position="last"
        data-group-orientation="vertical"
        aria-label="Last"
        selected
      >
        Three
      </ButtonClean>
    </div>
  )
};

