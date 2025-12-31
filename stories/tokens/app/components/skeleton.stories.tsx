import type { Meta, StoryObj } from '@storybook/react';
import skeletonAnimation from '../../../../tokens/app/components/skeleton/animation.json';
import skeletonColors from '../../../../tokens/app/components/skeleton/colors.json';
import skeletonShape from '../../../../tokens/app/components/skeleton/shape.json';
import skeletonSize from '../../../../tokens/app/components/skeleton/size.json';
import { TokenPage, TokenSection } from '../../viewers/tokens/TokenLayout';
import { TokenRefTable } from '../../viewers/tokens/TokenRefTable';
import { TokenSwatch } from '../../viewers/tokens/TokenSwatch';
import { collectRefs, flattenTokens, resolveAlias, type FlatToken, type TokenRef } from '../../viewers/tokens/token-utils';

type Story = StoryObj;

const flatTokenMap: Record<string, FlatToken> = {};
flattenTokens(skeletonAnimation, [], flatTokenMap);
flattenTokens(skeletonColors, [], flatTokenMap);
flattenTokens(skeletonShape, [], flatTokenMap);
flattenTokens(skeletonSize, [], flatTokenMap);

const resolveReference = (ref: string) => resolveAlias(ref, flatTokenMap);

const allRefs: TokenRef[] = [
  ...collectRefs((skeletonAnimation as any)?.eui?.skeleton ?? {}, ['eui', 'skeleton']),
  ...collectRefs((skeletonColors as any)?.eui?.skeleton ?? {}, ['eui', 'skeleton']),
  ...collectRefs((skeletonShape as any)?.eui?.skeleton ?? {}, ['eui', 'skeleton']),
  ...collectRefs((skeletonSize as any)?.eui?.skeleton ?? {}, ['eui', 'skeleton']),
];

const meta: Meta = {
  title: 'Tokens/App/Components/Skeleton',
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

export const Skeleton: Story = {
  name: 'Skeleton',
  render: () => (
    <TokenPage>
      <TokenSection
        title="Skeleton Component Tokens"
        description="Token definitions for skeleton component."
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
