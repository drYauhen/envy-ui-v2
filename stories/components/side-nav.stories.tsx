import type { Meta, StoryObj } from '@storybook/react';
import React, { useState } from 'react';
import { DeviceFrameWrapper } from './DeviceFrameWrapper';
import { SideNav } from '../../src/ui/side-nav';

const meta: Meta = {
  title: 'HTML + CSS/Components/Side Nav',
  tags: ['autodocs']
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

export const Enhanced: Story = {
  name: 'Enhanced Side Navigation',
  render: () => {
    const [collapsed, setCollapsed] = useState(false);
    const [expandedItems, setExpandedItems] = useState<Set<string>>(new Set(['projects']));
    
    return (
      <div style={containerStyle}>
        <SideNav
          collapsed={collapsed}
          setCollapsed={setCollapsed}
          expandedItems={expandedItems}
          setExpandedItems={setExpandedItems}
        />
      </div>
    );
  }
};

export const Mobile: Story = {
  name: 'Mobile View',
  render: () => {
    const [collapsed, setCollapsed] = useState(false);
    const [expandedItems, setExpandedItems] = useState<Set<string>>(new Set(['projects']));
    
    return (
      <DeviceFrameWrapper>
        <SideNav
          collapsed={collapsed}
          setCollapsed={setCollapsed}
          expandedItems={expandedItems}
          setExpandedItems={setExpandedItems}
        />
      </DeviceFrameWrapper>
    );
  }
};
