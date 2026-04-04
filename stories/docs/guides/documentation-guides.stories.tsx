import type { Meta, StoryObj } from '@storybook/react';
import { DocViewer } from '../../viewers/docs/DocViewer';
import { getSectionParameters } from '../../../.storybook/preview';

type Story = StoryObj;

const meta: Meta = {
  title: 'Docs/Guides',
  parameters: {
    ...getSectionParameters('Docs/Guides'),
    layout: 'fullscreen',
    controls: { hidden: true },
    actions: { hidden: true },
    interactions: { hidden: true },
    a11y: { hidden: true }
  }
};

export default meta;

export const canonicalDocumentationFormat: Story = {
  name: 'Canonical Documentation Format',
  render: () => (
    <DocViewer
      markdownPath="/docs/CANONICAL-DOC-FORMAT.md"
      status="Active"
      lastUpdated="2026-01-15"
      fallback="Loading Canonical Documentation Format..."
    />
  )
};

export const documentationSystemSummary: Story = {
  name: 'Documentation System Summary',
  render: () => (
    <DocViewer
      markdownPath="/docs/DOCUMENTATION-SYSTEM-SUMMARY.md"
      status="Active"
      lastUpdated="2026-01-15"
      fallback="Loading Documentation System Summary..."
    />
  )
};
