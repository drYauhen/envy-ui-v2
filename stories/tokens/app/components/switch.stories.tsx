import type { Meta, StoryObj } from '@storybook/react';
import switchBorder from '../../../../tokens/app/components/switch/border.json';
import switchColors from '../../../../tokens/app/components/switch/colors.json';
import switchFocus from '../../../../tokens/app/components/switch/focus.json';
import switchShape from '../../../../tokens/app/components/switch/shape.json';
import switchSize from '../../../../tokens/app/components/switch/size.json';
import { TokenPage, TokenSection } from '../../../viewers/tokens/TokenLayout';
import { TokenRefTable } from '../../../viewers/tokens/TokenRefTable';
import { TokenSwatch } from '../../../viewers/tokens/TokenSwatch';
import { collectRefs, flattenTokens, resolveAlias, type FlatToken, type TokenRef } from '../../../viewers/tokens/token-utils';

type Story = StoryObj;

const flatTokenMap: Record<string, FlatToken> = {};
flattenTokens(switchBorder, [], flatTokenMap);
flattenTokens(switchColors, [], flatTokenMap);
flattenTokens(switchFocus, [], flatTokenMap);
flattenTokens(switchShape, [], flatTokenMap);
flattenTokens(switchSize, [], flatTokenMap);

const resolveReference = (ref: string) => resolveAlias(ref, flatTokenMap);

const allRefs: TokenRef[] = [
  ...collectRefs((switchBorder as any)?.eui?.switch ?? {}, ['eui', 'switch']),
  ...collectRefs((switchColors as any)?.eui?.switch ?? {}, ['eui', 'switch']),
  ...collectRefs((switchFocus as any)?.eui?.switch ?? {}, ['eui', 'switch']),
  ...collectRefs((switchShape as any)?.eui?.switch ?? {}, ['eui', 'switch']),
  ...collectRefs((switchSize as any)?.eui?.switch ?? {}, ['eui', 'switch']),
];

const meta: Meta = {
  title: 'Tokens/App/Components/Switch',
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

export const Switch: Story = {
  name: 'Switch',
  render: () => (
    <TokenPage>
      <TokenSection
        title="Switch Component Tokens"
        description="Token definitions for switch component."
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
