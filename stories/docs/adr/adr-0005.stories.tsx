import type { Meta, StoryObj } from '@storybook/react';
import { AdrViewer } from '../../viewers/docs/AdrViewer';

type Story = StoryObj;

const meta: Meta = {
  title: 'Docs/ADR',
  parameters: { layout: 'fullscreen' }
};

export default meta;

export const CanonicalUINamespaceandReferenceComponentBaseline: Story = {
  name: 'ADR-0005 Canonical UI Namespace and Reference Component Baseline',
  render: () => (
    <AdrViewer
      adrNumber="0005"
      title="Canonical UI Namespace and Reference Component Baseline"
      status="Accepted"
      date="2025-12-15"
    />
  )
};
