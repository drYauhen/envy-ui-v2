import type { Meta, StoryObj } from '@storybook/react';
import React, { useState } from 'react';

const meta: Meta = {
  title: 'HTML + CSS/Components/Menu',
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

const sectionTitleStyle = {
  margin: '0 0 0.5rem 0',
  fontSize: '1.125rem',
  fontWeight: 600,
  color: '#0f172a'
} as const;

const codePanelStyle = {
  backgroundColor: '#f1f5f9',
  borderRadius: '8px',
  padding: '1rem',
  overflowX: 'auto',
  fontSize: '0.875rem',
  lineHeight: '1.5'
} as const;

const summaryStyle = {
  cursor: 'pointer',
  fontWeight: 600,
  padding: '0.5rem 0',
  outline: 'none'
} as const;

const codeWrapStyle = {
  marginTop: '0.5rem'
} as const;

const Highlight = ({ code, language }: { code: string; language: string }) => (
  <pre style={{ margin: 0, whiteSpace: 'pre-wrap', wordBreak: 'break-all' }}>
    <code className={`language-${language}`}>{code}</code>
  </pre>
);

export const BasicMenu: Story = {
  name: 'Basic Menu',
  render: () => {
    const [isOpen, setIsOpen] = useState(false);

    const htmlCode = `
<button class="eui-button" data-eui-intent="primary" onclick="toggleMenu()">
  Open Menu
</button>

<ul class="eui-menu-list" role="menu">
  <li role="menuitem">
    <button class="eui-menu-item">Profile</button>
  </li>
  <li role="menuitem">
    <button class="eui-menu-item">Settings</button>
  </li>
  <li role="menuitem">
    <button class="eui-menu-item">Logout</button>
  </li>
</ul>
    `;

    return (
      <div style={containerStyle}>
        <h3 style={sectionTitleStyle}>Basic Menu</h3>
        <p style={{ margin: '0 0 1rem 0', color: '#64748b' }}>
          A simple menu with menu items. Menu is triggered by a button.
        </p>

        <div style={{ position: 'relative', display: 'inline-block' }}>
          <button
            className="eui-button"
            data-eui-intent="primary"
            onClick={() => setIsOpen(!isOpen)}
          >
            Open Menu
          </button>

          {isOpen && (
            <ul className="eui-menu-list" role="menu" style={{ position: 'absolute', top: '100%', left: 0, marginTop: '0.5rem', zIndex: 100 }}>
              <li role="menuitem">
                <button className="eui-menu-item">Profile</button>
              </li>
              <li role="menuitem">
                <button className="eui-menu-item">Settings</button>
              </li>
              <li role="menuitem">
                <button className="eui-menu-item">Logout</button>
              </li>
            </ul>
          )}
        </div>

        <details style={codeWrapStyle}>
          <summary style={summaryStyle}>Expand to inspect code</summary>
          <div style={codePanelStyle}>
            <Highlight code={htmlCode.trim()} language="html" />
          </div>
        </details>
      </div>
    );
  }
};

export const MenuWithDivider: Story = {
  name: 'Menu with Divider',
  render: () => {
    const [isOpen, setIsOpen] = useState(false);

    const htmlCode = `
<ul class="eui-menu-list" role="menu">
  <li role="menuitem">
    <button class="eui-menu-item">Profile</button>
  </li>
  <li role="menuitem">
    <button class="eui-menu-item">Settings</button>
  </li>
  <hr class="eui-divider" />
  <li role="menuitem">
    <button class="eui-menu-item">Logout</button>
  </li>
</ul>
    `;

    return (
      <div style={containerStyle}>
        <h3 style={sectionTitleStyle}>Menu with Divider</h3>
        <p style={{ margin: '0 0 1rem 0', color: '#64748b' }}>
          Menu items can be separated using the universal Divider component.
        </p>

        <div style={{ position: 'relative', display: 'inline-block' }}>
          <button
            className="eui-button"
            data-eui-intent="primary"
            onClick={() => setIsOpen(!isOpen)}
          >
            Open Menu
          </button>

          {isOpen && (
            <ul className="eui-menu-list" role="menu" style={{ position: 'absolute', top: '100%', left: 0, marginTop: '0.5rem', zIndex: 100 }}>
              <li role="menuitem">
                <button className="eui-menu-item">Profile</button>
              </li>
              <li role="menuitem">
                <button className="eui-menu-item">Settings</button>
              </li>
              <li role="separator">
                <hr className="eui-divider" />
              </li>
              <li role="menuitem">
                <button className="eui-menu-item">Logout</button>
              </li>
            </ul>
          )}
        </div>

        <details style={codeWrapStyle}>
          <summary style={summaryStyle}>Expand to inspect code</summary>
          <div style={codePanelStyle}>
            <Highlight code={htmlCode.trim()} language="html" />
          </div>
        </details>
      </div>
    );
  }
};

export const MenuStates: Story = {
  name: 'Menu Item States',
  render: () => {
    const [isOpen, setIsOpen] = useState(false);

    return (
      <div style={containerStyle}>
        <h3 style={sectionTitleStyle}>Menu Item States</h3>
        <p style={{ margin: '0 0 1rem 0', color: '#64748b' }}>
          Menu items support different states: default, hover, focus, selected, and disabled.
        </p>

        <div style={{ position: 'relative', display: 'inline-block' }}>
          <button
            className="eui-button"
            data-eui-intent="primary"
            onClick={() => setIsOpen(!isOpen)}
          >
            Open Menu
          </button>

          {isOpen && (
            <ul className="eui-menu-list" role="menu" style={{ position: 'absolute', top: '100%', left: 0, marginTop: '0.5rem', zIndex: 100 }}>
              <li role="menuitem">
                <button className="eui-menu-item">Default Item</button>
              </li>
              <li role="menuitem">
                <button className="eui-menu-item" data-eui-selected="true">Selected Item</button>
              </li>
              <li role="menuitem">
                <button className="eui-menu-item" data-eui-disabled="true">Disabled Item</button>
              </li>
              <li role="menuitem">
                <button className="eui-menu-item">Another Item</button>
              </li>
            </ul>
          )}
        </div>
      </div>
    );
  }
};

export const MenuWithIcons: Story = {
  name: 'Menu with Icons',
  render: () => {
    const [isOpen, setIsOpen] = useState(false);

    return (
      <div style={containerStyle}>
        <h3 style={sectionTitleStyle}>Menu with Icons</h3>
        <p style={{ margin: '0 0 1rem 0', color: '#64748b' }}>
          Menu items can include icons for better visual communication.
        </p>

        <div style={{ position: 'relative', display: 'inline-block' }}>
          <button
            className="eui-button"
            data-eui-intent="primary"
            onClick={() => setIsOpen(!isOpen)}
          >
            Open Menu
          </button>

          {isOpen && (
            <ul className="eui-menu-list" role="menu" style={{ position: 'absolute', top: '100%', left: 0, marginTop: '0.5rem', zIndex: 100 }}>
              <li role="menuitem">
                <button className="eui-menu-item">
                  <span>👤</span>
                  <span>Profile</span>
                </button>
              </li>
              <li role="menuitem">
                <button className="eui-menu-item">
                  <span>⚙️</span>
                  <span>Settings</span>
                </button>
              </li>
              <li role="separator">
                <hr className="eui-divider" />
              </li>
              <li role="menuitem">
                <button className="eui-menu-item">
                  <span>🚪</span>
                  <span>Logout</span>
                </button>
              </li>
            </ul>
          )}
        </div>
      </div>
    );
  }
};

export const ComplexMenu: Story = {
  name: 'Complex Menu Example',
  render: () => {
    const [isOpen, setIsOpen] = useState(false);

    return (
      <div style={containerStyle}>
        <h3 style={sectionTitleStyle}>Complex Menu Example</h3>
        <p style={{ margin: '0 0 1rem 0', color: '#64748b' }}>
          A more complex menu with multiple sections, dividers, and different item states.
        </p>

        <div style={{ position: 'relative', display: 'inline-block' }}>
          <button
            className="eui-button"
            data-eui-intent="primary"
            onClick={() => setIsOpen(!isOpen)}
          >
            Open Menu
          </button>

          {isOpen && (
            <ul className="eui-menu-list" role="menu" style={{ position: 'absolute', top: '100%', left: 0, marginTop: '0.5rem', zIndex: 100 }}>
              <li role="menuitem">
                <button className="eui-menu-item">
                  <span>📊</span>
                  <span>Dashboard</span>
                </button>
              </li>
              <li role="menuitem">
                <button className="eui-menu-item">
                  <span>📈</span>
                  <span>Reports</span>
                </button>
              </li>
              <li role="separator">
                <hr className="eui-divider" />
              </li>
              <li role="menuitem">
                <button className="eui-menu-item">
                  <span>👤</span>
                  <span>Profile</span>
                </button>
              </li>
              <li role="menuitem">
                <button className="eui-menu-item">
                  <span>⚙️</span>
                  <span>Settings</span>
                </button>
              </li>
              <li role="separator">
                <hr className="eui-divider" />
              </li>
              <li role="menuitem">
                <button className="eui-menu-item" data-eui-disabled="true">
                  <span>🔒</span>
                  <span>Locked Feature</span>
                </button>
              </li>
              <li role="separator">
                <hr className="eui-divider" />
              </li>
              <li role="menuitem">
                <button className="eui-menu-item">
                  <span>🚪</span>
                  <span>Logout</span>
                </button>
              </li>
            </ul>
          )}
        </div>
      </div>
    );
  }
};






