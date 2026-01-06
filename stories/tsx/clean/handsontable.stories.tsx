import type { Meta, StoryObj } from '@storybook/react';
import { HotTable } from '@handsontable/react-wrapper';
import { registerAllModules } from 'handsontable/registry';
import { getSectionParameters } from '../../../.storybook/preview';
import { ContextThemeScope } from '../../utils/context-theme';
import { useThemePresets } from '../../../src/ui/theme-presets';
import { MultiContextViewer, PresetDetails } from '../../utils/multi-context-viewer';
import 'handsontable/styles/handsontable.css';
import 'handsontable/styles/ht-icons-main.css';
import 'handsontable/styles/ht-theme-main.css';
import '../../../src/ui/vendors/handsontable.adapter.css';

registerAllModules();

const meta: Meta = {
  title: 'TSX (Clean)/Integrations/Handsontable',
  tags: ['autodocs'],
  parameters: {
    ...getSectionParameters('TSX (Clean)/Integrations/Handsontable'),
    layout: 'padded'
  }
};

export default meta;

type Story = StoryObj;

const data = [
  { project: 'Roadmap Refresh', owner: 'A. Smith', status: 'In progress', due: '2025-02-01', budget: 120000 },
  { project: 'Onboarding Revamp', owner: 'J. Rivera', status: 'Planned', due: '2025-03-14', budget: 86000 },
  { project: 'Q2 Campaign', owner: 'M. Chen', status: 'Active', due: '2025-04-05', budget: 45000 },
  { project: 'Reporting UX', owner: 'K. Patel', status: 'Review', due: '2025-01-22', budget: 30000 },
  { project: 'Policy Sync', owner: 'L. Ahmed', status: 'Blocked', due: '2025-02-18', budget: 15000 }
];

const containerStyle = {
  background: 'var(--eui-color-background-base)',
  padding: '1.5rem',
  borderRadius: 'var(--eui-radius-large)'
} as const;

const syncPortalTheme = (context: 'app' | 'website' | 'report', hotInstance?: { rootPortalElement?: HTMLElement | null }) => {
  const portal = hotInstance?.rootPortalElement;
  if (!portal) return;
  const theme = document
    .querySelector(`[data-eui-context="${context}"]`)
    ?.getAttribute('data-eui-theme') || 'default';
  portal.setAttribute('data-eui-context', context);
  portal.setAttribute('data-eui-theme', theme);
};

export const Basic: Story = {
  name: 'Handsontable (Adapter)',
  render: () => (
    <ContextThemeScope
      context="app"
      className="eui-theme"
      style={containerStyle}
    >
      <HotTable
        data={data}
        colHeaders={['Project', 'Owner', 'Status', 'Due', 'Budget']}
        className="ht-theme-main"
        afterInit={function () {
          syncPortalTheme('app', this);
        }}
        afterSetTheme={function () {
          syncPortalTheme('app', this);
        }}
        columns={[
          { data: 'project', type: 'text' },
          { data: 'owner', type: 'text' },
          { data: 'status', type: 'text' },
          { data: 'due', type: 'date', dateFormat: 'YYYY-MM-DD' },
          { data: 'budget', type: 'numeric', numericFormat: { pattern: '$0,0' } }
        ]}
        rowHeaders
        stretchH="all"
        height={320}
        licenseKey="non-commercial-and-evaluation"
        theme="ht-theme-main"
      />
    </ContextThemeScope>
  )
};

export const BasicMultiContext: Story = {
  name: 'Multi-Context (No Presets)',
  parameters: {
    layout: 'fullscreen'
  },
  render: () => (
    <MultiContextViewer
      contexts={[
        { context: 'app' },
        { context: 'website' },
        { context: 'report' }
      ]}
    >
      {(context) => (
        <HotTable
          data={data}
          colHeaders={['Project', 'Owner', 'Status', 'Due', 'Budget']}
          className="ht-theme-main"
          afterInit={function (this: { rootPortalElement?: HTMLElement | null }) {
            syncPortalTheme(context, this);
          }}
          afterSetTheme={function (this: { rootPortalElement?: HTMLElement | null }) {
            syncPortalTheme(context, this);
          }}
          columns={[
            { data: 'project', type: 'text' },
            { data: 'owner', type: 'text' },
            { data: 'status', type: 'text' },
            { data: 'due', type: 'date', dateFormat: 'YYYY-MM-DD' },
            { data: 'budget', type: 'numeric', numericFormat: { pattern: '$0,0' } }
          ]}
          rowHeaders
          stretchH="all"
          height={280}
          licenseKey="non-commercial-and-evaluation"
        />
      )}
    </MultiContextViewer>
  )
};

export const WithThemePresets: Story = {
  name: 'With Theme Presets (ADR-0034)',
  render: () => {
    const TableWithPresets = () => {
      const presets = useThemePresets('app', 'default', 'handsontable');

      if (!presets) {
        return <div style={{ padding: '2rem' }}>Loading theme presets...</div>;
      }

      return (
        <ContextThemeScope
          context="app"
          className="eui-theme"
          style={containerStyle}
        >
          <div style={{ marginBottom: '1rem', fontSize: '0.875rem', opacity: 0.8 }}>
            <strong>Theme Presets Loaded:</strong>
            <pre style={{ marginTop: '0.5rem', fontSize: '0.75rem' }}>
              {JSON.stringify(presets, null, 2)}
            </pre>
          </div>
          <HotTable
            data={data}
            colHeaders={['Project', 'Owner', 'Status', 'Due', 'Budget']}
            {...presets.props}
            afterInit={function (this: { rootPortalElement?: HTMLElement | null }) {
              syncPortalTheme('app', this);
            }}
            afterSetTheme={function (this: { rootPortalElement?: HTMLElement | null }) {
              syncPortalTheme('app', this);
            }}
            columns={[
              { data: 'project', type: 'text' },
              { data: 'owner', type: 'text' },
              { data: 'status', type: 'text' },
              { data: 'due', type: 'date', dateFormat: 'YYYY-MM-DD' },
              { data: 'budget', type: 'numeric', numericFormat: { pattern: '$0,0' } }
            ]}
            rowHeaders
            height={320}
            licenseKey="non-commercial-and-evaluation"
          />
        </ContextThemeScope>
      );
    };

    return <TableWithPresets />;
  }
};

const TableWithPresetsByContext = ({ context, theme }: { context: 'app' | 'website' | 'report'; theme: string }) => {
  const presets = useThemePresets(context, theme, 'handsontable');

  if (!presets) {
    return <div style={{ padding: '1rem', fontSize: '0.875rem' }}>Loading {context} presets...</div>;
  }

  return (
    <>
      <PresetDetails presets={presets} collapsible />
      <HotTable
        data={data}
        colHeaders={['Project', 'Owner', 'Status', 'Due', 'Budget']}
        {...presets.props}
        afterInit={function (this: { rootPortalElement?: HTMLElement | null }) {
          syncPortalTheme(context, this);
        }}
        afterSetTheme={function (this: { rootPortalElement?: HTMLElement | null }) {
          syncPortalTheme(context, this);
        }}
        columns={[
          { data: 'project', type: 'text' },
          { data: 'owner', type: 'text' },
          { data: 'status', type: 'text' },
          { data: 'due', type: 'date', dateFormat: 'YYYY-MM-DD' },
          { data: 'budget', type: 'numeric', numericFormat: { pattern: '$0,0' } }
        ]}
        rowHeaders
        height={280}
        licenseKey="non-commercial-and-evaluation"
      />
    </>
  );
};

export const SingleContext: Story = {
  name: 'Single Context - App',
  parameters: {
    layout: 'fullscreen'
  },
  render: () => (
    <MultiContextViewer
      contexts={[
        { context: 'app' }
      ]}
    >
      {(context, theme) => <TableWithPresetsByContext context={context} theme={theme} />}
    </MultiContextViewer>
  )
};

export const DualContext: Story = {
  name: 'Dual Context - App vs Website',
  parameters: {
    layout: 'fullscreen'
  },
  render: () => (
    <MultiContextViewer
      contexts={[
        { context: 'app' },
        { context: 'website' }
      ]}
    >
      {(context, theme) => <TableWithPresetsByContext context={context} theme={theme} />}
    </MultiContextViewer>
  )
};

export const AllContextsComparison: Story = {
  name: 'All Contexts Comparison',
  parameters: {
    layout: 'fullscreen'
  },
  render: () => (
    <MultiContextViewer
      contexts={[
        { context: 'app' },
        { context: 'website' },
        { context: 'report' }
      ]}
    >
      {(context, theme) => <TableWithPresetsByContext context={context} theme={theme} />}
    </MultiContextViewer>
  )
};
