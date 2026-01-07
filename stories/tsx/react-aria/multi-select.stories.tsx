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

const basicItems: MultiSelectItem[] = [
  { key: 'option1', label: 'Option 1' },
  { key: 'option2', label: 'Option 2' },
  { key: 'option3', label: 'Option 3' },
  { key: 'option4', label: 'Option 4' },
  { key: 'option5', label: 'Option 5' }
];

const manyItems: MultiSelectItem[] = Array.from({ length: 20 }, (_, i) => ({
  key: `option-${i + 1}`,
  label: `Option ${i + 1}`
}));

export const Basic: Story = {
  render: () => (
    <MultiContextViewer contexts={[{ context: 'app' }]}>
      {() => (
        <div style={{ maxWidth: '300px' }}>
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
        <div style={{ maxWidth: '300px' }}>
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
          <div style={{ maxWidth: '300px' }}>
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
        <div style={{ maxWidth: '300px' }}>
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

export const WithDisabledOptions: Story = {
  render: () => {
    const itemsWithDisabled: MultiSelectItem[] = [
      { key: 'option1', label: 'Option 1' },
      { key: 'option2', label: 'Option 2', disabled: true },
      { key: 'option3', label: 'Option 3' },
      { key: 'option4', label: 'Option 4', disabled: true },
      { key: 'option5', label: 'Option 5' }
    ];

    return (
      <MultiContextViewer contexts={[{ context: 'app' }]}>
        {() => (
          <div style={{ maxWidth: '300px' }}>
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
        <div style={{ maxWidth: '300px', display: 'flex', flexDirection: 'column', gap: '1.5rem' }}>
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
        <div style={{ maxWidth: '300px', display: 'flex', flexDirection: 'column', gap: '1.5rem' }}>
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
        <div style={{ maxWidth: '400px' }}>
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
