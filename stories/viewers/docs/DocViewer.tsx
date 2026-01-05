import React, { useEffect, useState } from 'react';
import ReactMarkdown from 'react-markdown';
import remarkGfm from 'remark-gfm';
import type { CSSProperties } from 'react';
import { adrNumberToStoryPath, storySlugFromAdrLinkText } from './adr-links';
import { docsRegistryByPath } from './docs-registry';
import { MermaidDiagram } from '../shared/MermaidDiagram';

type DocViewerProps = {
  markdownPath: string;
  fallback?: string;
  title?: string;
  status?: string;
  date?: string;
};

const containerStyle: CSSProperties = {
  padding: '24px',
  maxWidth: 1200,
  margin: '0 auto',
  color: '#0f172a'
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

const statusToTone = (status: string) => {
  const normalized = status.toLowerCase();
  if (normalized.startsWith('accepted')) return 'success';
  if (normalized.startsWith('exploratory')) return 'info';
  if (normalized.startsWith('proposed')) return 'warning';
  if (normalized.startsWith('rejected')) return 'error';
  if (normalized.startsWith('superseded')) return 'neutral';
  return 'neutral';
};

const contentStyle: CSSProperties = {
  background: '#fff',
  padding: '32px',
  borderRadius: '8px',
  border: '1px solid #e2e8f0',
  boxShadow: '0 1px 3px rgba(15, 23, 42, 0.08)',
  fontSize: '15px',
  lineHeight: 1.7
};

const loadingStyle: CSSProperties = {
  ...contentStyle,
  textAlign: 'center',
  padding: '48px 24px',
  color: '#64748b'
};

const errorStyle: CSSProperties = {
  ...contentStyle,
  background: '#fef2f2',
  borderColor: '#fecaca',
  color: '#dc2626',
  padding: '24px'
};

const resolveDocPath = (href: string, basePath: string): string | null => {
  if (!href || !basePath || typeof window === 'undefined') {
    return null;
  }

  try {
    const baseUrl = new URL(basePath, window.location.origin);
    const resolved = new URL(href, baseUrl);
    if (resolved.origin !== window.location.origin) {
      return null;
    }
    return resolved.pathname;
  } catch {
    return null;
  }
};

const resolveDocStoryPath = (resolvedDocPath: string | null): string | null => {
  if (!resolvedDocPath) return null;
  const normalizedPath = resolvedDocPath
    .replace(/^\/docs\//, '')
    .replace(/^\/+/, '');
  const docEntry = docsRegistryByPath.get(normalizedPath);
  if (docEntry?.storybookId) {
    return `?path=/story/${docEntry.storybookId}`;
  }
  return null;
};

export const DocViewer = ({
  markdownPath,
  fallback = 'Loading...',
  title,
  status,
  date
}: DocViewerProps) => {
  const [content, setContent] = useState<string>('');
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    setLoading(true);
    setError(null);
    fetch(markdownPath)
      .then(res => {
        if (!res.ok) throw new Error('Failed to load');
        return res.text();
      })
      .then(text => {
        setContent(text);
        setLoading(false);
      })
      .catch((err) => {
        setError(err.message || 'Failed to load');
        setLoading(false);
      });
  }, [markdownPath]);

  if (loading) {
    return (
      <div style={containerStyle}>
        <div style={loadingStyle}>
          <p style={{ margin: 0 }}>{fallback}</p>
        </div>
      </div>
    );
  }

  if (error) {
    return (
      <div style={containerStyle}>
        <div style={errorStyle}>
          <p style={{ margin: '0 0 8px', fontWeight: 600 }}>Error loading document</p>
          <p style={{ margin: 0, fontSize: '14px' }}>Failed to load documentation from {markdownPath}</p>
        </div>
      </div>
    );
  }

  return (
    <div style={containerStyle}>
      {title || status || date ? (
        <div style={headerStyle}>
          {title ? <h1 style={titleStyle}>{title}</h1> : null}
          {status || date ? (
            <div style={metaStyle}>
              {status ? (
                <span className="eui-badge" data-eui-variant="subtle" data-eui-tone={statusToTone(status)}>
                  {status}
                </span>
              ) : null}
              {date ? <span>Date: {date}</span> : null}
            </div>
          ) : null}
        </div>
      ) : null}
      <div style={contentStyle}>
        <ReactMarkdown
          remarkPlugins={[remarkGfm]}
          components={{
            h1: ({node, ...props}: any) => (
              <h1 style={{
                marginTop: '32px',
                marginBottom: '16px',
                color: '#0f172a',
                borderBottom: '2px solid #e2e8f0',
                paddingBottom: '8px'
              }} className="eui-text-heading-5" {...props} />
            ),
            h2: ({node, ...props}: any) => (
              <h2 style={{
                marginTop: '28px',
                marginBottom: '12px',
                color: '#0f172a'
              }} className="eui-text-heading-6" {...props} />
            ),
            h3: ({node, ...props}: any) => (
              <h3 style={{
                marginTop: '24px',
                marginBottom: '10px',
                color: '#0f172a'
              }} className="eui-text-title-md" {...props} />
            ),
            p: ({node, ...props}: any) => (
              <p style={{
                margin: '0 0 16px'
              }} className="eui-text-body" {...props} />
            ),
            ul: ({node, ...props}: any) => (
              <ul style={{
                margin: '0 0 16px',
                paddingLeft: '24px',
                lineHeight: 1.7
              }} {...props} />
            ),
            ol: ({node, ...props}: any) => (
              <ol style={{
                margin: '0 0 16px',
                paddingLeft: '24px',
                lineHeight: 1.7
              }} {...props} />
            ),
            li: ({node, ...props}: any) => (
              <li style={{
                marginTop: '0.25rem'
              }} className="eui-text-body" {...props} />
            ),
            a: ({node, href, children, ...props}: any) => {
              let storybookHref = href;
              let targetAdrNumber: string | null = null;
              const resolvedDocPath = href && markdownPath ? resolveDocPath(href, markdownPath) : null;

              if (href && typeof href === 'string') {
                const adrMatch = href.match(/ADR-(\d{4})[^/]*\.md$/);
                if (adrMatch) {
                  targetAdrNumber = adrMatch[1];

                  const linkText = typeof children === 'string' ? children :
                    (Array.isArray(children) ? children.map(c =>
                      typeof c === 'string' ? c :
                      (typeof c === 'object' && c?.props?.children ? String(c.props.children) : '')
                    ).join('') : '');

                  const storySlug = linkText ? storySlugFromAdrLinkText(linkText) : null;

                  if (storySlug) {
                    storybookHref = `?path=/story/docs-adr--${storySlug}`;
                  } else {
                    storybookHref = '#';
                    adrNumberToStoryPath(targetAdrNumber).then(path => {
                      if (path) {
                        const linkElements = document.querySelectorAll(`a[data-adr-link="${targetAdrNumber}"]`);
                        linkElements.forEach(link => {
                          link.setAttribute('href', path);
                          link.removeAttribute('data-adr-link');
                        });
                      }
                    }).catch(() => {
                      console.warn(`Could not resolve ADR-${targetAdrNumber} link`);
                    });
                  }
                }
              }

              if (!targetAdrNumber) {
                const docStoryPath = resolveDocStoryPath(resolvedDocPath);
                if (docStoryPath) {
                  storybookHref = docStoryPath;
                }
              }

              const dataAttr = storybookHref === '#' && targetAdrNumber ? { 'data-adr-link': targetAdrNumber } : {};

              return (
                <a
                  href={storybookHref}
                  {...dataAttr}
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
                >
                  {children}
                </a>
              );
            },
            code: ({node, inline, className, children, ...props}: any) => {
              if (inline) {
                return (
                  <code style={{
                    background: '#f1f5f9',
                    padding: '2px 6px',
                    borderRadius: '4px',
                    color: '#e11d48'
                  }} className="eui-text-code-base" {...props}>
                    {children}
                  </code>
                );
              }

              let codeText = '';
              if (typeof children === 'string') {
                codeText = children;
              } else if (Array.isArray(children)) {
                codeText = children
                  .map((c: any) => typeof c === 'string' ? c : (c?.props?.children || ''))
                  .join('');
              } else {
                codeText = String(children || '');
              }

              const trimmedText = codeText.trim();
              const hasLineBreaks = trimmedText.includes('\n');
              const hasLanguage = className && /language-\w+/.test(className);

              const shouldBeInlineBlock =
                trimmedText.length > 0 &&
                trimmedText.length <= 200 &&
                !hasLineBreaks &&
                !hasLanguage;

              if (shouldBeInlineBlock) {
                return (
                  <code style={{
                    display: 'inline-block',
                    background: '#f1f5f9',
                    padding: '2px 6px',
                    borderRadius: '4px',
                    color: '#e11d48',
                    margin: '0 2px',
                    verticalAlign: 'baseline'
                  }} className="eui-text-code-base" {...props}>
                    {children}
                  </code>
                );
              }

              return (
                <code style={{
                  display: 'block',
                  background: '#0f172a',
                  color: '#e2e8f0',
                  padding: '16px',
                  borderRadius: '8px',
                  lineHeight: 1.6,
                  overflowX: 'auto',
                  whiteSpace: 'pre-wrap',
                  wordBreak: 'break-word',
                  margin: '16px 0'
                }} className="eui-text-code-base" {...props}>
                  {children}
                </code>
              );
            },
            pre: ({node, children, ...props}: any) => {
              const codeElement = React.Children.toArray(children).find(
                (child: any) => {
                  if (typeof child === 'object' && child?.props) {
                    const className = child.props.className || '';
                    return className.includes('language-mermaid');
                  }
                  return false;
                }
              ) as any;

              if (codeElement) {
                let chart = '';
                if (typeof codeElement.props.children === 'string') {
                  chart = codeElement.props.children;
                } else if (Array.isArray(codeElement.props.children)) {
                  chart = codeElement.props.children
                    .map((c: any) => typeof c === 'string' ? c : (c?.props?.children || ''))
                    .join('');
                } else if (codeElement.props.children) {
                  chart = String(codeElement.props.children);
                }

                if (chart.trim()) {
                  return <MermaidDiagram chart={chart.trim()} />;
                }
              }

              return (
                <pre style={{
                  margin: '16px 0',
                  overflowX: 'auto'
                }} {...props}>
                  {children}
                </pre>
              );
            },
            table: ({node, ...props}: any) => (
              <div style={{ overflowX: 'auto', margin: '16px 0' }}>
                <table style={{
                  width: '100%',
                  borderCollapse: 'collapse',
                  border: '1px solid #e2e8f0'
                }} {...props} />
              </div>
            ),
            th: ({node, ...props}: any) => (
              <th style={{
                padding: '12px',
                background: '#f8fafc',
                border: '1px solid #e2e8f0',
                textAlign: 'left',
                fontWeight: 600
              }} {...props} />
            ),
            td: ({node, ...props}: any) => (
              <td style={{
                padding: '12px',
                border: '1px solid #e2e8f0'
              }} {...props} />
            ),
            blockquote: ({node, ...props}: any) => (
              <blockquote style={{
                margin: '16px 0',
                padding: '12px 16px',
                borderLeft: '4px solid #066a8d',
                background: '#f8fafc',
                color: '#475569',
                fontStyle: 'italic'
              }} className="eui-text-body-sm" {...props} />
            ),
            hr: ({node, ...props}: any) => (
              <hr style={{
                margin: '24px 0',
                border: 'none',
                borderTop: '2px solid #e2e8f0'
              }} {...props} />
            ),
            strong: ({node, ...props}: any) => (
              <strong style={{ fontWeight: 700 }} {...props} />
            )
          }}
        >
          {content}
        </ReactMarkdown>
      </div>
    </div>
  );
};

export type { DocViewerProps };
