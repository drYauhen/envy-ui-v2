import type { Meta, StoryObj } from '@storybook/react';
import { Button } from '../../../src/ui';
import type { ButtonIntent, ButtonShape } from '../../../src/ui';

type ButtonStoryProps = {
  intent: ButtonIntent;
  shape: ButtonShape;
  disabled?: boolean;
  label: string;
};

const meta: Meta<ButtonStoryProps> = {
  title: 'TSX/React Aria/Components/Button',
  tags: ['autodocs'],
  argTypes: {
    intent: {
      options: ['primary', 'secondary'],
      control: { type: 'radio' }
    },
    shape: {
      options: ['round', 'circle'],
      control: { type: 'radio' }
    },
    disabled: {
      control: { type: 'boolean' }
    },
    label: {
      control: { type: 'text' }
    }
  },
  args: {
    intent: 'primary',
    shape: 'round',
    disabled: false,
    label: 'Action'
  }
};

export default meta;

type Story = StoryObj<ButtonStoryProps>;

const ButtonPreview = ({ intent, shape, disabled, label }: ButtonStoryProps) => (
  <div data-ui-context="app" style={{ display: 'inline-flex', gap: '1rem' }}>
    <Button intent={intent} size="md" shape={shape} disabled={disabled}>
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

export const KeyboardFocus: Story = {
  args: {
    intent: 'primary',
    shape: 'round',
    label: 'Focusable button'
  },
  render: ({ shape, disabled }: ButtonStoryProps) => {
    const buttons: Array<{ label: string; intent: ButtonIntent }> = [
      { label: 'First', intent: 'primary' },
      { label: 'Second', intent: 'secondary' }
    ];

    return (
      <div data-ui-context="app" style={{ display: 'flex', gap: '1rem', alignItems: 'center' }}>
        {buttons.map((button) => (
          <Button key={button.label} intent={button.intent} size="md" shape={shape} disabled={disabled}>
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
