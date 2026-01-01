import type { Meta, StoryObj } from '@storybook/react';
import React, { useState } from 'react';

const meta: Meta = {
  title: 'HTML + CSS/Components/Navigation Menu',
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

export const Expanded: Story = {
  name: 'Expanded State',
  render: () => {
    return (
      <div style={containerStyle}>
        <nav 
          className="eui-navigation-menu" 
          role="navigation" 
          aria-label="Main navigation"
          aria-expanded="true"
        >
          <button className="eui-navigation-menu__title" type="button">
            <div className="eui-navigation-menu__title-content">
              <span style={{ fontSize: '20px' }}>e</span>
              <span className="eui-navigation-menu__item-label">ENVISIO</span>
            </div>
          </button>
          
          <button className="eui-navigation-menu__collapser" type="button" aria-label="Collapse navigation">
            <span className="eui-navigation-menu__collapser-icon" />
          </button>

          <ul className="eui-navigation-menu__menu">
            <li>
              <div className="eui-navigation-menu__section-title">Plans</div>
              <button className="eui-navigation-menu__item" type="button">
                <div className="eui-navigation-menu__item-content">
                  <span className="eui-navigation-menu__item-icon">📄</span>
                  <span className="eui-navigation-menu__item-label">View/Edit Plan</span>
                </div>
              </button>
              <button className="eui-navigation-menu__item" type="button">
                <div className="eui-navigation-menu__item-content">
                  <span className="eui-navigation-menu__item-icon">✓</span>
                  <span className="eui-navigation-menu__item-label">Submit Updates</span>
                </div>
              </button>
              <button className="eui-navigation-menu__item" type="button">
                <div className="eui-navigation-menu__item-content">
                  <span className="eui-navigation-menu__item-icon">📊</span>
                  <span className="eui-navigation-menu__item-label">Reports</span>
                </div>
              </button>
              <button className="eui-navigation-menu__item" type="button">
                <div className="eui-navigation-menu__item-content">
                  <span className="eui-navigation-menu__item-icon">🖥️</span>
                  <span className="eui-navigation-menu__item-label">Public Dashboards</span>
                </div>
              </button>
            </li>

            <li>
              <div className="eui-navigation-menu__separator" role="separator" />
              <div className="eui-navigation-menu__section-title">Projects</div>
              <button className="eui-navigation-menu__item" type="button">
                <div className="eui-navigation-menu__item-content">
                  <span className="eui-navigation-menu__item-icon">✓✓</span>
                  <span className="eui-navigation-menu__item-label">Tasks</span>
                </div>
              </button>
              <button className="eui-navigation-menu__item" type="button" data-eui-active="true">
                <div className="eui-navigation-menu__item-content">
                  <span className="eui-navigation-menu__item-icon">🔧</span>
                  <span className="eui-navigation-menu__item-label">Projects Planning</span>
                </div>
              </button>
              <button className="eui-navigation-menu__item" type="button">
                <div className="eui-navigation-menu__item-content">
                  <span className="eui-navigation-menu__item-icon">🗺️</span>
                  <span className="eui-navigation-menu__item-label">Projects Dashboard</span>
                </div>
              </button>
              <button className="eui-navigation-menu__item" type="button">
                <div className="eui-navigation-menu__item-content">
                  <span className="eui-navigation-menu__item-icon">📊</span>
                  <span className="eui-navigation-menu__item-label">Project Reports</span>
                </div>
              </button>
            </li>

            <li>
              <div className="eui-navigation-menu__separator" role="separator" />
              <div className="eui-navigation-menu__section-title">Analytics</div>
              <button className="eui-navigation-menu__item" type="button">
                <div className="eui-navigation-menu__item-content">
                  <span className="eui-navigation-menu__item-icon">💾</span>
                  <span className="eui-navigation-menu__item-label">Data Sources</span>
                </div>
              </button>
              <button className="eui-navigation-menu__item" type="button">
                <div className="eui-navigation-menu__item-content">
                  <span className="eui-navigation-menu__item-icon">🔗</span>
                  <span className="eui-navigation-menu__item-label">Visuals</span>
                </div>
              </button>
              <button className="eui-navigation-menu__item" type="button">
                <div className="eui-navigation-menu__item-content">
                  <span className="eui-navigation-menu__item-icon">📑</span>
                  <span className="eui-navigation-menu__item-label">Dashboards</span>
                </div>
              </button>
            </li>

            <li>
              <div className="eui-navigation-menu__separator" role="separator" />
              <div className="eui-navigation-menu__section-title">People</div>
              <button className="eui-navigation-menu__item" type="button">
                <div className="eui-navigation-menu__item-content">
                  <span className="eui-navigation-menu__item-icon">👤</span>
                  <span className="eui-navigation-menu__item-label">My Assessments</span>
                </div>
              </button>
            </li>
          </ul>

          <button className="eui-navigation-menu__toolbar" type="button">
            <div className="eui-navigation-menu__toolbar-content">
              <div style={{ 
                width: '32px', 
                height: '32px', 
                borderRadius: '50%', 
                background: '#94a3b8',
                display: 'flex',
                alignItems: 'center',
                justifyContent: 'center'
              }}>👤</div>
              <div style={{ display: 'flex', flexDirection: 'column', gap: '2px' }}>
                <span className="eui-navigation-menu__item-label">Cara Ong</span>
                <span style={{ fontSize: '12px', opacity: 0.8 }}>Head of Product</span>
              </div>
              <span style={{ marginLeft: 'auto' }}>→</span>
            </div>
          </button>
        </nav>
      </div>
    );
  }
};

export const Collapsed: Story = {
  name: 'Collapsed State',
  render: () => {
    return (
      <div style={containerStyle}>
        <nav 
          className="eui-navigation-menu eui-navigation-menu--collapsed" 
          role="navigation" 
          aria-label="Main navigation"
          aria-expanded="false"
        >
          <button className="eui-navigation-menu__title" type="button">
            <div className="eui-navigation-menu__title-content">
              <span style={{ fontSize: '20px' }}>e</span>
            </div>
          </button>
          
          <button className="eui-navigation-menu__collapser" type="button" aria-label="Expand navigation">
            <span className="eui-navigation-menu__collapser-icon" />
          </button>

          <ul className="eui-navigation-menu__menu">
            <li>
              <button className="eui-navigation-menu__item" type="button">
                <div className="eui-navigation-menu__item-content">
                  <span className="eui-navigation-menu__item-icon">📄</span>
                </div>
              </button>
              <button className="eui-navigation-menu__item" type="button">
                <div className="eui-navigation-menu__item-content">
                  <span className="eui-navigation-menu__item-icon">✓</span>
                </div>
              </button>
              <button className="eui-navigation-menu__item" type="button">
                <div className="eui-navigation-menu__item-content">
                  <span className="eui-navigation-menu__item-icon">📊</span>
                </div>
              </button>
              <button className="eui-navigation-menu__item" type="button">
                <div className="eui-navigation-menu__item-content">
                  <span className="eui-navigation-menu__item-icon">🖥️</span>
                </div>
              </button>
            </li>

            <li>
              <button className="eui-navigation-menu__item" type="button">
                <div className="eui-navigation-menu__item-content">
                  <span className="eui-navigation-menu__item-icon">✓✓</span>
                </div>
              </button>
              <button className="eui-navigation-menu__item" type="button" data-eui-active="true">
                <div className="eui-navigation-menu__item-content">
                  <span className="eui-navigation-menu__item-icon">🔧</span>
                </div>
              </button>
              <button className="eui-navigation-menu__item" type="button">
                <div className="eui-navigation-menu__item-content">
                  <span className="eui-navigation-menu__item-icon">🗺️</span>
                </div>
              </button>
              <button className="eui-navigation-menu__item" type="button">
                <div className="eui-navigation-menu__item-content">
                  <span className="eui-navigation-menu__item-icon">📊</span>
                </div>
              </button>
            </li>

            <li>
              <button className="eui-navigation-menu__item" type="button">
                <div className="eui-navigation-menu__item-content">
                  <span className="eui-navigation-menu__item-icon">💾</span>
                </div>
              </button>
              <button className="eui-navigation-menu__item" type="button">
                <div className="eui-navigation-menu__item-content">
                  <span className="eui-navigation-menu__item-icon">🔗</span>
                </div>
              </button>
              <button className="eui-navigation-menu__item" type="button">
                <div className="eui-navigation-menu__item-content">
                  <span className="eui-navigation-menu__item-icon">📑</span>
                </div>
              </button>
            </li>

            <li>
              <button className="eui-navigation-menu__item" type="button">
                <div className="eui-navigation-menu__item-content">
                  <span className="eui-navigation-menu__item-icon">👤</span>
                </div>
              </button>
            </li>
          </ul>

          <button className="eui-navigation-menu__toolbar" type="button">
            <div className="eui-navigation-menu__toolbar-content">
              <div style={{ 
                width: '32px', 
                height: '32px', 
                borderRadius: '50%', 
                background: '#94a3b8',
                display: 'flex',
                alignItems: 'center',
                justifyContent: 'center'
              }}>👤</div>
            </div>
          </button>
        </nav>
      </div>
    );
  }
};

export const Interactive: Story = {
  name: 'Interactive (Expand/Collapse)',
  render: () => {
    const [collapsed, setCollapsed] = useState(false);
    
    return (
      <div style={containerStyle}>
        <nav 
          className={`eui-navigation-menu ${collapsed ? 'eui-navigation-menu--collapsed' : ''}`}
          role="navigation" 
          aria-label="Main navigation"
          aria-expanded={!collapsed}
        >
          <button className="eui-navigation-menu__title" type="button">
            <div className="eui-navigation-menu__title-content">
              <span style={{ fontSize: '20px' }}>e</span>
              <span className="eui-navigation-menu__item-label">ENVISIO</span>
            </div>
          </button>
          
          <button 
            className="eui-navigation-menu__collapser" 
            type="button" 
            aria-label={collapsed ? "Expand navigation" : "Collapse navigation"}
            aria-expanded={!collapsed}
            onClick={() => setCollapsed(!collapsed)}
          >
            <span className="eui-navigation-menu__collapser-icon" />
          </button>

          <ul className="eui-navigation-menu__menu">
            <li>
              <div className="eui-navigation-menu__section-title">Plans</div>
              <button className="eui-navigation-menu__item" type="button">
                <div className="eui-navigation-menu__item-content">
                  <span className="eui-navigation-menu__item-icon">📄</span>
                  <span className="eui-navigation-menu__item-label">View/Edit Plan</span>
                </div>
              </button>
              <button className="eui-navigation-menu__item" type="button">
                <div className="eui-navigation-menu__item-content">
                  <span className="eui-navigation-menu__item-icon">✓</span>
                  <span className="eui-navigation-menu__item-label">Submit Updates</span>
                </div>
              </button>
              <button className="eui-navigation-menu__item" type="button">
                <div className="eui-navigation-menu__item-content">
                  <span className="eui-navigation-menu__item-icon">📊</span>
                  <span className="eui-navigation-menu__item-label">Reports</span>
                </div>
              </button>
            </li>

            <li>
              <div className="eui-navigation-menu__separator" role="separator" />
              <div className="eui-navigation-menu__section-title">Projects</div>
              <button className="eui-navigation-menu__item" type="button" data-eui-active="true">
                <div className="eui-navigation-menu__item-content">
                  <span className="eui-navigation-menu__item-icon">🔧</span>
                  <span className="eui-navigation-menu__item-label">Projects Planning</span>
                </div>
              </button>
              <button className="eui-navigation-menu__item" type="button">
                <div className="eui-navigation-menu__item-content">
                  <span className="eui-navigation-menu__item-icon">🗺️</span>
                  <span className="eui-navigation-menu__item-label">Projects Dashboard</span>
                </div>
              </button>
            </li>
          </ul>

          <button className="eui-navigation-menu__toolbar" type="button">
            <div className="eui-navigation-menu__toolbar-content">
              <div style={{ 
                width: '32px', 
                height: '32px', 
                borderRadius: '50%', 
                background: '#94a3b8',
                display: 'flex',
                alignItems: 'center',
                justifyContent: 'center'
              }}>👤</div>
              <div style={{ display: 'flex', flexDirection: 'column', gap: '2px' }}>
                <span className="eui-navigation-menu__item-label">Cara Ong</span>
                <span style={{ fontSize: '12px', opacity: 0.8 }}>Head of Product</span>
              </div>
              <span style={{ marginLeft: 'auto' }}>→</span>
            </div>
          </button>
        </nav>
      </div>
    );
  }
};

export const States: Story = {
  name: 'Item States',
  render: () => {
    return (
      <div style={containerStyle}>
        <nav 
          className="eui-navigation-menu" 
          role="navigation" 
          aria-label="Main navigation"
          aria-expanded="true"
        >
          <ul className="eui-navigation-menu__menu" style={{ marginTop: '60px' }}>
            <li>
              <button className="eui-navigation-menu__item" type="button">
                <div className="eui-navigation-menu__item-content">
                  <span className="eui-navigation-menu__item-icon">📄</span>
                  <span className="eui-navigation-menu__item-label">Default</span>
                </div>
              </button>
              <button className="eui-navigation-menu__item" type="button" data-eui-active="true">
                <div className="eui-navigation-menu__item-content">
                  <span className="eui-navigation-menu__item-icon">✓</span>
                  <span className="eui-navigation-menu__item-label">Active</span>
                </div>
              </button>
              <button className="eui-navigation-menu__item" type="button" disabled>
                <div className="eui-navigation-menu__item-content">
                  <span className="eui-navigation-menu__item-icon">📊</span>
                  <span className="eui-navigation-menu__item-label">Disabled</span>
                </div>
              </button>
            </li>
          </ul>
        </nav>
      </div>
    );
  }
};

