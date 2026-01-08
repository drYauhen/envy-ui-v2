import type { Meta, StoryObj } from '@storybook/react';
import spacingTokens from '../../../../tokens/contexts/app/semantics/spacing.json';
import spacingMetadata from '../../../../tokens/contexts/app/semantics/spacing.meta.json';
import foundationDimensions from '../../../../tokens/contexts/app/semantics/dimension.json';
import { TokenPage, TokenSection } from '../../../viewers/tokens/TokenLayout';
import { TokenRefTable } from '../../../viewers/tokens/TokenRefTable';
import { DimensionPreview } from '../../../viewers/tokens/previews';
import { collectRefs, flattenTokens, resolveAlias, type FlatToken, type TokenRef } from '../../../viewers/tokens/token-utils';
import { getSectionParameters } from '../../../../.storybook/preview';

type Story = StoryObj;

const flatTokenMap: Record<string, FlatToken> = {};
flattenTokens(foundationDimensions, [], flatTokenMap);
flattenTokens(spacingTokens, [], flatTokenMap);

const resolveReference = (ref: string) => resolveAlias(ref, flatTokenMap);

const spacingRefs = collectRefs((spacingTokens as any)?.eui?.spacing ?? {}, ['eui', 'spacing']);

const meta: Meta = {
  title: 'Tokens/App/Semantic/Spacing',
  tags: ['autodocs'],
  parameters: {
    // Apply section-specific parameters automatically
    ...getSectionParameters('Tokens/App/Semantic/Spacing'),
    layout: 'fullscreen'
  }
};

export default meta;

const renderPreview = (token: TokenRef) => {
  const resolvedValue = resolveReference(token.ref);

  return (
    <DimensionPreview
      token={token}
      resolvedValue={resolvedValue}
      resolveReference={resolveReference}
    />
  );
};

export const Spacing: Story = {
  name: 'Spacing',
  render: () => (
    <TokenPage>
      <TokenSection
        title="Semantic Spacing Tokens"
        description="Named spacing tokens (xs, sm, md, etc.) that reference foundation dimension tokens. These provide human-readable spacing values for consistent component spacing."
      />
      <TokenRefTable
        title="Spacing Scale"
        refs={spacingRefs}
        emptyMessage="No spacing tokens found."
        renderPreview={renderPreview}
        metadata={spacingMetadata}
        tokenLabel="Token"
        referenceLabel="Reference"
        resolvedLabel="Resolved Value"
        showResolved
        showType
      />
    </TokenPage>
  )
};
