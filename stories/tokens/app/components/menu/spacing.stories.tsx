import type { Meta, StoryObj } from '@storybook/react';
import menuSpacing from '../../../../../tokens/app/components/menu/spacing.json';
import { TokenPage, TokenSection } from '../../../../viewers/tokens/TokenLayout';
import { TokenRefTable } from '../../../../viewers/tokens/TokenRefTable';
import { TokenSwatch } from '../../../../viewers/tokens/TokenSwatch';
import { collectRefs, flattenTokens, resolveAlias, type FlatToken, type TokenRef } from '../../../../viewers/tokens/token-utils';
import { getSectionParameters } from '../../../../../.storybook/preview';

type Story = StoryObj;

const flatTokenMap: Record<string, FlatToken> = {};
flattenTokens(menuSpacing, [], flatTokenMap);

const resolveReference = (ref: string) => resolveAlias(ref, flatTokenMap);

// Используем весь объект компонента из JSON файла
const tokenRefs = collectRefs((menuSpacing as any)?.eui?.['menu'] ?? {}, ['eui', 'menu']);

const meta: Meta = {
  title: 'Tokens/App/Components/Menu/Spacing',
  tags: ['autodocs'],
  parameters: {
    // Apply section-specific parameters automatically
    ...getSectionParameters('Tokens/App/Components/Menu/Spacing'),
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

export const Spacing: Story = {
  name: 'Spacing',
  render: () => (
    <TokenPage>
      <TokenSection
        title="Menu Spacing"
        description="Token definitions for menu spacing."
      />
      <TokenRefTable
        title="Spacing"
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
