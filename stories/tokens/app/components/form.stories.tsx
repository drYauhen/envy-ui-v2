import type { Meta, StoryObj } from '@storybook/react';
import formSpacing from '../../../../tokens/app/components/form/spacing.json';
import { TokenPage, TokenSection } from '../../viewers/tokens/TokenLayout';
import { TokenRefTable } from '../../viewers/tokens/TokenRefTable';
import { TokenSwatch } from '../../viewers/tokens/TokenSwatch';
import { collectRefs, flattenTokens, resolveAlias, type FlatToken, type TokenRef } from '../../viewers/tokens/token-utils';

type Story = StoryObj;

const flatTokenMap: Record<string, FlatToken> = {};
flattenTokens(formSpacing, [], flatTokenMap);

const resolveReference = (ref: string) => resolveAlias(ref, flatTokenMap);

const allRefs: TokenRef[] = [
  ...collectRefs((formSpacing as any)?.eui?.form ?? {}, ['eui', 'form']),
];

const meta: Meta = {
  title: 'Tokens/App/Components/Form',
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

export const Form: Story = {
  name: 'Form',
  render: () => (
    <TokenPage>
      <TokenSection
        title="Form Component Tokens"
        description="Token definitions for form component."
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
