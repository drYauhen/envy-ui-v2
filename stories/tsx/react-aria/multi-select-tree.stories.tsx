import type { Meta, StoryObj } from '@storybook/react';
import React, { useState } from 'react';
import type { Key } from 'react';
import { MultiSelectTree, type MultiSelectTreeItem } from '../../../packages/tsx/select';
import { getSectionParameters } from '../../../.storybook/preview';
import { MultiContextViewer } from '../../utils/multi-context-viewer';

const meta: Meta = {
  title: 'TSX + React Aria/Components/MultiSelectTree',
  parameters: {
    ...getSectionParameters('TSX + React Aria/Components/MultiSelectTree'),
    layout: 'padded'
  }
};

export default meta;
type Story = StoryObj;

const resizableContainerStyle: React.CSSProperties = {
  width: '360px',
  minWidth: '240px',
  maxWidth: '640px',
  resize: 'horizontal',
  overflow: 'auto',
  padding: '12px',
  borderRadius: '8px',
  border: '1px dashed var(--eui-color-border-default, #cbd5e1)'
};

const treeItems: MultiSelectTreeItem[] = [
  {
    key: 'folder-a',
    label: 'Folder A',
    children: [
      { key: 'file-a1', label: 'A' },
      { key: 'file-a2', label: 'AB' },
      { key: 'file-a3', label: 'Alpha' },
      {
        key: 'folder-a-sub',
        label: 'Sub folder A',
        children: [
          { key: 'file-a4', label: 'A long option label that should truncate nicely inside the tree list' },
          { key: 'file-a5', label: 'Option Five' }
        ]
      }
    ]
  },
  {
    key: 'folder-b',
    label: 'Folder B',
    children: [
      { key: 'file-b1', label: 'B' },
      { key: 'file-b2', label: 'Beta' },
      { key: 'file-b3', label: 'Another really long file name to test the ellipsis behavior in tree view' }
    ]
  },
  {
    key: 'folder-c',
    label: 'Folder C',
    children: [
      {
        key: 'folder-c-sub',
        label: 'Nested folder',
        children: [
          { key: 'file-c1', label: 'C1' },
          { key: 'file-c2', label: 'C2' }
        ]
      }
    ]
  }
];

export const Basic: Story = {
  render: () => (
    <MultiContextViewer contexts={[{ context: 'app' }]}>
      {() => (
        <div style={resizableContainerStyle}>
          <MultiSelectTree
            label="Choose items"
            placeholder="Select items..."
            items={treeItems}
            defaultExpandedKeys={['folder-a', 'folder-b']}
          />
        </div>
      )}
    </MultiContextViewer>
  )
};

export const WithSearchAndSummary: Story = {
  render: () => (
    <MultiContextViewer contexts={[{ context: 'app' }]}>
      {() => (
        <div style={resizableContainerStyle}>
          <MultiSelectTree
            label="Choose items"
            placeholder="Select items..."
            items={treeItems}
            defaultExpandedKeys={['folder-a', 'folder-b']}
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

export const Controlled: Story = {
  render: () => {
    const [selected, setSelected] = useState<Set<Key>>(new Set(['file-a1', 'file-b2']));

    return (
      <MultiContextViewer contexts={[{ context: 'app' }]}>
        {() => (
          <div style={resizableContainerStyle}>
            <MultiSelectTree
              label="Controlled tree"
              items={treeItems}
              selectedKeys={selected}
              onSelectionChange={(keys) => setSelected(keys)}
              defaultExpandedKeys={['folder-a', 'folder-b']}
              isSearchable
              showSelectionSummary
              selectionSummaryLabel="Selected"
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
