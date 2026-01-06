import type { Meta, StoryObj } from '@storybook/react';
import { HotTable } from '@handsontable/react-wrapper';
import { registerAllModules } from 'handsontable/registry';
import { getSectionParameters } from '../../../.storybook/preview';
import { ContextThemeScope } from '../../utils/context-theme';
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
