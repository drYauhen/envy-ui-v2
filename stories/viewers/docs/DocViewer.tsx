import React, { useEffect, useState } from 'react';
import ReactMarkdown from 'react-markdown';
import remarkGfm from 'remark-gfm';
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
      <div className="eui-card eui-docs-layout-diagram" data-eui-variant="flat">
        <div className="eui-text-body-sm eui-docs-layout-title">
          App shell + page content
        </div>
        <div className="eui-stack" data-eui-gap="sm">
          <div className="eui-card eui-docs-layout-region" data-eui-variant="elevated">
            <span className="eui-text-body-sm eui-docs-layout-pane-title">Global header</span>
          </div>
          <div className="eui-grid" data-eui-cols="2" style={{ gridTemplateColumns: '160px 1fr' }}>
            <div className="eui-card eui-docs-layout-pane" data-eui-variant="elevated" style={{ minHeight: '220px' }}>
              <p className="eui-text-body-sm eui-docs-layout-pane-title">Side nav</p>
              <p className="eui-text-body-sm eui-docs-layout-pane-meta">eui-side-nav</p>
            </div>
            <div className="eui-stack" data-eui-gap="sm">
              <div className="eui-card eui-docs-layout-region" data-eui-variant="elevated">
                <span className="eui-text-body-sm eui-docs-layout-pane-title">Title bar (global)</span>
              </div>
              <div className="eui-card eui-docs-layout-region" data-eui-variant="elevated">
                <span className="eui-text-body-sm eui-docs-layout-pane-title">Title bar (context)</span>
              </div>
              <div className="eui-card eui-docs-layout-pane" data-eui-variant="elevated" style={{ minHeight: '120px' }}>
                <p className="eui-text-body-sm eui-docs-layout-pane-title">Page body</p>
                <p className="eui-text-body-sm eui-docs-layout-pane-meta">eui-page</p>
              </div>
            </div>
          </div>
        </div>
      </div>
    );
  }

  if (kind === 'standalone-page') {
    return (
      <div className="eui-card eui-docs-layout-diagram" data-eui-variant="flat">
        <div className="eui-text-body-sm eui-docs-layout-title">
          Standalone page (site/report)
        </div>
        <div className="eui-stack" data-eui-gap="sm">
          <div className="eui-card eui-docs-layout-region" data-eui-variant="elevated">
            <span className="eui-text-body-sm eui-docs-layout-pane-title">Page header</span>
          </div>
          <div className="eui-card eui-docs-layout-pane" data-eui-variant="elevated" style={{ minHeight: '120px' }}>
            <p className="eui-text-body-sm eui-docs-layout-pane-title">Page body</p>
            <p className="eui-text-body-sm eui-docs-layout-pane-meta">eui-page</p>
          </div>
        </div>
      </div>
    );
  }

  if (kind === 'data-table-page') {
    return (
      <div className="eui-card eui-docs-layout-diagram" data-eui-variant="flat">
        <div className="eui-text-body-sm eui-docs-layout-title">
          Data table page
        </div>
        <div className="eui-stack" data-eui-gap="sm">
          <div className="eui-card eui-docs-layout-region" data-eui-variant="elevated">
            <span className="eui-text-body-sm eui-docs-layout-pane-title">Page header</span>
          </div>
          <div className="eui-card eui-docs-layout-region" data-eui-variant="elevated">
            <span className="eui-text-body-sm eui-docs-layout-pane-title">Toolbar</span>
          </div>
          <div className="eui-card eui-docs-layout-pane" data-eui-variant="elevated" style={{ minHeight: '120px' }}>
            <p className="eui-text-body-sm eui-docs-layout-pane-title">Table content</p>
            <p className="eui-text-body-sm eui-docs-layout-pane-meta">eui-card</p>
          </div>
        </div>
      </div>
    );
  }

  if (kind === 'split-two') {
    return (
      <div className="eui-card eui-docs-layout-diagram" data-eui-variant="flat">
        <div className="eui-text-body-sm eui-docs-layout-title">
          Split layout: two panes
        </div>
        <div className="eui-grid" data-eui-cols="2">
          <div className="eui-card eui-docs-layout-pane" data-eui-variant="elevated">
            <p className="eui-text-body-sm eui-docs-layout-pane-title">Left pane</p>
            <p className="eui-text-body-sm eui-docs-layout-pane-meta">eui-pane</p>
          </div>
          <div className="eui-card eui-docs-layout-pane" data-eui-variant="elevated">
            <p className="eui-text-body-sm eui-docs-layout-pane-title">Right pane</p>
            <p className="eui-text-body-sm eui-docs-layout-pane-meta">eui-pane</p>
          </div>
        </div>
      </div>
    );
  }

  if (kind === 'split-right-bottom') {
    return (
      <div className="eui-card eui-docs-layout-diagram" data-eui-variant="flat">
        <div className="eui-text-body-sm eui-docs-layout-title">
          Split layout: left + right + bottom (default)
        </div>
        <div className="eui-grid" data-eui-cols="2">
          <div className="eui-card eui-docs-layout-pane" data-eui-variant="elevated" style={{ minHeight: '220px' }}>
            <p className="eui-text-body-sm eui-docs-layout-pane-title">Left pane</p>
            <p className="eui-text-body-sm eui-docs-layout-pane-meta">eui-pane</p>
          </div>
          <div className="eui-stack" data-eui-gap="sm" style={{ height: '100%' }}>
            <div className="eui-card eui-docs-layout-pane" data-eui-variant="elevated" style={{ flex: 1 }}>
              <p className="eui-text-body-sm eui-docs-layout-pane-title">Right pane (top)</p>
              <p className="eui-text-body-sm eui-docs-layout-pane-meta">eui-pane</p>
            </div>
            <div className="eui-card eui-docs-layout-pane" data-eui-variant="elevated" style={{ flex: 1 }}>
              <p className="eui-text-body-sm eui-docs-layout-pane-title">Bottom pane (right)</p>
              <p className="eui-text-body-sm eui-docs-layout-pane-meta">eui-pane</p>
            </div>
          </div>
        </div>
      </div>
    );
  }

  if (kind === 'split-full-width') {
    return (
      <div className="eui-card eui-docs-layout-diagram" data-eui-variant="flat">
        <div className="eui-text-body-sm eui-docs-layout-title">
          Split layout: left + right + bottom (full width)
        </div>
        <div className="eui-stack" data-eui-gap="sm">
          <div className="eui-grid" data-eui-cols="2">
            <div className="eui-card eui-docs-layout-pane" data-eui-variant="elevated">
              <p className="eui-text-body-sm eui-docs-layout-pane-title">Left pane (top)</p>
              <p className="eui-text-body-sm eui-docs-layout-pane-meta">eui-pane</p>
            </div>
            <div className="eui-card eui-docs-layout-pane" data-eui-variant="elevated">
              <p className="eui-text-body-sm eui-docs-layout-pane-title">Right pane (top)</p>
              <p className="eui-text-body-sm eui-docs-layout-pane-meta">eui-pane</p>
            </div>
          </div>
          <div className="eui-card eui-docs-layout-pane" data-eui-variant="elevated" style={{ minHeight: '120px' }}>
            <p className="eui-text-body-sm eui-docs-layout-pane-title">Bottom pane (full width)</p>
            <p className="eui-text-body-sm eui-docs-layout-pane-meta">eui-pane</p>
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
      <div
        className="eui-docs eui-docs-container eui-container eui-stack"
        data-eui-container="standard"
        data-eui-gap="lg"
      >
        <div className="eui-card eui-docs-loading" data-eui-variant="elevated">
          <p className="eui-text-body">{fallback}</p>
        </div>
      </div>
    );
  }

  if (error) {
    return (
      <div
        className="eui-docs eui-docs-container eui-container eui-stack"
        data-eui-container="standard"
        data-eui-gap="lg"
      >
        <div className="eui-card eui-docs-error" data-eui-variant="flat">
          <p className="eui-text-body-strong">Error loading document</p>
          <p className="eui-text-body-sm">Failed to load documentation from {markdownPath}</p>
        </div>
      </div>
    );
  }

  return (
    <div
      className="eui-docs eui-docs-container eui-container eui-stack"
      data-eui-container="standard"
      data-eui-gap="lg"
    >
      {title || status || date || (badges && badges.length > 0) ? (
        <div className="eui-stack" data-eui-gap="sm">
          {title ? <h1 className="eui-text-heading-5">{title}</h1> : null}
          {status || date || (badges && badges.length > 0) ? (
            <div className="eui-inline eui-docs-meta eui-text-caption" data-eui-gap="md" data-eui-wrap="true">
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
      {title || status || date || (badges && badges.length > 0) ? (
        <hr className="eui-divider" data-eui-variant="subtle" />
      ) : null}
      <div
        className="eui-card"
        data-eui-variant={isInProgress ? 'muted' : 'elevated'}
        {...(isInProgress ? { 'data-eui-state': 'muted' } : {})}
      >
        <div className="eui-content">
          <ReactMarkdown
            remarkPlugins={[remarkGfm]}
            components={{
              h1: ({node, ...props}: any) => (
                <h1 className="eui-text-heading-5" {...props} />
              ),
              h2: ({node, ...props}: any) => (
                <h2 className="eui-text-heading-6" {...props} />
              ),
              h3: ({node, ...props}: any) => (
                <h3 className="eui-text-title-md" {...props} />
              ),
              p: ({node, ...props}: any) => (
                <p className="eui-text-body" {...props} />
              ),
              ul: ({node, ...props}: any) => (
                <ul {...props} />
              ),
              ol: ({node, ...props}: any) => (
                <ol {...props} />
              ),
              li: ({node, ...props}: any) => (
                <li className="eui-text-body" {...props} />
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

              const resolvedClassName = ['eui-button', props.className].filter(Boolean).join(' ');

              return (
                <a
                  href={storybookHref}
                  {...dataAttr}
                  className={resolvedClassName}
                  data-eui-intent="link"
                  {...props}
                >
                  {children}
                </a>
              );
            },
              code: ({node, inline, className, children, ...props}: any) => {
                if (inline) {
                  return (
                    <code className="eui-code-block" data-eui-variant="inline" {...props}>
                      {children}
                    </code>
                  );
                }

                return (
                  <code className={className} {...props}>
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
                  <pre className="eui-code-block" data-eui-variant="block" {...props}>
                    {children}
                  </pre>
                );
              },
              table: ({node, ...props}: any) => (
                <div className="eui-table-container">
                  <table className="eui-table" {...props} />
                </div>
              ),
              blockquote: ({node, ...props}: any) => (
                <blockquote className="eui-callout" data-eui-tone="info" data-eui-variant="subtle" {...props} />
              ),
              hr: ({node, ...props}: any) => (
                <hr className="eui-divider" data-eui-variant="subtle" {...props} />
              ),
              strong: ({node, ...props}: any) => (
                <strong {...props} />
              )
            }}
          >
            {content}
          </ReactMarkdown>
        </div>
      </div>
    </div>
  );
};

export type { DocViewerProps };
