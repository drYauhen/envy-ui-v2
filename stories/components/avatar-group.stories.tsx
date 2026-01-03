import type { Meta, StoryObj } from '@storybook/react';
import React from 'react';
import { getSectionParameters } from '../../.storybook/preview';

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
    // Apply section-specific parameters automatically
    ...getSectionParameters('HTML + CSS/Components/AvatarGroup'),
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
          Avatars in a group overlap each other with a standard 12px offset (40% of avatar diameter). Hover over any avatar to see neighbors spread apart.
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
            <img src="https://i.pravatar.cc/150?img=5" alt="User 1" />
          </div>
          <div className="eui-avatar" data-eui-size="md">
            <span className="eui-avatar-initials">{getInitials('John Doe')}</span>
          </div>
          <div className="eui-avatar" data-eui-size="md">
            <img src="https://i.pravatar.cc/150?img=6" alt="User 3" />
          </div>
          <div className="eui-avatar" data-eui-size="md">
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
          <h4 style={{ margin: '0 0 0.5rem 0', fontSize: '1rem', fontWeight: 600 }}>10 avatars (4 + 6)</h4>
          <div className="eui-avatar-group" data-eui-size="md">
            <div className="eui-avatar" data-eui-size="md">
              <img src="https://i.pravatar.cc/150?img=11" alt="User 1" />
            </div>
            <div className="eui-avatar" data-eui-size="md">
              <img src="https://i.pravatar.cc/150?img=12" alt="User 2" />
            </div>
            <div className="eui-avatar" data-eui-size="md">
              <img src="https://i.pravatar.cc/150?img=13" alt="User 3" />
            </div>
            <div className="eui-avatar" data-eui-size="md">
              <img src="https://i.pravatar.cc/150?img=14" alt="User 4" />
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
              <img src="https://i.pravatar.cc/150?img=15" alt="User 1" />
            </div>
            <div className="eui-avatar" data-eui-size="sm">
              <img src="https://i.pravatar.cc/150?img=16" alt="User 2" />
            </div>
            <div className="eui-avatar" data-eui-size="sm">
              <img src="https://i.pravatar.cc/150?img=17" alt="User 3" />
            </div>
            <div className="eui-avatar" data-eui-size="sm">
              <img src="https://i.pravatar.cc/150?img=18" alt="User 4" />
            </div>
          </div>
        </div>
        <div style={sectionStyle}>
          <h4 style={{ margin: '0 0 0.5rem 0', fontSize: '1rem', fontWeight: 600 }}>Medium (Default)</h4>
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
        <div style={sectionStyle}>
          <h4 style={{ margin: '0 0 0.5rem 0', fontSize: '1rem', fontWeight: 600 }}>Large</h4>
          <div className="eui-avatar-group" data-eui-size="lg">
            <div className="eui-avatar" data-eui-size="lg">
              <img src="https://i.pravatar.cc/150?img=1" alt="User 1" />
            </div>
            <div className="eui-avatar" data-eui-size="lg">
              <img src="https://i.pravatar.cc/150?img=2" alt="User 2" />
            </div>
            <div className="eui-avatar" data-eui-size="lg">
              <img src="https://i.pravatar.cc/150?img=3" alt="User 3" />
            </div>
            <div className="eui-avatar" data-eui-size="lg">
              <img src="https://i.pravatar.cc/150?img=4" alt="User 4" />
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
            <img src="https://i.pravatar.cc/150?img=6" alt="User 1" />
          </div>
          <div className="eui-avatar" data-eui-size="md">
            <span className="eui-avatar-initials">{getInitials('Alice Brown')}</span>
          </div>
          <div className="eui-avatar" data-eui-size="md">
            <img src="https://i.pravatar.cc/150?img=7" alt="User 3" />
          </div>
          <div className="eui-avatar" data-eui-size="md">
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

export const WithLead: Story = {
  name: 'With Lead Avatar',
  parameters: {
    docs: {
      canvas: { sourceState: 'none' },
      codePanel: false
    }
  },
  render: () => (
    <div style={containerStyle}>
      <div style={sectionStyle}>
        <h3 style={sectionTitleStyle}>Lead Avatar Highlighting</h3>
        <p style={{ margin: '0 0 1rem 0', color: '#64748b' }}>
          The first avatar can be marked as "lead" using <code style={{ padding: '0.125rem 0.25rem', backgroundColor: '#f1f5f9', borderRadius: '4px', fontSize: '0.875rem' }}>data-eui-role="lead"</code>. 
          The lead avatar has an accent border and a larger gap before the next group. The remaining avatars are grouped more tightly (20px overlap) to create a cohesive subgroup, visually emphasizing the lead's separation.
        </p>
        <div style={sectionStyle}>
          <h4 style={{ margin: '0 0 0.5rem 0', fontSize: '1rem', fontWeight: 600 }}>Lead + Contributors</h4>
          <div className="eui-avatar-group" data-eui-size="md">
            <div className="eui-avatar" data-eui-size="md" data-eui-role="lead">
              <img src="https://i.pravatar.cc/150?img=1" alt="Lead" />
            </div>
            <div className="eui-avatar" data-eui-size="md">
              <img src="https://i.pravatar.cc/150?img=2" alt="Contributor 1" />
            </div>
            <div className="eui-avatar" data-eui-size="md">
              <img src="https://i.pravatar.cc/150?img=3" alt="Contributor 2" />
            </div>
            <div className="eui-avatar" data-eui-size="md">
              <img src="https://i.pravatar.cc/150?img=4" alt="Contributor 3" />
            </div>
          </div>
        </div>
        <div style={sectionStyle}>
          <h4 style={{ margin: '0 0 0.5rem 0', fontSize: '1rem', fontWeight: 600 }}>Lead + Contributors + Count</h4>
          <div className="eui-avatar-group" data-eui-size="md">
            <div className="eui-avatar" data-eui-size="md" data-eui-role="lead">
              <img src="https://i.pravatar.cc/150?img=5" alt="Lead" />
            </div>
            <div className="eui-avatar" data-eui-size="md">
              <img src="https://i.pravatar.cc/150?img=6" alt="Contributor 1" />
            </div>
            <div className="eui-avatar" data-eui-size="md">
              <img src="https://i.pravatar.cc/150?img=7" alt="Contributor 2" />
            </div>
            <div className="eui-avatar" data-eui-size="md">
              <img src="https://i.pravatar.cc/150?img=8" alt="Contributor 3" />
            </div>
            <div className="eui-counter" data-eui-variant="text">+8</div>
          </div>
        </div>
        <div style={{ marginTop: '1rem', padding: '1rem', backgroundColor: '#f8fafc', borderRadius: '8px' }}>
          <p style={{ margin: 0, fontSize: '0.875rem', color: '#64748b' }}>
            <strong>Visual Features:</strong> The lead avatar has an accent-colored border (blue) and a larger gap (6px overlap) before the next group, creating clear visual separation. The remaining avatars are grouped more tightly (16px overlap instead of 12px) to form a cohesive subgroup, emphasizing the lead's distinct role.
          </p>
        </div>
      </div>
    </div>
  )
};

