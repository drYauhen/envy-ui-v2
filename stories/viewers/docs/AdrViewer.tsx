import type { CSSProperties } from 'react';
import React, { useEffect, useState, useRef } from 'react';
import ReactMarkdown from 'react-markdown';
import remarkGfm from 'remark-gfm';
import mermaid from 'mermaid';
import { adrFilenameMap } from './adr-filename-map';

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

// Helper function to convert ADR title to Storybook story slug
// Storybook converts export names (camelCase/PascalCase) to kebab-case slugs
// The generator script creates story names by removing all non-alphanumeric chars and spaces
// Example: "Data-Driven Figma Variables Pipeline via Adapter JSON"
//   -> Story name: "DataDrivenFigmaVariablesPipelineviaAdapterJSON"
//   -> Storybook slug: "data-driven-figma-variables-pipeline-via-adapter-j-s-o-n"
//
// The problem is that Storybook splits on capital letters, so "JSON" becomes "j-s-o-n"
// and "Pipelinevia" becomes "pipeline-via" (which is actually correct)
//
// We need to match Storybook's exact behavior: insert dash before each capital letter
// (except the first one), then convert to lowercase
const titleToStorySlug = (title: string): string => {
  // First, replace dashes/em-dashes with spaces to preserve word boundaries
  // This ensures "Context - Theme" becomes "Context  Theme" (double space) which will be collapsed
  // This is important because the generator removes all non-alphanumeric chars, so we need to
  // preserve word separation before removing them
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

/**
 * Mermaid configuration presets for different diagram types
 * 
 * Each preset is optimized for specific diagram characteristics:
 * - Compact vertical: Thin, tall diagrams (graph TD) - smaller spacing, compact nodes
 * - Wide horizontal: Wide diagrams (graph LR) - more horizontal spacing
 * - Complex: Many nodes/scenarios - smaller font, balanced spacing
 * - Sequence: Sequence diagrams - standard sizing
 * - State: State diagrams - standard sizing
 * - Default: Standard flowcharts - balanced spacing
 */
const getMermaidConfig = (chart: string) => {
  const chartLower = chart.toLowerCase().trim();
  
  // Determine diagram type
  const isSequence = chartLower.startsWith('sequencediagram');
  const isFlowchart = chartLower.startsWith('graph') || chartLower.startsWith('flowchart');
  const isState = chartLower.startsWith('statediagram');
  
  // Check for complex diagrams (many scenarios/nodes)
  const isComplex = (chart.match(/scenario \d+:/gi) || []).length >= 3 ||
                    chart.includes('Possible Context Configurations');
  
  // Base configuration (shared across all presets)
  const baseConfig = {
    startOnLoad: false,
    theme: 'default',
    securityLevel: 'loose' as const,
    themeVariables: {
      fontSize: '12px',
      fontFamily: 'system-ui, -apple-system, BlinkMacSystemFont, "Segoe UI", sans-serif',
      primaryColor: '#e1f5ff',
      primaryTextColor: '#0f172a',
      primaryBorderColor: '#0ea5e9',
      lineColor: '#64748b',
      secondaryColor: '#f8fafc',
      tertiaryColor: '#e2e8f0',
      mainBkg: '#ffffff',
      textColor: '#0f172a'
    }
  };
  
  // Preset 1: Compact vertical flowcharts (graph TD - thin, tall)
  // Optimized for: Vertical diagrams that need to be compact
  // Characteristics: Smaller node spacing, more vertical spacing, minimal padding
  if (isFlowchart && chartLower.includes('graph td') && !isComplex) {
    return {
      ...baseConfig,
      flowchart: {
        useMaxWidth: true,
        htmlLabels: true,
        curve: 'basis',
        nodeSpacing: 30,  // Less horizontal spacing
        rankSpacing: 40,  // More vertical spacing
        padding: 4        // Minimal padding
      }
    };
  }
  
  // Preset 2: Wide horizontal flowcharts (graph LR)
  // Optimized for: Horizontal diagrams that need more width
  // Characteristics: More horizontal spacing, less vertical spacing
  if (isFlowchart && chartLower.includes('graph lr')) {
    return {
      ...baseConfig,
      flowchart: {
        useMaxWidth: true,
        htmlLabels: true,
        curve: 'basis',
        nodeSpacing: 50,  // More horizontal spacing
        rankSpacing: 30,  // Less vertical spacing
        padding: 6
      }
    };
  }
  
  // Preset 3: Complex diagrams (many nodes/scenarios)
  // Optimized for: Diagrams with many nodes (e.g., "Possible Context Configurations")
  // Characteristics: Smaller font, balanced spacing, compact layout
  if (isComplex) {
    return {
      ...baseConfig,
      flowchart: {
        useMaxWidth: true,
        htmlLabels: true,
        curve: 'basis',
        nodeSpacing: 35,  // Balanced spacing
        rankSpacing: 35,  // Balanced spacing
        padding: 5
      },
      themeVariables: {
        ...baseConfig.themeVariables,
        fontSize: '11px'  // Smaller font for complex diagrams
      }
    };
  }
  
  // Preset 4: Sequence diagrams
  // Optimized for: Sequence diagrams (participants and messages)
  // Characteristics: Standard sizing, no flowchart-specific config
  if (isSequence) {
    return {
      ...baseConfig,
      themeVariables: {
        ...baseConfig.themeVariables,
        fontSize: '12px'
      }
    };
  }
  
  // Preset 5: State diagrams
  // Optimized for: State diagrams
  // Characteristics: Standard sizing, no flowchart-specific config
  if (isState) {
    return {
      ...baseConfig,
      themeVariables: {
        ...baseConfig.themeVariables,
        fontSize: '12px'
      }
    };
  }
  
  // Default preset: Standard flowcharts
  // Optimized for: General-purpose flowcharts
  // Characteristics: Balanced spacing, standard font size
  return {
    ...baseConfig,
    flowchart: {
      useMaxWidth: true,
      htmlLabels: true,
      curve: 'basis',
      nodeSpacing: 40,  // Balanced horizontal spacing
      rankSpacing: 40,  // Balanced vertical spacing
      padding: 6
    }
  };
};

// Mermaid Diagram Component
const MermaidDiagram = ({ chart }: { chart: string }) => {
  const ref = useRef<HTMLDivElement>(null);
  const renderedIdRef = useRef<string | null>(null);
  
  // Render diagram with appropriate config
  useEffect(() => {
    if (!ref.current || !chart) {
      return;
    }
    
    // Clear previous content
    ref.current.innerHTML = '';
    
    // Get config for this specific diagram
    const config = getMermaidConfig(chart);
    
    // Initialize Mermaid with this diagram's config
    mermaid.initialize(config);
    
    // Generate unique ID for this diagram
    const id = `mermaid-${Math.random().toString(36).substr(2, 9)}`;
    renderedIdRef.current = id;
    
    // Use async/await API
    const renderDiagram = async () => {
      try {
        const { svg } = await mermaid.render(id, chart);
        if (ref.current && renderedIdRef.current === id) {
          ref.current.innerHTML = svg;
          // Apply styles to SVG for centering and responsiveness
          const svgElement = ref.current.querySelector('svg');
          if (svgElement) {
            svgElement.style.display = 'block';
            svgElement.style.margin = '0 auto';
            svgElement.style.maxWidth = '100%';
            svgElement.style.height = 'auto';
            
            // Add data attribute for diagram type (for CSS targeting)
            const chartLower = chart.toLowerCase().trim();
            const isSequence = chartLower.startsWith('sequencediagram');
            const isFlowchart = chartLower.startsWith('graph') || chartLower.startsWith('flowchart');
            const isComplex = (chart.match(/scenario \d+:/gi) || []).length >= 3 ||
                              chart.includes('Possible Context Configurations');
            
            if (isFlowchart && chartLower.includes('graph td') && !isComplex) {
              svgElement.setAttribute('data-diagram-type', 'compact-vertical');
            } else if (isFlowchart && chartLower.includes('graph lr')) {
              svgElement.setAttribute('data-diagram-type', 'wide-horizontal');
            } else if (isComplex) {
              svgElement.setAttribute('data-diagram-type', 'complex');
            } else if (isSequence) {
              svgElement.setAttribute('data-diagram-type', 'sequence');
            }
          }
        }
      } catch (err: any) {
        console.error('Mermaid rendering error:', err);
        if (ref.current && renderedIdRef.current === id) {
          ref.current.innerHTML = `<pre style="color: #dc2626; padding: 16px; background: #fef2f2; border-radius: 8px; white-space: pre-wrap; font-size: 12px;">Mermaid diagram error:\n${err?.message || 'Unknown error'}\n\nDiagram code:\n${chart}</pre>`;
        }
      }
    };
    
    renderDiagram();
    
    // Cleanup function
    return () => {
      if (ref.current && renderedIdRef.current === id) {
        ref.current.innerHTML = '';
      }
    };
  }, [chart]);
  
  return (
    <div className="mermaid-diagram-wrapper">
      <div ref={ref} className="mermaid-diagram" />
    </div>
  );
};

// Helper function to convert ADR number to Storybook story path
// This function fetches the story file to extract the actual export name and generate the correct slug
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
    
    // Загружаем markdown файл напрямую (универсальный подход, не зависит от Vite)
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
              a: ({node, href, children, ...props}: any) => {
                // Convert ADR file links to Storybook story links
                let storybookHref = href;
                let targetAdrNumber: string | null = null;
                
                if (href && typeof href === 'string') {
                  // Match links to ADR files: ./ADR-XXXX-*.md or ADR-XXXX-*.md
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
              // Кастомизация кода
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
                
                // Check if this is a Mermaid diagram
                const match = /language-(\w+)/.exec(className || '');
                const language = match && match[1];
                
                if (language === 'mermaid') {
                  const chart = String(children).replace(/\n$/, '');
                  return <MermaidDiagram chart={chart} />;
                }
                
                // Regular code block
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

