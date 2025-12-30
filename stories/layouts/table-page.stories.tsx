import type { Meta, StoryObj } from '@storybook/react';

const meta: Meta = {
  title: 'HTML + CSS/Layout/Table Page',
  tags: ['autodocs']
};

export default meta;

type Story = StoryObj;

export const TablePage: Story = {
  name: 'Table Page Template',
  parameters: {
    docs: {
      canvas: { sourceState: 'none' },
      codePanel: false
    },
    layout: 'fullscreen'
  },
  render: () => (
    <div data-eui-context="app">
      <div className="eui-page">
        <div className="eui-page__header">
          <div className="eui-container" data-eui-container="wide">
            <div className="eui-page-header">
              <div className="eui-page-header__title-row">
                <div className="eui-page-header__title-section">
                  <h1 className="eui-page-header__title">Projects</h1>
                  <p className="eui-page-header__description">Manage and view all projects in the system.</p>
                </div>
                <div className="eui-page-header__actions">
                  <div data-eui-slot="primary">
                    <button className="eui-button" data-eui-intent="primary" data-eui-size="md">Create Project</button>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
        <div className="eui-page__body">
          <div className="eui-container" data-eui-container="wide">
            <div className="eui-stack" data-eui-gap="md">
              {/* Quick Filters Bar */}
              <div className="eui-toolbar">
                <div className="eui-toolbar__left">
                  <button className="eui-button" data-eui-intent="secondary" data-eui-size="sm">All</button>
                  <button className="eui-button" data-eui-intent="secondary" data-eui-size="sm">Pending</button>
                  <button className="eui-button" data-eui-intent="secondary" data-eui-size="sm">On Track</button>
                  <button className="eui-button" data-eui-intent="secondary" data-eui-size="sm">Completed</button>
                </div>
              </div>
              {/* Table Controls Bar */}
              <div className="eui-toolbar">
                <div className="eui-toolbar__left">
                  <input className="eui-input" type="search" placeholder="Search projects..." style={{ width: '300px' }} />
                  <button className="eui-button" data-eui-intent="secondary" data-eui-size="md">Sort</button>
                  <button className="eui-button" data-eui-intent="secondary" data-eui-size="md">Columns</button>
                </div>
                <div className="eui-toolbar__right">
                  <button className="eui-button" data-eui-intent="secondary" data-eui-size="md">Export</button>
                </div>
              </div>
              {/* Table Region (scrollable) */}
              <div style={{ overflowX: 'auto', border: '1px solid var(--eui-color-border-default)', borderRadius: '8px' }}>
                <table className="eui-table" style={{ width: '100%', minWidth: '800px' }}>
                  <thead>
                    <tr>
                      <th style={{ padding: '1rem', textAlign: 'left' }}>Name</th>
                      <th style={{ padding: '1rem', textAlign: 'left' }}>Status</th>
                      <th style={{ padding: '1rem', textAlign: 'left' }}>Start Date</th>
                      <th style={{ padding: '1rem', textAlign: 'left' }}>End Date</th>
                      <th style={{ padding: '1rem', textAlign: 'right' }}>Actions</th>
                    </tr>
                  </thead>
                  <tbody>
                    {[1, 2, 3, 4, 5].map((i) => (
                      <tr key={i}>
                        <td style={{ padding: '1rem' }}>Project {i}</td>
                        <td style={{ padding: '1rem' }}>On Track</td>
                        <td style={{ padding: '1rem' }}>2024-01-{String(i).padStart(2, '0')}</td>
                        <td style={{ padding: '1rem' }}>2024-12-{String(i).padStart(2, '0')}</td>
                        <td style={{ padding: '1rem', textAlign: 'right' }}>
                          <button className="eui-button" data-eui-intent="secondary" data-eui-size="sm">Edit</button>
                        </td>
                      </tr>
                    ))}
                  </tbody>
                </table>
              </div>
              {/* Pagination Footer */}
              <div className="eui-toolbar" style={{ justifyContent: 'center' }}>
                <div className="eui-toolbar__center">
                  <button className="eui-button" data-eui-intent="secondary" data-eui-size="sm">Previous</button>
                  <span style={{ padding: '0 1rem', color: 'var(--eui-color-text-muted)' }}>Page 1 of 5</span>
                  <button className="eui-button" data-eui-intent="secondary" data-eui-size="sm">Next</button>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  )
};

