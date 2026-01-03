import type { Meta, StoryObj } from '@storybook/react';
import React from 'react';
import { getSectionParameters } from '../../.storybook/preview';

const meta: Meta = {
  title: 'HTML + CSS/Components/Avatar',
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

const sectionStyle = {
  display: 'flex',
  flexDirection: 'column',
  gap: '1rem'
} as const;

const sectionTitleStyle = {
  margin: '0 0 0.5rem 0',
  fontSize: '1.125rem',
  fontWeight: 600,
  color: '#0f172a'
} as const;

const rowStyle = {
  display: 'flex',
  gap: '1.5rem',
  flexWrap: 'wrap',
  alignItems: 'center'
} as const;

// Helper function to get initials from name
const getInitials = (name: string): string => {
  const parts = name.trim().split(/\s+/);
  if (parts.length >= 2) {
    return (parts[0][0] + parts[parts.length - 1][0]).toUpperCase();
  }
  return name.substring(0, 2).toUpperCase();
};

export const AvatarWithImages: Story = {
  name: 'With Images',
  parameters: {
    // Apply section-specific parameters automatically
    ...getSectionParameters('HTML + CSS/Components/Avatar'),
    docs: {
      canvas: { sourceState: 'none' },
      codePanel: false
    }
  },
  render: () => (
    <div style={containerStyle}>
      <div style={sectionStyle}>
        <h3 style={sectionTitleStyle}>Avatar with Images</h3>
        <p style={{ margin: '0 0 1rem 0', color: '#64748b' }}>
          Avatars display user profile images. Images fill the entire avatar area with a border for visual separation.
        </p>
        <div style={rowStyle}>
          <div className="eui-avatar" data-eui-size="sm">
            <img src="https://i.pravatar.cc/150?img=1" alt="User" />
          </div>
          <div className="eui-avatar" data-eui-size="md">
            <img src="https://i.pravatar.cc/150?img=2" alt="User" />
          </div>
          <div className="eui-avatar" data-eui-size="lg">
            <img src="https://i.pravatar.cc/150?img=3" alt="User" />
          </div>
        </div>
      </div>
    </div>
  )
};

export const AvatarWithInitials: Story = {
  name: 'With Initials (Fallback)',
  parameters: {
    docs: {
      canvas: { sourceState: 'none' },
      codePanel: false
    }
  },
  render: () => (
    <div style={containerStyle}>
      <div style={sectionStyle}>
        <h3 style={sectionTitleStyle}>Avatar with Initials (Fallback)</h3>
        <p style={{ margin: '0 0 1rem 0', color: '#64748b' }}>
          When no image is available, avatars display initials extracted from the user's name on a light gray background.
        </p>
        <div style={sectionStyle}>
          <h4 style={{ margin: '0 0 0.5rem 0', fontSize: '1rem', fontWeight: 600 }}>Default Color</h4>
          <div style={rowStyle}>
            <div className="eui-avatar" data-eui-size="sm">
              <span className="eui-avatar-initials">{getInitials('John Doe')}</span>
            </div>
            <div className="eui-avatar" data-eui-size="md">
              <span className="eui-avatar-initials">{getInitials('Jane Smith')}</span>
            </div>
            <div className="eui-avatar" data-eui-size="lg">
              <span className="eui-avatar-initials">{getInitials('Bob Johnson')}</span>
            </div>
          </div>
        </div>
      </div>
    </div>
  )
};

export const AvatarSizes: Story = {
  name: 'Sizes',
  parameters: {
    docs: {
      canvas: { sourceState: 'none' },
      codePanel: false
    }
  },
  render: () => (
    <div style={containerStyle}>
      <div style={sectionStyle}>
        <h3 style={sectionTitleStyle}>Avatar Sizes</h3>
        <p style={{ margin: '0 0 1rem 0', color: '#64748b' }}>
          Avatars come in three sizes: small (28px), medium (32px, default), and large (40px).
        </p>
        <div style={rowStyle}>
          <div style={{ display: 'flex', flexDirection: 'column', alignItems: 'center', gap: '0.5rem' }}>
            <div className="eui-avatar" data-eui-size="sm">
              <img src="https://i.pravatar.cc/150?img=1" alt="User" />
            </div>
            <span style={{ fontSize: '0.875rem', color: '#64748b' }}>Small (28px)</span>
          </div>
          <div style={{ display: 'flex', flexDirection: 'column', alignItems: 'center', gap: '0.5rem' }}>
            <div className="eui-avatar" data-eui-size="md">
              <img src="https://i.pravatar.cc/150?img=2" alt="User" />
            </div>
            <span style={{ fontSize: '0.875rem', color: '#64748b' }}>Medium (32px)</span>
          </div>
          <div style={{ display: 'flex', flexDirection: 'column', alignItems: 'center', gap: '0.5rem' }}>
            <div className="eui-avatar" data-eui-size="lg">
              <img src="https://i.pravatar.cc/150?img=3" alt="User" />
            </div>
            <span style={{ fontSize: '0.875rem', color: '#64748b' }}>Large (40px)</span>
          </div>
        </div>
      </div>
    </div>
  )
};

export const AvatarMixed: Story = {
  name: 'Mixed Examples',
  parameters: {
    docs: {
      canvas: { sourceState: 'none' },
      codePanel: false
    }
  },
  render: () => (
    <div style={containerStyle}>
      <div style={sectionStyle}>
        <h3 style={sectionTitleStyle}>Mixed Examples</h3>
        <p style={{ margin: '0 0 1rem 0', color: '#64748b' }}>
          Real-world usage often includes a mix of avatars with images and initials.
        </p>
        <div style={rowStyle}>
          <div className="eui-avatar" data-eui-size="md">
            <img src="https://i.pravatar.cc/150?img=4" alt="User" />
          </div>
          <div className="eui-avatar" data-eui-size="md">
            <span className="eui-avatar-initials">{getInitials('Sarah Connor')}</span>
          </div>
          <div className="eui-avatar" data-eui-size="md">
            <img src="https://i.pravatar.cc/150?img=5" alt="User" />
          </div>
          <div className="eui-avatar" data-eui-size="md">
            <span className="eui-avatar-initials">{getInitials('Mike Taylor')}</span>
          </div>
          <div className="eui-avatar" data-eui-size="md">
            <img src="https://i.pravatar.cc/150?img=6" alt="User" />
          </div>
        </div>
      </div>
    </div>
  )
};

export const AvatarContexts: Story = {
  name: 'Contexts',
  parameters: {
    docs: {
      canvas: { sourceState: 'none' },
      codePanel: false
    }
  },
  render: () => (
    <div style={containerStyle}>
      <div style={sectionStyle}>
        <h3 style={sectionTitleStyle}>Contexts</h3>
        <p style={{ margin: '0 0 1rem 0', color: '#64748b' }}>
          Avatars adapt to different rendering contexts (app, site, report).
        </p>
        <div style={sectionStyle}>
          <h4 style={{ margin: '0 0 0.5rem 0', fontSize: '1rem', fontWeight: 600 }}>Application Context (app)</h4>
          <div style={rowStyle}>
            <div className="eui-avatar" data-eui-size="md">
              <img src="https://i.pravatar.cc/150?img=7" alt="User" />
            </div>
            <div className="eui-avatar" data-eui-size="md">
              <span className="eui-avatar-initials">{getInitials('App User')}</span>
            </div>
          </div>
        </div>
        <div style={sectionStyle}>
          <h4 style={{ margin: '0 0 0.5rem 0', fontSize: '1rem', fontWeight: 600 }}>Report Context (report)</h4>
          <p style={{ margin: '0 0 0.5rem 0', fontSize: '0.875rem', color: '#64748b' }}>
            In report context, avatars use print-optimized styling with border colors adapted for document printing.
          </p>
          <div style={rowStyle}>
            <div className="eui-avatar" data-eui-size="md">
              <img src="https://i.pravatar.cc/150?img=8" alt="User" />
            </div>
            <div className="eui-avatar" data-eui-size="md">
              <span className="eui-avatar-initials">{getInitials('Report User')}</span>
            </div>
          </div>
        </div>
      </div>
    </div>
  )
};

