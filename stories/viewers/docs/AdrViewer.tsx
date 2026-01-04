import type { CSSProperties } from 'react';
import React, { useEffect, useState } from 'react';
import ReactMarkdown from 'react-markdown';
import remarkGfm from 'remark-gfm';
import { adrFilenameMap } from './adr-filename-map';
import { adrNumberToStoryPath, storySlugFromAdrLinkText } from './adr-links';
import { MermaidDiagram } from '../shared/MermaidDiagram';

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

// Helper function to convert export name to Storybook slug
// Storybook converts PascalCase export names to kebab-case slugs
// This function attempts to match Storybook's exact behavior
// 
export const AdrViewer = ({ adrNumber, title, status, date }: AdrViewerProps) => {
  const [content, setContent] = useState<string>('');
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);
  
  useEffect(() => {
    setLoading(true);
    setError(null);
    
    // Get the actual filename from the mapping, or fall back to default pattern
    const filename = adrFilenameMap[adrNumber] || `ADR-${adrNumber}.md`;
    const filePath = `/docs/adr/${filename}`;
    
    // Load markdown file directly (universal approach, doesn't depend on Vite)
    fetch(filePath)
      .then(res => {
        if (!res.ok) {
          throw new Error(`Failed to load ADR-${adrNumber}: ${res.status} ${res.statusText}. Tried path: ${filePath}`);
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
              // Customize headings
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
              // Customize paragraphs
              p: ({node, ...props}) => (
                <p style={{ 
                  margin: '0 0 16px',
                  lineHeight: 1.7
                }} {...props} />
              ),
              // Customize lists
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
              // Customize links
              a: ({node, href, children, ...props}: any) => {
                // Convert ADR file links and Architecture document links to Storybook story links
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
                    
                    const storySlug = linkText ? storySlugFromAdrLinkText(linkText) : null;
                    
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
                  } else {
                    // Match links to Architecture documents: ../architecture/*.md or architecture/*.md
                    const archMatch = href.match(/\/architecture\/([^/]+)\.md$/) || 
                                     href.match(/architecture\/([^/]+)\.md$/);
                    if (archMatch) {
                      const filename = archMatch[1]; // e.g., "accessibility-reference"
                      // Convert filename to story slug
                      // Story export name is PascalCase (e.g., "AccessibilityReference")
                      // Storybook slug is kebab-case (e.g., "accessibility-reference")
                      // Use the filename directly as slug since it's already kebab-case and matches the story slug
                      storybookHref = `?path=/story/docs-architecture--${filename}`;
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
              // Customize code
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
                
                // For code blocks, check if this is a Mermaid diagram
                // Note: Mermaid diagrams are handled at the 'pre' level, but we keep this
                // as a fallback in case the structure is different
                const match = /language-(\w+)/.exec(className || '');
                const language = match && match[1];
                
                if (language === 'mermaid') {
                  // Extract chart content
                  let chart = '';
                  if (typeof children === 'string') {
                    chart = children;
                  } else if (Array.isArray(children)) {
                    chart = children
                      .map((c: any) => typeof c === 'string' ? c : (c?.props?.children || ''))
                      .join('');
                  } else {
                    chart = String(children || '');
                  }
                  return <MermaidDiagram chart={chart.trim()} />;
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
              // Customize code blocks
              pre: ({node, children, ...props}: any) => {
                // Check if this pre contains a mermaid code block
                // ReactMarkdown wraps code blocks in <pre><code className="language-mermaid">...</code></pre>
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
                  // Extract the mermaid chart content
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
                
                // Regular pre block
                return (
                  <pre style={{
                    margin: '16px 0',
                    overflowX: 'auto'
                  }} {...props}>
                    {children}
                  </pre>
                );
              },
              // Customize tables
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
              // Customize blockquotes
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
              // Customize horizontal rules
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
