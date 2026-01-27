import React from 'react';
import type { Meta, StoryObj } from '@storybook/react';
import { Ellipsis } from './ellipsis';

const meta: Meta<typeof Ellipsis> = {
  title: 'Components/Ellipsis',
  component: Ellipsis,
  parameters: {
    layout: 'centered',
  },
  argTypes: {
    children: { control: 'text' },
    tooltipOnTruncate: { control: 'boolean' },
  },
};

export default meta;
type Story = StoryObj<typeof Ellipsis>;

export const Default: Story = {
  args: {
    children: 'This text is short enough to fit.',
  },
  decorators: [
    (Story) => (
      <div style={{ width: 200, border: '1px dashed #ccc', padding: 8 }}>
        <Story />
      </div>
    ),
  ],
};

export const Truncated: Story = {
  args: {
    children: 'This text is way too long to fit inside the container and will truncate.',
  },
  decorators: [
    (Story) => (
      <div style={{ width: 200, border: '1px dashed #ccc', padding: 8 }}>
        <Story />
      </div>
    ),
  ],
};

/**
 * Example of composition with an app-level translation function `t()`.
 * The `Ellipsis` component receives the resolved string.
 */
export const WithTranslation: Story = {
  render: () => {
    // Mock translation function
    const t = (key: string) => {
      const translations: Record<string, string> = {
        'actions.apply': 'Apply settings to the current project configuration',
      };
      return translations[key] || key;
    };

    return (
      <div style={{ width: 150, border: '1px dashed #ccc', padding: 8 }}>
        <Ellipsis tooltipOnTruncate>
          {t('actions.apply')}
        </Ellipsis>
      </div>
    );
  },
};

/**
 * Integration example with Badge.
 * The Ellipsis component is used inside the Badge label to handle overflow.
 * Note: The Tooltip is attached to the label text, not the Badge root.
 */
export const BadgeIntegration: Story = {
  render: () => (
    <div style={{ display: 'flex', gap: 16, width: 300 }}>
      {/* Simulated Badge Component Structure */}
      <div
        className="eui-badge"
        style={{
          display: 'inline-flex',
          alignItems: 'center',
          padding: '4px 8px',
          borderRadius: 16,
          backgroundColor: '#e0e0e0',
          maxWidth: '100%', // Badge itself is constrained
        }}
      >
        <Ellipsis>
          Super long badge label that should truncate
        </Ellipsis>
      </div>

      <div className="eui-badge" style={{ display: 'inline-flex', alignItems: 'center', padding: '4px 8px', borderRadius: 16, backgroundColor: '#e0e0e0' }}>
        <Ellipsis>Short</Ellipsis>
      </div>
    </div>
  ),
};