import type { Meta, StoryObj } from '@storybook/react';
import React from 'react';
import { Icon } from '../../../packages/tsx/icon';
import { Button } from '../../../src/ui';
import { getSectionParameters } from '../../../.storybook/preview';

type IconStoryProps = {
  size?: number;
  color?: string;
};

const meta: Meta<IconStoryProps> = {
  title: 'TSX + React Aria/Components/Icon',
  tags: ['autodocs'],
  parameters: {
    // Apply section-specific parameters automatically
    ...getSectionParameters('TSX + React Aria/Components/Icon'),
    layout: 'padded'
  },
  argTypes: {
    size: {
      control: { type: 'number', min: 8, max: 48, step: 2 }
    },
    color: {
      control: { type: 'color' }
    }
  },
  args: {
    size: 16,
    color: undefined
  }
};

export default meta;

type Story = StoryObj<IconStoryProps>;

const containerStyle = {
  display: 'flex',
  flexDirection: 'column',
  gap: '2rem',
  padding: '1.5rem'
} as const;

const exampleStyle = {
  display: 'flex',
  flexDirection: 'column',
  gap: '1rem',
  padding: '1rem',
  border: '1px solid var(--eui-color-border-default, #e0e0e0)',
  borderRadius: '8px'
} as const;

const rowStyle = {
  display: 'flex',
  alignItems: 'center',
  gap: '1rem'
} as const;

/**
 * Basic Usage
 * 
 * Use the Icon component with name prop
 */
export const BasicUsage: Story = {
  name: 'Basic Usage',
  render: ({ size, color }) => (
    <div style={containerStyle}>
      <div style={exampleStyle}>
        <h3>Icon Component</h3>
        <div style={rowStyle}>
          <Icon name="search" size={size} color={color} />
          <span>Default usage</span>
        </div>
        <div style={rowStyle}>
          <Icon name="search" size={20} />
          <span>Custom size (20px)</span>
        </div>
        <div style={rowStyle}>
          <Icon name="search" size={24} color="var(--eui-color-accent-primary, #0066cc)" />
          <span>Custom color</span>
        </div>
        <div style={rowStyle}>
          <Icon name="search" size={16} color="currentColor" style={{ color: '#cc0000' }} />
          <span style={{ color: '#cc0000' }}>With currentColor (inherits parent)</span>
        </div>
      </div>
    </div>
  )
};

/**
 * Different Icons
 * 
 * Use different icons by changing the name prop
 */
export const DifferentIcons: Story = {
  name: 'Different Icons',
  render: ({ size, color }) => (
    <div style={containerStyle}>
      <div style={exampleStyle}>
        <h3>Available Icons</h3>
        <div style={rowStyle}>
          <Icon name="search" size={size} color={color} />
          <span>Search icon</span>
        </div>
        <div style={rowStyle}>
          <Icon name="ellipsis-v" size={size} color={color} />
          <span>Ellipsis vertical icon</span>
        </div>
      </div>
    </div>
  )
};

/**
 * Size Variants
 * 
 * Different icon sizes
 */
export const SizeVariants: Story = {
  name: 'Size Variants',
  render: () => (
    <div style={containerStyle}>
      <div style={exampleStyle}>
        <h3>Icon Sizes</h3>
        <div style={rowStyle}>
          <Icon name="search" size={12} />
          <span>12px (xs)</span>
        </div>
        <div style={rowStyle}>
          <Icon name="search" size={14} />
          <span>14px (sm)</span>
        </div>
        <div style={rowStyle}>
          <Icon name="search" size={16} />
          <span>16px (md) - Default</span>
        </div>
        <div style={rowStyle}>
          <Icon name="search" size={20} />
          <span>20px (lg)</span>
        </div>
        <div style={rowStyle}>
          <Icon name="search" size={24} />
          <span>24px (xl)</span>
        </div>
      </div>
    </div>
  )
};

/**
 * Color Variants
 * 
 * Icons with different colors using currentColor
 */
export const ColorVariants: Story = {
  name: 'Color Variants',
  render: () => (
    <div style={containerStyle}>
      <div style={exampleStyle}>
        <h3>Icon Colors (currentColor)</h3>
        <div style={rowStyle}>
          <div style={{ color: 'var(--eui-color-accent-primary, #0066cc)' }}>
            <Icon name="search" size={24} />
            <span style={{ marginLeft: '0.5rem' }}>Accent Primary</span>
          </div>
        </div>
        <div style={rowStyle}>
          <div style={{ color: 'var(--eui-color-text-default, #333)' }}>
            <Icon name="search" size={24} />
            <span style={{ marginLeft: '0.5rem' }}>Text Default</span>
          </div>
        </div>
        <div style={rowStyle}>
          <div style={{ color: '#cc0000' }}>
            <Icon name="search" size={24} />
            <span style={{ marginLeft: '0.5rem' }}>Custom Red</span>
          </div>
        </div>
        <div style={rowStyle}>
          <div style={{ color: '#00cc00' }}>
            <Icon name="search" size={24} />
            <span style={{ marginLeft: '0.5rem' }}>Custom Green</span>
          </div>
        </div>
      </div>
    </div>
  )
};

/**
 * In Buttons
 * 
 * Icons used with Button component using startIcon and endIcon props
 */
export const InButtons: Story = {
  name: 'In Buttons',
  render: () => (
    <div style={containerStyle}>
      <div style={exampleStyle}>
        <h3>Icons in Buttons</h3>
        <p style={{ fontSize: '0.875rem', color: '#64748b', margin: '0 0 1rem 0' }}>
          Using <code>startIcon</code> and <code>endIcon</code> props
        </p>
        <div style={{ display: 'flex', flexDirection: 'column', gap: '1rem' }}>
          <div style={rowStyle}>
            <Button intent="primary" startIcon={<Icon name="plus-circle" size={16} />}>
              Add
            </Button>
            <Button intent="primary" endIcon={<Icon name="external-link" size={16} />}>
              Open
            </Button>
            <Button intent="primary" startIcon={<Icon name="plus-circle" size={16} />} endIcon={<Icon name="external-link" size={16} />}>
              Add & Open
            </Button>
          </div>
          <div style={rowStyle}>
            <Button intent="secondary" startIcon={<Icon name="plus-circle" size={16} />}>
              Add
            </Button>
            <Button intent="accent" startIcon={<Icon name="plus-circle" size={16} />}>
              Add
            </Button>
          </div>
          <div style={rowStyle}>
            <Button intent="primary" size="sm" startIcon={<Icon name="plus-circle" size={14} />}>
              Small
            </Button>
            <Button intent="primary" size="md" startIcon={<Icon name="plus-circle" size={16} />}>
              Medium
            </Button>
            <Button intent="primary" size="lg" startIcon={<Icon name="plus-circle" size={18} />}>
              Large
            </Button>
          </div>
        </div>
      </div>
    </div>
  )
};

/**
 * Accessibility
 * 
 * Icons with proper accessibility attributes
 */
export const Accessibility: Story = {
  name: 'Accessibility',
  render: () => (
    <div style={containerStyle}>
      <div style={exampleStyle}>
        <h3>Accessibility Examples</h3>
        <div style={rowStyle}>
          <Icon name="search" size={24} aria-label="Search" />
          <span>With aria-label (decorative icon becomes meaningful)</span>
        </div>
        <div style={rowStyle}>
          <Icon name="search" size={24} aria-hidden="true" />
          <span>With aria-hidden="true" (decorative, hidden from screen readers)</span>
        </div>
        <div style={rowStyle}>
          <button aria-label="Search">
            <Icon name="search" size={24} aria-hidden="true" />
          </button>
          <span>Icon in button (aria-hidden on icon, aria-label on button)</span>
        </div>
      </div>
    </div>
  )
};

