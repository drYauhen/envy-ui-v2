import type { Meta, StoryObj } from '@storybook/react';
import inputBorder from '../../../../tokens/app/components/input/border.json';
import inputColors from '../../../../tokens/app/components/input/colors.json';
import inputFocus from '../../../../tokens/app/components/input/focus.json';
import inputGroup from '../../../../tokens/app/components/input/group.json';
import inputShape from '../../../../tokens/app/components/input/shape.json';
import inputSize from '../../../../tokens/app/components/input/size.json';
import inputTypography from '../../../../tokens/app/components/input/typography.json';
import { TokenPage, TokenSection } from '../../viewers/tokens/TokenLayout';
import { TokenRefTable } from '../../viewers/tokens/TokenRefTable';
import { TokenSwatch } from '../../viewers/tokens/TokenSwatch';
import { collectRefs, flattenTokens, resolveAlias, type FlatToken, type TokenRef } from '../../viewers/tokens/token-utils';

type Story = StoryObj;

const flatTokenMap: Record<string, FlatToken> = {};
flattenTokens(inputBorder, [], flatTokenMap);
flattenTokens(inputColors, [], flatTokenMap);
flattenTokens(inputFocus, [], flatTokenMap);
flattenTokens(inputGroup, [], flatTokenMap);
flattenTokens(inputShape, [], flatTokenMap);
flattenTokens(inputSize, [], flatTokenMap);
flattenTokens(inputTypography, [], flatTokenMap);

const resolveReference = (ref: string) => resolveAlias(ref, flatTokenMap);

const allRefs: TokenRef[] = [
  ...collectRefs((inputBorder as any)?.eui?.input ?? {}, ['eui', 'input']),
  ...collectRefs((inputColors as any)?.eui?.input ?? {}, ['eui', 'input']),
  ...collectRefs((inputFocus as any)?.eui?.input ?? {}, ['eui', 'input']),
  ...collectRefs((inputGroup as any)?.eui?.input ?? {}, ['eui', 'input']),
  ...collectRefs((inputShape as any)?.eui?.input ?? {}, ['eui', 'input']),
  ...collectRefs((inputSize as any)?.eui?.input ?? {}, ['eui', 'input']),
  ...collectRefs((inputTypography as any)?.eui?.input ?? {}, ['eui', 'input']),
];

const meta: Meta = {
  title: 'Tokens/App/Components/Input',
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

export const Input: Story = {
  name: 'Input',
  render: () => (
    <TokenPage>
      <TokenSection
        title="Input Component Tokens"
        description="Token definitions for input component."
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
