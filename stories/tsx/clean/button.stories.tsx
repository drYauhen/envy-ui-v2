import type { Meta, StoryObj } from '@storybook/react';
import { ButtonClean, ButtonGroup } from '../../../packages/tsx';
import type { ButtonIntent, ButtonShape, ButtonSize } from '../../../generated/tsx/button.contract';
import { getSectionParameters } from '../../../.storybook/preview';

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
  parameters: {
    // Apply section-specific parameters automatically
    ...getSectionParameters('TSX (Clean)/Components/Button'),
    layout: 'padded'
  },
  argTypes: {
    intent: { options: ['primary', 'secondary', 'accent'], control: { type: 'radio' } },
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
    <div style={{ display: 'inline-flex', gap: '1rem' }}>
      <ButtonClean intent={intent} shape={shape} size={size} disabled={disabled} selected={selected}>
        {shape === 'circle' ? label.slice(0, 1) : label}
      </ButtonClean>
    </div>
  )
};

export const Selected: Story = {
  args: { selected: true, label: 'Selected' },
  render: ({ intent, shape, size, disabled, selected, label }) => (
    <div style={{ display: 'inline-flex', gap: '1rem' }}>
      <ButtonClean intent={intent} shape={shape} size={size} disabled={disabled} selected={selected}>
        {label}
      </ButtonClean>
    </div>
  )
};

export const Disabled: Story = {
  args: { disabled: true, label: 'Disabled' },
  render: ({ intent, shape, size, disabled, selected, label }) => (
    <div style={{ display: 'inline-flex', gap: '1rem' }}>
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
    <ButtonGroup>
      <ButtonClean intent={intent} shape={shape} size={size} data-eui-group-position="first" aria-label="First">
        One
      </ButtonClean>
      <ButtonClean intent={intent} shape={shape} size={size} data-eui-group-position="middle" aria-label="Middle">
        Two
      </ButtonClean>
      <ButtonClean intent={intent} shape={shape} size={size} data-eui-group-position="last" aria-label="Last" selected>
        Three
      </ButtonClean>
    </ButtonGroup>
  )
};

export const GroupedVertical: Story = {
  name: 'Grouped vertical (visual)',
  args: { intent: 'secondary', shape: 'default', size: 'md' },
  render: ({ intent, shape, size }) => (
    <ButtonGroup data-eui-orientation="vertical" style={{ width: '180px' }}>
      <ButtonClean
        intent={intent}
        shape={shape}
        size={size}
        data-eui-group-position="first"
        data-eui-group-orientation="vertical"
        aria-label="First"
      >
        One
      </ButtonClean>
      <ButtonClean
        intent={intent}
        shape={shape}
        size={size}
        data-eui-group-position="middle"
        data-eui-group-orientation="vertical"
        aria-label="Middle"
      >
        Two
      </ButtonClean>
      <ButtonClean
        intent={intent}
        shape={shape}
        size={size}
        data-eui-group-position="last"
        data-eui-group-orientation="vertical"
        aria-label="Last"
        selected
      >
        Three
      </ButtonClean>
    </ButtonGroup>
  )
};
