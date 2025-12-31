import type { Meta, StoryObj } from '@storybook/react';
import dividerColors from '../../../../tokens/app/components/divider/colors.json';
import dividerSize from '../../../../tokens/app/components/divider/size.json';
import dividerSpacing from '../../../../tokens/app/components/divider/spacing.json';
import { TokenPage, TokenSection } from '../../viewers/tokens/TokenLayout';
import { TokenRefTable } from '../../viewers/tokens/TokenRefTable';
import { TokenSwatch } from '../../viewers/tokens/TokenSwatch';
import { collectRefs, flattenTokens, resolveAlias, type FlatToken, type TokenRef } from '../../viewers/tokens/token-utils';

type Story = StoryObj;

const flatTokenMap: Record<string, FlatToken> = {};
flattenTokens(dividerColors, [], flatTokenMap);
flattenTokens(dividerSize, [], flatTokenMap);
flattenTokens(dividerSpacing, [], flatTokenMap);

const resolveReference = (ref: string) => resolveAlias(ref, flatTokenMap);

const allRefs: TokenRef[] = [
  ...collectRefs((dividerColors as any)?.eui?.divider ?? {}, ['eui', 'divider']),
  ...collectRefs((dividerSize as any)?.eui?.divider ?? {}, ['eui', 'divider']),
  ...collectRefs((dividerSpacing as any)?.eui?.divider ?? {}, ['eui', 'divider']),
];

const meta: Meta = {
  title: 'Tokens/App/Components/Divider',
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

export const Divider: Story = {
  name: 'Divider',
  render: () => (
    <TokenPage>
      <TokenSection
        title="Divider Component Tokens"
        description="Token definitions for divider component."
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
