import type { Meta, StoryObj } from '@storybook/react';
import { DocViewer } from '../../viewers/docs/DocViewer';
import { DocSectionListViewer } from '../../viewers/docs/DocSectionListViewer';
import { docsRegistry } from '../../viewers/docs/docs-registry';
import { getSectionParameters } from '../../../.storybook/preview';

type Story = StoryObj;

const meta: Meta = {
  title: 'Docs/Workflows',
  parameters: {
    ...getSectionParameters('Docs/Workflows'),
    layout: 'fullscreen',
    controls: { hidden: true },
    actions: { hidden: true },
    interactions: { hidden: true },
    a11y: { hidden: true }
  }
};

export default meta;

const workflowDocs = docsRegistry.filter(doc => doc.path.startsWith('workflows/'));

export const Overview: Story = {
  name: 'Workflows Overview',
  render: () => (
    <DocSectionListViewer
      title="Workflow Documentation"
      description={
        <>
          <p>Guides for working with core systems and Storybook in Envy UI v2.</p>
          <p>Use this list to navigate workflow documentation in Storybook.</p>
        </>
      }
      docs={workflowDocs}
    />
  )
};

export const WorkflowsDocumentation: Story = {
  name: 'Workflows Documentation',
  render: () => (
    <DocViewer
      markdownPath="/docs/workflows/README.md"
      fallback="Loading workflows documentation..."
    />
  )
};

export const AdrWorkflow: Story = {
  name: 'ADR Workflow',
  render: () => (
    <DocViewer
      markdownPath="/docs/workflows/adr-workflow.md"
      fallback="Loading ADR workflow..."
    />
  )
};

export const FigmaWorkflow: Story = {
  name: 'Figma Workflow',
  render: () => (
    <DocViewer
      markdownPath="/docs/workflows/figma-workflow.md"
      fallback="Loading Figma workflow..."
    />
  )
};

export const StorybookWorkflow: Story = {
  name: 'Storybook Workflow',
  render: () => (
    <DocViewer
      markdownPath="/docs/workflows/storybook-workflow.md"
      fallback="Loading Storybook workflow..."
    />
  )
};

export const ScriptsReference: Story = {
  name: 'Scripts Reference',
  render: () => (
    <DocViewer
      markdownPath="/docs/workflows/scripts-reference.md"
      fallback="Loading scripts reference..."
    />
  )
};

export const TokensWorkflow: Story = {
  name: 'Tokens Workflow',
  render: () => (
    <DocViewer
      markdownPath="/docs/workflows/tokens-workflow.md"
      fallback="Loading tokens workflow..."
    />
  )
};

export const LayerGenerationWorkflow: Story = {
  name: 'Layer Generation Workflow',
  render: () => (
    <DocViewer
      markdownPath="/docs/workflows/layer-generation-workflow.md"
      fallback="Loading layer generation workflow..."
    />
  )
};

export const DevAppWorkflow: Story = {
  name: 'Dev App Workflow',
  render: () => (
    <DocViewer
      markdownPath="/docs/workflows/dev-app-workflow.md"
      fallback="Loading dev app workflow..."
    />
  )
};

export const DocumentationGuide: Story = {
  name: 'Documentation Guide',
  render: () => (
    <DocViewer
      markdownPath="/docs/DOCS-GUIDE.md"
      fallback="Loading documentation guide..."
    />
  )
};
