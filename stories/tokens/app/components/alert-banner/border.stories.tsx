import type { Meta, StoryObj } from '@storybook/react';
import alertBannerBorder from '../../../../../tokens/app/components/alert-banner/border.json';
import { TokenPage, TokenSection } from '../../../../viewers/tokens/TokenLayout';
import { TokenRefTable } from '../../../../viewers/tokens/TokenRefTable';
import { TokenSwatch } from '../../../../viewers/tokens/TokenSwatch';
import { collectRefs, flattenTokens, resolveAlias, type FlatToken, type TokenRef } from '../../../../viewers/tokens/token-utils';

type Story = StoryObj;

const flatTokenMap: Record<string, FlatToken> = {};
flattenTokens(alertBannerBorder, [], flatTokenMap);

const resolveReference = (ref: string) => resolveAlias(ref, flatTokenMap);

// Используем весь объект компонента из JSON файла
const tokenRefs = collectRefs((alertBannerBorder as any)?.eui?.['alert-banner'] ?? {}, ['eui', 'alert-banner']);

const meta: Meta = {
  title: 'Tokens/App/Components/Alert Banner/Border',
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

export const Border: Story = {
  name: 'Border',
  render: () => (
    <TokenPage>
      <TokenSection
        title="Alert Banner Border"
        description="Token definitions for alert-banner border."
      />
      <TokenRefTable
        title="Border"
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
