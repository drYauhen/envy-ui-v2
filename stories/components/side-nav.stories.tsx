import type { Meta, StoryObj } from '@storybook/react';
import React, { useState } from 'react';

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
    
    const toggleExpand = (key: string) => {
      const newExpanded = new Set(expandedItems);
      if (newExpanded.has(key)) {
        newExpanded.delete(key);
      } else {
        newExpanded.add(key);
      }
      setExpandedItems(newExpanded);
    };
    
    return (
      <div style={containerStyle}>
        <nav 
          className={`eui-side-nav ${collapsed ? 'eui-side-nav--collapsed' : ''}`}
          role="navigation"
          aria-label="Application navigation"
        >
          {/* Header */}
          <div className="eui-side-nav__header">
            <a href="#" className="eui-side-nav__header-logo">
              <span style={{ fontSize: '24px' }}>e</span>
              <span className="eui-side-nav__header-logo-text">ENVISIO</span>
            </a>
            <div className="eui-side-nav__tooltip">ENVISIO</div>
          </div>
          
          {/* Toggle button */}
          <button 
            className="eui-side-nav__toggle"
            onClick={() => setCollapsed(!collapsed)}
            aria-label={collapsed ? "Expand navigation" : "Collapse navigation"}
          >
            ←
          </button>
          
          {/* Content */}
          <div className="eui-side-nav__content">
            <ul className="eui-side-nav__list">
              {/* Section: Plans */}
              <li className="eui-side-nav__section">
                <div className="eui-side-nav__section-title">Plans</div>
              </li>
              
              <li>
                <button className="eui-side-nav__item" type="button">
                  <div className="eui-side-nav__item-content">
                    <span className="eui-side-nav__item-icon">📄</span>
                    <span className="eui-side-nav__item-label">View/Edit Plan</span>
                  </div>
                  <div className="eui-side-nav__tooltip">View/Edit Plan</div>
                </button>
              </li>
              
              <li>
                <button className="eui-side-nav__item" type="button">
                  <div className="eui-side-nav__item-content">
                    <span className="eui-side-nav__item-icon">✓</span>
                    <span className="eui-side-nav__item-label">Submit Updates</span>
                    <span className="eui-side-nav__item-badge">3</span>
                  </div>
                  <div className="eui-side-nav__tooltip">Submit Updates (3)</div>
                </button>
              </li>
              
              <li>
                <button className="eui-side-nav__item" type="button" data-eui-active="true">
                  <div className="eui-side-nav__item-content">
                    <span className="eui-side-nav__item-icon">📊</span>
                    <span className="eui-side-nav__item-label">Reports</span>
                  </div>
                  <div className="eui-side-nav__tooltip">Reports</div>
                </button>
              </li>
              
              {/* Separator */}
              <li>
                <div className="eui-side-nav__separator" role="separator" />
              </li>
              
              {/* Section: Projects (expandable) */}
              <li className="eui-side-nav__section">
                <div className="eui-side-nav__section-title">Projects</div>
              </li>
              
              <li>
                <button 
                  className="eui-side-nav__item" 
                  type="button"
                  data-eui-expandable="true"
                  data-eui-expanded={expandedItems.has('projects')}
                  onClick={() => toggleExpand('projects')}
                >
                  <div className="eui-side-nav__item-content">
                    <span className="eui-side-nav__item-icon">🔧</span>
                    <span className="eui-side-nav__item-label">Projects Planning</span>
                    <span className="eui-side-nav__item-chevron">›</span>
                  </div>
                  <div className="eui-side-nav__tooltip">Projects Planning</div>
                </button>
                <ul className="eui-side-nav__submenu">
                  <li>
                    <button className="eui-side-nav__item" type="button">
                      <div className="eui-side-nav__item-content">
                        <span className="eui-side-nav__item-label">Active Projects</span>
                      </div>
                    </button>
                  </li>
                  <li>
                    <button className="eui-side-nav__item" type="button" data-eui-selected="true">
                      <div className="eui-side-nav__item-content">
                        <span className="eui-side-nav__item-label">Project Dashboard</span>
                      </div>
                    </button>
                  </li>
                </ul>
              </li>
              
              <li>
                <button className="eui-side-nav__item" type="button">
                  <div className="eui-side-nav__item-content">
                    <span className="eui-side-nav__item-icon">🗺️</span>
                    <span className="eui-side-nav__item-label">Projects Dashboard</span>
                  </div>
                  <div className="eui-side-nav__tooltip">Projects Dashboard</div>
                </button>
              </li>
            </ul>
          </div>
          
          {/* Footer */}
          <div className="eui-side-nav__footer">
            <div className="eui-side-nav__footer-avatar">CO</div>
            <div className="eui-side-nav__footer-info">
              <div className="eui-side-nav__footer-name">Cara Ong</div>
              <div className="eui-side-nav__footer-role">Head of Product</div>
            </div>
            <div className="eui-side-nav__tooltip">Cara Ong<br />Head of Product</div>
          </div>
        </nav>
      </div>
    );
  }
};
