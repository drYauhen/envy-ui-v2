import type { Meta, StoryObj } from '@storybook/react';
import { DocViewer } from '../../viewers/docs/DocViewer';
import { DocSectionListViewer } from '../../viewers/docs/DocSectionListViewer';
import { docsRegistry } from '../../viewers/docs/docs-registry';
import { getSectionParameters } from '../../../.storybook/preview';

type Story = StoryObj;

const meta: Meta = {
  title: 'Docs/Tokens',
  parameters: {
    // Apply section-specific parameters automatically
    ...getSectionParameters('Docs/Tokens'), 
    layout: 'fullscreen',
    controls: { hidden: true },
    actions: { hidden: true },
    interactions: { hidden: true },
    a11y: { hidden: true }
  }
};

export default meta;

const tokenDocs = docsRegistry.filter(doc => doc.path.startsWith('tokens/'));

export const Overview: Story = {
  name: 'Tokens Overview',
  render: () => (
    <DocSectionListViewer
      title="Tokens Documentation"
      description={
        <>
          <p>Reference documentation and tooling guides for the token system.</p>
          <p>Use this list to navigate token docs in Storybook.</p>
        </>
      }
      docs={tokenDocs}
    />
  )
};

export const TokenTooling: Story = {
  name: 'Token System Tooling',
  render: () => (
    <DocViewer
      markdownPath="/docs/tokens/README.md"
      fallback="Loading token tooling documentation..."
    />
  )
};

export const TokenUseCases: Story = {
  name: 'Token Utilities Use Cases',
  render: () => (
    <DocViewer
      markdownPath="/docs/tokens/use-cases.md"
      fallback="Loading token use cases..."
    />
  )
};

export const TokenReference: Story = {
  name: 'Token Reference',
  render: () => (
    <DocViewer
      markdownPath="/docs/tokens/reference.md"
      fallback="Loading token reference..."
    />
  )
};
