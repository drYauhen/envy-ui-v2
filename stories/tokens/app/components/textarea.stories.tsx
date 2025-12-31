import type { Meta, StoryObj } from '@storybook/react';
import textareaSize from '../../../../tokens/app/components/textarea/size.json';
import textareaTypography from '../../../../tokens/app/components/textarea/typography.json';
import { TokenPage, TokenSection } from '../../viewers/tokens/TokenLayout';
import { TokenRefTable } from '../../viewers/tokens/TokenRefTable';
import { TokenSwatch } from '../../viewers/tokens/TokenSwatch';
import { collectRefs, flattenTokens, resolveAlias, type FlatToken, type TokenRef } from '../../viewers/tokens/token-utils';

type Story = StoryObj;

const flatTokenMap: Record<string, FlatToken> = {};
flattenTokens(textareaSize, [], flatTokenMap);
flattenTokens(textareaTypography, [], flatTokenMap);

const resolveReference = (ref: string) => resolveAlias(ref, flatTokenMap);

const allRefs: TokenRef[] = [
  ...collectRefs((textareaSize as any)?.eui?.textarea ?? {}, ['eui', 'textarea']),
  ...collectRefs((textareaTypography as any)?.eui?.textarea ?? {}, ['eui', 'textarea']),
];

const meta: Meta = {
  title: 'Tokens/App/Components/Textarea',
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

export const Textarea: Story = {
  name: 'Textarea',
  render: () => (
    <TokenPage>
      <TokenSection
        title="Textarea Component Tokens"
        description="Token definitions for textarea component."
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
