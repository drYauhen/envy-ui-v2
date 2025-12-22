import type { Meta, StoryObj } from '@storybook/react';
import React, { useState } from 'react';

const meta: Meta = {
  title: 'HTML + CSS/Components/Table',
  tags: ['autodocs']
};

export default meta;

type Story = StoryObj;

const containerStyle = {
  display: 'flex',
  flexDirection: 'column',
  gap: '2rem',
  padding: '1.5rem'
} as const;

const sectionTitleStyle = {
  margin: '0 0 0.5rem 0',
  fontSize: '1.125rem',
  fontWeight: 600,
  color: '#0f172a'
} as const;

const codePanelStyle = {
  backgroundColor: '#f1f5f9',
  borderRadius: '8px',
  padding: '1rem',
  overflowX: 'auto',
  fontSize: '0.875rem',
  lineHeight: '1.5'
} as const;

const summaryStyle = {
  cursor: 'pointer',
  fontWeight: 600,
  padding: '0.5rem 0',
  outline: 'none'
} as const;

const codeWrapStyle = {
  marginTop: '0.5rem'
} as const;

const Highlight = ({ code, language }: { code: string; language: string }) => (
  <pre style={{ margin: 0, whiteSpace: 'pre-wrap', wordBreak: 'break-all' }}>
    <code className={`language-${language}`}>{code}</code>
  </pre>
);

export const BasicTable: Story = {
  name: 'Basic Table',
  render: () => {
    const htmlCode = `
<table class="eui-table">
  <thead>
    <tr>
      <th>Name</th>
      <th>Status</th>
      <th>Date</th>
      <th>Actions</th>
    </tr>
  </thead>
  <tbody>
    <tr>
      <td>Item 1</td>
      <td>Active</td>
      <td>2024-01-15</td>
      <td>
        <button class="eui-button" data-eui-intent="secondary">Edit</button>
      </td>
    </tr>
    <tr>
      <td>Item 2</td>
      <td>Inactive</td>
      <td>2024-01-14</td>
      <td>
        <button class="eui-button" data-eui-intent="secondary">Edit</button>
      </td>
    </tr>
    <tr>
      <td>Item 3</td>
      <td>Active</td>
      <td>2024-01-13</td>
      <td>
        <button class="eui-button" data-eui-intent="secondary">Edit</button>
      </td>
    </tr>
  </tbody>
</table>
    `;

    return (
      <div style={containerStyle}>
        <h3 style={sectionTitleStyle}>Basic Table</h3>
        <p style={{ margin: '0 0 1rem 0', color: '#64748b' }}>
          A standard table with header, rows, and clickable actions in cells.
        </p>

        <table className="eui-table">
          <thead>
            <tr>
              <th>Name</th>
              <th>Status</th>
              <th>Date</th>
              <th>Actions</th>
            </tr>
          </thead>
          <tbody>
            <tr>
              <td>Item 1</td>
              <td>Active</td>
              <td>2024-01-15</td>
              <td>
                <button className="eui-button" data-eui-intent="secondary">Edit</button>
              </td>
            </tr>
            <tr>
              <td>Item 2</td>
              <td>Inactive</td>
              <td>2024-01-14</td>
              <td>
                <button className="eui-button" data-eui-intent="secondary">Edit</button>
              </td>
            </tr>
            <tr>
              <td>Item 3</td>
              <td>Active</td>
              <td>2024-01-13</td>
              <td>
                <button className="eui-button" data-eui-intent="secondary">Edit</button>
              </td>
            </tr>
          </tbody>
        </table>

        <details style={codeWrapStyle}>
          <summary style={summaryStyle}>Expand to inspect code</summary>
          <div style={codePanelStyle}>
            <Highlight code={htmlCode.trim()} language="html" />
          </div>
        </details>
      </div>
    );
  }
};

export const TableWithFolders: Story = {
  name: 'Table with Collapsible Folders',
  render: () => {
    const [expandedFolders, setExpandedFolders] = useState<Set<string>>(new Set(['folder1']));

    const toggleFolder = (folderId: string) => {
      const newExpanded = new Set(expandedFolders);
      if (newExpanded.has(folderId)) {
        newExpanded.delete(folderId);
      } else {
        newExpanded.add(folderId);
      }
      setExpandedFolders(newExpanded);
    };

    const htmlCode = `
<table class="eui-table">
  <thead>
    <tr>
      <th>Name</th>
      <th>Status</th>
      <th>Date</th>
    </tr>
  </thead>
  <tbody>
    <!-- Folder row -->
    <tr 
      class="eui-table-folder" 
      data-eui-folder="true" 
      data-eui-expanded="true"
      onclick="toggleFolder('folder1')"
    >
      <td>📁 Folder 1</td>
      <td>—</td>
      <td>—</td>
    </tr>
    <!-- Child rows (visible when folder expanded) -->
    <tr data-eui-folder-parent="folder1" data-eui-folder-level="1">
      <td>Item 1.1</td>
      <td>Active</td>
      <td>2024-01-15</td>
    </tr>
    <tr data-eui-folder-parent="folder1" data-eui-folder-level="1">
      <td>Item 1.2</td>
      <td>Inactive</td>
      <td>2024-01-14</td>
    </tr>
    <!-- Another folder -->
    <tr 
      class="eui-table-folder" 
      data-eui-folder="true" 
      data-eui-expanded="false"
      onclick="toggleFolder('folder2')"
    >
      <td>📁 Folder 2</td>
      <td>—</td>
      <td>—</td>
    </tr>
    <!-- Child rows (hidden when folder collapsed) -->
    <tr data-eui-folder-parent="folder2" data-eui-folder-parent-collapsed="true" data-eui-folder-level="1">
      <td>Item 2.1</td>
      <td>Active</td>
      <td>2024-01-13</td>
    </tr>
  </tbody>
</table>
    `;

    return (
      <div style={containerStyle}>
        <h3 style={sectionTitleStyle}>Table with Collapsible Folders</h3>
        <p style={{ margin: '0 0 1rem 0', color: '#64748b' }}>
          Table rows can be organized into collapsible folders. Click on a folder row to expand/collapse it.
        </p>

        <table className="eui-table">
          <thead>
            <tr>
              <th>Name</th>
              <th>Status</th>
              <th>Date</th>
            </tr>
          </thead>
          <tbody>
            <tr
              data-eui-folder="true"
              data-eui-expanded={expandedFolders.has('folder1')}
              onClick={() => toggleFolder('folder1')}
            >
              <td>📁 Folder 1</td>
              <td>—</td>
              <td>—</td>
            </tr>
            {expandedFolders.has('folder1') && (
              <>
                <tr data-eui-folder-level="1">
                  <td>Item 1.1</td>
                  <td>Active</td>
                  <td>2024-01-15</td>
                </tr>
                <tr data-eui-folder-level="1">
                  <td>Item 1.2</td>
                  <td>Inactive</td>
                  <td>2024-01-14</td>
                </tr>
              </>
            )}
            <tr
              data-eui-folder="true"
              data-eui-expanded={expandedFolders.has('folder2')}
              onClick={() => toggleFolder('folder2')}
            >
              <td>📁 Folder 2</td>
              <td>—</td>
              <td>—</td>
            </tr>
            {expandedFolders.has('folder2') && (
              <tr data-eui-folder-level="1">
                <td>Item 2.1</td>
                <td>Active</td>
                <td>2024-01-13</td>
              </tr>
            )}
            <tr
              data-eui-folder="true"
              data-eui-expanded={expandedFolders.has('folder3')}
              onClick={() => toggleFolder('folder3')}
            >
              <td>📁 Folder 3</td>
              <td>—</td>
              <td>—</td>
            </tr>
            {expandedFolders.has('folder3') && (
              <>
                <tr data-eui-folder-level="1">
                  <td>📁 Subfolder 3.1</td>
                  <td>—</td>
                  <td>—</td>
                </tr>
                {expandedFolders.has('folder3') && (
                  <tr data-eui-folder-level="2">
                    <td>Item 3.1.1</td>
                    <td>Active</td>
                    <td>2024-01-12</td>
                  </tr>
                )}
              </>
            )}
          </tbody>
        </table>

        <details style={codeWrapStyle}>
          <summary style={summaryStyle}>Expand to inspect code</summary>
          <div style={codePanelStyle}>
            <Highlight code={htmlCode.trim()} language="html" />
          </div>
        </details>
      </div>
    );
  }
};

export const TableWithExpandableCells: Story = {
  name: 'Table with Expandable Cells',
  render: () => {
    const [expandedCell, setExpandedCell] = useState<string | null>(null);

    const toggleCell = (cellId: string) => {
      setExpandedCell(expandedCell === cellId ? null : cellId);
    };

    const htmlCode = `
<table class="eui-table">
  <thead>
    <tr>
      <th>Name</th>
      <th>Details</th>
      <th>Status</th>
    </tr>
  </thead>
  <tbody>
    <tr>
      <td>Item 1</td>
      <td 
        data-eui-expandable="true" 
        data-eui-expanded="false"
        onclick="toggleCell('cell1')"
      >
        Click to expand
        <div class="eui-table-cell-panel" data-eui-open="false">
          <h4>Details Panel</h4>
          <p>This is the expandable cell content. It appears as a panel when clicked.</p>
        </div>
      </td>
      <td>Active</td>
    </tr>
  </tbody>
</table>
    `;

    return (
      <div style={containerStyle}>
        <h3 style={sectionTitleStyle}>Table with Expandable Cells</h3>
        <p style={{ margin: '0 0 1rem 0', color: '#64748b' }}>
          Individual cells can be expandable. Click on a cell to reveal additional content in a panel.
        </p>

        <div style={{ position: 'relative' }}>
          <table className="eui-table">
            <thead>
              <tr>
                <th>Name</th>
                <th>Details</th>
                <th>Status</th>
              </tr>
            </thead>
            <tbody>
              <tr>
                <td>Item 1</td>
                <td
                  data-eui-expandable="true"
                  data-eui-expanded={expandedCell === 'cell1'}
                  onClick={() => toggleCell('cell1')}
                  style={{ position: 'relative', cursor: 'pointer' }}
                >
                  Click to expand details
                  {expandedCell === 'cell1' && (
                    <div
                      className="eui-table-cell-panel"
                      data-eui-open={true}
                      style={{
                        position: 'absolute',
                        top: '100%',
                        left: 0,
                        marginTop: '0.5rem',
                        zIndex: 100
                      }}
                    >
                      <h4 style={{ marginTop: 0 }}>Details Panel</h4>
                      <p>This is the expandable cell content. It appears as a panel when clicked.</p>
                      <p>You can put forms, additional information, or any content here.</p>
                    </div>
                  )}
                </td>
                <td>Active</td>
              </tr>
              <tr>
                <td>Item 2</td>
                <td
                  data-eui-expandable="true"
                  data-eui-expanded={expandedCell === 'cell2'}
                  onClick={() => toggleCell('cell2')}
                  style={{ position: 'relative', cursor: 'pointer' }}
                >
                  Click to expand details
                  {expandedCell === 'cell2' && (
                    <div
                      className="eui-table-cell-panel"
                      data-eui-open={true}
                      style={{
                        position: 'absolute',
                        top: '100%',
                        left: 0,
                        marginTop: '0.5rem',
                        zIndex: 100
                      }}
                    >
                      <h4 style={{ marginTop: 0 }}>Item 2 Details</h4>
                      <p>Different content for Item 2.</p>
                    </div>
                  )}
                </td>
                <td>Inactive</td>
              </tr>
            </tbody>
          </table>
        </div>

        <details style={codeWrapStyle}>
          <summary style={summaryStyle}>Expand to inspect code</summary>
          <div style={codePanelStyle}>
            <Highlight code={htmlCode.trim()} language="html" />
          </div>
        </details>
      </div>
    );
  }
};

export const ComplexTable: Story = {
  name: 'Complex Table (Folders + Expandable Cells)',
  render: () => {
    const [expandedFolders, setExpandedFolders] = useState<Set<string>>(new Set(['folder1']));
    const [expandedCell, setExpandedCell] = useState<string | null>(null);

    const toggleFolder = (folderId: string) => {
      const newExpanded = new Set(expandedFolders);
      if (newExpanded.has(folderId)) {
        newExpanded.delete(folderId);
      } else {
        newExpanded.add(folderId);
      }
      setExpandedFolders(newExpanded);
    };

    const toggleCell = (cellId: string) => {
      setExpandedCell(expandedCell === cellId ? null : cellId);
    };

    return (
      <div style={containerStyle}>
        <h3 style={sectionTitleStyle}>Complex Table (Folders + Expandable Cells)</h3>
        <p style={{ margin: '0 0 1rem 0', color: '#64748b' }}>
          A table combining collapsible folders and expandable cells. This demonstrates the full complexity of the table component.
        </p>

        <div style={{ position: 'relative' }}>
          <table className="eui-table">
            <thead>
              <tr>
                <th>Name</th>
                <th>Details</th>
                <th>Status</th>
                <th>Actions</th>
              </tr>
            </thead>
            <tbody>
              <tr
                data-eui-folder="true"
                data-eui-expanded={expandedFolders.has('folder1')}
                onClick={() => toggleFolder('folder1')}
              >
                <td>📁 Folder 1</td>
                <td>—</td>
                <td>—</td>
                <td>—</td>
              </tr>
              {expandedFolders.has('folder1') && (
                <>
                  <tr data-eui-folder-level="1">
                    <td>Item 1.1</td>
                    <td
                      data-eui-expandable="true"
                      data-eui-expanded={expandedCell === 'cell1.1'}
                      onClick={(e) => {
                        e.stopPropagation();
                        toggleCell('cell1.1');
                      }}
                      style={{ position: 'relative', cursor: 'pointer' }}
                    >
                      Click to expand
                      {expandedCell === 'cell1.1' && (
                        <div
                          className="eui-table-cell-panel"
                          data-eui-open={true}
                          style={{
                            position: 'absolute',
                            top: '100%',
                            left: 0,
                            marginTop: '0.5rem',
                            zIndex: 100
                          }}
                        >
                          <h4 style={{ marginTop: 0 }}>Item 1.1 Details</h4>
                          <p>Details for Item 1.1 inside Folder 1.</p>
                        </div>
                      )}
                    </td>
                    <td>Active</td>
                    <td>
                      <button className="eui-button" data-eui-intent="secondary">Edit</button>
                    </td>
                  </tr>
                  <tr data-eui-folder-level="1">
                    <td>Item 1.2</td>
                    <td>No details</td>
                    <td>Inactive</td>
                    <td>
                      <button className="eui-button" data-eui-intent="secondary">Edit</button>
                    </td>
                  </tr>
                </>
              )}
              <tr
                data-eui-folder="true"
                data-eui-expanded={expandedFolders.has('folder2')}
                onClick={() => toggleFolder('folder2')}
              >
                <td>📁 Folder 2</td>
                <td>—</td>
                <td>—</td>
                <td>—</td>
              </tr>
              {expandedFolders.has('folder2') && (
                <tr data-eui-folder-level="1">
                  <td>Item 2.1</td>
                  <td>No details</td>
                  <td>Active</td>
                  <td>
                    <button className="eui-button" data-eui-intent="secondary">Edit</button>
                  </td>
                </tr>
              )}
            </tbody>
          </table>
        </div>
      </div>
    );
  }
};

export const TableStates: Story = {
  name: 'Table Row States',
  render: () => {
    return (
      <div style={containerStyle}>
        <h3 style={sectionTitleStyle}>Table Row States</h3>
        <p style={{ margin: '0 0 1rem 0', color: '#64748b' }}>
          Table rows support different states: default, hover, and selected.
        </p>

        <table className="eui-table">
          <thead>
            <tr>
              <th>Name</th>
              <th>Status</th>
              <th>State</th>
            </tr>
          </thead>
          <tbody>
            <tr>
              <td>Default Row</td>
              <td>Active</td>
              <td>Default (hover to see hover state)</td>
            </tr>
            <tr data-eui-selected="true">
              <td>Selected Row</td>
              <td>Active</td>
              <td>Selected (data-eui-selected="true")</td>
            </tr>
            <tr>
              <td>Another Default Row</td>
              <td>Inactive</td>
              <td>Default</td>
            </tr>
          </tbody>
        </table>
      </div>
    );
  }
};

