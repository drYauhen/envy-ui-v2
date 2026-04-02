import type { Meta, StoryObj } from '@storybook/react';
import React, { useState } from 'react';
import type { Key } from 'react';
import { MultiSelect, MultiSelectItem } from '../../../packages/tsx/select';
import { getSectionParameters } from '../../../.storybook/preview';
import { MultiContextViewer } from '../../utils/multi-context-viewer';

const meta: Meta = {
  title: 'TSX + React Aria/Components/MultiSelect',
  parameters: {
    // Apply section-specific parameters automatically
    ...getSectionParameters('TSX + React Aria/Components/MultiSelect'),
    layout: 'padded'
  }
};

export default meta;
type Story = StoryObj;

const resizableContainerStyle: React.CSSProperties = {
  width: '300px',
  minWidth: '220px',
  maxWidth: '640px',
  resize: 'horizontal',
  overflow: 'auto',
  padding: '12px',
  borderRadius: '8px',
  border: '1px dashed var(--eui-color-border-default, #cbd5e1)'
};

const makeLongLabel = (index: number) =>
  `Option ${index} — This is a deliberately long label for testing truncation inside the multi-select dropdown and badges.`;

const makeShortLabel = (index: number) => `Option ${index}`;

const makeSeededRandom = (seed: number) => {
  let value = seed;
  return () => {
    value = (value * 1664525 + 1013904223) % 2 ** 32;
    return value / 2 ** 32;
  };
};

const buildItems = (count: number, seed: number) => {
  const random = makeSeededRandom(seed);
  return Array.from({ length: count }, (_, i) => {
    const index = i + 1;
    const isLong = random() > 0.5;
    return {
      key: `option-${index}`,
      label: isLong ? makeLongLabel(index) : makeShortLabel(index)
    };
  });
};

const mixedItems: MultiSelectItem[] = [
  { key: 'ultra-1', label: 'A' },
  { key: 'ultra-2', label: 'B' },
  { key: 'ultra-3', label: 'AB' },
  { key: 'ultra-4', label: 'XYZ' },
  { key: 'ultra-5', label: 'Alpha' }
];

const basicItems: MultiSelectItem[] = [
  ...mixedItems,
  ...buildItems(7, 42)
];

const manyItems: MultiSelectItem[] = [
  ...mixedItems,
  ...buildItems(20, 1337)
];

export const Basic: Story = {
  render: () => (
    <MultiContextViewer contexts={[{ context: 'app' }]}>
      {() => (
        <div style={resizableContainerStyle}>
          <MultiSelect
            label="Choose options"
            placeholder="Select options..."
            items={basicItems}
          />
        </div>
      )}
    </MultiContextViewer>
  )
};

export const WithDefaultSelection: Story = {
  render: () => (
    <MultiContextViewer contexts={[{ context: 'app' }]}>
      {() => (
        <div style={resizableContainerStyle}>
          <MultiSelect
            label="Choose options"
            items={basicItems}
            defaultSelectedKeys={['option2', 'option4']}
          />
        </div>
      )}
    </MultiContextViewer>
  )
};

export const Controlled: Story = {
  render: () => {
    const [selected, setSelected] = useState<Set<Key>>(new Set(['option2']));

    return (
      <MultiContextViewer contexts={[{ context: 'app' }]}>
        {() => (
          <div style={resizableContainerStyle}>
            <MultiSelect
              label="Controlled MultiSelect"
              items={basicItems}
              selectedKeys={selected}
              onSelectionChange={(keys) => setSelected(keys)}
            />
            <p style={{ marginTop: '1rem', fontSize: '0.875rem', color: '#64748b' }}>
              Selected: {Array.from(selected).join(', ') || 'none'}
            </p>
          </div>
        )}
      </MultiContextViewer>
    );
  }
};

export const ManyOptions: Story = {
  render: () => (
    <MultiContextViewer contexts={[{ context: 'app' }]}>
      {() => (
        <div style={resizableContainerStyle}>
          <MultiSelect
            label="Choose options"
            placeholder="Select options..."
            items={manyItems}
          />
        </div>
      )}
    </MultiContextViewer>
  )
};

export const WithSearch: Story = {
  render: () => (
    <MultiContextViewer contexts={[{ context: 'app' }]}>
      {() => (
        <div style={resizableContainerStyle}>
          <MultiSelect
            label="Choose options"
            placeholder="Select options..."
            items={manyItems}
            isSearchable
            searchPlaceholder="Type to filter..."
            showSelectionSummary
            selectionSummaryLabel="Selected"
          />
        </div>
      )}
    </MultiContextViewer>
  )
};

export const WithDisabledOptions: Story = {
  render: () => {
    const itemsWithDisabled: MultiSelectItem[] = [
      ...mixedItems,
      ...buildItems(5, 7)
    ].map((item, index) => ({
      ...item,
      disabled: index === 1 || index === 3
    }));

    return (
      <MultiContextViewer contexts={[{ context: 'app' }]}>
        {() => (
          <div style={resizableContainerStyle}>
            <MultiSelect
              label="Choose options"
              items={itemsWithDisabled}
              defaultSelectedKeys={['option1', 'option3']}
            />
          </div>
        )}
      </MultiContextViewer>
    );
  }
};

export const Sizes: Story = {
  render: () => (
    <MultiContextViewer contexts={[{ context: 'app' }]}>
      {() => (
        <div style={{ ...resizableContainerStyle, display: 'flex', flexDirection: 'column', gap: '1.5rem' }}>
          <MultiSelect
            label="Small"
            items={basicItems}
            size="sm"
            defaultSelectedKeys={['option1']}
          />
          <MultiSelect
            label="Medium (default)"
            items={basicItems}
            size="md"
            defaultSelectedKeys={['option2', 'option3']}
          />
          <MultiSelect
            label="Large"
            items={basicItems}
            size="lg"
            defaultSelectedKeys={['option4', 'option5']}
          />
        </div>
      )}
    </MultiContextViewer>
  )
};

export const States: Story = {
  render: () => (
    <MultiContextViewer contexts={[{ context: 'app' }]}>
      {() => (
        <div style={{ ...resizableContainerStyle, display: 'flex', flexDirection: 'column', gap: '1.5rem' }}>
          <MultiSelect
            label="Normal"
            items={basicItems}
            defaultSelectedKeys={['option1', 'option2']}
          />
          <MultiSelect
            label="Disabled"
            items={basicItems}
            isDisabled
            defaultSelectedKeys={['option1']}
          />
          <MultiSelect
            label="Error"
            items={basicItems}
            error
            defaultSelectedKeys={['option2']}
          />
        </div>
      )}
    </MultiContextViewer>
  )
};

export const InForm: Story = {
  render: () => (
    <MultiContextViewer contexts={[{ context: 'app' }]}>
      {() => (
        <div style={resizableContainerStyle}>
          <form style={{ display: 'flex', flexDirection: 'column', gap: '1.5rem' }}>
            <MultiSelect
              label="Select multiple options"
              placeholder="Choose options..."
              items={basicItems}
            />
            <button type="submit" className="eui-button" data-eui-intent="primary">
              Submit
            </button>
          </form>
        </div>
      )}
    </MultiContextViewer>
  )
};
