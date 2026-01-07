import type { Meta, StoryObj } from '@storybook/react';
import React, { useState } from 'react';
import type { Key } from 'react';
import { SearchableSelect, SearchableSelectItem } from '../../../packages/tsx/select';
import { getSectionParameters } from '../../../.storybook/preview';
import { MultiContextViewer } from '../../utils/multi-context-viewer';

const meta: Meta = {
  title: 'TSX + React Aria/Components/SearchableSelect',
  parameters: {
    // Apply section-specific parameters automatically
    ...getSectionParameters('TSX + React Aria/Components/SearchableSelect'),
    layout: 'padded'
  }
};

export default meta;
type Story = StoryObj;

const basicItems: SearchableSelectItem[] = [
  { key: 'option1', label: 'Option 1' },
  { key: 'option2', label: 'Option 2' },
  { key: 'option3', label: 'Option 3' },
  { key: 'option4', label: 'Option 4' }
];

const manyItems: SearchableSelectItem[] = Array.from({ length: 50 }, (_, i) => ({
  key: `option-${i + 1}`,
  label: `Option ${i + 1}`
}));

export const Basic: Story = {
  render: () => (
    <ContextThemeScope data-eui-context="app" style={{ maxWidth: '300px' }}>
      <SearchableSelect
        label="Search and select"
        placeholder="Type to search..."
        items={basicItems}
      />
    </ContextThemeScope>
  )
};

export const WithDefaultValue: Story = {
  render: () => (
    <ContextThemeScope data-eui-context="app" style={{ maxWidth: '300px' }}>
      <SearchableSelect
        label="Search and select"
        items={basicItems}
        defaultSelectedKey="option2"
      />
    </ContextThemeScope>
  )
};

export const Controlled: Story = {
  render: () => {
    const [selected, setSelected] = useState<Key | null>('option2');

    return (
      <ContextThemeScope data-eui-context="app" style={{ maxWidth: '300px' }}>
        <SearchableSelect
          label="Controlled SearchableSelect"
          items={basicItems}
          selectedKey={selected}
          onSelectionChange={(key) => setSelected(key)}
        />
        <p style={{ marginTop: '1rem', fontSize: '0.875rem', color: '#64748b' }}>
          Selected: {selected || 'none'}
        </p>
      </ContextThemeScope>
    );
  }
};

export const ManyOptions: Story = {
  render: () => (
    <ContextThemeScope data-eui-context="app" style={{ maxWidth: '300px' }}>
      <SearchableSelect
        label="Search in many options"
        placeholder="Type to filter..."
        items={manyItems}
      />
    </ContextThemeScope>
  )
};

export const WithDisabledOptions: Story = {
  render: () => {
    const itemsWithDisabled: SearchableSelectItem[] = [
      { key: 'option1', label: 'Option 1' },
      { key: 'option2', label: 'Option 2', disabled: true },
      { key: 'option3', label: 'Option 3' },
      { key: 'option4', label: 'Option 4', disabled: true }
    ];

    return (
      <ContextThemeScope data-eui-context="app" style={{ maxWidth: '300px' }}>
        <SearchableSelect
          label="Search and select"
          items={itemsWithDisabled}
        />
      </ContextThemeScope>
    );
  }
};

export const Sizes: Story = {
  render: () => (
    <ContextThemeScope data-eui-context="app" style={{ maxWidth: '300px', display: 'flex', flexDirection: 'column', gap: '1.5rem' }}>
      <SearchableSelect
        label="Small"
        items={basicItems}
        size="sm"
        defaultSelectedKey="option1"
      />
      <SearchableSelect
        label="Medium (default)"
        items={basicItems}
        size="md"
        defaultSelectedKey="option2"
      />
      <SearchableSelect
        label="Large"
        items={basicItems}
        size="lg"
        defaultSelectedKey="option3"
      />
    </ContextThemeScope>
  )
};

export const States: Story = {
  render: () => (
    <ContextThemeScope data-eui-context="app" style={{ maxWidth: '300px', display: 'flex', flexDirection: 'column', gap: '1.5rem' }}>
      <SearchableSelect
        label="Normal"
        items={basicItems}
        defaultSelectedKey="option1"
      />
      <SearchableSelect
        label="Disabled"
        items={basicItems}
        isDisabled
        defaultSelectedKey="option2"
      />
      <SearchableSelect
        label="Error"
        items={basicItems}
        error
        defaultSelectedKey="option3"
      />
    </ContextThemeScope>
  )
};

export const InForm: Story = {
  render: () => (
    <ContextThemeScope data-eui-context="app" style={{ maxWidth: '400px' }}>
      <form style={{ display: 'flex', flexDirection: 'column', gap: '1.5rem' }}>
        <SearchableSelect
          label="Search and select"
          placeholder="Type to search..."
          items={basicItems}
        />
        <button type="submit" className="eui-button" data-eui-intent="primary">
          Submit
        </button>
      </form>
    </ContextThemeScope>
  )
};




