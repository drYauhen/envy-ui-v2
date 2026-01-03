import type { Meta, StoryObj } from '@storybook/react';
import selectPrimitive from '../../../../../tokens/app/components/select/primitive.json';
import { TokenPage, TokenSection } from '../../../../viewers/tokens/TokenLayout';
import { TokenRefTable } from '../../../../viewers/tokens/TokenRefTable';
import { TokenSwatch } from '../../../../viewers/tokens/TokenSwatch';
import { collectRefs, flattenTokens, resolveAlias, type FlatToken, type TokenRef } from '../../../../viewers/tokens/token-utils';
import { getSectionParameters } from '../../../../../.storybook/preview';

type Story = StoryObj;

const flatTokenMap: Record<string, FlatToken> = {};
flattenTokens(selectPrimitive, [], flatTokenMap);

const resolveReference = (ref: string) => resolveAlias(ref, flatTokenMap);

// Используем весь объект компонента из JSON файла
const tokenRefs = collectRefs((selectPrimitive as any)?.eui?.['select'] ?? {}, ['eui', 'select']);

const meta: Meta = {
  title: 'Tokens/App/Components/Select/Primitive',
  tags: ['autodocs'],
  parameters: {
    // Apply section-specific parameters automatically
    ...getSectionParameters('Tokens/App/Components/Select/Primitive'),
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

export const Primitive: Story = {
  name: 'Primitive',
  render: () => (
    <TokenPage>
      <TokenSection
        title="Select Primitive"
        description="Token definitions for select primitive."
      />
      <TokenRefTable
        title="Primitive"
        refs={tokenRefs}
        emptyMessage="No tokens found."
        renderPreview={renderPreview}
        tokenLabel="Token path"
        referenceLabel="Reference"
        showType
      />
    </TokenPage>
  )
};
