import type { Meta, StoryObj } from '@storybook/react';
import headerColors from '../../../../tokens/app/components/header/colors.json';
import headerSize from '../../../../tokens/app/components/header/size.json';
import headerSpacing from '../../../../tokens/app/components/header/spacing.json';
import { TokenPage, TokenSection } from '../../viewers/tokens/TokenLayout';
import { TokenRefTable } from '../../viewers/tokens/TokenRefTable';
import { TokenSwatch } from '../../viewers/tokens/TokenSwatch';
import { collectRefs, flattenTokens, resolveAlias, type FlatToken, type TokenRef } from '../../viewers/tokens/token-utils';

type Story = StoryObj;

const flatTokenMap: Record<string, FlatToken> = {};
flattenTokens(headerColors, [], flatTokenMap);
flattenTokens(headerSize, [], flatTokenMap);
flattenTokens(headerSpacing, [], flatTokenMap);

const resolveReference = (ref: string) => resolveAlias(ref, flatTokenMap);

const allRefs: TokenRef[] = [
  ...collectRefs((headerColors as any)?.eui?.header ?? {}, ['eui', 'header']),
  ...collectRefs((headerSize as any)?.eui?.header ?? {}, ['eui', 'header']),
  ...collectRefs((headerSpacing as any)?.eui?.header ?? {}, ['eui', 'header']),
];

const meta: Meta = {
  title: 'Tokens/App/Components/Header',
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

export const Header: Story = {
  name: 'Header',
  render: () => (
    <TokenPage>
      <TokenSection
        title="Header Component Tokens"
        description="Token definitions for header component."
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
