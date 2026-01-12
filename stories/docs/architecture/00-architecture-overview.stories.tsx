import type { Meta, StoryObj } from '@storybook/react';
import { DocViewer } from '../../viewers/docs/DocViewer';
import { DocSectionListViewer } from '../../viewers/docs/DocSectionListViewer';
import { docsRegistry } from '../../viewers/docs/docs-registry';
import { getSectionParameters } from '../../../.storybook/preview';

type Story = StoryObj;

const meta: Meta = {
  title: 'Docs/Architecture',
  parameters: {
    // Apply section-specific parameters automatically
    ...getSectionParameters('Docs/Architecture'), 
    layout: 'fullscreen',
    controls: { hidden: true },
    actions: { hidden: true },
    interactions: { hidden: true },
    a11y: { hidden: true }
  }
};

export default meta;

const architectureDocs = docsRegistry.filter(doc => doc.path.startsWith('architecture/'));

export const Overview: Story = {
  name: 'Architecture Overview',
  render: () => (
    <DocSectionListViewer
      title="Architecture Documentation"
      description={
        <>
          <p>Current architectural rules, standards, and references for Envy UI.</p>
          <p>Use this list to navigate all architecture documents in Storybook.</p>
        </>
      }
      docs={architectureDocs}
    />
  )
};

export const ArchitectureOverview: Story = {
  name: 'Architecture Documentation',
  render: () => (
    <DocViewer
      markdownPath="/docs/architecture/README.md"
      fallback="Loading architecture documentation..."
    />
  )
};
