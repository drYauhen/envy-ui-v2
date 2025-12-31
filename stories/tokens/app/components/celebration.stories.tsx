import type { Meta, StoryObj } from '@storybook/react';
import celebrationAnimation from '../../../../tokens/app/components/celebration/animation.json';
import celebrationColors from '../../../../tokens/app/components/celebration/colors.json';
import { TokenPage, TokenSection } from '../../viewers/tokens/TokenLayout';
import { TokenRefTable } from '../../viewers/tokens/TokenRefTable';
import { TokenSwatch } from '../../viewers/tokens/TokenSwatch';
import { collectRefs, flattenTokens, resolveAlias, type FlatToken, type TokenRef } from '../../viewers/tokens/token-utils';

type Story = StoryObj;

const flatTokenMap: Record<string, FlatToken> = {};
flattenTokens(celebrationAnimation, [], flatTokenMap);
flattenTokens(celebrationColors, [], flatTokenMap);

const resolveReference = (ref: string) => resolveAlias(ref, flatTokenMap);

const allRefs: TokenRef[] = [
  ...collectRefs((celebrationAnimation as any)?.eui?.celebration ?? {}, ['eui', 'celebration']),
  ...collectRefs((celebrationColors as any)?.eui?.celebration ?? {}, ['eui', 'celebration']),
];

const meta: Meta = {
  title: 'Tokens/App/Components/Celebration',
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

export const Celebration: Story = {
  name: 'Celebration',
  render: () => (
    <TokenPage>
      <TokenSection
        title="Celebration Component Tokens"
        description="Token definitions for celebration component."
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
