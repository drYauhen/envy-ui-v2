import type { Meta, StoryObj } from '@storybook/react';
import heroSectionColors from '../../../../../tokens/app/components/hero-section/colors.json';
import { TokenPage, TokenSection } from '../../../../viewers/tokens/TokenLayout';
import { TokenRefTable } from '../../../../viewers/tokens/TokenRefTable';
import { TokenSwatch } from '../../../../viewers/tokens/TokenSwatch';
import { collectRefs, flattenTokens, resolveAlias, type FlatToken, type TokenRef } from '../../../../viewers/tokens/token-utils';

type Story = StoryObj;

const flatTokenMap: Record<string, FlatToken> = {};
flattenTokens(heroSectionColors, [], flatTokenMap);

const resolveReference = (ref: string) => resolveAlias(ref, flatTokenMap);

// Используем весь объект компонента из JSON файла
const tokenRefs = collectRefs((heroSectionColors as any)?.eui?.['hero-section'] ?? {}, ['eui', 'hero-section']);

const meta: Meta = {
  title: 'Tokens/App/Components/Hero Section/Colors',
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

export const Colors: Story = {
  name: 'Colors',
  render: () => (
    <TokenPage>
      <TokenSection
        title="Hero Section Colors"
        description="Token definitions for hero-section colors."
      />
      <TokenRefTable
        title="Colors"
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
