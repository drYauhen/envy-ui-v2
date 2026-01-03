import type { Meta, StoryObj } from '@storybook/react';
import modalShape from '../../../../../tokens/app/components/modal/shape.json';
import { TokenPage, TokenSection } from '../../../../viewers/tokens/TokenLayout';
import { TokenRefTable } from '../../../../viewers/tokens/TokenRefTable';
import { TokenSwatch } from '../../../../viewers/tokens/TokenSwatch';
import { collectRefs, flattenTokens, resolveAlias, type FlatToken, type TokenRef } from '../../../../viewers/tokens/token-utils';
import { getSectionParameters } from '../../../../../.storybook/preview';

type Story = StoryObj;

const flatTokenMap: Record<string, FlatToken> = {};
flattenTokens(modalShape, [], flatTokenMap);

const resolveReference = (ref: string) => resolveAlias(ref, flatTokenMap);

// Используем весь объект компонента из JSON файла
const tokenRefs = collectRefs((modalShape as any)?.eui?.['modal'] ?? {}, ['eui', 'modal']);

const meta: Meta = {
  title: 'Tokens/App/Components/Modal/Shape',
  tags: ['autodocs'],
  parameters: {
    // Apply section-specific parameters automatically
    ...getSectionParameters('Tokens/App/Components/Modal/Shape'),
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

export const Shape: Story = {
  name: 'Shape',
  render: () => (
    <TokenPage>
      <TokenSection
        title="Modal Shape"
        description="Token definitions for modal shape."
      />
      <TokenRefTable
        title="Shape"
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
