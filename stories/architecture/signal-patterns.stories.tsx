import type { Meta, StoryObj } from '@storybook/react';
import Highcharts from 'highcharts';
import AccessibilityModule from 'highcharts/modules/accessibility';
import PatternFillModule from 'highcharts/modules/pattern-fill';
import HighchartsReact from 'highcharts-react-official';
import { MultiContextViewer } from '../utils/multi-context-viewer';

const meta: Meta = {
  title: 'Architecture/Accessibility/Signal Patterns'
};

export default meta;

type Story = StoryObj;
type PatternStatus =
  | 'pending'
  | 'onTrack'
  | 'completed'
  | 'minorDisruption'
  | 'majorDisruption'
  | 'upcoming'
  | 'discontinued';

const initializeHighchartsModule = (moduleValue: unknown) => {
  const maybeFn = moduleValue as
    | ((highcharts: typeof Highcharts) => void)
    | { default?: (highcharts: typeof Highcharts) => void };
  const initFn = typeof maybeFn === 'function' ? maybeFn : maybeFn.default;
  if (typeof initFn === 'function') initFn(Highcharts);
};

const highchartsWithModules = Highcharts as typeof Highcharts & {
  __euiPatternFillLoaded?: boolean;
  __euiAccessibilityLoaded?: boolean;
};

if (!highchartsWithModules.__euiPatternFillLoaded) {
  initializeHighchartsModule(PatternFillModule);
  highchartsWithModules.__euiPatternFillLoaded = true;
}

if (!highchartsWithModules.__euiAccessibilityLoaded) {
  initializeHighchartsModule(AccessibilityModule);
  highchartsWithModules.__euiAccessibilityLoaded = true;
}

const shellStyle = {
  padding: '1.5rem',
  display: 'flex',
  flexDirection: 'column' as const,
  gap: '1.5rem'
};

const sectionTitleStyle = {
  margin: 0,
  fontSize: '1rem',
  fontWeight: 600
};

const helperTextStyle = {
  margin: '0.25rem 0 0',
  color: 'var(--eui-color-text-muted)',
  fontSize: '0.875rem'
};

const swatchGridStyle = {
  display: 'grid',
  gap: '0.75rem',
  gridTemplateColumns: 'repeat(auto-fit, minmax(170px, 1fr))'
} as const;

const swatchPreviewStyle = {
  height: '68px',
  borderRadius: 'var(--eui-radius-md)',
  border: '1px solid var(--eui-color-border-default)'
} as const;

const chartGridStyle = {
  display: 'grid',
  gap: '1rem',
  gridTemplateColumns: 'repeat(auto-fit, minmax(360px, 1fr))'
} as const;

const chartMountStyle = {
  minHeight: '330px'
} as const;

const legendPatternReadabilityNoteStyle = {
  margin: 0,
  color: 'var(--eui-color-text-muted)',
  fontSize: '0.8125rem'
};

const patternLibrary = [
  { label: 'Stripe Forward', prefix: '--eui-pattern-library-stripeForward' },
  { label: 'Stripe Backward', prefix: '--eui-pattern-library-stripeBackward' },
  { label: 'Crosshatch', prefix: '--eui-pattern-library-crosshatch' },
  { label: 'Horizontal', prefix: '--eui-pattern-library-horizontal' },
  { label: 'Dash Horizontal', prefix: '--eui-pattern-library-dashHorizontal' },
  { label: 'Vertical', prefix: '--eui-pattern-library-vertical' },
  { label: 'Grid Tight', prefix: '--eui-pattern-library-gridTight' }
];

const statusMapping = [
  { label: 'Pending', status: 'pending' },
  { label: 'On Track', status: 'onTrack' },
  { label: 'Completed', status: 'completed' },
  { label: 'Minor Disruption', status: 'minorDisruption' },
  { label: 'Major Disruption', status: 'majorDisruption' },
  { label: 'Upcoming', status: 'upcoming' },
  { label: 'Discontinued', status: 'discontinued' }
];

const statusFallbackColors: Record<PatternStatus, string> = {
  pending: '#8f8f95',
  onTrack: '#2f9e55',
  completed: '#3d6cd4',
  minorDisruption: '#e0aa13',
  majorDisruption: '#d0443c',
  upcoming: '#7b5cc7',
  discontinued: '#5f5a52'
};

const grayscaleFallbackColors: Record<PatternStatus, string> = {
  pending: '#b9b9b9',
  onTrack: '#a8a8a8',
  completed: '#979797',
  minorDisruption: '#878787',
  majorDisruption: '#777777',
  upcoming: '#666666',
  discontinued: '#575757'
};

const cssVarReferencePattern = /^var\(\s*(--[\w-]+)\s*(?:,\s*([^)]+))?\)$/;

const readCssVarRaw = (name: string): string => {
  if (typeof document === 'undefined') return '';
  return getComputedStyle(document.documentElement).getPropertyValue(name).trim();
};

const resolveCssValue = (value: string, fallback: string): string => {
  let current = value.trim();
  const visited = new Set<string>();

  for (let depth = 0; depth < 10; depth += 1) {
    const match = current.match(cssVarReferencePattern);
    if (!match) break;

    const referenceName = match[1];
    const inlineFallback = (match[2] ?? '').trim();
    if (visited.has(referenceName)) break;

    visited.add(referenceName);
    const referencedValue = readCssVarRaw(referenceName);
    current = (referencedValue || inlineFallback).trim();
    if (!current) break;
  }

  return current || fallback;
};

const readCssVar = (name: string, fallback: string): string => {
  const value = readCssVarRaw(name);
  if (!value) return fallback;
  return resolveCssValue(value, fallback);
};

const readCssNumber = (name: string, fallback: number): number => {
  const value = readCssVar(name, String(fallback));
  const parsed = Number.parseFloat(value);
  return Number.isFinite(parsed) ? parsed : fallback;
};

type StatusColorProfile = 'default' | 'grayscale';

const getStatusColor = (status: PatternStatus, profile: StatusColorProfile = 'default'): string =>
  profile === 'grayscale'
    ? readCssVar(`--eui-color-status-application-grayscale-${status}`, grayscaleFallbackColors[status])
    : readCssVar(`--eui-color-status-application-${status}`, statusFallbackColors[status]);

const buildAccessibilityConfig = (description: string): Highcharts.AccessibilityOptions => ({
  enabled: true,
  description,
  keyboardNavigation: {
    enabled: true
  },
  legend: {
    enabled: true
  },
  point: {
    descriptionFormat: '{point.name}, {point.y}.'
  }
});

const buildLegendOptions = (): Highcharts.LegendOptions => {
  const symbolSize = readCssNumber('--eui-chart-legend-symbolSize', 18);
  const itemMinHeight = readCssNumber('--eui-chart-legend-itemMinHeight', 24);
  const symbolPadding = readCssNumber('--eui-chart-legend-symbolPadding', 8);
  const itemDistance = readCssNumber('--eui-chart-legend-itemDistance', 14);
  const padding = readCssNumber('--eui-chart-legend-padding', 8);
  const itemVerticalMargin = Math.max(0, (itemMinHeight - symbolSize) / 2);

  return {
    enabled: true,
    align: 'center',
    verticalAlign: 'bottom',
    layout: 'horizontal',
    floating: false,
    padding,
    squareSymbol: true,
    symbolWidth: symbolSize,
    symbolHeight: symbolSize,
    symbolRadius: 3,
    symbolPadding,
    itemDistance,
    itemMarginTop: itemVerticalMargin,
    itemMarginBottom: itemVerticalMargin,
    itemStyle: {
      color: readCssVar('--eui-color-text-primary', '#0f172a'),
      fontSize: '12px',
      fontWeight: '500',
      lineHeight: `${symbolSize}px`
    }
  };
};

type PatternProfile = 'default' | 'print';

const buildPatternFill = (status: PatternStatus, baseColor: string, profile: PatternProfile = 'default') => {
  const profilePrefix =
    profile === 'print'
      ? `--eui-pattern-signal-status-application-${status}-print`
      : `--eui-pattern-signal-status-application-${status}`;
  const path = readCssVar(`${profilePrefix}-highchartsPath`, '');
  if (!path) return baseColor;
  const patternStroke = readCssVar(
    `${profilePrefix}-highchartsStrokeColor`,
    profile === 'print' ? '#111111CC' : '#FFFFFF80'
  );

  return {
    pattern: {
      width: readCssNumber(`${profilePrefix}-highchartsWidth`, 8),
      height: readCssNumber(`${profilePrefix}-highchartsHeight`, 8),
      backgroundColor: baseColor,
      path: {
        d: path,
        stroke: patternStroke,
        strokeWidth: readCssNumber(`${profilePrefix}-highchartsStrokeWidth`, profile === 'print' ? 2 : 1.5)
      }
    }
  };
};

const buildSignalPieOptions = (withPatterns: boolean): Highcharts.Options => ({
  chart: {
    type: 'pie',
    backgroundColor: 'transparent',
    spacingBottom: 50,
    style: { fontFamily: 'var(--eui-typography-fontFamily-ui)' }
  },
  title: {
    text: withPatterns ? 'Pie: Signal Colors + Patterns' : 'Pie: Signal Colors Only',
    style: { color: readCssVar('--eui-color-text-primary', '#0f172a') }
  },
  accessibility: buildAccessibilityConfig(
    withPatterns
      ? 'Status distribution pie chart using semantic colors and token-driven patterns.'
      : 'Status distribution pie chart using semantic colors only.'
  ),
  legend: buildLegendOptions(),
  credits: { enabled: false },
  tooltip: {
    pointFormat: '<b>{point.percentage:.1f}%</b>'
  },
  plotOptions: {
    pie: {
      allowPointSelect: true,
      cursor: 'pointer',
      size: '92%',
      showInLegend: true,
      dataLabels: {
        enabled: true,
        format: '{point.name}'
      }
    }
  },
  series: [
    {
      type: 'pie',
      name: 'Items',
      data: statusMapping.map(({ label, status }, index) => {
        const typedStatus = status as PatternStatus;
        const baseColor = getStatusColor(typedStatus);
        return {
          name: label,
          y: [18, 22, 14, 12, 10, 13, 11][index],
          color: withPatterns ? buildPatternFill(typedStatus, baseColor) : baseColor
        };
      })
    }
  ]
});

const buildNeutralPieOptions = (): Highcharts.Options => ({
  chart: {
    type: 'pie',
    backgroundColor: 'transparent',
    spacingBottom: 50,
    style: { fontFamily: 'var(--eui-typography-fontFamily-ui)' }
  },
  title: {
    text: 'Pie: Non-Signal (Neutral Palette)',
    style: { color: readCssVar('--eui-color-text-primary', '#0f172a') }
  },
  accessibility: buildAccessibilityConfig(
    'Comparison pie chart that intentionally avoids semantic signal colors.'
  ),
  legend: buildLegendOptions(),
  credits: { enabled: false },
  tooltip: {
    pointFormat: '<b>{point.percentage:.1f}%</b>'
  },
  plotOptions: {
    pie: {
      allowPointSelect: true,
      cursor: 'pointer',
      size: '92%',
      showInLegend: true,
      dataLabels: {
        enabled: true,
        format: '{point.name}'
      }
    }
  },
  series: [
    {
      type: 'pie',
      name: 'Items',
      data: [
        { name: 'Segment A', y: 24, color: readCssVar('--eui-color-neutral-200', '#d4d4d8') },
        { name: 'Segment B', y: 20, color: readCssVar('--eui-color-neutral-300', '#a1a1aa') },
        { name: 'Segment C', y: 19, color: readCssVar('--eui-color-neutral-400', '#71717a') },
        { name: 'Segment D', y: 18, color: readCssVar('--eui-color-neutral-500', '#52525b') },
        { name: 'Segment E', y: 19, color: readCssVar('--eui-color-neutral-600', '#3f3f46') }
      ]
    }
  ]
});

const buildColumnPatternOptions = (): Highcharts.Options => {
  const barStatuses: PatternStatus[] = [
    'pending',
    'onTrack',
    'completed',
    'minorDisruption',
    'majorDisruption',
    'upcoming',
    'discontinued',
    'onTrack',
    'completed',
    'minorDisruption',
    'majorDisruption',
    'pending'
  ];
  const values = [12, 19, 17, 9, 7, 10, 5, 16, 14, 8, 6, 11];

  return {
    chart: {
      type: 'column',
      backgroundColor: 'transparent',
      style: { fontFamily: 'var(--eui-typography-fontFamily-ui)' }
    },
    title: {
      text: 'Column: Many Bars (Signal + Pattern)',
      style: { color: readCssVar('--eui-color-text-primary', '#0f172a') }
    },
    accessibility: buildAccessibilityConfig(
      'Multi-bar chart using semantic signal colors with token-driven pattern overlays.'
    ),
    credits: { enabled: false },
    legend: { enabled: false },
    xAxis: {
      categories: ['Jan', 'Feb', 'Mar', 'Apr', 'May', 'Jun', 'Jul', 'Aug', 'Sep', 'Oct', 'Nov', 'Dec'],
      lineColor: readCssVar('--eui-color-border-default', '#cbd5e1'),
      labels: {
        style: { color: readCssVar('--eui-color-text-muted', '#64748b') }
      }
    },
    yAxis: {
      title: { text: 'Count' },
      gridLineColor: readCssVar('--eui-color-border-subtle', '#e2e8f0'),
      labels: {
        style: { color: readCssVar('--eui-color-text-muted', '#64748b') }
      }
    },
    tooltip: {
      pointFormat: '<b>{point.y}</b>'
    },
    plotOptions: {
      column: {
        borderWidth: 0,
        borderRadius: 3,
        groupPadding: 0.06,
        pointPadding: 0.04,
        maxPointWidth: 56
      }
    },
    series: [
      {
        type: 'column',
        name: 'Volume',
        data: values.map((value, index) => {
          const status = barStatuses[index];
          const baseColor = getStatusColor(status);
          return {
            y: value,
            color: buildPatternFill(status, baseColor)
          };
        })
      }
    ]
  };
};

const buildPrintSignalPieOptions = (): Highcharts.Options => ({
  chart: {
    type: 'pie',
    backgroundColor: '#ffffff',
    spacingBottom: 50,
    style: { fontFamily: 'var(--eui-typography-fontFamily-ui)' }
  },
  title: {
    text: 'Pie: Print Simulation (Grayscale + Patterns)',
    style: { color: '#222222' }
  },
  subtitle: {
    text: 'Black & white report preview',
    style: { color: '#4b4b4b' }
  },
  accessibility: buildAccessibilityConfig(
    'Print simulation chart: grayscale semantic statuses with the same signal patterns.'
  ),
  legend: buildLegendOptions(),
  credits: { enabled: false },
  tooltip: {
    pointFormat: '<b>{point.percentage:.1f}%</b>'
  },
  plotOptions: {
    pie: {
      allowPointSelect: true,
      cursor: 'pointer',
      size: '92%',
      showInLegend: true,
      dataLabels: {
        enabled: true,
        format: '{point.name}'
      }
    }
  },
  series: [
    {
      type: 'pie',
      name: 'Items',
      data: statusMapping.map(({ label, status }, index) => {
        const typedStatus = status as PatternStatus;
        const grayscaleBaseColor = getStatusColor(typedStatus, 'grayscale');
        return {
          name: label,
          y: [18, 22, 14, 12, 10, 13, 11][index],
          color: buildPatternFill(typedStatus, grayscaleBaseColor, 'print')
        };
      })
    }
  ]
});

const buildLegendPatternOptions = (): Highcharts.Options => ({
  chart: {
    type: 'column',
    backgroundColor: 'transparent',
    spacingTop: 16,
    spacingRight: 12,
    spacingBottom: 50,
    spacingLeft: 12,
    style: { fontFamily: 'var(--eui-typography-fontFamily-ui)' }
  },
  title: {
    text: 'Legend Pattern Readability (Signal + Pattern)',
    style: { color: readCssVar('--eui-color-text-primary', '#0f172a') }
  },
  subtitle: {
    text: 'Legend symbols are intentionally enlarged to improve pattern recognition.',
    style: { color: readCssVar('--eui-color-text-muted', '#64748b') }
  },
  accessibility: buildAccessibilityConfig(
    'Legend readability preview using semantic signal colors with token-driven patterns.'
  ),
  credits: { enabled: false },
  legend: buildLegendOptions(),
  xAxis: {
    visible: false
  },
  yAxis: {
    visible: false,
    title: { text: '' },
    max: 1
  },
  tooltip: {
    pointFormat: '<b>{series.name}</b>'
  },
  plotOptions: {
    column: {
      borderWidth: 0,
      pointPadding: 0.2,
      groupPadding: 0.2
    },
    series: {
      showInLegend: true,
      enableMouseTracking: false,
      dataLabels: { enabled: false }
    }
  },
  series: statusMapping.map(({ label, status }) => {
    const typedStatus = status as PatternStatus;
    const baseColor = getStatusColor(typedStatus);
    return {
      type: 'column',
      name: label,
      color: buildPatternFill(typedStatus, baseColor),
      data: [1]
    };
  })
});

export const Overview: Story = {
  name: 'Overview',
  render: () => (
    <MultiContextViewer contexts={[{ context: 'app' }]}>
      {() => (
        <div style={shellStyle}>
          <section className="eui-stack" data-eui-gap="sm">
            <h3 style={sectionTitleStyle}>Pattern Library (Independent of Color)</h3>
            <p style={helperTextStyle}>
              These are tokenized pattern primitives. They can be reused for semantic signals and custom colors.
            </p>
            <div style={swatchGridStyle}>
              {patternLibrary.map(({ label, prefix }) => (
                <div key={label} className="eui-card" data-eui-variant="flat">
                  <div className="eui-card__body eui-stack" data-eui-gap="xs">
                    <strong>{label}</strong>
                    <div
                      style={{
                        ...swatchPreviewStyle,
                        backgroundColor: '#30343b',
                        backgroundImage: `var(${prefix}-cssImage)`,
                        backgroundSize: `var(${prefix}-cssSize)`,
                        backgroundRepeat: 'repeat'
                      }}
                    />
                  </div>
                </div>
              ))}
            </div>
          </section>

          <section className="eui-stack" data-eui-gap="sm">
            <h3 style={sectionTitleStyle}>Signal Mapping (Status + Pattern)</h3>
            <p style={helperTextStyle}>
              Semantic status pattern mapping is token-driven and shared between UI components and chart integrations.
            </p>
            <div style={swatchGridStyle}>
              {statusMapping.map(({ label, status }) => (
                <div key={status} className="eui-card" data-eui-variant="flat">
                  <div className="eui-card__body eui-stack" data-eui-gap="xs">
                    <strong>{label}</strong>
                    <div
                      style={{
                        ...swatchPreviewStyle,
                        backgroundColor: `var(--eui-color-status-application-${status})`,
                        backgroundImage: `var(--eui-pattern-signal-status-application-${status}-cssImage)`,
                        backgroundSize: `var(--eui-pattern-signal-status-application-${status}-cssSize)`,
                        backgroundRepeat: 'repeat'
                      }}
                    />
                  </div>
                </div>
              ))}
            </div>
          </section>

          <section className="eui-stack" data-eui-gap="sm">
            <h3 style={sectionTitleStyle}>Component-Level Override</h3>
            <p style={helperTextStyle}>
              Global mode is controlled by Storybook toolbar. Below all status cards force patterns via
              `data-eui-pattern-mode="on"` so you can review every pattern directly.
            </p>
            <div style={swatchGridStyle}>
              {statusMapping.map(({ label, status }) => (
                <div
                  key={`override-${status}`}
                  className="eui-card"
                  data-eui-variant="elevated"
                  data-eui-status={status}
                  data-eui-pattern-mode="on"
                >
                  <div className="eui-card__body eui-stack" data-eui-gap="xs">
                    <strong>{label}</strong>
                    <span className="eui-text-body-sm" style={{ color: 'var(--eui-color-text-muted)' }}>
                      Forced pattern override
                    </span>
                  </div>
                </div>
              ))}
            </div>
          </section>

          <section className="eui-stack" data-eui-gap="sm">
            <h3 style={sectionTitleStyle}>Highcharts Accessibility Module</h3>
            <p style={helperTextStyle}>
              Accessibility module is enabled. Examples below show semantic signal charts, neutral comparison,
              print-mode grayscale simulation, and multi-bar chart with token-driven patterns.
            </p>
            <div style={chartGridStyle}>
              <div className="eui-card" data-eui-variant="flat">
                <div className="eui-card__body eui-stack" data-eui-gap="sm">
                  <div style={chartMountStyle}>
                    <HighchartsReact
                      highcharts={Highcharts}
                      options={buildSignalPieOptions(false)}
                      containerProps={{ style: { height: '330px' } }}
                    />
                  </div>
                </div>
              </div>

              <div className="eui-card" data-eui-variant="flat">
                <div className="eui-card__body eui-stack" data-eui-gap="sm">
                  <div style={chartMountStyle}>
                    <HighchartsReact
                      highcharts={Highcharts}
                      options={buildNeutralPieOptions()}
                      containerProps={{ style: { height: '330px' } }}
                    />
                  </div>
                </div>
              </div>

              <div className="eui-card" data-eui-variant="flat">
                <div className="eui-card__body eui-stack" data-eui-gap="sm">
                  <div style={chartMountStyle}>
                    <HighchartsReact
                      highcharts={Highcharts}
                      options={buildSignalPieOptions(true)}
                      containerProps={{ style: { height: '330px' } }}
                    />
                  </div>
                </div>
              </div>

              <div className="eui-card" data-eui-variant="flat">
                <div className="eui-card__body eui-stack" data-eui-gap="sm">
                  <div style={chartMountStyle}>
                    <HighchartsReact
                      highcharts={Highcharts}
                      options={buildPrintSignalPieOptions()}
                      containerProps={{ style: { height: '330px' } }}
                    />
                  </div>
                </div>
              </div>

              <div className="eui-card" data-eui-variant="flat" style={{ gridColumn: '1 / -1' }}>
                <div className="eui-card__body eui-stack" data-eui-gap="sm">
                  <div style={{ minHeight: '380px' }}>
                    <HighchartsReact
                      highcharts={Highcharts}
                      options={buildColumnPatternOptions()}
                      containerProps={{ style: { height: '380px' } }}
                    />
                  </div>
                </div>
              </div>

              <div className="eui-card" data-eui-variant="flat" style={{ gridColumn: '1 / -1' }}>
                <div className="eui-card__body eui-stack" data-eui-gap="xs">
                  <p style={legendPatternReadabilityNoteStyle}>
                    Unified policy: visible legend symbol is 18x18 with enlarged item hit-area for accessible interaction.
                  </p>
                  <div style={{ minHeight: '290px' }}>
                    <HighchartsReact
                      highcharts={Highcharts}
                      options={buildLegendPatternOptions()}
                      containerProps={{ style: { height: '290px' } }}
                    />
                  </div>
                </div>
              </div>
            </div>
          </section>
        </div>
      )}
    </MultiContextViewer>
  )
};
