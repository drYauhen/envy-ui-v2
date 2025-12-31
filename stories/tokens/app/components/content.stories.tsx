import type { Meta, StoryObj } from '@storybook/react';
import contentColors from '../../../../tokens/app/components/content/colors.json';
import contentSpacing from '../../../../tokens/app/components/content/spacing.json';
import { TokenPage, TokenSection } from '../../../viewers/tokens/TokenLayout';
import { TokenRefTable } from '../../../viewers/tokens/TokenRefTable';
import { TokenSwatch } from '../../../viewers/tokens/TokenSwatch';
import { collectRefs, flattenTokens, resolveAlias, type FlatToken, type TokenRef } from '../../../viewers/tokens/token-utils';

type Story = StoryObj;

const flatTokenMap: Record<string, FlatToken> = {};
flattenTokens(contentColors, [], flatTokenMap);
flattenTokens(contentSpacing, [], flatTokenMap);

const resolveReference = (ref: string) => resolveAlias(ref, flatTokenMap);

const allRefs: TokenRef[] = [
  ...collectRefs((contentColors as any)?.eui?.content ?? {}, ['eui', 'content']),
  ...collectRefs((contentSpacing as any)?.eui?.content ?? {}, ['eui', 'content']),
];

const meta: Meta = {
  title: 'Tokens/App/Components/Content',
  tags: ['autodocs'],
  parameters: {
    layout: 'fullscreen'
  }
};

export default meta;

const renderPreview = (token: TokenRef) => {
  if (token.path.includes('color') || token.path.includes('background') || token.path.includes('border')) {
    return <TokenSwatch reference={token.ref} resolveReference={resolveReference} />;
  }
  return null;
};

export const Content: Story = {
  name: 'Content',
  render: () => (
    <TokenPage>
      <TokenSection
        title="Content Component Tokens"
        description="Token definitions for content component."
      />
      <TokenRefTable
        title="All Tokens"
        refs={allRefs}
        emptyMessage="No tokens found."
        renderPreview={renderPreview}
        tokenLabel="Token path"
        referenceLabel="Reference"
        showType
      />
    </TokenPage>
  )
};
