import { useEffect, useState } from 'react';
import { useParams } from 'react-router-dom';
import { getPageContent, getNavigation } from '../api/graphql';
import type { PageContent, NavigationSection } from '../api/graphql';

function PageContent() {
  const { pageKey } = useParams<{ pageKey: string }>();
  const [content, setContent] = useState<PageContent | null>(null);
  const [loading, setLoading] = useState(true);
  const [pageInfo, setPageInfo] = useState<{
    label: string;
    icon?: string;
    sectionTitle?: string;
  } | null>(null);

  useEffect(() => {
    if (!pageKey) {
      setLoading(false);
      return;
    }

    async function loadContent() {
      try {
        setLoading(true);
        
        // Загрузить информацию о странице из навигации
        const navData = await getNavigation();
        let foundPage: { label: string; icon?: string; sectionTitle?: string } | null = null;
        
        for (const section of navData) {
          const item = section.items.find(item => item.key === pageKey);
          if (item) {
            foundPage = {
              label: item.label,
              icon: item.icon,
              sectionTitle: section.title,
            };
            break;
          }
        }
        
        setPageInfo(foundPage);
        
        // Попытаться загрузить контент из БД
        try {
          const pageContent = await getPageContent(pageKey);
          setContent(pageContent);
        } catch (err) {
          // Если контент не найден, это нормально - покажем placeholder
          setContent(null);
        }
      } catch (err) {
        // Если навигация не загрузилась, все равно покажем placeholder
        setPageInfo(null);
        setContent(null);
      } finally {
        setLoading(false);
      }
    }

    loadContent();
  }, [pageKey]);

  if (loading) {
    return (
      <div style={{ 
        display: 'flex', 
        alignItems: 'center', 
        justifyContent: 'center',
        minHeight: '400px'
      }}>
        <div>Loading...</div>
      </div>
    );
  }

  // Используем данные из навигации или контента из БД
  const title = content?.title || pageInfo?.label || pageKey || 'Page';
  const sectionTitle = pageInfo?.sectionTitle;
  const icon = pageInfo?.icon || (content?.metadata ? JSON.parse(content.metadata).icon : undefined);
  const pageContent = content?.content;

  return (
    <div style={{ 
      display: 'flex', 
      flexDirection: 'column', 
      gap: '24px',
      maxWidth: '800px'
    }}>
      <div>
        <h1 style={{ 
          fontSize: '2rem', 
          fontWeight: 600, 
          marginBottom: '8px',
          color: 'var(--eui-color-text-primary, #0f172a)'
        }}>
          {title}
        </h1>
        {sectionTitle && (
          <p style={{ 
            fontSize: '0.875rem', 
            color: 'var(--eui-color-text-muted, #64748b)',
            marginTop: '4px'
          }}>
            Section: {sectionTitle}
          </p>
        )}
      </div>

      <div style={{
        padding: '32px',
        backgroundColor: '#ffffff',
        borderRadius: '8px',
        border: '1px solid var(--eui-color-border-default, #e2e8f0)'
      }}>
        {pageContent ? (
          <div style={{ 
            color: 'var(--eui-color-text-primary, #0f172a)',
            lineHeight: '1.6',
            whiteSpace: 'pre-wrap'
          }}>
            {pageContent}
          </div>
        ) : (
          <div style={{
            textAlign: 'center',
            padding: '48px 24px',
            color: 'var(--eui-color-text-muted, #64748b)'
          }}>
            <div style={{ fontSize: '3rem', marginBottom: '16px' }}>
              {icon ? (
                <span style={{ fontSize: '2rem' }}>{icon}</span>
              ) : (
                '📄'
              )}
            </div>
            <p style={{ fontSize: '1rem', marginBottom: '8px', color: 'var(--eui-color-text-primary, #0f172a)' }}>
              <strong>{title}</strong>
            </p>
            <p style={{ fontSize: '0.875rem', lineHeight: '1.6' }}>
              This page is coming soon. Content will be available here in the future.
            </p>
          </div>
        )}
      </div>

      <div style={{
        padding: '16px',
        backgroundColor: '#f8f9fa',
        borderRadius: '8px',
        fontSize: '0.875rem',
        color: 'var(--eui-color-text-muted, #64748b)'
      }}>
        <strong>Page Key:</strong> <code style={{ 
          padding: '2px 6px', 
          backgroundColor: '#ffffff',
          borderRadius: '4px',
          fontFamily: 'monospace'
        }}>{pageKey}</code>
      </div>
    </div>
  );
}

export default PageContent;

