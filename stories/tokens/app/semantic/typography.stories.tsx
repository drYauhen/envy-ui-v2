import type { Meta, StoryObj } from '@storybook/react';
import textStylesTokens from '../../../../tokens/app/semantic/typography/text-styles.json';
import { TokenPage, TokenSection } from '../../../viewers/tokens/TokenLayout';
import { TokenRefTable } from '../../../viewers/tokens/TokenRefTable';
import { collectRefs, flattenTokens, resolveAlias, type FlatToken, type TokenRef } from '../../../viewers/tokens/token-utils';

type Story = StoryObj;

const flatTokenMap: Record<string, FlatToken> = {};
flattenTokens(textStylesTokens, [], flatTokenMap);

const resolveReference = (ref: string) => resolveAlias(ref, flatTokenMap);

const textStyleRefs = collectRefs((textStylesTokens as any)?.eui?.typography?.textStyle ?? {}, ['eui', 'typography', 'textStyle']);

const meta: Meta = {
  title: 'Tokens/App/Semantic/Typography',
  tags: ['autodocs'],
  parameters: {
    layout: 'fullscreen'
  }
};

export default meta;

export const Typography: Story = {
  name: 'Typography',
  render: () => (
    <TokenPage>
      <TokenSection
        title="Semantic Typography Tokens"
        description="Semantic typography tokens for text styles (headings, body, etc.). These tokens are optimized for the app-default context/theme."
      />
      <TokenRefTable
        title="Text Styles"
        refs={textStyleRefs}
        emptyMessage="No text style tokens found."
        tokenLabel="Token path"
        referenceLabel="Reference"
        showType
      />
    </TokenPage>
  )
};

