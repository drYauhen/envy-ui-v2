import React, { useEffect, useState } from 'react';
import ReactMarkdown from 'react-markdown';
import remarkGfm from 'remark-gfm';
import type { CSSProperties } from 'react';
import { adrFilenameMap } from '../docs/adr-filename-map';

type MarkdownViewerProps = {
  markdownPath: string;
  fallback?: string;
};

const containerStyle: CSSProperties = {
  padding: '24px',
  maxWidth: 1200,
  margin: '0 auto',
  fontFamily: 'system-ui, -apple-system, BlinkMacSystemFont, "Segoe UI", sans-serif',
  color: '#0f172a',
  lineHeight: 1.6
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

// Helper function to convert ADR title to Storybook story slug
// Storybook converts export names (camelCase/PascalCase) to kebab-case slugs
const titleToStorySlug = (title: string): string => {
  // First, replace dashes/em-dashes with spaces to preserve word boundaries
  let normalized = title.replace(/[-—–]/g, ' ');
  
  // Generate story name the same way as the generator script
  // This removes all non-alphanumeric chars and spaces (collapsing multiple spaces)
  const storyName = normalized.replace(/[^a-zA-Z0-9\s]/g, '').replace(/\s+/g, '');
  
  // Storybook's slug conversion: insert dash before each capital letter (except first)
  // Then convert to lowercase
  const slug = storyName
    .replace(/([a-z])([A-Z])/g, '$1-$2') // Insert dash between lowercase and uppercase
    .replace(/([A-Z]+)([A-Z][a-z])/g, '$1-$2') // Insert dash between uppercase groups and following word
    .toLowerCase();
  
  return slug;
};

// Helper function to convert ADR number to Storybook story path
const adrNumberToStoryPath = async (adrNumber: string): Promise<string> => {
  try {
    // First, try to fetch the story file to get the actual export name
    const storyResponse = await fetch(`/stories/docs/adr/adr-${adrNumber}.stories.tsx`);
    if (storyResponse.ok) {
      const storyText = await storyResponse.text();
      // Extract export name: export const ExportName: Story
      const exportMatch = storyText.match(/export const (\w+):\s*Story/);
      if (exportMatch) {
        const exportName = exportMatch[1];
        // Convert export name to slug (Storybook's behavior)
        const slug = exportName
          .replace(/([a-z])([A-Z])/g, '$1-$2')
          .replace(/([A-Z]+)([A-Z][a-z])/g, '$1-$2')
          .toLowerCase();
        return `?path=/story/docs-adr--${slug}`;
      }
    }
    
    // Fallback: fetch the ADR file to get the title
    const filename = adrFilenameMap[adrNumber] || `ADR-${adrNumber}.md`;
    const response = await fetch(`/docs/adr/${filename}`);
    if (!response.ok) {
      throw new Error(`Failed to load ADR-${adrNumber}`);
    }
    const text = await response.text();
    const titleMatch = text.match(/^# ADR-\d+:\s*(.+)$/m);
    if (titleMatch) {
      const title = titleMatch[1].trim();
      const storySlug = titleToStorySlug(title);
      return `?path=/story/docs-adr--${storySlug}`;
    }
  } catch (err) {
    console.warn(`Could not load ADR-${adrNumber} for link generation:`, err);
  }
  // This fallback should rarely be used
  return '';
};

export const MarkdownViewer = ({ markdownPath, fallback = 'Loading...' }: MarkdownViewerProps) => {
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
      <div style={contentStyle}>
        <ReactMarkdown 
          remarkPlugins={[remarkGfm]}
          components={{
            h1: ({node, ...props}: any) => (
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
            h2: ({node, ...props}: any) => (
              <h2 style={{ 
                fontSize: '24px', 
                marginTop: '28px', 
                marginBottom: '12px',
                fontWeight: 600,
                color: '#0f172a'
              }} {...props} />
            ),
            h3: ({node, ...props}: any) => (
              <h3 style={{ 
                fontSize: '20px', 
                marginTop: '24px', 
                marginBottom: '10px',
                fontWeight: 600,
                color: '#0f172a'
              }} {...props} />
            ),
            p: ({node, ...props}: any) => (
              <p style={{ 
                margin: '0 0 16px',
                lineHeight: 1.7
              }} {...props} />
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
              }} {...props} />
            ),
            a: ({node, href, children, ...props}: any) => {
              // Convert ADR file links to Storybook story links
              let storybookHref = href;
              let targetAdrNumber: string | null = null;
              
              if (href && typeof href === 'string') {
                // Match links to ADR files: ./ADR-XXXX-*.md or ADR-XXXX-*.md or ../adr/ADR-XXXX-*.md
                const adrMatch = href.match(/ADR-(\d{4})[^/]*\.md$/);
                if (adrMatch) {
                  targetAdrNumber = adrMatch[1];
                  
                  // Try to extract title from link text
                  // Format: "ADR-XXXX Title" or "Title" (after —)
                  const linkText = typeof children === 'string' ? children : 
                                  (Array.isArray(children) ? children.map(c => 
                                    typeof c === 'string' ? c : 
                                    (typeof c === 'object' && c?.props?.children ? String(c.props.children) : '')
                                  ).join('') : '');
                  
                  let storySlug = '';
                  if (linkText) {
                    // Try to extract title after "—" or ":" separator
                    const titleMatch = linkText.match(/[—:]\s*(.+)$/) || 
                                      linkText.match(/ADR-\d+[:\s]+(.+)$/) ||
                                      linkText.match(/^(.+)$/);
                    if (titleMatch) {
                      const title = titleMatch[1].trim();
                      // Remove ADR-XXXX prefix if present
                      const cleanTitle = title.replace(/^ADR-\d+\s*/, '').trim();
                      if (cleanTitle) {
                        storySlug = titleToStorySlug(cleanTitle);
                      }
                    }
                  }
                  
                  if (storySlug) {
                    storybookHref = `?path=/story/docs-adr--${storySlug}`;
                  } else {
                    // If we can't extract title from link text, fetch the ADR file asynchronously
                    // Start fetching immediately and update the link when ready
                    storybookHref = `#`; // Temporary placeholder
                    adrNumberToStoryPath(targetAdrNumber).then(path => {
                      if (path) {
                        // Find and update all links that point to this ADR
                        // We use a data attribute to track which ADR this link refers to
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
              
              // Add data attribute for async link resolution
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
                    fontSize: '0.9em',
                    fontFamily: 'Monaco, "Courier New", monospace',
                    color: '#e11d48'
                  }} {...props}>
                    {children}
                  </code>
                );
              }
              
              // Extract text content for analysis
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
              
              // Determine if this should be styled as inline-block
              // Criteria:
              // 1. Very long code (> 200 chars) → always block
              // 2. Has line breaks → always block (multi-line code)
              // 3. Has language specification → likely a code example → block
              // 4. Short single-line code without language → likely inline variable/name → inline-block
              const shouldBeInlineBlock = 
                trimmedText.length > 0 &&
                trimmedText.length <= 200 &&
                !hasLineBreaks &&
                !hasLanguage;
              
              if (shouldBeInlineBlock) {
                // Render as inline-block for short, single-line code fragments without language
                return (
                  <code style={{
                    display: 'inline-block',
                    background: '#f1f5f9',
                    padding: '2px 6px',
                    borderRadius: '4px',
                    fontSize: '0.9em',
                    fontFamily: 'Monaco, "Courier New", monospace',
                    color: '#e11d48',
                    margin: '0 2px',
                    verticalAlign: 'baseline'
                  }} {...props}>
                    {children}
                  </code>
                );
              }
              
              // Regular code block for longer/multi-line/language-specified code
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
                  whiteSpace: 'pre-wrap',
                  wordBreak: 'break-word',
                  fontFamily: 'Monaco, "Courier New", monospace',
                  margin: '16px 0'
                }} {...props}>
                  {children}
                </code>
              );
            },
            pre: ({node, children, ...props}: any) => (
              <pre style={{
                margin: '16px 0',
                overflowX: 'auto'
              }} {...props} />
            ),
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
              }} {...props} />
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

