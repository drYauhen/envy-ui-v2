import type { Meta, StoryObj } from '@storybook/react';
import React, { useState } from 'react';
import type { Key } from 'react';
import { Select, SelectItem } from '../../../packages/tsx/select';

const meta: Meta = {
  title: 'TSX + React Aria/Components/Select',
  parameters: {
    layout: 'padded'
  }
};

export default meta;
type Story = StoryObj;

const basicItems: SelectItem[] = [
  { key: 'option1', label: 'Option 1' },
  { key: 'option2', label: 'Option 2' },
  { key: 'option3', label: 'Option 3' },
  { key: 'option4', label: 'Option 4' }
];

const manyItems: SelectItem[] = Array.from({ length: 20 }, (_, i) => ({
  key: `option-${i + 1}`,
  label: `Option ${i + 1}`
}));

export const Basic: Story = {
  render: () => (
    <div data-eui-context="app" style={{ maxWidth: '300px' }}>
      <Select
        label="Choose an option"
        placeholder="Select..."
        items={basicItems}
      />
    </div>
  )
};

export const WithDefaultValue: Story = {
  render: () => (
    <div data-eui-context="app" style={{ maxWidth: '300px' }}>
      <Select
        label="Choose an option"
        items={basicItems}
        defaultSelectedKey="option2"
      />
    </div>
  )
};

export const Controlled: Story = {
  render: () => {
    const [selected, setSelected] = useState<Key | null>('option2');

    return (
      <div data-eui-context="app" style={{ maxWidth: '300px' }}>
        <Select
          label="Controlled Select"
          items={basicItems}
          selectedKey={selected}
          onSelectionChange={(key) => setSelected(key)}
        />
        <p style={{ marginTop: '1rem', fontSize: '0.875rem', color: '#64748b' }}>
          Selected: {selected || 'none'}
        </p>
      </div>
    );
  }
};

export const Sizes: Story = {
  render: () => (
    <div data-eui-context="app" style={{ maxWidth: '300px', display: 'flex', flexDirection: 'column', gap: '1.5rem' }}>
      <Select
        label="Small"
        items={basicItems}
        size="sm"
        defaultSelectedKey="option1"
      />
      <Select
        label="Medium (default)"
        items={basicItems}
        size="md"
        defaultSelectedKey="option2"
      />
      <Select
        label="Large"
        items={basicItems}
        size="lg"
        defaultSelectedKey="option3"
      />
    </div>
  )
};

export const States: Story = {
  render: () => (
    <div data-eui-context="app" style={{ maxWidth: '300px', display: 'flex', flexDirection: 'column', gap: '1.5rem' }}>
      <Select
        label="Default"
        items={basicItems}
        defaultSelectedKey="option1"
      />
      <Select
        label="Error state"
        items={basicItems}
        error
        defaultSelectedKey="option2"
      />
      <Select
        label="Disabled"
        items={basicItems}
        isDisabled
        defaultSelectedKey="option3"
      />
    </div>
  )
};

export const WithDisabledOptions: Story = {
  render: () => {
    const itemsWithDisabled: SelectItem[] = [
      { key: 'option1', label: 'Option 1' },
      { key: 'option2', label: 'Option 2 (disabled)', disabled: true },
      { key: 'option3', label: 'Option 3' },
      { key: 'option4', label: 'Option 4 (disabled)', disabled: true },
      { key: 'option5', label: 'Option 5' }
    ];

    return (
      <div data-eui-context="app" style={{ maxWidth: '300px' }}>
        <Select
          label="Select with disabled options"
          items={itemsWithDisabled}
        />
      </div>
    );
  }
};

export const ManyOptions: Story = {
  render: () => (
    <div data-eui-context="app" style={{ maxWidth: '300px' }}>
      <Select
        label="Select with many options"
        items={manyItems}
        placeholder="Choose from 20 options..."
      />
    </div>
  )
};

export const InForm: Story = {
  render: () => (
    <div data-eui-context="app" style={{ maxWidth: '400px' }}>
      <form style={{ display: 'flex', flexDirection: 'column', gap: '1.5rem' }}>
        <Select
          label="Country"
          items={[
            { key: 'us', label: 'United States' },
            { key: 'uk', label: 'United Kingdom' },
            { key: 'ca', label: 'Canada' },
            { key: 'au', label: 'Australia' }
          ]}
          placeholder="Select country"
        />
        <Select
          label="Region"
          items={[
            { key: 'na', label: 'North America' },
            { key: 'eu', label: 'Europe' },
            { key: 'ap', label: 'Asia Pacific' }
          ]}
          placeholder="Select region"
        />
        <Select
          label="Status"
          items={[
            { key: 'active', label: 'Active' },
            { key: 'inactive', label: 'Inactive' },
            { key: 'pending', label: 'Pending' }
          ]}
          defaultSelectedKey="active"
        />
      </form>
    </div>
  )
};

