import type { Meta, StoryObj } from '@storybook/react';
import { Button } from '../../packages/tailwind/components/button/Button';

const meta: Meta<typeof Button> = {
  title: 'Tailwind/Components/Button',
  component: Button,
  tags: ['autodocs'],
  parameters: {
    docs: {
      description: {
        component: 'Button component implemented using Tailwind CSS utility classes. Tokens are mapped to Tailwind theme values.',
      },
    },
  },
};

export default meta;
type Story = StoryObj<typeof Button>;

export const Primary: Story = {
  args: {
    intent: 'primary',
    size: 'md',
    children: 'Button',
  },
};

export const Secondary: Story = {
  args: {
    intent: 'secondary',
    size: 'md',
    children: 'Button',
  },
};

export const Accent: Story = {
  args: {
    intent: 'accent',
    size: 'md',
    children: 'Button',
  },
};

export const Sizes: Story = {
  render: () => (
    <div className="flex gap-4 items-center">
      <Button size="sm">Small</Button>
      <Button size="md">Medium</Button>
      <Button size="lg">Large</Button>
    </div>
  ),
};

export const Shapes: Story = {
  render: () => (
    <div className="flex gap-4 items-center">
      <Button shape="rounded">Rounded</Button>
      <Button shape="square">Square</Button>
    </div>
  ),
};

export const Intents: Story = {
  render: () => (
    <div className="flex gap-4 items-center">
      <Button intent="primary">Primary</Button>
      <Button intent="secondary">Secondary</Button>
      <Button intent="accent">Accent</Button>
    </div>
  ),
};

