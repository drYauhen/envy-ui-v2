import { useState } from 'react';
import Home from './pages/Home';
import Components from './pages/Components';

type Page = 'home' | 'components';

function App() {
  const [currentPage, setCurrentPage] = useState<Page>('home');

  return (
    <div data-eui-context="app" data-eui-theme="default">
      <nav style={{ 
        padding: '16px', 
        borderBottom: '1px solid var(--eui-color-border-default, #e2e8f0)',
        background: 'var(--eui-color-background-surface, #ffffff)'
      }}>
        <div style={{ display: 'flex', gap: '16px', alignItems: 'center' }}>
          <h1 style={{ margin: 0, fontSize: '18px', fontWeight: 600 }}>
            Envy UI - Dev Test App
          </h1>
          <div style={{ display: 'flex', gap: '8px', marginLeft: 'auto' }}>
            <button
              onClick={() => setCurrentPage('home')}
              className="ui-button"
              style={{
                padding: '8px 16px',
                background: currentPage === 'home' ? 'var(--eui-color-brand-primary, #0ea5e9)' : 'transparent',
                color: currentPage === 'home' ? '#ffffff' : 'var(--eui-color-text-primary, #0f172a)',
                border: '1px solid var(--eui-color-border-default, #e2e8f0)',
                borderRadius: '4px',
                cursor: 'pointer',
              }}
            >
              Home
            </button>
            <button
              onClick={() => setCurrentPage('components')}
              className="ui-button"
              style={{
                padding: '8px 16px',
                background: currentPage === 'components' ? 'var(--eui-color-brand-primary, #0ea5e9)' : 'transparent',
                color: currentPage === 'components' ? '#ffffff' : 'var(--eui-color-text-primary, #0f172a)',
                border: '1px solid var(--eui-color-border-default, #e2e8f0)',
                borderRadius: '4px',
                cursor: 'pointer',
              }}
            >
              Components
            </button>
          </div>
        </div>
      </nav>
      <main style={{ padding: '32px', maxWidth: '1200px', margin: '0 auto' }}>
        {currentPage === 'home' && <Home />}
        {currentPage === 'components' && <Components />}
      </main>
    </div>
  );
}

export default App;

