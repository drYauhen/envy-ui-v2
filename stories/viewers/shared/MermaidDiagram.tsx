import React, { useEffect, useRef } from 'react';
import type { CSSProperties } from 'react';
import mermaid from 'mermaid';

type MermaidSettings = {
  maxWidth?: string;
};

const parseMermaidSettings = (chart: string): { chart: string; settings: MermaidSettings } => {
  const lines = chart.split('\n');
  const firstLine = lines[0]?.trim() ?? '';
  const match = firstLine.match(/^%%\s*sb:\s*(.+?)\s*%%$/i);

  if (!match) {
    return { chart, settings: {} };
  }

  const settings: MermaidSettings = {};
  const parts = match[1].split(',').map((part) => part.trim()).filter(Boolean);

  for (const part of parts) {
    const [key, rawValue] = part.split('=').map((value) => value.trim());
    if (!key || !rawValue) continue;
    if (key === 'maxWidth') {
      settings.maxWidth = rawValue;
    }
  }

  return {
    chart: lines.slice(1).join('\n'),
    settings
  };
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
        nodeSpacing: 35,
        rankSpacing: 30,
        padding: 4
      },
      themeVariables: {
        ...baseConfig.themeVariables,
        fontSize: '11px'
      }
    };
  }

  // Preset 4: Sequence diagrams
  // Optimized for: Sequence diagrams (participants and messages)
  if (isSequence) {
    return {
      ...baseConfig,
      sequence: {
        useMaxWidth: true,
        diagramMarginX: 30,
        diagramMarginY: 20,
        boxMargin: 5
      }
    };
  }

  // Preset 5: State diagrams
  // Optimized for: State diagrams
  if (isState) {
    return {
      ...baseConfig,
      state: {
        useMaxWidth: true,
        curve: 'basis'
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

export const MermaidDiagram = ({ chart }: { chart: string }) => {
  const ref = useRef<HTMLDivElement>(null);
  const renderedIdRef = useRef<string | null>(null);
  const { chart: resolvedChart, settings } = parseMermaidSettings(chart);
  const wrapperStyle: CSSProperties | undefined = settings.maxWidth
    ? { maxWidth: settings.maxWidth, margin: '16px 0', width: '100%' }
    : { margin: '16px 0' };

  // Render diagram with appropriate config
  useEffect(() => {
    if (!ref.current || !resolvedChart) {
      return;
    }

    // Clear previous content
    ref.current.innerHTML = '';

    // Get config for this specific diagram
    const config = getMermaidConfig(resolvedChart);

    // Initialize Mermaid with this diagram's config
    mermaid.initialize(config);

    // Generate unique ID for this diagram
    const id = `mermaid-${Math.random().toString(36).substr(2, 9)}`;
    renderedIdRef.current = id;

    // Use async/await API
    const renderDiagram = async () => {
      try {
        const { svg } = await mermaid.render(id, resolvedChart);
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
            const chartLower = resolvedChart.toLowerCase().trim();
            const isSequence = chartLower.startsWith('sequencediagram');
            const isFlowchart = chartLower.startsWith('graph') || chartLower.startsWith('flowchart');
            const isComplex = (resolvedChart.match(/scenario \d+:/gi) || []).length >= 3 ||
                              resolvedChart.includes('Possible Context Configurations');

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
          ref.current.innerHTML = `<pre style="color: #dc2626; padding: 16px; background: #fef2f2; border-radius: 8px; white-space: pre-wrap; font-size: 12px;">Mermaid diagram error:\n${err?.message || 'Unknown error'}\n\nDiagram code:\n${resolvedChart}</pre>`;
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
  }, [resolvedChart]);

  const wrapperProps = settings.maxWidth ? { 'data-mermaid-max-width': settings.maxWidth } : {};

  return (
    <div className="mermaid-diagram-wrapper" style={wrapperStyle} {...wrapperProps}>
      <div ref={ref} className="mermaid-diagram" />
    </div>
  );
};
