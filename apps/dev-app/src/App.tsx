import { useState, useEffect } from 'react';
import { BrowserRouter, Routes, Route, useNavigate, useLocation } from 'react-router-dom';
import { SideNav } from '@packages/tsx/side-nav';
import type { SideNavSection, SideNavFooter } from '@packages/tsx/side-nav';
import { getNavigation } from './api/graphql';
import type { NavigationSection } from './api/graphql';
import Home from './pages/Home';
import Components from './pages/Components';
import PageContent from './pages/PageContent';

function AppContent() {
  const location = useLocation();
  const navigate = useNavigate();
  const [isCollapsed, setIsCollapsed] = useState(true);
  const [sections, setSections] = useState<SideNavSection[]>([]);
  const [loading, setLoading] = useState(true);
  const [navigationData, setNavigationData] = useState<NavigationSection[]>([]);

  useEffect(() => {
    loadNavigation();
  }, []);

  useEffect(() => {
    // Обновить selected state при изменении роута
    const currentKey = location.pathname.replace('/', '') || 'home';
    setSections(prevSections => 
      prevSections.map(section => ({
        ...section,
        items: section.items.map(item => ({
          ...item,
          isSelected: currentKey === item.key,
        })),
      }))
    );
  }, [location.pathname]);

  async function loadNavigation() {
    try {
      const navData = await getNavigation();
      setNavigationData(navData);
      
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
            isSelected: location.pathname === `/${item.key}` || (location.pathname === '/' && item.key === 'home'),
            onAction: () => {
              // Использовать routePath если есть, иначе key
              const path = item.routePath || `/${item.key}`;
              navigate(path);
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
        items: [
          {
            key: 'home',
            label: 'Home',
            icon: 'plan-dashboards',
            isSelected: location.pathname === '/' || location.pathname === '/home',
            onAction: () => navigate('/home'),
          },
          {
            key: 'components',
            label: 'Components',
            icon: 'cog',
            isSelected: location.pathname === '/components',
            onAction: () => navigate('/components'),
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
        width: '100%',
        backgroundColor: '#ffffff'
      }}>
        <Routes>
          <Route path="/" element={<Home />} />
          <Route path="/home" element={<Home />} />
          <Route path="/components" element={<Components />} />
          <Route path="/:pageKey" element={<PageContent />} />
        </Routes>
      </main>
    </div>
  );
}

function App() {
  return (
    <BrowserRouter>
      <AppContent />
    </BrowserRouter>
  );
}

export default App;

