import type { Meta, StoryObj } from '@storybook/react';
import checkboxBorder from '../../../../tokens/app/components/checkbox/border.json';
import checkboxColors from '../../../../tokens/app/components/checkbox/colors.json';
import checkboxFocus from '../../../../tokens/app/components/checkbox/focus.json';
import checkboxLayout from '../../../../tokens/app/components/checkbox/layout.json';
import checkboxShape from '../../../../tokens/app/components/checkbox/shape.json';
import checkboxSize from '../../../../tokens/app/components/checkbox/size.json';
import { TokenPage, TokenSection } from '../../viewers/tokens/TokenLayout';
import { TokenRefTable } from '../../viewers/tokens/TokenRefTable';
import { TokenSwatch } from '../../viewers/tokens/TokenSwatch';
import { collectRefs, flattenTokens, resolveAlias, type FlatToken, type TokenRef } from '../../viewers/tokens/token-utils';

type Story = StoryObj;

const flatTokenMap: Record<string, FlatToken> = {};
flattenTokens(checkboxBorder, [], flatTokenMap);
flattenTokens(checkboxColors, [], flatTokenMap);
flattenTokens(checkboxFocus, [], flatTokenMap);
flattenTokens(checkboxLayout, [], flatTokenMap);
flattenTokens(checkboxShape, [], flatTokenMap);
flattenTokens(checkboxSize, [], flatTokenMap);

const resolveReference = (ref: string) => resolveAlias(ref, flatTokenMap);

const allRefs: TokenRef[] = [
  ...collectRefs((checkboxBorder as any)?.eui?.checkbox ?? {}, ['eui', 'checkbox']),
  ...collectRefs((checkboxColors as any)?.eui?.checkbox ?? {}, ['eui', 'checkbox']),
  ...collectRefs((checkboxFocus as any)?.eui?.checkbox ?? {}, ['eui', 'checkbox']),
  ...collectRefs((checkboxLayout as any)?.eui?.checkbox ?? {}, ['eui', 'checkbox']),
  ...collectRefs((checkboxShape as any)?.eui?.checkbox ?? {}, ['eui', 'checkbox']),
  ...collectRefs((checkboxSize as any)?.eui?.checkbox ?? {}, ['eui', 'checkbox']),
];

const meta: Meta = {
  title: 'Tokens/App/Components/Checkbox',
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

export const Checkbox: Story = {
  name: 'Checkbox',
  render: () => (
    <TokenPage>
      <TokenSection
        title="Checkbox Component Tokens"
        description="Token definitions for checkbox component."
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
