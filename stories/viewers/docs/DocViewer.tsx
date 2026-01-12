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
  badges?: Array<{
    label: string;
    tone?: 'success' | 'warning' | 'error' | 'info' | 'neutral';
    variant?: 'solid' | 'outline';
  }>;
};

type LayoutDiagramKind =
  | 'app-shell-page'
  | 'standalone-page'
  | 'data-table-page'
  | 'split-two'
  | 'split-right-bottom'
  | 'split-full-width';

const layoutDiagramContainerStyle: CSSProperties = {
  margin: '16px 0',
  padding: 'var(--eui-spacing-lg)',
  background: 'var(--eui-card-variant-flat-background)',
  border: '1px solid var(--eui-color-border-default)',
  borderRadius: 'var(--eui-card-variant-flat-radius)'
};

const layoutDiagramTitleStyle: CSSProperties = {
  marginBottom: '12px',
  color: 'var(--eui-color-text-muted)'
};

const layoutPaneStyle: CSSProperties = {
  padding: 'var(--eui-spacing-md)',
  minHeight: '96px'
};

const layoutPaneTitleStyle: CSSProperties = {
  margin: 0,
  fontWeight: 600,
  color: 'var(--eui-color-text-primary)'
};

const layoutPaneMetaStyle: CSSProperties = {
  marginTop: '4px',
  color: 'var(--eui-color-text-muted)'
};

const layoutRegionStyle: CSSProperties = {
  padding: 'var(--eui-spacing-sm)',
  minHeight: '44px'
};

const getNodeText = (value: any): string => {
  if (typeof value === 'string') {
    return value;
  }
  if (Array.isArray(value)) {
    return value.map((item) => getNodeText(item)).join('');
  }
  if (typeof value === 'object' && value?.props?.children) {
    return getNodeText(value.props.children);
  }
  return String(value ?? '');
};

const LayoutDiagram = ({ kind }: { kind: LayoutDiagramKind }) => {
  if (kind === 'app-shell-page') {
    return (
      <div className="eui-card" data-eui-variant="flat" style={layoutDiagramContainerStyle}>
        <div className="eui-text-body-sm" style={layoutDiagramTitleStyle}>
          App shell + page content
        </div>
        <div className="eui-stack" data-eui-gap="sm">
          <div className="eui-card" data-eui-variant="elevated" style={layoutRegionStyle}>
            <span className="eui-text-body-sm" style={layoutPaneTitleStyle}>Global header</span>
          </div>
          <div className="eui-grid" data-eui-cols="2" style={{ gridTemplateColumns: '160px 1fr' }}>
            <div className="eui-card" data-eui-variant="elevated" style={{ ...layoutPaneStyle, minHeight: '220px' }}>
              <p className="eui-text-body-sm" style={layoutPaneTitleStyle}>Side nav</p>
              <p className="eui-text-body-sm" style={layoutPaneMetaStyle}>eui-side-nav</p>
            </div>
            <div className="eui-stack" data-eui-gap="sm">
              <div className="eui-card" data-eui-variant="elevated" style={layoutRegionStyle}>
                <span className="eui-text-body-sm" style={layoutPaneTitleStyle}>Title bar (global)</span>
              </div>
              <div className="eui-card" data-eui-variant="elevated" style={layoutRegionStyle}>
                <span className="eui-text-body-sm" style={layoutPaneTitleStyle}>Title bar (context)</span>
              </div>
              <div className="eui-card" data-eui-variant="elevated" style={{ ...layoutPaneStyle, minHeight: '120px' }}>
                <p className="eui-text-body-sm" style={layoutPaneTitleStyle}>Page body</p>
                <p className="eui-text-body-sm" style={layoutPaneMetaStyle}>eui-page</p>
              </div>
            </div>
          </div>
        </div>
      </div>
    );
  }

  if (kind === 'standalone-page') {
    return (
      <div className="eui-card" data-eui-variant="flat" style={layoutDiagramContainerStyle}>
        <div className="eui-text-body-sm" style={layoutDiagramTitleStyle}>
          Standalone page (site/report)
        </div>
        <div className="eui-stack" data-eui-gap="sm">
          <div className="eui-card" data-eui-variant="elevated" style={layoutRegionStyle}>
            <span className="eui-text-body-sm" style={layoutPaneTitleStyle}>Page header</span>
          </div>
          <div className="eui-card" data-eui-variant="elevated" style={{ ...layoutPaneStyle, minHeight: '120px' }}>
            <p className="eui-text-body-sm" style={layoutPaneTitleStyle}>Page body</p>
            <p className="eui-text-body-sm" style={layoutPaneMetaStyle}>eui-page</p>
          </div>
        </div>
      </div>
    );
  }

  if (kind === 'data-table-page') {
    return (
      <div className="eui-card" data-eui-variant="flat" style={layoutDiagramContainerStyle}>
        <div className="eui-text-body-sm" style={layoutDiagramTitleStyle}>
          Data table page
        </div>
        <div className="eui-stack" data-eui-gap="sm">
          <div className="eui-card" data-eui-variant="elevated" style={layoutRegionStyle}>
            <span className="eui-text-body-sm" style={layoutPaneTitleStyle}>Page header</span>
          </div>
          <div className="eui-card" data-eui-variant="elevated" style={layoutRegionStyle}>
            <span className="eui-text-body-sm" style={layoutPaneTitleStyle}>Toolbar</span>
          </div>
          <div className="eui-card" data-eui-variant="elevated" style={{ ...layoutPaneStyle, minHeight: '120px' }}>
            <p className="eui-text-body-sm" style={layoutPaneTitleStyle}>Table content</p>
            <p className="eui-text-body-sm" style={layoutPaneMetaStyle}>eui-card</p>
          </div>
        </div>
      </div>
    );
  }

  if (kind === 'split-two') {
    return (
      <div className="eui-card" data-eui-variant="flat" style={layoutDiagramContainerStyle}>
        <div className="eui-text-body-sm" style={layoutDiagramTitleStyle}>
          Split layout: two panes
        </div>
        <div className="eui-grid" data-eui-cols="2">
          <div className="eui-card" data-eui-variant="elevated" style={layoutPaneStyle}>
            <p className="eui-text-body-sm" style={layoutPaneTitleStyle}>Left pane</p>
            <p className="eui-text-body-sm" style={layoutPaneMetaStyle}>eui-pane</p>
          </div>
          <div className="eui-card" data-eui-variant="elevated" style={layoutPaneStyle}>
            <p className="eui-text-body-sm" style={layoutPaneTitleStyle}>Right pane</p>
            <p className="eui-text-body-sm" style={layoutPaneMetaStyle}>eui-pane</p>
          </div>
        </div>
      </div>
    );
  }

  if (kind === 'split-right-bottom') {
    return (
      <div className="eui-card" data-eui-variant="flat" style={layoutDiagramContainerStyle}>
        <div className="eui-text-body-sm" style={layoutDiagramTitleStyle}>
          Split layout: left + right + bottom (default)
        </div>
        <div className="eui-grid" data-eui-cols="2">
          <div className="eui-card" data-eui-variant="elevated" style={{ ...layoutPaneStyle, minHeight: '220px' }}>
            <p className="eui-text-body-sm" style={layoutPaneTitleStyle}>Left pane</p>
            <p className="eui-text-body-sm" style={layoutPaneMetaStyle}>eui-pane</p>
          </div>
          <div className="eui-stack" data-eui-gap="sm" style={{ height: '100%' }}>
            <div className="eui-card" data-eui-variant="elevated" style={{ ...layoutPaneStyle, flex: 1 }}>
              <p className="eui-text-body-sm" style={layoutPaneTitleStyle}>Right pane (top)</p>
              <p className="eui-text-body-sm" style={layoutPaneMetaStyle}>eui-pane</p>
            </div>
            <div className="eui-card" data-eui-variant="elevated" style={{ ...layoutPaneStyle, flex: 1 }}>
              <p className="eui-text-body-sm" style={layoutPaneTitleStyle}>Bottom pane (right)</p>
              <p className="eui-text-body-sm" style={layoutPaneMetaStyle}>eui-pane</p>
            </div>
          </div>
        </div>
      </div>
    );
  }

  if (kind === 'split-full-width') {
    return (
      <div className="eui-card" data-eui-variant="flat" style={layoutDiagramContainerStyle}>
        <div className="eui-text-body-sm" style={layoutDiagramTitleStyle}>
          Split layout: left + right + bottom (full width)
        </div>
        <div className="eui-stack" data-eui-gap="sm">
          <div className="eui-grid" data-eui-cols="2">
            <div className="eui-card" data-eui-variant="elevated" style={layoutPaneStyle}>
              <p className="eui-text-body-sm" style={layoutPaneTitleStyle}>Left pane (top)</p>
              <p className="eui-text-body-sm" style={layoutPaneMetaStyle}>eui-pane</p>
            </div>
            <div className="eui-card" data-eui-variant="elevated" style={layoutPaneStyle}>
              <p className="eui-text-body-sm" style={layoutPaneTitleStyle}>Right pane (top)</p>
              <p className="eui-text-body-sm" style={layoutPaneMetaStyle}>eui-pane</p>
            </div>
          </div>
          <div className="eui-card" data-eui-variant="elevated" style={{ ...layoutPaneStyle, minHeight: '120px' }}>
            <p className="eui-text-body-sm" style={layoutPaneTitleStyle}>Bottom pane (full width)</p>
            <p className="eui-text-body-sm" style={layoutPaneMetaStyle}>eui-pane</p>
          </div>
        </div>
      </div>
    );
  }

  return null;
};

const getLayoutKind = (value: string): LayoutDiagramKind | null => {
  const normalized = value.trim().toLowerCase();
  if (normalized === 'app-shell-page') return 'app-shell-page';
  if (normalized === 'standalone-page') return 'standalone-page';
  if (normalized === 'data-table-page') return 'data-table-page';
  if (normalized === 'split-two') return 'split-two';
  if (normalized === 'split-right-bottom') return 'split-right-bottom';
  if (normalized === 'split-full-width') return 'split-full-width';
  return null;
};

const containerStyle: CSSProperties = {
  padding: '24px',
  maxWidth: 1200,
  margin: '0 auto',
  color: 'var(--eui-color-text-primary)'
};

const headerStyle: CSSProperties = {
  marginBottom: '24px',
  paddingBottom: '16px',
  borderBottom: '2px solid var(--eui-color-border-default)'
};

const titleStyle: CSSProperties = {
  margin: '0 0 8px',
  fontSize: '24px',
  fontWeight: 600,
  color: 'var(--eui-color-text-primary)'
};

const metaStyle: CSSProperties = {
  display: 'flex',
  gap: '16px',
  fontSize: '14px',
  color: 'var(--eui-color-text-muted)',
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

const getBadgeIcon = (label: string): string | null => {
  const normalized = label.trim().toLowerCase();
  if (normalized === 'in progress') return 'clock';
  return null;
};

const contentStyle: CSSProperties = {
  padding: '32px',
  fontSize: 'var(--eui-typography-textStyle-body-base-fontSize)',
  lineHeight: 'var(--eui-typography-lineHeight-relaxed)'
};

const loadingStyle: CSSProperties = {
  ...contentStyle,
  textAlign: 'center',
  padding: '48px 24px',
  color: 'var(--eui-color-text-muted)'
};

const errorStyle: CSSProperties = {
  ...contentStyle,
  background: 'var(--eui-color-status-error-50)',
  borderColor: 'var(--eui-color-status-error-100)',
  color: 'var(--eui-color-status-error-700)',
  borderWidth: '1px',
  borderStyle: 'solid',
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
  date,
  badges
}: DocViewerProps) => {
  const [content, setContent] = useState<string>('');
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);
  const isInProgress = badges?.some((badge) => badge.label.trim().toLowerCase() === 'in progress');

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
        <div style={loadingStyle} className="eui-card" data-eui-variant="elevated">
          <p style={{ margin: 0 }}>{fallback}</p>
        </div>
      </div>
    );
  }

  if (error) {
    return (
      <div style={containerStyle}>
        <div style={errorStyle} className="eui-card" data-eui-variant="flat">
          <p style={{ margin: '0 0 8px', fontWeight: 600 }}>Error loading document</p>
          <p style={{ margin: 0, fontSize: '14px' }}>Failed to load documentation from {markdownPath}</p>
        </div>
      </div>
    );
  }

  return (
    <div style={containerStyle}>
      {title || status || date || (badges && badges.length > 0) ? (
        <div style={headerStyle}>
          {title ? <h1 style={titleStyle}>{title}</h1> : null}
          {status || date || (badges && badges.length > 0) ? (
            <div style={metaStyle}>
              {status ? (
                <span className="eui-badge" data-eui-variant="subtle" data-eui-tone={statusToTone(status)}>
                  {status}
                </span>
              ) : null}
              {badges ? badges.map((badge) => (
                <span
                  key={badge.label}
                  className="eui-badge"
                  data-eui-tone={badge.tone ?? 'neutral'}
                  data-eui-variant={badge.variant}
                >
                  {getBadgeIcon(badge.label) ? (
                    <span data-eui-icon={getBadgeIcon(badge.label) ?? undefined} data-eui-size="xs" aria-hidden="true" />
                  ) : null}
                  {badge.label}
                </span>
              )) : null}
              {date ? <span>Date: {date}</span> : null}
            </div>
          ) : null}
        </div>
      ) : null}
      <div
        style={contentStyle}
        className="eui-card"
        data-eui-variant={isInProgress ? 'muted' : 'elevated'}
        {...(isInProgress ? { 'data-eui-state': 'muted' } : {})}
      >
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
                    return className.includes('language-mermaid') || className.includes('language-layout');
                  }
                  return false;
                }
              ) as any;

              if (codeElement) {
                const className = codeElement.props.className || '';
                const codeText = getNodeText(codeElement.props.children).trim();

                if (className.includes('language-layout')) {
                  const kind = getLayoutKind(codeText);
                  if (kind) {
                    return <LayoutDiagram kind={kind} />;
                  }
                }

                if (className.includes('language-mermaid') && codeText) {
                  return <MermaidDiagram chart={codeText} />;
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
