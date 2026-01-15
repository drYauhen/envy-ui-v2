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

export const contextOrientedResetFoundationContract: Story = {
  name: 'ADR-0039 Context Oriented Reset Foundation Contract',
  render: () => (
    <DocViewer
      markdownPath="/docs/adr/ADR-0039-context-oriented-reset-foundation-contract.md"
      title="Context Oriented Reset Foundation Contract"
      status="Accepted"
      date="2026-01-13"
      owner="Eugene Goncharov"
      assistance="AI-assisted drafting (human-reviewed)"
      fallback="Loading ADR-0039 Context Oriented Reset Foundation Contract..."
    />
  )
};
