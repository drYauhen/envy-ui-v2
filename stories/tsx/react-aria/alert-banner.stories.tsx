import type { Meta, StoryObj } from '@storybook/react';
import React, { useState } from 'react';
import { AlertBanner } from '../../../packages/tsx/alert-banner';
import { Icon } from '../../../packages/tsx/icon';
import { getSectionParameters } from '../../../.storybook/preview';

const meta: Meta = {
  title: 'TSX + React Aria/Components/AlertBanner',
  parameters: {
    // Apply section-specific parameters automatically
    ...getSectionParameters('TSX + React Aria/Components/AlertBanner'),
    layout: 'fullscreen'
  }
};

export default meta;
type Story = StoryObj;

export const Info: Story = {
  render: () => (
    <div data-eui-context="app" style={{ paddingTop: '60px' }}>
      <AlertBanner
        id="info-1"
        variant="info"
        message="New feature available! Check out our updated dashboard."
        link={{ text: 'Learn more', href: '#' }}
        dismissible
      />
      <div style={{ padding: '2rem' }}>
        <h1>Application Content</h1>
        <p>This is your application content. The alert banner appears above everything.</p>
      </div>
    </div>
  )
};

export const Warning: Story = {
  render: () => (
    <div data-eui-context="app" style={{ paddingTop: '60px' }}>
      <AlertBanner
        id="warning-1"
        variant="warning"
        message="Database migration in progress for Australia region"
        link={{ text: 'Learn more', href: '#' }}
        dismissible
        allowPersistence
        dismissalType="persistent"
      />
      <div style={{ padding: '2rem' }}>
        <h1>Application Content</h1>
        <p>This warning banner indicates a system-wide announcement.</p>
      </div>
    </div>
  )
};

export const Error: Story = {
  render: () => (
    <div data-eui-context="app" style={{ paddingTop: '60px' }}>
      <AlertBanner
        id="error-1"
        variant="error"
        message="Service outage expected tonight at 2 AM"
        dismissible
      />
      <div style={{ padding: '2rem' }}>
        <h1>Application Content</h1>
        <p>This error banner indicates a critical system issue.</p>
      </div>
    </div>
  )
};

export const Success: Story = {
  render: () => (
    <div data-eui-context="app" style={{ paddingTop: '60px' }}>
      <AlertBanner
        id="success-1"
        variant="success"
        message="System update completed successfully"
        dismissible
      />
      <div style={{ padding: '2rem' }}>
        <h1>Application Content</h1>
        <p>This success banner confirms a positive system update.</p>
      </div>
    </div>
  )
};

export const WithDontShowAgain: Story = {
  render: () => (
    <div data-eui-context="app" style={{ paddingTop: '60px' }}>
      <AlertBanner
        id="persistent-1"
        variant="warning"
        message="Scheduled maintenance tonight at 2 AM for Australia region"
        link={{ text: 'View maintenance window', href: '#' }}
        dismissible
        allowPersistence
        dismissalType="persistent"
      />
      <div style={{ padding: '2rem' }}>
        <h1>Application Content</h1>
        <p>This banner includes "Don't show again" option for persistent dismissal.</p>
        <p>Try dismissing it - it will be remembered across page reloads.</p>
      </div>
    </div>
  )
};

export const SessionDismissal: Story = {
  render: () => (
    <div data-eui-context="app" style={{ paddingTop: '60px' }}>
      <AlertBanner
        id="session-1"
        variant="info"
        message="This banner will reappear on next page load (session-only dismissal)"
        dismissible
        dismissalType="session"
      />
      <div style={{ padding: '2rem' }}>
        <h1>Application Content</h1>
        <p>This banner uses session-only dismissal. It will reappear after page reload.</p>
      </div>
    </div>
  )
};

export const NonDismissible: Story = {
  render: () => (
    <div data-eui-context="app" style={{ paddingTop: '60px' }}>
      <AlertBanner
        id="non-dismissible-1"
        variant="info"
        message="This banner cannot be dismissed and will remain visible"
        dismissible={false}
      />
      <div style={{ padding: '2rem' }}>
        <h1>Application Content</h1>
        <p>This banner has no dismiss button and remains visible.</p>
      </div>
    </div>
  )
};

export const MultipleBanners: Story = {
  render: () => {
    const [showBanner1, setShowBanner1] = useState(true);
    const [showBanner2, setShowBanner2] = useState(true);

    return (
      <div data-eui-context="app" style={{ paddingTop: '120px' }}>
        {showBanner1 && (
          <AlertBanner
            id="multiple-1"
            variant="info"
            message="First banner - dismissible"
            dismissible
            onDismiss={() => setShowBanner1(false)}
          />
        )}
        {showBanner2 && (
          <AlertBanner
            id="multiple-2"
            variant="warning"
            message="Second banner - appears below first (this would need layout adjustment in real app)"
            dismissible
            onDismiss={() => setShowBanner2(false)}
          />
        )}
        <div style={{ padding: '2rem' }}>
          <h1>Application Content</h1>
          <p>Multiple banners can be stacked (requires layout adjustment for positioning).</p>
        </div>
      </div>
    );
  }
};

export const WithSelectDropdown: Story = {
  render: () => (
    <div data-eui-context="app" style={{ paddingTop: '60px' }}>
      <AlertBanner id="select-1" variant="warning">
        <span data-eui-slot="icon">
          <Icon name="exclamation-circle" size={20} />
        </span>
        <div data-eui-slot="content">
          <p style={{ margin: 0, marginBottom: '0.5rem' }}>
            Database migration in progress. Select region:
          </p>
          <select
            style={{
              padding: '0.375rem 0.5rem',
              borderRadius: '4px',
              border: '1px solid var(--eui-color-border-default)',
              fontSize: '0.875rem',
              backgroundColor: 'var(--eui-color-background-default)',
              color: 'var(--eui-color-text-primary)',
              minWidth: '200px'
            }}
          >
            <option>North America</option>
            <option>Europe</option>
            <option>Asia Pacific</option>
            <option>Australia</option>
          </select>
        </div>
      </AlertBanner>
      <div style={{ padding: '2rem' }}>
        <h1>Application Content</h1>
        <p>This banner uses slots to include a select dropdown for region selection.</p>
      </div>
    </div>
  )
};

export const WithCustomActions: Story = {
  render: () => (
    <div data-eui-context="app" style={{ paddingTop: '60px' }}>
      <AlertBanner id="custom-actions-1" variant="info">
        <span data-eui-slot="icon">
          <Icon name="info-circle" size={20} />
        </span>
        <div data-eui-slot="content">
          <p style={{ margin: 0 }}>New feature available! Try our enhanced dashboard.</p>
        </div>
        <div data-eui-slot="actions" style={{ display: 'flex', gap: '0.5rem' }}>
          <button
            style={{
              padding: '0.375rem 0.75rem',
              borderRadius: '4px',
              border: '1px solid var(--eui-color-border-default)',
              backgroundColor: 'var(--eui-color-background-default)',
              color: 'var(--eui-color-text-primary)',
              fontSize: '0.875rem',
              cursor: 'pointer'
            }}
          >
            Learn More
          </button>
        </div>
      </AlertBanner>
      <div style={{ padding: '2rem' }}>
        <h1>Application Content</h1>
        <p>This banner includes custom action buttons via the actions slot.</p>
      </div>
    </div>
  )
};

export const WithComplexLayout: Story = {
  render: () => (
    <div data-eui-context="app" style={{ paddingTop: '60px' }}>
      <AlertBanner id="complex-1" variant="warning">
        <span data-eui-slot="icon">
          <Icon name="exclamation-circle" size={20} />
        </span>
        <div
          data-eui-slot="content"
          style={{
            display: 'flex',
            gap: '1rem',
            alignItems: 'center',
            flexWrap: 'wrap'
          }}
        >
          <span>Service degraded for:</span>
          <select
            style={{
              padding: '0.375rem 0.5rem',
              borderRadius: '4px',
              border: '1px solid var(--eui-color-border-default)',
              fontSize: '0.875rem',
              backgroundColor: 'var(--eui-color-background-default)',
              color: 'var(--eui-color-text-primary)'
            }}
          >
            <option>North America</option>
            <option>Europe</option>
          </select>
          <span>Expected resolution:</span>
          <input
            type="time"
            defaultValue="14:00"
            style={{
              padding: '0.375rem 0.5rem',
              borderRadius: '4px',
              border: '1px solid var(--eui-color-border-default)',
              fontSize: '0.875rem',
              backgroundColor: 'var(--eui-color-background-default)',
              color: 'var(--eui-color-text-primary)'
            }}
          />
        </div>
      </AlertBanner>
      <div style={{ padding: '2rem' }}>
        <h1>Application Content</h1>
        <p>This banner demonstrates a complex layout with multiple form elements.</p>
      </div>
    </div>
  )
};

