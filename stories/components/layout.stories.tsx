import type { Meta, StoryObj } from '@storybook/react';
import React, { useState } from 'react';

const meta: Meta = {
  title: 'HTML + CSS/Components/Layout',
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

export const FullLayout: Story = {
  name: 'Full Application Layout',
  parameters: {
    layout: 'fullscreen',
    docs: {
      canvas: { sourceState: 'none' }
    }
  },
  render: () => {
    const [sidebarCollapsed, setSidebarCollapsed] = useState(false);
    const [detailPanelOpen, setDetailPanelOpen] = useState(false);

    const htmlCode = `
<div class="eui-app-shell" 
     data-eui-sidebar-collapsed="${sidebarCollapsed}" 
     data-eui-detail-panel-open="${detailPanelOpen}">
  <a href="#main-content" class="eui-skip-link">Skip to main content</a>
  <a href="#main-navigation" class="eui-skip-link">Skip to navigation</a>
  
  <header class="eui-header" role="banner" aria-label="Application header">
    <div>Logo</div>
    <div style="display: flex; gap: 1rem; align-items: center;">
      <button class="eui-button" data-eui-intent="secondary">Help</button>
      <span>User Name</span>
    </div>
  </header>
  
  <nav 
    id="main-navigation"
    class="eui-sidebar" 
    role="navigation" 
    aria-label="Main navigation"
    aria-expanded="${!sidebarCollapsed}"
    data-eui-collapsed="${sidebarCollapsed}"
  >
    <button 
      class="eui-button" 
      data-eui-intent="secondary"
      onclick="toggleSidebar()"
    >
      ${sidebarCollapsed ? '→' : '←'}
    </button>
    <div style="margin-top: 1rem;">
      <div style="padding: 0.5rem; color: white;">📊 Dashboard</div>
      <div style="padding: 0.5rem; color: white;">📈 Reports</div>
      <div style="padding: 0.5rem; color: white;">⚙️ Settings</div>
    </div>
  </nav>
  
  <div class="eui-title-bar eui-title-bar--global" role="region" aria-label="Global navigation">
    <div>Breadcrumbs: Home / Section</div>
    <div style="display: flex; gap: 0.5rem;">
      <button class="eui-button" data-eui-intent="secondary">Action</button>
    </div>
  </div>
  
  <div class="eui-title-bar eui-title-bar--contextual" role="region" aria-label="Page context">
    <h1 style="margin: 0; font-size: 1.25rem; font-weight: 600;">Page Title</h1>
    <div style="display: flex; gap: 0.5rem;">
      <button class="eui-button" data-eui-intent="secondary">Filter</button>
      <button class="eui-button" data-eui-intent="primary">New</button>
    </div>
  </div>
  
  <main id="main-content" class="eui-content" role="main" aria-label="Main content">
    <p>Main content area. This is where your primary content goes.</p>
    <p>You can scroll this area if content is long.</p>
    <button 
      class="eui-button" 
      data-eui-intent="primary"
      onclick="toggleDetailPanel()"
    >
      ${detailPanelOpen ? 'Close' : 'Open'} Detail Panel
    </button>
    ${Array(10).fill('<p>Lorem ipsum dolor sit amet, consectetur adipiscing elit. Sed do eiusmod tempor incididunt ut labore et dolore magna aliqua.</p>').join('')}
  </main>
  
  <aside 
    class="eui-detail-panel" 
    role="complementary" 
    aria-label="Details panel"
    aria-hidden="${!detailPanelOpen}"
    data-eui-open="${detailPanelOpen}"
  >
    <h2 style="margin-top: 0;">Detail Panel</h2>
    <p>This is the detail panel. It appears on the right side with a left shadow for elevation.</p>
    <p>You can put contextual information, forms, or additional details here.</p>
  </aside>
</div>
    `;

    return (
      <div style={{ position: 'relative', width: '100vw', height: '100vh', margin: '-1rem' }}>
        <div 
          className="eui-app-shell" 
          data-eui-sidebar-collapsed={sidebarCollapsed}
          data-eui-detail-panel-open={detailPanelOpen}
        >
          <a href="#main-content" className="eui-skip-link">Skip to main content</a>
          <a href="#main-navigation" className="eui-skip-link">Skip to navigation</a>
          
          <header className="eui-header" role="banner" aria-label="Application header">
            <div>Logo</div>
            <div style={{ display: 'flex', gap: '1rem', alignItems: 'center' }}>
              <button className="eui-button" data-eui-intent="secondary">Help</button>
              <span>User Name</span>
            </div>
          </header>
          
          <nav 
            id="main-navigation"
            className="eui-sidebar" 
            role="navigation" 
            aria-label="Main navigation"
            aria-expanded={!sidebarCollapsed}
            data-eui-collapsed={sidebarCollapsed}
          >
            <button 
              className="eui-button" 
              data-eui-intent="secondary"
              onClick={() => setSidebarCollapsed(!sidebarCollapsed)}
              style={{ color: 'white', borderColor: 'rgba(255, 255, 255, 0.3)' }}
            >
              {sidebarCollapsed ? '→' : '←'}
            </button>
            <div style={{ marginTop: '1rem' }}>
              <div style={{ padding: '0.5rem', color: 'white' }}>📊 Dashboard</div>
              <div style={{ padding: '0.5rem', color: 'white' }}>📈 Reports</div>
              <div style={{ padding: '0.5rem', color: 'white' }}>⚙️ Settings</div>
            </div>
          </nav>
          
          <div className="eui-title-bar eui-title-bar--global" role="region" aria-label="Global navigation">
            <div>Breadcrumbs: Home / Section</div>
            <div style={{ display: 'flex', gap: '0.5rem' }}>
              <button className="eui-button" data-eui-intent="secondary">Action</button>
            </div>
          </div>
          
          <div className="eui-title-bar eui-title-bar--contextual" role="region" aria-label="Page context">
            <h1 style={{ margin: 0, fontSize: '1.25rem', fontWeight: 600 }}>Page Title</h1>
            <div style={{ display: 'flex', gap: '0.5rem' }}>
              <button className="eui-button" data-eui-intent="secondary">Filter</button>
              <button className="eui-button" data-eui-intent="primary">New</button>
            </div>
          </div>
          
          <main id="main-content" className="eui-content" role="main" aria-label="Main content">
            <p>Main content area. This is where your primary content goes.</p>
            <p>You can scroll this area if content is long.</p>
            <button 
              className="eui-button" 
              data-eui-intent="primary"
              onClick={() => setDetailPanelOpen(!detailPanelOpen)}
            >
              {detailPanelOpen ? 'Close' : 'Open'} Detail Panel
            </button>
            {Array(10).fill(0).map((_, i) => (
              <p key={i}>Lorem ipsum dolor sit amet, consectetur adipiscing elit. Sed do eiusmod tempor incididunt ut labore et dolore magna aliqua.</p>
            ))}
          </main>
          
          <aside 
            className="eui-detail-panel" 
            role="complementary" 
            aria-label="Details panel"
            aria-hidden={!detailPanelOpen}
            data-eui-open={detailPanelOpen}
          >
            <h2 style={{ marginTop: 0 }}>Detail Panel</h2>
            <p>This is the detail panel. It appears on the right side with a left shadow for elevation.</p>
            <p>You can put contextual information, forms, or additional details here.</p>
          </aside>
        </div>
      </div>
    );
  }
};

export const IndividualComponents: Story = {
  name: 'Individual Components',
  render: () => {
    const htmlCode = `
<!-- Header -->
<header class="eui-header" role="banner" aria-label="Application header">
  <div>Logo</div>
  <div>User Info</div>
</header>

<!-- Sidebar -->
<nav class="eui-sidebar" role="navigation" aria-label="Main navigation" aria-expanded="true" data-eui-collapsed="false">
  <!-- Navigation items -->
</nav>

<!-- Title Bar (Global) -->
<div class="eui-title-bar eui-title-bar--global" role="region" aria-label="Global navigation">
  <!-- Global title bar content -->
</div>

<!-- Title Bar (Contextual) -->
<div class="eui-title-bar eui-title-bar--contextual" role="region" aria-label="Page context">
  <!-- Contextual title bar content -->
</div>

<!-- Content -->
<main class="eui-content" role="main" aria-label="Main content">
  <!-- Main content -->
</main>

<!-- Detail Panel -->
<aside class="eui-detail-panel" role="complementary" aria-label="Details panel" aria-hidden="false" data-eui-open="true">
  <!-- Detail panel content -->
</aside>
    `;

    return (
      <div style={containerStyle}>
        <h3 style={sectionTitleStyle}>Individual Layout Components</h3>
        <p style={{ margin: '0 0 1rem 0', color: '#64748b' }}>
          These components are designed to work together within an AppShell, but can be viewed individually for styling reference.
        </p>

        <div style={{ display: 'flex', flexDirection: 'column', gap: '1rem', border: '1px solid #e5e7eb', borderRadius: '8px', padding: '1rem' }}>
          <div>
            <h4 style={{ margin: '0 0 0.5rem 0', fontSize: '1rem', fontWeight: 600 }}>Header</h4>
            <header className="eui-header" role="banner" aria-label="Application header" style={{ position: 'relative', width: '100%' }}>
              <div>Logo</div>
              <div style={{ display: 'flex', gap: '1rem', alignItems: 'center' }}>
                <button className="eui-button" data-eui-intent="secondary">Help</button>
                <span>User Name</span>
              </div>
            </header>
          </div>

          <div>
            <h4 style={{ margin: '0 0 0.5rem 0', fontSize: '1rem', fontWeight: 600 }}>Sidebar (Expanded)</h4>
            <nav 
              className="eui-sidebar" 
              role="navigation" 
              aria-label="Main navigation"
              aria-expanded={true}
              data-eui-collapsed={false}
              style={{ position: 'relative', width: '240px', height: '200px' }}
            >
              <div style={{ padding: '0.5rem', color: 'white' }}>📊 Dashboard</div>
              <div style={{ padding: '0.5rem', color: 'white' }}>📈 Reports</div>
              <div style={{ padding: '0.5rem', color: 'white' }}>⚙️ Settings</div>
            </nav>
          </div>

          <div>
            <h4 style={{ margin: '0 0 0.5rem 0', fontSize: '1rem', fontWeight: 600 }}>Title Bar (Global)</h4>
            <div className="eui-title-bar eui-title-bar--global" role="region" aria-label="Global navigation" style={{ position: 'relative', width: '100%' }}>
              <div>Breadcrumbs: Home / Section</div>
              <div style={{ display: 'flex', gap: '0.5rem' }}>
                <button className="eui-button" data-eui-intent="secondary">Action</button>
              </div>
            </div>
          </div>

          <div>
            <h4 style={{ margin: '0 0 0.5rem 0', fontSize: '1rem', fontWeight: 600 }}>Title Bar (Contextual)</h4>
            <div className="eui-title-bar eui-title-bar--contextual" role="region" aria-label="Page context" style={{ position: 'relative', width: '100%' }}>
              <h1 style={{ margin: 0, fontSize: '1.25rem', fontWeight: 600 }}>Page Title</h1>
              <div style={{ display: 'flex', gap: '0.5rem' }}>
                <button className="eui-button" data-eui-intent="secondary">Filter</button>
                <button className="eui-button" data-eui-intent="primary">New</button>
              </div>
            </div>
          </div>

          <div>
            <h4 style={{ margin: '0 0 0.5rem 0', fontSize: '1rem', fontWeight: 600 }}>Content</h4>
            <main className="eui-content" role="main" aria-label="Main content" style={{ position: 'relative', width: '100%', height: '150px', border: '1px solid #e5e7eb' }}>
              <p>Main content area. This is where your primary content goes.</p>
            </main>
          </div>

          <div>
            <h4 style={{ margin: '0 0 0.5rem 0', fontSize: '1rem', fontWeight: 600 }}>Detail Panel</h4>
            <aside 
              className="eui-detail-panel" 
              role="complementary" 
              aria-label="Details panel"
              aria-hidden={false}
              data-eui-open={true}
              style={{ position: 'relative', width: '400px', height: '200px' }}
            >
              <h2 style={{ marginTop: 0 }}>Detail Panel</h2>
              <p>This is the detail panel with left shadow for elevation.</p>
            </aside>
          </div>
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

export const SkipLinks: Story = {
  name: 'Skip Links',
  render: () => {
    const htmlCode = `
<a href="#main-content" class="eui-skip-link">Skip to main content</a>
<a href="#main-navigation" class="eui-skip-link">Skip to navigation</a>

<main id="main-content">...</main>
<nav id="main-navigation">...</nav>
    `;

    return (
      <div style={containerStyle}>
        <h3 style={sectionTitleStyle}>Skip Links</h3>
        <p style={{ margin: '0 0 1rem 0', color: '#64748b' }}>
          Skip links allow keyboard users to quickly jump to main content or navigation, bypassing repetitive elements. They are hidden until focused.
        </p>
        <p style={{ margin: '0 0 1rem 0', color: '#64748b' }}>
          <strong>Try it:</strong> Press Tab to focus the skip links, then press Enter to jump to the target.
        </p>

        <div style={{ position: 'relative', border: '1px solid #e5e7eb', borderRadius: '8px', padding: '2rem', minHeight: '400px' }}>
          <a href="#main-content" className="eui-skip-link">Skip to main content</a>
          <a href="#main-navigation" className="eui-skip-link">Skip to navigation</a>
          
          <nav id="main-navigation" style={{ padding: '1rem', backgroundColor: '#f1f5f9', marginBottom: '1rem' }}>
            <strong>Navigation Area</strong> (Press Tab and Enter on skip link to jump here)
          </nav>
          
          <main id="main-content" style={{ padding: '1rem', backgroundColor: '#f9fafb' }}>
            <strong>Main Content Area</strong> (Press Tab and Enter on skip link to jump here)
            <p>This is the main content that users typically want to access quickly.</p>
          </main>
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






