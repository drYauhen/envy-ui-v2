import type { Meta, StoryObj } from '@storybook/react';
import { DocViewer } from '../../viewers/docs/DocViewer';
import { getSectionParameters } from '../../../.storybook/preview';

type Story = StoryObj;

const meta: Meta = {
  title: 'Docs/ADR',
  parameters: {
    ...getSectionParameters('Docs/ADR'),
    layout: 'fullscreen',
    controls: { hidden: true },
    actions: { hidden: true },
    interactions: { hidden: true },
    a11y: { hidden: true }
  }
};

export default meta;

export const tokenOverrideStrategyMultiTenantGenerativeUi: Story = {
  name: 'ADR-0032 Token Override Strategy Multi Tenant Generative Ui',
  render: () => (
    <DocViewer
      markdownPath="/docs/adr/ADR-0032-token-override-strategy-multi-tenant-generative-ui.md"
      title="Token Override Strategy Multi Tenant Generative Ui"
      status="Proposed"
      date="2026-01-06"
      owner="Eugene Goncharov"
      assistance="AI-assisted drafting (human-reviewed)"
      fallback="Loading ADR-0032 Token Override Strategy Multi Tenant Generative Ui..."
    />
  )
};
