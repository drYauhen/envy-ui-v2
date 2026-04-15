import type { Meta, StoryObj } from '@storybook/react';
import { DocViewer } from '../../viewers/docs/DocViewer';
import { getSectionParameters } from '../../../.storybook/preview';

type Story = StoryObj;

const meta: Meta = {
  title: 'Docs/Architecture',
  parameters: {
    ...getSectionParameters('Docs/Architecture'),
    layout: 'fullscreen',
    controls: { hidden: true },
    actions: { hidden: true },
    interactions: { hidden: true },
    a11y: { hidden: true }
  }
};

export default meta;

export const ArchAccessibilityNum002RegulatoryBaselineAudit202604: Story = {
  name: 'ARCH-ACCESSIBILITY-002 Regulatory Baseline Audit 2026 04',
  render: () => (
    <DocViewer
      markdownPath="/docs/architecture/ARCH-accessibility-002-regulatory-baseline-audit-2026-04.md"
      status="Active"
      lastUpdated="2026-04-08"
      fallback="Loading ARCH-ACCESSIBILITY-002 Regulatory Baseline Audit 2026 04..."
    />
  )
};
