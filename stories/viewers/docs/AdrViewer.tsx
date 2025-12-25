import type { CSSProperties } from 'react';
import React, { useEffect, useState } from 'react';
import ReactMarkdown from 'react-markdown';
import remarkGfm from 'remark-gfm';

type AdrViewerProps = {
  adrNumber: string;
  title: string;
  status: string;
  date: string;
};

const containerStyle: CSSProperties = {
  padding: '24px',
  maxWidth: 1200,
  margin: '0 auto',
  fontFamily: 'system-ui, -apple-system, BlinkMacSystemFont, "Segoe UI", sans-serif',
  color: '#0f172a',
  lineHeight: 1.6
};

const headerStyle: CSSProperties = {
  marginBottom: '24px',
  paddingBottom: '16px',
  borderBottom: '2px solid #e2e8f0'
};

const titleStyle: CSSProperties = {
  margin: '0 0 8px',
  fontSize: '24px',
  fontWeight: 600,
  color: '#0f172a'
};

const metaStyle: CSSProperties = {
  display: 'flex',
  gap: '16px',
  fontSize: '14px',
  color: '#64748b',
  marginTop: '8px'
};

const statusBadgeStyle: CSSProperties = {
  display: 'inline-block',
  padding: '2px 8px',
  borderRadius: '4px',
  fontSize: '12px',
  fontWeight: 600,
  textTransform: 'uppercase'
};

const getStatusStyle = (status: string): CSSProperties => {
  const base = { ...statusBadgeStyle };
  switch (status.toLowerCase()) {
    case 'accepted':
      return { ...base, background: '#d1fae5', color: '#065f46' };
    case 'exploratory':
      return { ...base, background: '#dbeafe', color: '#1e40af' };
    case 'superseded':
      return { ...base, background: '#f3f4f6', color: '#374151' };
    default:
      return { ...base, background: '#fef3c7', color: '#92400e' };
  }
};

const contentStyle: CSSProperties = {
  background: '#fff',
  padding: '32px',
  borderRadius: '8px',
  border: '1px solid #e2e8f0',
  boxShadow: '0 1px 3px rgba(15, 23, 42, 0.08)'
};

const markdownContentStyle: CSSProperties = {
  ...contentStyle,
  // Markdown specific styles
  fontSize: '15px',
  lineHeight: 1.7
};

const loadingStyle: CSSProperties = {
  ...contentStyle,
  textAlign: 'center',
  padding: '48px 24px'
};

const errorStyle: CSSProperties = {
  ...contentStyle,
  background: '#fef2f2',
  borderColor: '#fecaca',
  color: '#dc2626'
};

const linkStyle: CSSProperties = {
  color: '#066a8d',
  textDecoration: 'none',
  fontWeight: 500
};

export const AdrViewer = ({ adrNumber, title, status, date }: AdrViewerProps) => {
  const [content, setContent] = useState<string>('');
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);
  
  useEffect(() => {
    setLoading(true);
    setError(null);
    
    // Загружаем markdown файл напрямую (универсальный подход, не зависит от Vite)
    fetch(`/docs/adr/ADR-${adrNumber}.md`)
      .then(res => {
        if (!res.ok) {
          throw new Error(`Failed to load ADR-${adrNumber}: ${res.status} ${res.statusText}`);
        }
        return res.text();
      })
      .then(text => {
        setContent(text);
        setLoading(false);
      })
      .catch(err => {
        console.error('Error loading ADR:', err);
        setError(err.message || 'Failed to load ADR document');
        setLoading(false);
      });
  }, [adrNumber]);
  
  return (
    <div style={containerStyle}>
      <div style={headerStyle}>
        <h1 style={titleStyle}>ADR-{adrNumber}: {title}</h1>
        <div style={metaStyle}>
          <span style={getStatusStyle(status)}>{status}</span>
          <span>Date: {date}</span>
        </div>
      </div>
      
      {loading && (
        <div style={loadingStyle}>
          <p style={{ color: '#64748b', margin: 0 }}>Loading ADR document...</p>
        </div>
      )}
      
      {error && (
        <div style={errorStyle}>
          <p style={{ margin: '0 0 8px', fontWeight: 600 }}>Error loading document</p>
          <p style={{ margin: 0, fontSize: '14px' }}>{error}</p>
          <p style={{ margin: '16px 0 0', fontSize: '14px', color: '#64748b' }}>
            Make sure the file exists at: <code>/docs/adr/ADR-{adrNumber}.md</code>
          </p>
        </div>
      )}
      
      {content && !loading && !error && (
        <div style={markdownContentStyle}>
          <ReactMarkdown 
            remarkPlugins={[remarkGfm]}
            components={{
              // Кастомизация заголовков
              h1: ({node, ...props}) => (
                <h1 style={{ 
                  fontSize: '28px', 
                  marginTop: '32px', 
                  marginBottom: '16px',
                  fontWeight: 600,
                  color: '#0f172a',
                  borderBottom: '2px solid #e2e8f0',
                  paddingBottom: '8px'
                }} {...props} />
              ),
              h2: ({node, ...props}) => (
                <h2 style={{ 
                  fontSize: '24px', 
                  marginTop: '28px', 
                  marginBottom: '12px',
                  fontWeight: 600,
                  color: '#0f172a'
                }} {...props} />
              ),
              h3: ({node, ...props}) => (
                <h3 style={{ 
                  fontSize: '20px', 
                  marginTop: '24px', 
                  marginBottom: '10px',
                  fontWeight: 600,
                  color: '#0f172a'
                }} {...props} />
              ),
              // Кастомизация параграфов
              p: ({node, ...props}) => (
                <p style={{ 
                  margin: '0 0 16px',
                  lineHeight: 1.7
                }} {...props} />
              ),
              // Кастомизация списков
              ul: ({node, ...props}) => (
                <ul style={{ 
                  margin: '0 0 16px',
                  paddingLeft: '24px',
                  lineHeight: 1.7
                }} {...props} />
              ),
              ol: ({node, ...props}) => (
                <ol style={{ 
                  margin: '0 0 16px',
                  paddingLeft: '24px',
                  lineHeight: 1.7
                }} {...props} />
              ),
              // Кастомизация ссылок
              a: ({node, href, ...props}: any) => {
                // Convert ADR file links to Storybook story links
                let storybookHref = href;
                if (href && typeof href === 'string') {
                  // Match links to ADR files: ./ADR-XXXX-*.md or ADR-XXXX-*.md
                  const adrMatch = href.match(/ADR-(\d{4})[^/]*\.md$/);
                  if (adrMatch) {
                    const adrNumber = adrMatch[1];
                    // Remove leading zeros: 0001 -> 1, 0010 -> 10, 0021 -> 21
                    const adrId = adrNumber.replace(/^0+/, '') || '0';
                    storybookHref = `?path=/story/docs-adr-adr-${adrId}--default`;
                  }
                }
                
                return (
                  <a 
                    href={storybookHref}
                    style={{ 
                      color: '#066a8d',
                      textDecoration: 'none',
                      fontWeight: 500,
                      borderBottom: '1px solid transparent',
                      transition: 'border-color 0.2s'
                    }} 
                    onMouseEnter={(e) => {
                      e.currentTarget.style.borderBottomColor = '#066a8d';
                    }}
                    onMouseLeave={(e) => {
                      e.currentTarget.style.borderBottomColor = 'transparent';
                    }}
                    {...props} 
                  />
                );
              },
              // Кастомизация кода
              code: ({node, inline, ...props}: any) => {
                if (inline) {
                  return (
                    <code style={{
                      background: '#f1f5f9',
                      padding: '2px 6px',
                      borderRadius: '4px',
                      fontSize: '0.9em',
                      fontFamily: 'Monaco, "Courier New", monospace',
                      color: '#e11d48'
                    }} {...props} />
                  );
                }
                return (
                  <code style={{
                    display: 'block',
                    background: '#0f172a',
                    color: '#e2e8f0',
                    padding: '16px',
                    borderRadius: '8px',
                    fontSize: '14px',
                    lineHeight: 1.6,
                    overflowX: 'auto',
                    fontFamily: 'Monaco, "Courier New", monospace',
                    margin: '16px 0'
                  }} {...props} />
                );
              },
              // Кастомизация блоков кода
              pre: ({node, ...props}: any) => (
                <pre style={{
                  margin: '16px 0',
                  overflowX: 'auto'
                }} {...props} />
              ),
              // Кастомизация таблиц
              table: ({node, ...props}) => (
                <div style={{ overflowX: 'auto', margin: '16px 0' }}>
                  <table style={{
                    width: '100%',
                    borderCollapse: 'collapse',
                    border: '1px solid #e2e8f0'
                  }} {...props} />
                </div>
              ),
              th: ({node, ...props}) => (
                <th style={{
                  padding: '12px',
                  background: '#f8fafc',
                  border: '1px solid #e2e8f0',
                  textAlign: 'left',
                  fontWeight: 600
                }} {...props} />
              ),
              td: ({node, ...props}) => (
                <td style={{
                  padding: '12px',
                  border: '1px solid #e2e8f0'
                }} {...props} />
              ),
              // Кастомизация блоков цитат
              blockquote: ({node, ...props}) => (
                <blockquote style={{
                  margin: '16px 0',
                  padding: '12px 16px',
                  borderLeft: '4px solid #066a8d',
                  background: '#f8fafc',
                  color: '#475569',
                  fontStyle: 'italic'
                }} {...props} />
              ),
              // Кастомизация горизонтальных линий
              hr: ({node, ...props}) => (
                <hr style={{
                  margin: '24px 0',
                  border: 'none',
                  borderTop: '2px solid #e2e8f0'
                }} {...props} />
              )
            }}
          >
            {content}
          </ReactMarkdown>
        </div>
      )}
    </div>
  );
};

