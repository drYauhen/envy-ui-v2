import type { Meta, StoryObj } from '@storybook/react';
import React from 'react';
import { Menu, MenuTrigger, MenuList, MenuItem } from '../../packages/tsx/menu';
import { getSectionParameters } from '../../.storybook/preview';

const meta: Meta = {
  title: 'TSX + React Aria/Components/Menu',
  tags: ['autodocs'],
  parameters: {
    // Apply section-specific parameters automatically
    ...getSectionParameters('TSX + React Aria/Components/Menu'),
    layout: 'padded'
  }};

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

// Simple Divider component for now (will be universal later)
const Divider = () => <hr className="eui-divider" />;

export const BasicMenu: Story = {
  name: 'Basic Menu',
  render: () => {
    return (
      <div style={containerStyle}>
        <h3 style={sectionTitleStyle}>Basic Menu (TSX + React Aria)</h3>
        <p style={{ margin: '0 0 1rem 0', color: '#64748b' }}>
          Menu component with React Aria hooks for accessibility and keyboard navigation.
        </p>

        <Menu>
          <MenuTrigger>Open Menu</MenuTrigger>
          <MenuList>
            <MenuItem onAction={() => alert('Profile clicked')}>Profile</MenuItem>
            <MenuItem onAction={() => alert('Settings clicked')}>Settings</MenuItem>
            <MenuItem onAction={() => alert('Logout clicked')}>Logout</MenuItem>
          </MenuList>
        </Menu>
      </div>
    );
  }
};

export const MenuWithDivider: Story = {
  name: 'Menu with Divider',
  render: () => {
    return (
      <div style={containerStyle}>
        <h3 style={sectionTitleStyle}>Menu with Divider</h3>
        <p style={{ margin: '0 0 1rem 0', color: '#64748b' }}>
          Menu items separated by universal Divider component.
        </p>

        <Menu>
          <MenuTrigger>Open Menu</MenuTrigger>
          <MenuList>
            <MenuItem onAction={() => alert('Profile clicked')}>Profile</MenuItem>
            <MenuItem onAction={() => alert('Settings clicked')}>Settings</MenuItem>
            <li role="separator">
              <Divider />
            </li>
            <MenuItem onAction={() => alert('Logout clicked')}>Logout</MenuItem>
          </MenuList>
        </Menu>
      </div>
    );
  }
};

export const MenuWithButtonTrigger: Story = {
  name: 'Menu with Button Trigger (asChild)',
  render: () => {
    return (
      <div style={containerStyle}>
        <h3 style={sectionTitleStyle}>Menu with Button Trigger (asChild Pattern)</h3>
        <p style={{ margin: '0 0 1rem 0', color: '#64748b' }}>
          Using <code>asChild</code> pattern to use a Button component as the menu trigger.
          This demonstrates the adapter pattern - MenuTrigger can work with any element.
        </p>

        <Menu>
          <MenuTrigger asChild>
            <Button intent="primary">
              Open Menu (Button)
            </Button>
          </MenuTrigger>
          <MenuList>
            <MenuItem onAction={() => alert('Item 1 clicked')}>Item 1</MenuItem>
            <MenuItem onAction={() => alert('Item 2 clicked')}>Item 2</MenuItem>
            <MenuItem onAction={() => alert('Item 3 clicked')}>Item 3</MenuItem>
          </MenuList>
        </Menu>
      </div>
    );
  }
};

export const MenuStates: Story = {
  name: 'Menu Item States',
  render: () => {
    return (
      <div style={containerStyle}>
        <h3 style={sectionTitleStyle}>Menu Item States</h3>
        <p style={{ margin: '0 0 1rem 0', color: '#64748b' }}>
          Menu items support different states: default, selected, and disabled.
        </p>

        <Menu>
          <MenuTrigger>Open Menu</MenuTrigger>
          <MenuList>
            <MenuItem onAction={() => alert('Default clicked')}>Default Item</MenuItem>
            <MenuItem isSelected onAction={() => alert('Selected clicked')}>Selected Item</MenuItem>
            <MenuItem isDisabled>Disabled Item</MenuItem>
            <MenuItem onAction={() => alert('Another clicked')}>Another Item</MenuItem>
          </MenuList>
        </Menu>
      </div>
    );
  }
};

export const MenuWithIcons: Story = {
  name: 'Menu with Icons',
  render: () => {
    return (
      <div style={containerStyle}>
        <h3 style={sectionTitleStyle}>Menu with Icons</h3>
        <p style={{ margin: '0 0 1rem 0', color: '#64748b' }}>
          Menu items can include icons for better visual communication.
        </p>

        <Menu>
          <MenuTrigger>Open Menu</MenuTrigger>
          <MenuList>
            <MenuItem onAction={() => alert('Profile clicked')}>
              <span>👤</span>
              <span>Profile</span>
            </MenuItem>
            <MenuItem onAction={() => alert('Settings clicked')}>
              <span>⚙️</span>
              <span>Settings</span>
            </MenuItem>
            <li role="separator">
              <Divider />
            </li>
            <MenuItem onAction={() => alert('Logout clicked')}>
              <span>🚪</span>
              <span>Logout</span>
            </MenuItem>
          </MenuList>
        </Menu>
      </div>
    );
  }
};

