import type { Meta, StoryObj } from '@storybook/react';
import { HotTable } from '@handsontable/react-wrapper';
import { registerAllModules } from 'handsontable/registry';
import { useEffect, useRef } from 'react';
import ReactGridLayout, { WidthProvider } from 'react-grid-layout/legacy';
import Highcharts from 'highcharts';
import AccessibilityModule from 'highcharts/modules/accessibility';
import PatternFillModule from 'highcharts/modules/pattern-fill';
import HighchartsReact, { HighchartsReactRefObject } from 'highcharts-react-official';
import { getSectionParameters } from '../../../.storybook/preview';
import { MultiContextViewer } from '../../utils/multi-context-viewer';
import 'handsontable/styles/handsontable.css';
import 'handsontable/styles/ht-icons-main.css';
import 'handsontable/styles/ht-theme-main.css';
import 'react-grid-layout/css/styles.css';
import 'react-resizable/css/styles.css';
import '../../../src/ui/vendors/handsontable.adapter.css';

registerAllModules();

const highchartsWithModules = Highcharts as typeof Highcharts & {
  __euiPatternFillLoaded?: boolean;
  __euiAccessibilityLoaded?: boolean;
};
if (!highchartsWithModules.__euiPatternFillLoaded) {
  const maybeInitializer = PatternFillModule as unknown as
    | ((highcharts: typeof Highcharts) => void)
    | { default?: (highcharts: typeof Highcharts) => void };
  const initPatternFill =
    typeof maybeInitializer === 'function'
      ? maybeInitializer
      : maybeInitializer.default;

  if (typeof initPatternFill === 'function') {
    initPatternFill(Highcharts);
  }
  highchartsWithModules.__euiPatternFillLoaded = true;
}

if (!highchartsWithModules.__euiAccessibilityLoaded) {
  const maybeInitializer = AccessibilityModule as unknown as
    | ((highcharts: typeof Highcharts) => void)
    | { default?: (highcharts: typeof Highcharts) => void };
  const initAccessibility =
    typeof maybeInitializer === 'function'
      ? maybeInitializer
      : maybeInitializer.default;

  if (typeof initAccessibility === 'function') {
    initAccessibility(Highcharts);
  }
  highchartsWithModules.__euiAccessibilityLoaded = true;
}

const GridLayout = WidthProvider(ReactGridLayout);

const meta: Meta = {
  title: 'TSX (Clean)/Integrations/ReactGridLayout',
  tags: ['autodocs'],
  parameters: {
    ...getSectionParameters('TSX (Clean)/Integrations/ReactGridLayout'),
    layout: 'padded',
    docs: {
      canvas: { sourceState: 'none' },
      codePanel: false
    }
  }
};

export default meta;

type Story = StoryObj;

const leftTableData = [
  { date: '2025-01-08', approved: true },
  { date: '2025-01-12', approved: false },
  { date: '2025-01-15', approved: true },
  { date: '2025-01-18', approved: false },
  { date: '2025-01-22', approved: true }
];

const bottomLeftTableData = [
  { date: '2025-03-02', approved: false },
  { date: '2025-03-05', approved: true },
  { date: '2025-03-08', approved: false },
  { date: '2025-03-11', approved: true },
  { date: '2025-03-14', approved: true }
];

const detailedTableData = [
  { date: '2025-05-01', status: 'Yes', comments: 'Initial review completed.' },
  { date: '2025-05-03', status: 'No', comments: 'Missing attachment from requester.' },
  { date: '2025-05-06', status: 'Yes', comments: 'Follow-up confirmed by admin.' },
  { date: '2025-05-08', status: 'Yes', comments: 'Updated schedule sent to team.' },
  { date: '2025-05-11', status: 'No', comments: 'Awaiting approval from legal.' },
  { date: '2025-05-14', status: 'Yes', comments: 'Signed off after review meeting.' },
  { date: '2025-05-16', status: 'No', comments: 'Blocked due to missing data.' },
  { date: '2025-05-18', status: 'Yes', comments: 'New scope confirmed with partner.' },
  { date: '2025-05-21', status: 'Yes', comments: 'Approved with minor edits.' },
  { date: '2025-05-23', status: 'No', comments: 'Waiting for updated timeline.' },
  { date: '2025-05-26', status: 'Yes', comments: 'Escalated and resolved.' },
  { date: '2025-05-28', status: 'Yes', comments: 'Final confirmation received.' },
  { date: '2025-05-30', status: 'No', comments: 'Rescheduled to next sprint.' },
  { date: '2025-06-02', status: 'Yes', comments: 'Accepted after review.' },
  { date: '2025-06-05', status: 'No', comments: 'Requires compliance check.' }
];

const gridShellStyle = {
  background: 'var(--eui-color-background-base)',
  padding: '1rem',
  borderRadius: 'var(--eui-radius-large)',
  minHeight: '420px'
} as const;

const gridItemStyle = {
  height: '100%',
  display: 'flex',
  flexDirection: 'column',
  boxSizing: 'border-box',
  overflow: 'hidden'
} as const;

const gridHeaderStyle = {
  fontSize: 'var(--eui-card-header-typography-fontSize, 0.95rem)',
  fontWeight: 'var(--eui-card-header-typography-fontWeight, 600)',
  fontFamily: 'var(--eui-card-header-typography-fontFamily, var(--eui-typography-fontFamily-ui))',
  color: 'var(--eui-card-header-colors-text, var(--eui-color-text-primary))',
  cursor: 'move',
  userSelect: 'none'
} as const;

const tableWrapperStyle = {
  flex: 1,
  minHeight: 0
} as const;

const chartWrapperStyle = {
  flex: 1,
  minHeight: 0
} as const;

type PatternMode = 'auto' | 'on' | 'off';
type ApplicationStatus =
  | 'pending'
  | 'onTrack'
  | 'completed'
  | 'minorDisruption'
  | 'majorDisruption'
  | 'upcoming'
  | 'discontinued';

const seriesStatuses: Array<{
  name: string;
  status: ApplicationStatus;
  data: number[];
}> = [
  { name: 'On Track', status: 'onTrack', data: [52, 41, 33, 58, 47, 29] },
  { name: 'Minor Disruption', status: 'minorDisruption', data: [16, 18, 11, 14, 20, 12] },
  { name: 'Major Disruption', status: 'majorDisruption', data: [8, 12, 7, 10, 9, 11] }
];

const statusFallbackColors: Record<ApplicationStatus, string> = {
  pending: '#8f8f95',
  onTrack: '#2f9e55',
  completed: '#3d6cd4',
  minorDisruption: '#e0aa13',
  majorDisruption: '#d0443c',
  upcoming: '#7b5cc7',
  discontinued: '#5f5a52'
};

const cssVarReferencePattern = /^var\(\s*(--[\w-]+)\s*(?:,\s*([^)]+))?\)$/;

const readCssVarRaw = (scope: HTMLElement | null, name: string): string => {
  if (!scope) return '';
  return getComputedStyle(scope).getPropertyValue(name).trim();
};

const resolveCssValue = (scope: HTMLElement | null, value: string, fallback: string): string => {
  let current = value.trim();
  const visited = new Set<string>();

  for (let depth = 0; depth < 10; depth += 1) {
    const match = current.match(cssVarReferencePattern);
    if (!match) break;

    const referenceName = match[1];
    const inlineFallback = (match[2] ?? '').trim();
    if (visited.has(referenceName)) break;

    visited.add(referenceName);
    const referencedValue = readCssVarRaw(scope, referenceName);
    current = (referencedValue || inlineFallback).trim();
    if (!current) break;
  }

  return current || fallback;
};

const readCssVar = (scope: HTMLElement | null, name: string, fallback: string): string => {
  const value = readCssVarRaw(scope, name);
  if (!value) return fallback;
  return resolveCssValue(scope, value, fallback);
};

const readCssNumber = (scope: HTMLElement | null, name: string, fallback: number): number => {
  const value = readCssVar(scope, name, String(fallback));
  const parsed = Number.parseFloat(value);
  return Number.isFinite(parsed) ? parsed : fallback;
};

const isPatternModeEnabled = (scope: HTMLElement | null, localMode: PatternMode): boolean => {
  if (localMode === 'on') return true;
  if (localMode === 'off') return false;

  if (typeof document === 'undefined') return false;

  const modeOwner = scope?.closest('[data-eui-pattern-mode]')
    ?? document.querySelector('[data-eui-pattern-mode]')
    ?? document.documentElement;

  return modeOwner.getAttribute('data-eui-pattern-mode') === 'on';
};

const buildSeriesColor = (
  scope: HTMLElement | null,
  status: ApplicationStatus,
  patternMode: PatternMode
): Highcharts.ColorType => {
  const fallbackColor = statusFallbackColors[status];
  const color = readCssVar(scope, `--eui-color-status-application-${status}`, fallbackColor);

  if (!isPatternModeEnabled(scope, patternMode)) {
    return color;
  }

  const path = readCssVar(scope, `--eui-pattern-signal-status-application-${status}-highchartsPath`, '');
  if (!path) {
    return color;
  }

  const width = readCssNumber(scope, `--eui-pattern-signal-status-application-${status}-highchartsWidth`, 8);
  const height = readCssNumber(scope, `--eui-pattern-signal-status-application-${status}-highchartsHeight`, 8);
  const strokeWidth = readCssNumber(scope, `--eui-pattern-signal-status-application-${status}-highchartsStrokeWidth`, 1.5);
  const strokeColor = readCssVar(
    scope,
    `--eui-pattern-signal-status-application-${status}-highchartsStrokeColor`,
    '#FFFFFF80'
  );

  return {
    pattern: {
      width,
      height,
      backgroundColor: color,
      path: {
        d: path,
        stroke: strokeColor,
        strokeWidth
      }
    }
  } as Highcharts.ColorType;
};

const buildChartOptions = (scope: HTMLElement | null, patternMode: PatternMode): Highcharts.Options => {
  const accessibilityMode = isPatternModeEnabled(scope, patternMode);
  const textMuted = readCssVar(scope, '--eui-color-text-muted', '#64748b');
  const textPrimary = readCssVar(scope, '--eui-color-text-primary', '#0f172a');
  const borderDefault = readCssVar(scope, '--eui-color-border-default', '#cdd3dc');
  const borderSubtle = readCssVar(scope, '--eui-color-border-subtle', '#e3e8ef');
  const backgroundSurface = readCssVar(scope, '--eui-color-background-surface', '#ffffff');
  const legendSymbolSize = readCssNumber(scope, '--eui-chart-legend-symbolSize', 18);
  const legendItemMinHeight = readCssNumber(scope, '--eui-chart-legend-itemMinHeight', 24);
  const legendSymbolPadding = readCssNumber(scope, '--eui-chart-legend-symbolPadding', 8);
  const legendItemDistance = readCssNumber(scope, '--eui-chart-legend-itemDistance', 14);
  const legendPadding = readCssNumber(scope, '--eui-chart-legend-padding', 8);
  const legendItemVerticalMargin = Math.max(0, (legendItemMinHeight - legendSymbolSize) / 2);

  return {
    chart: {
      type: 'column',
      backgroundColor: 'transparent',
      spacingTop: 0,
      marginTop: 42,
      spacingRight: 6,
      spacingBottom: 48,
      spacingLeft: 6,
      reflow: true,
      style: { fontFamily: 'var(--eui-typography-fontFamily-ui)' }
    },
    title: {
      text: undefined
    },
    subtitle: {
      text: 'Last 30 days · signal distribution',
      align: 'center',
      style: {
        color: textMuted,
        fontSize: 'var(--eui-typography-fontSize-sm)',
        fontWeight: 'var(--eui-typography-fontWeight-normal)'
      }
    },
    credits: { enabled: false },
    legend: {
      enabled: true,
      align: 'center',
      verticalAlign: 'bottom',
      layout: 'horizontal',
      padding: legendPadding,
      y: 0,
      squareSymbol: true,
      symbolWidth: legendSymbolSize,
      symbolHeight: legendSymbolSize,
      symbolRadius: 3,
      itemDistance: legendItemDistance,
      symbolPadding: legendSymbolPadding,
      itemMarginTop: legendItemVerticalMargin,
      itemMarginBottom: legendItemVerticalMargin,
      itemStyle: {
        color: textMuted,
        fontWeight: 'var(--eui-typography-fontWeight-medium)',
        fontSize: 'var(--eui-typography-fontSize-sm)',
        lineHeight: `${legendSymbolSize}px`
      }
    },
    xAxis: {
      categories: ['Downtown', 'North', 'Central', 'East', 'South', 'West'],
      title: {
        text: 'District',
        style: {
          color: textMuted,
          fontSize: 'var(--eui-typography-fontSize-sm)',
          fontWeight: 'var(--eui-typography-fontWeight-medium)'
        }
      },
      labels: {
        style: {
          color: textMuted,
          fontSize: 'var(--eui-typography-fontSize-sm)',
          fontWeight: 'var(--eui-typography-fontWeight-normal)'
        }
      },
      lineColor: borderDefault,
      tickColor: borderDefault
    },
    yAxis: {
      title: {
        text: 'Items',
        style: {
          color: textMuted,
          fontSize: 'var(--eui-typography-fontSize-sm)',
          fontWeight: 'var(--eui-typography-fontWeight-medium)'
        }
      },
      gridLineColor: borderSubtle,
      labels: {
        style: {
          color: textMuted,
          fontSize: 'var(--eui-typography-fontSize-sm)',
          fontWeight: 'var(--eui-typography-fontWeight-normal)'
        }
      },
      tickAmount: 4
    },
    tooltip: {
      shared: true,
      valueSuffix: ' items',
      backgroundColor: backgroundSurface,
      borderColor: borderDefault,
      style: {
        color: textPrimary,
        fontSize: 'var(--eui-typography-fontSize-sm)',
        fontWeight: 'var(--eui-typography-fontWeight-normal)',
        fontFamily: 'var(--eui-typography-fontFamily-ui)'
      }
    },
    accessibility: {
      enabled: true,
      keyboardNavigation: { enabled: true },
      legend: { enabled: true },
      description: accessibilityMode
        ? 'Status chart in accessibility mode with pattern fills and enlarged legend symbols.'
        : 'Status chart in standard mode with color-only series and compact legend symbols.'
    },
    plotOptions: {
      column: {
        borderWidth: 0,
        borderRadius: 4,
        groupPadding: 0.12
      }
    },
    series: seriesStatuses.map(({ status, name, data }) => ({
      type: 'column',
      name,
      color: buildSeriesColor(scope, status, patternMode),
      data
    }))
  };
};

const ResizableChart = ({ patternMode = 'auto' }: { patternMode?: PatternMode }) => {
  const chartRef = useRef<HighchartsReactRefObject | null>(null);
  const wrapperRef = useRef<HTMLDivElement | null>(null);
  const contextScope =
    (typeof document !== 'undefined'
      ? ((wrapperRef.current?.closest('[data-eui-context]') as HTMLElement | null)
        ?? (document.querySelector('[data-eui-context]') as HTMLElement | null))
      : null);
  const chartOptions = buildChartOptions(contextScope, patternMode);

  useEffect(() => {
    if (!wrapperRef.current) return;

    const element = wrapperRef.current;
    const resize = () => {
      const height = element.clientHeight;
      if (!height) return;
      chartRef.current?.chart.setSize(null, height, false);
    };

    resize();

    const observer = new ResizeObserver(() => {
      requestAnimationFrame(resize);
    });

    observer.observe(element);

    return () => {
      observer.disconnect();
    };
  }, []);

  return (
    <div
      ref={wrapperRef}
      style={chartWrapperStyle}
      data-eui-pattern-mode={patternMode === 'auto' ? undefined : patternMode}
    >
      <HighchartsReact
        ref={chartRef}
        highcharts={Highcharts}
        options={chartOptions}
        containerProps={{ style: { height: '100%', width: '100%' } }}
      />
    </div>
  );
};

type GridCard = {
  key: string;
  title: string;
  data?: Array<Record<string, unknown>>;
  colHeaders?: string[];
  columns?: Array<Record<string, unknown>>;
  colWidths?: number[];
  stretchH?: 'all' | 'none' | 'last';
};

const gridCards: GridCard[] = [
  {
    key: 'top-left',
    title: 'Schedule approvals',
    data: leftTableData,
    colHeaders: ['Date', 'Approved'],
    columns: [
      { data: 'date', type: 'date', dateFormat: 'YYYY-MM-DD' },
      { data: 'approved', type: 'checkbox' }
    ],
    colWidths: [140, 110],
    stretchH: 'none'
  },
  {
    key: 'top-right',
    title: 'Review notes',
    data: detailedTableData,
    colHeaders: ['Date', 'Status', 'Comments'],
    columns: [
      { data: 'date', type: 'date', dateFormat: 'YYYY-MM-DD' },
      { data: 'status', type: 'text' },
      { data: 'comments', type: 'text' }
    ],
    stretchH: 'all'
  },
  {
    key: 'bottom-left',
    title: 'Review queue',
    data: bottomLeftTableData,
    colHeaders: ['Date', 'Approved'],
    columns: [
      { data: 'date', type: 'date', dateFormat: 'YYYY-MM-DD' },
      { data: 'approved', type: 'checkbox' }
    ],
    colWidths: [140, 110],
    stretchH: 'none'
  },
  {
    key: 'bottom-right',
    title: 'Status Signals by District'
  }
];

const gridLayout = [
  { i: 'top-left', x: 0, y: 0, w: 6, h: 7, minW: 3, minH: 5 },
  { i: 'top-right', x: 6, y: 0, w: 6, h: 7, minW: 3, minH: 5 },
  { i: 'bottom-left', x: 0, y: 7, w: 6, h: 7, minW: 3, minH: 5 },
  { i: 'bottom-right', x: 6, y: 7, w: 6, h: 7, minW: 3, minH: 5 }
];

const syncPortalTheme = (context: 'app' | 'website' | 'report', hotInstance?: { rootPortalElement?: HTMLElement | null }) => {
  const portal = hotInstance?.rootPortalElement;
  if (!portal) return;
  const theme = document
    .querySelector(`[data-eui-context="${context}"]`)
    ?.getAttribute('data-eui-theme') || 'default';
  portal.setAttribute('data-eui-context', context);
  portal.setAttribute('data-eui-theme', theme);
};

export const ResizableSplitGrid: Story = {
  name: 'Resizable Split Grid',
  render: () => (
    <MultiContextViewer contexts={[{ context: 'app' }]}>
      {() => (
        <div className="eui-theme" style={gridShellStyle}>
          <GridLayout
            cols={12}
            rowHeight={30}
            margin={[16, 16]}
            isDraggable
            isResizable
            draggableHandle=".eui-grid-card__handle"
            compactType={null}
            preventCollision
          >
            {gridCards.map((card) => (
              <div key={card.key} data-grid={gridLayout.find((item) => item.i === card.key)}>
                <div className="eui-card" data-eui-variant="elevated" style={gridItemStyle}>
                  <div className="eui-card__header eui-grid-card__handle" style={gridHeaderStyle}>
                    {card.title}
                  </div>
                  {card.key === 'bottom-right' ? (
                    <div className="eui-card__body">
                      <ResizableChart />
                    </div>
                  ) : (
                    <div className="eui-card__body" data-eui-padding="none">
                      <div style={tableWrapperStyle}>
                        <HotTable
                          data={card.data}
                          colHeaders={card.colHeaders}
                          columns={card.columns}
                          colWidths={card.colWidths}
                          style={{ height: '100%' }}
                          className="ht-theme-main eui-handsontable--borderless"
                          afterInit={function (this: { rootPortalElement?: HTMLElement | null }) {
                            syncPortalTheme('app', this);
                          }}
                          afterSetTheme={function (this: { rootPortalElement?: HTMLElement | null }) {
                            syncPortalTheme('app', this);
                          }}
                          stretchH={card.stretchH}
                          width="100%"
                          height="100%"
                          licenseKey="non-commercial-and-evaluation"
                          theme="ht-theme-main"
                        />
                      </div>
                    </div>
                  )}
                </div>
              </div>
            ))}
          </GridLayout>
        </div>
      )}
    </MultiContextViewer>
  )
};
