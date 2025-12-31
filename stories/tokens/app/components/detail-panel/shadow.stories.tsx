import type { Meta, StoryObj } from '@storybook/react';
import detailPanelShadow from '../../../../../tokens/app/components/detail-panel/shadow.json';
import { TokenPage, TokenSection } from '../../../../viewers/tokens/TokenLayout';
import { TokenRefTable } from '../../../../viewers/tokens/TokenRefTable';
import { TokenSwatch } from '../../../../viewers/tokens/TokenSwatch';
import { collectRefs, flattenTokens, resolveAlias, type FlatToken, type TokenRef } from '../../../../viewers/tokens/token-utils';

type Story = StoryObj;

const flatTokenMap: Record<string, FlatToken> = {};
flattenTokens(detailPanelShadow, [], flatTokenMap);

const resolveReference = (ref: string) => resolveAlias(ref, flatTokenMap);

// Используем весь объект компонента из JSON файла
const tokenRefs = collectRefs((detailPanelShadow as any)?.eui?.['detail-panel'] ?? {}, ['eui', 'detail-panel']);

const meta: Meta = {
  title: 'Tokens/App/Components/Detail Panel/Shadow',
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

export const Shadow: Story = {
  name: 'Shadow',
  render: () => (
    <TokenPage>
      <TokenSection
        title="Detail Panel Shadow"
        description="Token definitions for detail-panel shadow."
      />
      <TokenRefTable
        title="Shadow"
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
