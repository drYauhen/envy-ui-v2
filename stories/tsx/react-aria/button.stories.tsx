import type { Meta, StoryObj } from '@storybook/react';
import { Button } from '../../../src/ui';
import type { ButtonIntent, ButtonShape, ButtonSize } from '../../../src/ui';

type ButtonStoryProps = {
  intent: ButtonIntent;
  shape: ButtonShape;
  size: ButtonSize;
  disabled?: boolean;
  loading?: boolean;
  label: string;
};

const meta: Meta<ButtonStoryProps> = {
  title: 'TSX + React Aria/Components/Button',
  tags: ['autodocs'],
  argTypes: {
    intent: {
      options: ['primary', 'secondary', 'accent'],
      control: { type: 'radio' }
    },
    shape: {
      options: ['default', 'round', 'circle'],
      control: { type: 'radio' }
    },
    size: {
      options: ['sm', 'md', 'lg'],
      control: { type: 'radio' }
    },
    disabled: {
      control: { type: 'boolean' }
    },
    loading: {
      control: { type: 'boolean' }
    },
    label: {
      control: { type: 'text' }
    }
  },
  args: {
    intent: 'primary',
    shape: 'default',
    size: 'md',
    disabled: false,
    loading: false,
    label: 'Action'
  }
};

export default meta;

type Story = StoryObj<ButtonStoryProps>;

const ButtonPreview = ({ intent, shape, disabled, label }: ButtonStoryProps) => (
  <div style={{ display: 'inline-flex', gap: '1rem' }}>
    <Button intent={intent} size="md" shape={shape} isDisabled={disabled}>
      {shape === 'circle' ? label.slice(0, 1) : label}
    </Button>
  </div>
);

export const Primary: Story = {
  args: {
    intent: 'primary',
    label: 'Primary action'
  },
  render: (props: ButtonStoryProps) => <ButtonPreview {...props} />
};

export const Secondary: Story = {
  args: {
    intent: 'secondary',
    label: 'Secondary action'
  },
  render: (props: ButtonStoryProps) => <ButtonPreview {...props} />
};

export const Accent: Story = {
  args: {
    intent: 'accent',
    label: 'Accent action'
  },
  render: (props: ButtonStoryProps) => <ButtonPreview {...props} />
};

export const KeyboardFocus: Story = {
  args: {
    intent: 'primary',
    shape: 'default',
    label: 'Focusable button'
  },
  render: ({ shape, disabled }: ButtonStoryProps) => {
    const buttons: Array<{ label: string; intent: ButtonIntent }> = [
      { label: 'First', intent: 'primary' },
      { label: 'Second', intent: 'secondary' },
      { label: 'Third', intent: 'accent' }
    ];

    return (
      <div style={{ display: 'flex', gap: '1rem', alignItems: 'center' }}>
        {buttons.map((button) => (
          <Button key={button.label} intent={button.intent} size="md" shape={shape} isDisabled={disabled}>
            {button.label}
          </Button>
        ))}
        <p style={{ margin: 0, fontSize: '0.85rem', color: '#475569' }}>
          Press Tab to move focus. Use the toolbar “Focus policy” to switch derived vs system focus.
        </p>
      </div>
    );
  }
};

export const LinkButton: Story = {
  name: 'Link host',
  args: {
    intent: 'primary',
    shape: 'default',
    size: 'md',
    label: 'Open docs'
  },
  render: ({ intent, shape, size, disabled, loading, label }: ButtonStoryProps) => (
    <div style={{ display: 'inline-flex', gap: '1rem' }}>
      <Button intent={intent} shape={shape} size={size} href="https://example.com" isDisabled={disabled} isLoading={loading}>
        {label}
      </Button>
    </div>
  )
};

export const AsChildButton: Story = {
  name: 'asChild proxy',
  args: {
    intent: 'secondary',
    shape: 'round',
    size: 'md',
    label: 'Card slot'
  },
  render: ({ intent, shape, size, disabled, loading, label }: ButtonStoryProps) => (
    <div style={{ display: 'inline-flex', gap: '1rem' }}>
      <Button intent={intent} shape={shape} size={size} asChild isDisabled={disabled} isLoading={loading}>
        <div
          style={{
            padding: '12px 16px',
            border: '1px dashed #94a3b8',
            borderRadius: '12px',
            background: '#f8fafc'
          }}
        >
          {label} (div host)
        </div>
      </Button>
    </div>
  )
};

export const LoadingAndIcons: Story = {
  name: 'Loading + icons',
  args: {
    intent: 'primary',
    shape: 'round',
    size: 'md',
    label: 'Processing',
    loading: true
  },
  render: ({ intent, shape, size, disabled, loading, label }: ButtonStoryProps) => (
    <div style={{ display: 'inline-flex', gap: '1rem' }}>
      <Button
        intent={intent}
        shape={shape}
        size={size}
        isDisabled={disabled}
        isLoading={loading}
        startIcon={<span aria-hidden="true">⏳</span>}
        endIcon={<span aria-hidden="true">→</span>}
      >
        {label}
      </Button>
    </div>
  )
};
