import type { Meta, StoryObj } from '@storybook/react';
import title-barColors from '../../../../tokens/app/components/title-bar/colors.json';
import title-barSize from '../../../../tokens/app/components/title-bar/size.json';
import title-barSpacing from '../../../../tokens/app/components/title-bar/spacing.json';
import { TokenPage, TokenSection } from '../../viewers/tokens/TokenLayout';
import { TokenRefTable } from '../../viewers/tokens/TokenRefTable';
import { TokenSwatch } from '../../viewers/tokens/TokenSwatch';
import { collectRefs, flattenTokens, resolveAlias, type FlatToken, type TokenRef } from '../../viewers/tokens/token-utils';

type Story = StoryObj;

const flatTokenMap: Record<string, FlatToken> = {};
flattenTokens(title-barColors, [], flatTokenMap);
flattenTokens(title-barSize, [], flatTokenMap);
flattenTokens(title-barSpacing, [], flatTokenMap);

const resolveReference = (ref: string) => resolveAlias(ref, flatTokenMap);

const allRefs: TokenRef[] = [
  ...collectRefs((title-barColors as any)?.eui?.title.bar ?? {}, ['eui', 'title.bar']),
  ...collectRefs((title-barSize as any)?.eui?.title.bar ?? {}, ['eui', 'title.bar']),
  ...collectRefs((title-barSpacing as any)?.eui?.title.bar ?? {}, ['eui', 'title.bar']),
];

const meta: Meta = {
  title: 'Tokens/App/Components/Title Bar',
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

export const TitleBar: Story = {
  name: 'Title Bar',
  render: () => (
    <TokenPage>
      <TokenSection
        title="Title Bar Component Tokens"
        description="Token definitions for title-bar component."
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
