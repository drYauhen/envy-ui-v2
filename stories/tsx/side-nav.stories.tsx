import type { Meta, StoryObj } from '@storybook/react';
import React, { useState } from 'react';
import { SideNav, type SideNavSection } from '../../packages/tsx/side-nav';
import { DeviceFrameWrapper } from '../components/DeviceFrameWrapper';
import { getSectionParameters } from '../../.storybook/preview';

const meta: Meta = {
  title: 'TSX + React Aria/Components/Side Nav',
  tags: ['autodocs'],
  parameters: {
    // Apply section-specific parameters automatically
    ...getSectionParameters('TSX + React Aria/Components/Side Nav'),
    docs: {
      description: {
        component: `
# Side Navigation Component

A fully accessible side navigation component built with React Aria, following [WAI-ARIA Authoring Practices Guide](https://www.w3.org/WAI/ARIA/apg/patterns/menubar/).

## Accessibility

This component implements the **Menu Bar Pattern** as defined in the WAI-ARIA Authoring Practices Guide.

### Keyboard Navigation

The component uses a two-level keyboard navigation model:

#### Level 1: Major Regions (Tab Navigation)
- **Tab**: Moves focus to the next major page region (header → navigation → main content → footer)
- **Shift+Tab**: Moves focus to the previous major page region

#### Level 2: Menu Items (Arrow Key Navigation)
Once focus is inside the navigation menu:
- **Arrow Down (↓)**: Moves to the next menu item
- **Arrow Up (↑)**: Moves to the previous menu item
- **Home**: Moves to the first menu item
- **End**: Moves to the last menu item
- **Enter** or **Space**: Activates the focused menu item
- **Escape**: (Optional) Moves focus out of the menu

### ARIA Roles

- **\`<nav role="navigation">\`**: Identifies the navigation landmark
- **\`<ul role="menu">\`**: Identifies the menu container
- **\`<li role="menuitem">\`**: Identifies each menu item

### Why Menu Bar Pattern?

Traditional navigation using Tab for all items creates a poor user experience:
- **Too many Tab stops**: Users must press Tab many times to navigate through all menu items
- **Inefficient**: For large navigation menus, this is slow and frustrating
- **Not following standards**: WAI-ARIA recommends Arrow keys for menu navigation

The Menu Bar Pattern solves this by:
- **Reducing Tab stops**: Tab only moves between major regions
- **Fast navigation**: Arrow keys allow quick movement within the menu
- **Standards compliant**: Follows WAI-ARIA Authoring Practices Guide

### Screen Reader Support

- Screen readers announce "menu" when entering the navigation
- Each item is announced as "menuitem"
- Selected/active state is announced
- Disabled items are announced and skipped in navigation

## Implementation

Built with React Aria hooks:
- \`useMenu\`: Provides menu container behavior and keyboard navigation
- \`useMenuItem\`: Provides individual menu item behavior
- \`useTreeState\`: Manages menu item state and selection

All keyboard navigation, focus management, and ARIA attributes are handled automatically by React Aria.
        `
      }
    }
  }
};

export default meta;

type Story = StoryObj;

const containerStyle: React.CSSProperties = {
  position: 'relative',
  width: '100vw',
  height: '100vh',
  margin: '-1rem',
  background: '#f1f5f9'
};

// Default sections data
const defaultSections: SideNavSection[] = [
  {
    title: 'Plans',
    items: [
      {
        key: 'view-edit-plan',
        label: 'View/Edit Plan',
        icon: 'plan',
        onAction: () => console.log('View/Edit Plan clicked')
      },
      {
        key: 'submit-updates',
        label: 'Submit Updates',
        icon: 'submit-updates',
        badge: 3,
        onAction: () => console.log('Submit Updates clicked')
      },
      {
        key: 'reports',
        label: 'Reports',
        icon: 'plan-reports',
        isActive: true,
        onAction: () => console.log('Reports clicked')
      },
      {
        key: 'public-dashboards',
        label: 'Public Dashboards',
        icon: 'plan-dashboards',
        onAction: () => console.log('Public Dashboards clicked')
      }
    ]
  },
  {
    title: 'Projects',
    items: [
      {
        key: 'tasks',
        label: 'Tasks',
        icon: 'tasks',
        onAction: () => console.log('Tasks clicked')
      },
      {
        key: 'projects-planning',
        label: 'Projects Planning',
        icon: 'pencil-ruler',
        onAction: () => console.log('Projects Planning clicked')
      },
      {
        key: 'projects-dashboard',
        label: 'Projects Dashboard',
        icon: 'map-marked-alt',
        onAction: () => console.log('Projects Dashboard clicked')
      },
      {
        key: 'project-reports',
        label: 'Project Reports',
        icon: 'plan-reports',
        onAction: () => console.log('Project Reports clicked')
      }
    ]
  },
  {
    title: 'Analytics',
    items: [
      {
        key: 'data-sources',
        label: 'Data Sources',
        icon: 'data-source',
        onAction: () => console.log('Data Sources clicked')
      },
      {
        key: 'visuals',
        label: 'Visuals',
        icon: 'visuals',
        onAction: () => console.log('Visuals clicked')
      },
      {
        key: 'dashboards',
        label: 'Dashboards',
        icon: 'visuals-dashboard',
        onAction: () => console.log('Dashboards clicked')
      }
    ]
  },
  {
    title: 'People',
    items: [
      {
        key: 'my-assessments',
        label: 'My Assessments',
        icon: 'personal-assessment',
        onAction: () => console.log('My Assessments clicked')
      },
      {
        key: 'team-assessments',
        label: 'Team Assessments',
        icon: 'team-assessment',
        onAction: () => console.log('Team Assessments clicked')
      },
      {
        key: 'org-assessments',
        label: 'Organization Assessments',
        icon: 'org-assessment',
        onAction: () => console.log('Organization Assessments clicked')
      }
    ]
  }
];

const defaultFooter = {
  name: 'Alex Morgan',
  role: 'Head of Product',
  avatarUrl: 'https://i.pravatar.cc/150?img=12'
};

export const Basic: Story = {
  name: 'Basic Side Navigation',
  parameters: {
    docs: {
      description: {
        story: `
Basic side navigation with full keyboard navigation support.

**Try it**: 
1. Press Tab to focus the navigation
2. Use Arrow keys (↑/↓) to navigate between items
3. Press Enter or Space to activate an item
4. Press Tab again to move to the next major region
        `
      }
    }
  },
  render: () => {
    const [selectedKey, setSelectedKey] = useState<string>('reports');

    return (
      <div style={containerStyle}>
        <SideNav
          sections={defaultSections}
          footer={defaultFooter}
          selectedKey={selectedKey}
          onSelectionChange={setSelectedKey}
        />
      </div>
    );
  }
};

export const Collapsed: Story = {
  name: 'Collapsed State',
  render: () => {
    const [selectedKey, setSelectedKey] = useState<string>('reports');

    return (
      <div style={containerStyle}>
        <SideNav
          defaultCollapsed={true}
          sections={defaultSections}
          footer={defaultFooter}
          selectedKey={selectedKey}
          onSelectionChange={setSelectedKey}
        />
      </div>
    );
  }
};

export const Controlled: Story = {
  name: 'Controlled Collapsed State',
  render: () => {
    const [isCollapsed, setIsCollapsed] = useState(false);
    const [selectedKey, setSelectedKey] = useState<string>('reports');

    return (
      <div style={containerStyle}>
        <div style={{ position: 'absolute', top: '1rem', right: '1rem', zIndex: 1000 }}>
          <button
            onClick={() => setIsCollapsed(!isCollapsed)}
            style={{
              padding: '0.5rem 1rem',
              background: '#fff',
              border: '1px solid #e2e8f0',
              borderRadius: '0.375rem',
              cursor: 'pointer'
            }}
          >
            {isCollapsed ? 'Expand' : 'Collapse'}
          </button>
        </div>
        <SideNav
          isCollapsed={isCollapsed}
          onCollapsedChange={setIsCollapsed}
          sections={defaultSections}
          footer={defaultFooter}
          selectedKey={selectedKey}
          onSelectionChange={setSelectedKey}
        />
      </div>
    );
  }
};

export const WithDisabledItems: Story = {
  name: 'With Disabled Items',
  render: () => {
    const [selectedKey, setSelectedKey] = useState<string>('reports');

    const sectionsWithDisabled: SideNavSection[] = [
      {
        title: 'Plans',
        items: [
          {
            key: 'view-edit-plan',
            label: 'View/Edit Plan',
            icon: 'plan',
            isDisabled: true,
            onAction: () => console.log('View/Edit Plan clicked')
          },
          {
            key: 'submit-updates',
            label: 'Submit Updates',
            icon: 'submit-updates',
            badge: 3,
            onAction: () => console.log('Submit Updates clicked')
          },
          {
            key: 'reports',
            label: 'Reports',
            icon: 'plan-reports',
            isActive: true,
            onAction: () => console.log('Reports clicked')
          }
        ]
      }
    ];

    return (
      <div style={containerStyle}>
        <SideNav
          sections={sectionsWithDisabled}
          footer={defaultFooter}
          selectedKey={selectedKey}
          onSelectionChange={setSelectedKey}
        />
      </div>
    );
  }
};

export const Mobile: Story = {
  name: 'Mobile View',
  render: () => {
    const [selectedKey, setSelectedKey] = useState<string>('reports');

    return (
      <DeviceFrameWrapper>
        <SideNav
          sections={defaultSections}
          footer={defaultFooter}
          selectedKey={selectedKey}
          onSelectionChange={setSelectedKey}
        />
      </DeviceFrameWrapper>
    );
  }
};

export const KeyboardNavigation: Story = {
  name: 'Keyboard Navigation',
  parameters: {
    docs: {
      description: {
        story: `
Demonstrates keyboard navigation patterns according to WAI-ARIA Menu Bar Pattern.

**Keyboard Shortcuts**:
- **Tab**: Move between major regions
- **Arrow Up/Down**: Navigate menu items
- **Home/End**: Jump to first/last item
- **Enter/Space**: Activate item

**Try it**:
1. Click anywhere in the navigation to focus it
2. Use Arrow keys to navigate
3. Notice how Tab skips individual items (only moves between regions)
        `
      }
    }
  },
  render: () => {
    const [selectedKey, setSelectedKey] = useState<string>('reports');

    return (
      <div
        style={{
          position: 'relative',
          width: '100vw',
          height: '100vh',
          margin: '-1rem',
          background: '#f1f5f9',
          display: 'flex',
          gap: '2rem',
          padding: '1rem'
        }}
      >
        <SideNav
          sections={defaultSections}
          footer={defaultFooter}
          selectedKey={selectedKey}
          onSelectionChange={setSelectedKey}
        />
        <div
          style={{
            background: '#fff',
            padding: '1rem',
            borderRadius: '0.5rem',
            boxShadow: '0 2px 8px rgba(0,0,0,0.1)',
            maxWidth: '300px',
            fontSize: '0.875rem',
            height: 'fit-content',
            marginTop: '1rem'
          }}
        >
          <h3 style={{ margin: '0 0 0.5rem 0', fontSize: '1rem', fontWeight: 600 }}>Keyboard Navigation</h3>
          <p style={{ margin: '0 0 0.75rem 0', color: '#64748b', fontSize: '0.875rem' }}>
            Following WAI-ARIA Menu Bar Pattern
          </p>
          <ul style={{ margin: 0, paddingLeft: '1.5rem', color: '#475569', lineHeight: '1.6' }}>
            <li>
              <strong>Tab</strong>: Move between regions
            </li>
            <li>
              <strong>↑/↓</strong>: Navigate menu items
            </li>
            <li>
              <strong>Home/End</strong>: First/Last item
            </li>
            <li>
              <strong>Enter/Space</strong>: Activate item
            </li>
          </ul>
        </div>
      </div>
    );
  }
};

