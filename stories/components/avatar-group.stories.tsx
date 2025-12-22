import type { Meta, StoryObj } from '@storybook/react';
import React from 'react';

const meta: Meta = {
  title: 'HTML + CSS/Components/AvatarGroup',
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

export const BasicOverlap: Story = {
  name: 'Basic Overlap',
  parameters: {
    docs: {
      canvas: { sourceState: 'none' },
      codePanel: false
    }
  },
  render: () => (
    <div style={containerStyle}>
      <div style={sectionStyle}>
        <h3 style={sectionTitleStyle}>Basic Overlap</h3>
        <p style={{ margin: '0 0 1rem 0', color: '#64748b' }}>
          Avatars in a group overlap each other with a standard 8px offset. Hover over any avatar to see neighbors spread apart.
        </p>
        <div className="eui-avatar-group" data-eui-size="md">
          <div className="eui-avatar" data-eui-size="md">
            <img src="https://i.pravatar.cc/150?img=1" alt="User 1" />
          </div>
          <div className="eui-avatar" data-eui-size="md">
            <img src="https://i.pravatar.cc/150?img=2" alt="User 2" />
          </div>
          <div className="eui-avatar" data-eui-size="md">
            <img src="https://i.pravatar.cc/150?img=3" alt="User 3" />
          </div>
          <div className="eui-avatar" data-eui-size="md">
            <img src="https://i.pravatar.cc/150?img=4" alt="User 4" />
          </div>
        </div>
      </div>
    </div>
  )
};

export const WithInitials: Story = {
  name: 'With Initials',
  parameters: {
    docs: {
      canvas: { sourceState: 'none' },
      codePanel: false
    }
  },
  render: () => (
    <div style={containerStyle}>
      <div style={sectionStyle}>
        <h3 style={sectionTitleStyle}>Mixed: Images and Initials</h3>
        <p style={{ margin: '0 0 1rem 0', color: '#64748b' }}>
          Avatar groups can contain a mix of images and initials fallback.
        </p>
        <div className="eui-avatar-group" data-eui-size="md">
          <div className="eui-avatar" data-eui-size="md">
            <img src="https://i.pravatar.cc/150?img=10" alt="User 1" />
          </div>
          <div className="eui-avatar" data-eui-size="md">
            <span className="eui-avatar-initials">{getInitials('John Doe')}</span>
          </div>
          <div className="eui-avatar" data-eui-size="md">
            <img src="https://i.pravatar.cc/150?img=11" alt="User 3" />
          </div>
          <div className="eui-avatar" data-eui-size="md" data-eui-fallback-color="variant1">
            <span className="eui-avatar-initials">{getInitials('Jane Smith')}</span>
          </div>
        </div>
      </div>
    </div>
  )
};

export const WithCount: Story = {
  name: 'With Count Indicator',
  parameters: {
    docs: {
      canvas: { sourceState: 'none' },
      codePanel: false
    }
  },
  render: () => (
    <div style={containerStyle}>
      <div style={sectionStyle}>
        <h3 style={sectionTitleStyle}>With Count Indicator</h3>
        <p style={{ margin: '0 0 1rem 0', color: '#64748b' }}>
          When there are more than 4 avatars, show the first 4 and a count indicator for the remaining. Hover over the count to see the spread animation.
        </p>
        <div style={sectionStyle}>
          <h4 style={{ margin: '0 0 0.5rem 0', fontSize: '1rem', fontWeight: 600 }}>5 avatars (4 + 1)</h4>
          <div className="eui-avatar-group" data-eui-size="md">
            <div className="eui-avatar" data-eui-size="md">
              <img src="https://i.pravatar.cc/150?img=20" alt="User 1" />
            </div>
            <div className="eui-avatar" data-eui-size="md">
              <img src="https://i.pravatar.cc/150?img=21" alt="User 2" />
            </div>
            <div className="eui-avatar" data-eui-size="md">
              <img src="https://i.pravatar.cc/150?img=22" alt="User 3" />
            </div>
            <div className="eui-avatar" data-eui-size="md">
              <img src="https://i.pravatar.cc/150?img=23" alt="User 4" />
            </div>
            <div className="eui-counter" data-eui-variant="text">+1</div>
          </div>
        </div>
        <div style={sectionStyle}>
          <h4 style={{ margin: '0 0 0.5rem 0', fontSize: '1rem', fontWeight: 600 }}>10 avatars (4 + 6)</h4>
          <div className="eui-avatar-group" data-eui-size="md">
            <div className="eui-avatar" data-eui-size="md">
              <img src="https://i.pravatar.cc/150?img=30" alt="User 1" />
            </div>
            <div className="eui-avatar" data-eui-size="md">
              <img src="https://i.pravatar.cc/150?img=31" alt="User 2" />
            </div>
            <div className="eui-avatar" data-eui-size="md">
              <img src="https://i.pravatar.cc/150?img=32" alt="User 3" />
            </div>
            <div className="eui-avatar" data-eui-size="md">
              <img src="https://i.pravatar.cc/150?img=33" alt="User 4" />
            </div>
            <div className="eui-counter" data-eui-variant="text">+6</div>
          </div>
        </div>
      </div>
    </div>
  )
};

export const Sizes: Story = {
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
        <h3 style={sectionTitleStyle}>Different Sizes</h3>
        <p style={{ margin: '0 0 1rem 0', color: '#64748b' }}>
          Avatar groups support all avatar sizes. Overlap amount scales proportionally.
        </p>
        <div style={sectionStyle}>
          <h4 style={{ margin: '0 0 0.5rem 0', fontSize: '1rem', fontWeight: 600 }}>Small</h4>
          <div className="eui-avatar-group" data-eui-size="sm">
            <div className="eui-avatar" data-eui-size="sm">
              <img src="https://i.pravatar.cc/150?img=40" alt="User 1" />
            </div>
            <div className="eui-avatar" data-eui-size="sm">
              <img src="https://i.pravatar.cc/150?img=41" alt="User 2" />
            </div>
            <div className="eui-avatar" data-eui-size="sm">
              <img src="https://i.pravatar.cc/150?img=42" alt="User 3" />
            </div>
            <div className="eui-avatar" data-eui-size="sm">
              <img src="https://i.pravatar.cc/150?img=43" alt="User 4" />
            </div>
          </div>
        </div>
        <div style={sectionStyle}>
          <h4 style={{ margin: '0 0 0.5rem 0', fontSize: '1rem', fontWeight: 600 }}>Medium (Default)</h4>
          <div className="eui-avatar-group" data-eui-size="md">
            <div className="eui-avatar" data-eui-size="md">
              <img src="https://i.pravatar.cc/150?img=44" alt="User 1" />
            </div>
            <div className="eui-avatar" data-eui-size="md">
              <img src="https://i.pravatar.cc/150?img=45" alt="User 2" />
            </div>
            <div className="eui-avatar" data-eui-size="md">
              <img src="https://i.pravatar.cc/150?img=46" alt="User 3" />
            </div>
            <div className="eui-avatar" data-eui-size="md">
              <img src="https://i.pravatar.cc/150?img=47" alt="User 4" />
            </div>
          </div>
        </div>
        <div style={sectionStyle}>
          <h4 style={{ margin: '0 0 0.5rem 0', fontSize: '1rem', fontWeight: 600 }}>Large</h4>
          <div className="eui-avatar-group" data-eui-size="lg">
            <div className="eui-avatar" data-eui-size="lg">
              <img src="https://i.pravatar.cc/150?img=48" alt="User 1" />
            </div>
            <div className="eui-avatar" data-eui-size="lg">
              <img src="https://i.pravatar.cc/150?img=49" alt="User 2" />
            </div>
            <div className="eui-avatar" data-eui-size="lg">
              <img src="https://i.pravatar.cc/150?img=50" alt="User 3" />
            </div>
            <div className="eui-avatar" data-eui-size="lg">
              <img src="https://i.pravatar.cc/150?img=51" alt="User 4" />
            </div>
          </div>
        </div>
      </div>
    </div>
  )
};

export const HoverAnimation: Story = {
  name: 'Hover Animation (Interactive)',
  parameters: {
    docs: {
      canvas: { sourceState: 'none' },
      codePanel: false
    }
  },
  render: () => (
    <div style={containerStyle}>
      <div style={sectionStyle}>
        <h3 style={sectionTitleStyle}>Hover Animation</h3>
        <p style={{ margin: '0 0 1rem 0', color: '#64748b' }}>
          <strong>Try hovering over any avatar!</strong> When you hover over an avatar, it scales up slightly and neighbors spread apart for better visibility. The animation is smooth and non-intrusive.
        </p>
        <div className="eui-avatar-group" data-eui-size="md">
          <div className="eui-avatar" data-eui-size="md">
            <img src="https://i.pravatar.cc/150?img=60" alt="User 1" />
          </div>
          <div className="eui-avatar" data-eui-size="md">
            <img src="https://i.pravatar.cc/150?img=61" alt="User 2" />
          </div>
          <div className="eui-avatar" data-eui-size="md">
            <img src="https://i.pravatar.cc/150?img=62" alt="User 3" />
          </div>
          <div className="eui-avatar" data-eui-size="md">
            <img src="https://i.pravatar.cc/150?img=63" alt="User 4" />
          </div>
          <div className="eui-avatar" data-eui-size="md">
            <img src="https://i.pravatar.cc/150?img=64" alt="User 5" />
          </div>
        </div>
        <div style={{ marginTop: '1rem', padding: '1rem', backgroundColor: '#f8fafc', borderRadius: '8px' }}>
          <p style={{ margin: 0, fontSize: '0.875rem', color: '#64748b' }}>
            <strong>How it works:</strong> The hovered avatar scales to 110% and moves to a higher z-index. Neighbors on the right move right, and neighbors on the left move left, creating a spread effect that reveals more of each avatar.
          </p>
        </div>
      </div>
    </div>
  )
};

export const LargeGroup: Story = {
  name: 'Large Group with Count',
  parameters: {
    docs: {
      canvas: { sourceState: 'none' },
      codePanel: false
    }
  },
  render: () => (
    <div style={containerStyle}>
      <div style={sectionStyle}>
        <h3 style={sectionTitleStyle}>Large Group with Count</h3>
        <p style={{ margin: '0 0 1rem 0', color: '#64748b' }}>
          For large groups, only the first 4 avatars are shown, followed by a count indicator. Hover over any avatar or the count to see the spread animation.
        </p>
        <div className="eui-avatar-group" data-eui-size="md">
          <div className="eui-avatar" data-eui-size="md">
            <img src="https://i.pravatar.cc/150?img=70" alt="User 1" />
          </div>
          <div className="eui-avatar" data-eui-size="md">
            <span className="eui-avatar-initials">{getInitials('Alice Brown')}</span>
          </div>
          <div className="eui-avatar" data-eui-size="md">
            <img src="https://i.pravatar.cc/150?img=71" alt="User 3" />
          </div>
          <div className="eui-avatar" data-eui-size="md" data-eui-fallback-color="variant2">
            <span className="eui-avatar-initials">{getInitials('Bob Wilson')}</span>
          </div>
            <div className="eui-counter" data-eui-variant="text">+12</div>
        </div>
        <div style={{ marginTop: '1rem', padding: '1rem', backgroundColor: '#f8fafc', borderRadius: '8px' }}>
          <p style={{ margin: 0, fontSize: '0.875rem', color: '#64748b' }}>
            <strong>Note:</strong> In a real application, hovering over the count indicator would typically show a tooltip with the full list of remaining users, including their roles (owner, contributor, observer, etc.).
          </p>
        </div>
      </div>
    </div>
  )
};

