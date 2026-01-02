import { useState, useEffect } from 'react';
import { SideNav } from '@packages/tsx/side-nav';
import type { SideNavSection, SideNavFooter } from '@packages/tsx/side-nav';
import { getNavigation } from './api/graphql';
import Home from './pages/Home';
import Components from './pages/Components';

type Page = 'home' | 'components';

function App() {
  const [currentPage, setCurrentPage] = useState<Page>('home');
  const [isCollapsed, setIsCollapsed] = useState(false);
  const [sections, setSections] = useState<SideNavSection[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    loadNavigation();
  }, []);

  useEffect(() => {
    // Обновить selected state при изменении currentPage
    setSections(prevSections => 
      prevSections.map(section => ({
        ...section,
        items: section.items.map(item => ({
          ...item,
          isSelected: currentPage === item.key,
        })),
      }))
    );
  }, [currentPage]);

  async function loadNavigation() {
    try {
      const navData = await getNavigation();
      
      // Преобразовать данные из GraphQL в формат SideNav
      const formattedSections: SideNavSection[] = navData.map(section => {
        const filteredItems = section.items
          .filter(item => item.isActive && !item.isDisabled)
          .sort((a, b) => a.orderIndex - b.orderIndex)
          .map(item => ({
            key: item.key,
            label: item.label,
            icon: item.icon as any,
            badge: item.badge ? (isNaN(Number(item.badge)) ? item.badge : Number(item.badge)) : undefined,
            isSelected: currentPage === item.key,
            onAction: () => {
              const pageKey = item.key as Page;
              setCurrentPage(pageKey);
            },
          }));
        
        return {
          key: section.key,
          title: section.title,
          items: filteredItems,
        };
      });
      
      setSections(formattedSections);
    } catch (error) {
      console.error('Failed to load navigation:', error);
      // Fallback к дефолтным данным
      setSections([{
        key: 'navigation',
        items: [
          {
            key: 'home',
            label: 'Home',
            icon: 'plan-dashboards',
            isSelected: currentPage === 'home',
            onAction: () => setCurrentPage('home'),
          },
          {
            key: 'components',
            label: 'Components',
            icon: 'cog',
            isSelected: currentPage === 'components',
            onAction: () => setCurrentPage('components'),
          },
        ],
      }]);
    } finally {
      setLoading(false);
    }
  }

  const footer: SideNavFooter = {
    name: 'Alex Morgan',
    role: 'Head of Product',
    avatarUrl: 'https://i.pravatar.cc/150?img=12'
  };

  if (loading) {
    return (
      <div 
        data-eui-context="app" 
        data-eui-theme="default" 
        style={{ 
          display: 'flex', 
          alignItems: 'center',
          justifyContent: 'center',
          height: '100vh'
        }}
      >
        <div>Loading...</div>
      </div>
    );
  }

  return (
    <div 
      data-eui-context="app" 
      data-eui-theme="default" 
      style={{ 
        display: 'flex', 
        height: '100vh',
        overflow: 'hidden'
      }}
    >
      <SideNav
        sections={sections}
        footer={footer}
        isCollapsed={isCollapsed}
        onCollapsedChange={setIsCollapsed}
      />
      <main style={{ 
        flex: 1, 
        padding: '32px', 
        overflow: 'auto',
        maxWidth: '1200px',
        margin: '0 auto'
      }}>
        {currentPage === 'home' && <Home />}
        {currentPage === 'components' && <Components />}
      </main>
    </div>
  );
}

export default App;

