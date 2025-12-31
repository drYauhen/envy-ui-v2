import type { Meta, StoryObj } from '@storybook/react';
import counterColors from '../../../../tokens/app/components/counter/colors.json';
import counterShape from '../../../../tokens/app/components/counter/shape.json';
import counterSize from '../../../../tokens/app/components/counter/size.json';
import counterSpacing from '../../../../tokens/app/components/counter/spacing.json';
import counterTypography from '../../../../tokens/app/components/counter/typography.json';
import { TokenPage, TokenSection } from '../../../viewers/tokens/TokenLayout';
import { TokenRefTable } from '../../../viewers/tokens/TokenRefTable';
import { TokenSwatch } from '../../../viewers/tokens/TokenSwatch';
import { collectRefs, flattenTokens, resolveAlias, type FlatToken, type TokenRef } from '../../../viewers/tokens/token-utils';

type Story = StoryObj;

const flatTokenMap: Record<string, FlatToken> = {};
flattenTokens(counterColors, [], flatTokenMap);
flattenTokens(counterShape, [], flatTokenMap);
flattenTokens(counterSize, [], flatTokenMap);
flattenTokens(counterSpacing, [], flatTokenMap);
flattenTokens(counterTypography, [], flatTokenMap);

const resolveReference = (ref: string) => resolveAlias(ref, flatTokenMap);

const allRefs: TokenRef[] = [
  ...collectRefs((counterColors as any)?.eui?.counter ?? {}, ['eui', 'counter']),
  ...collectRefs((counterShape as any)?.eui?.counter ?? {}, ['eui', 'counter']),
  ...collectRefs((counterSize as any)?.eui?.counter ?? {}, ['eui', 'counter']),
  ...collectRefs((counterSpacing as any)?.eui?.counter ?? {}, ['eui', 'counter']),
  ...collectRefs((counterTypography as any)?.eui?.counter ?? {}, ['eui', 'counter']),
];

const meta: Meta = {
  title: 'Tokens/App/Components/Counter',
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

export const Counter: Story = {
  name: 'Counter',
  render: () => (
    <TokenPage>
      <TokenSection
        title="Counter Component Tokens"
        description="Token definitions for counter component."
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
