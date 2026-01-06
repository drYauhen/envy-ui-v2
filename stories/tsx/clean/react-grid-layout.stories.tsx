import type { Meta, StoryObj } from '@storybook/react';
import { HotTable } from '@handsontable/react-wrapper';
import { registerAllModules } from 'handsontable/registry';
import { useEffect, useRef } from 'react';
import ReactGridLayout, { WidthProvider } from 'react-grid-layout/legacy';
import Highcharts from 'highcharts';
import HighchartsReact, { HighchartsReactRefObject } from 'highcharts-react-official';
import { getSectionParameters } from '../../../.storybook/preview';
import { ContextThemeScope } from '../../utils/context-theme';
import 'handsontable/styles/handsontable.css';
import 'handsontable/styles/ht-icons-main.css';
import 'handsontable/styles/ht-theme-main.css';
import 'react-grid-layout/css/styles.css';
import 'react-resizable/css/styles.css';
import '../../../src/ui/vendors/handsontable.adapter.css';

registerAllModules();
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
  fontFamily: 'var(--eui-card-header-typography-fontFamily, var(--eui-typography-font-family-ui))',
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

const ResizableChart = () => {
  const chartRef = useRef<HighchartsReactRefObject | null>(null);
  const wrapperRef = useRef<HTMLDivElement | null>(null);

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
    <div ref={wrapperRef} style={chartWrapperStyle}>
      <HighchartsReact
        ref={chartRef}
        highcharts={Highcharts}
        options={chartOptions}
        containerProps={{ style: { height: '100%', width: '100%' } }}
      />
    </div>
  );
};

const chartOptions: Highcharts.Options = {
  chart: {
    type: 'column',
    backgroundColor: 'transparent',
    spacingTop: 0,
    marginTop: 66,
    spacingRight: 6,
    spacingBottom: 0,
    spacingLeft: 6,
    reflow: true,
    style: { fontFamily: 'var(--eui-chart-typography-font-family)' }
  },
  title: {
    text: undefined
  },
  subtitle: {
    text: 'Last 30 days · 311 + web intake',
    align: 'center',
    style: {
      color: 'var(--eui-chart-colors-text-muted)',
      fontSize: 'var(--eui-chart-typography-subtitle-font-size)',
      fontWeight: 'var(--eui-chart-typography-subtitle-font-weight)'
    }
  },
  credits: { enabled: false },
  legend: {
    enabled: true,
    align: 'center',
    verticalAlign: 'top',
    layout: 'horizontal',
    y: -6,
    itemDistance: 6,
    symbolPadding: 4,
    itemMarginTop: 1,
    itemMarginBottom: 1,
    itemStyle: {
      color: 'var(--eui-chart-colors-text-muted)',
      fontWeight: 'var(--eui-chart-typography-legend-font-weight)',
      fontSize: 'var(--eui-chart-typography-legend-font-size)'
    }
  },
  xAxis: {
    categories: ['Downtown', 'North', 'Central', 'East', 'South', 'West'],
    title: {
      text: 'District',
      style: {
        color: 'var(--eui-chart-colors-text-muted)',
        fontSize: 'var(--eui-chart-typography-axis-font-size)',
        fontWeight: 'var(--eui-chart-typography-axis-font-weight)'
      }
    },
    labels: {
      style: {
        color: 'var(--eui-chart-colors-text-muted)',
        fontSize: 'var(--eui-chart-typography-axis-font-size)',
        fontWeight: 'var(--eui-chart-typography-axis-font-weight)'
      }
    },
    lineColor: 'var(--eui-chart-colors-axis-line)',
    tickColor: 'var(--eui-chart-colors-axis-line)'
  },
  yAxis: {
    title: {
      text: 'Requests',
      style: {
        color: 'var(--eui-chart-colors-text-muted)',
        fontSize: 'var(--eui-chart-typography-axis-font-size)',
        fontWeight: 'var(--eui-chart-typography-axis-font-weight)'
      }
    },
    gridLineColor: 'var(--eui-chart-colors-axis-grid)',
    labels: {
      style: {
        color: 'var(--eui-chart-colors-text-muted)',
        fontSize: 'var(--eui-chart-typography-axis-font-size)',
        fontWeight: 'var(--eui-chart-typography-axis-font-weight)'
      }
    },
    tickAmount: 3
  },
  tooltip: {
    shared: true,
    valueSuffix: ' requests',
    backgroundColor: 'var(--eui-chart-colors-tooltip-background)',
    borderColor: 'var(--eui-chart-colors-tooltip-border)',
    style: {
      color: 'var(--eui-chart-colors-tooltip-text)',
      fontSize: 'var(--eui-chart-typography-tooltip-font-size)',
      fontWeight: 'var(--eui-chart-typography-tooltip-font-weight)',
      fontFamily: 'var(--eui-chart-typography-font-family)'
    }
  },
  plotOptions: {
    column: {
      borderWidth: 0,
      borderRadius: 4,
      groupPadding: 0.12
    }
  },
  series: [
    {
      type: 'column',
      name: 'New',
      color: 'var(--eui-chart-colors-series-primary)',
      data: [52, 41, 33, 58, 47, 29]
    },
    {
      type: 'column',
      name: 'Resolved',
      color: 'var(--eui-chart-colors-series-secondary)',
      data: [36, 30, 28, 44, 39, 22]
    }
  ]
};

const gridCards = [
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
    title: 'Service Requests by District'
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
    <ContextThemeScope context="website" className="eui-theme" style={gridShellStyle}>
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
                      afterInit={function () {
                        syncPortalTheme('website', this);
                      }}
                      afterSetTheme={function () {
                        syncPortalTheme('website', this);
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
    </ContextThemeScope>
  )
};
