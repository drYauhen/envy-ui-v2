import type { Meta, StoryObj } from '@storybook/react';
import titleBarColors from '../../../../tokens/app/components/title-bar/colors.json';
import titleBarSize from '../../../../tokens/app/components/title-bar/size.json';
import titleBarSpacing from '../../../../tokens/app/components/title-bar/spacing.json';
import { TokenPage, TokenSection } from '../../viewers/tokens/TokenLayout';
import { TokenRefTable } from '../../viewers/tokens/TokenRefTable';
import { TokenSwatch } from '../../viewers/tokens/TokenSwatch';
import { collectRefs, flattenTokens, resolveAlias, type FlatToken, type TokenRef } from '../../viewers/tokens/token-utils';

type Story = StoryObj;

const flatTokenMap: Record<string, FlatToken> = {};
flattenTokens(titleBarColors, [], flatTokenMap);
flattenTokens(titleBarSize, [], flatTokenMap);
flattenTokens(titleBarSpacing, [], flatTokenMap);

const resolveReference = (ref: string) => resolveAlias(ref, flatTokenMap);

const allRefs: TokenRef[] = [
  ...collectRefs((titleBarColors as any)?.eui?.title.bar ?? {}, ['eui', 'title.bar']),
  ...collectRefs((titleBarSize as any)?.eui?.title.bar ?? {}, ['eui', 'title.bar']),
  ...collectRefs((titleBarSpacing as any)?.eui?.title.bar ?? {}, ['eui', 'title.bar']),
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
