import type { Meta, StoryObj } from '@storybook/react';
import avatarGroupLayout from '../../../../../tokens/app/components/avatar-group/layout.json';
import { TokenPage, TokenSection } from '../../../../viewers/tokens/TokenLayout';
import { TokenRefTable } from '../../../../viewers/tokens/TokenRefTable';
import { TokenSwatch } from '../../../../viewers/tokens/TokenSwatch';
import { collectRefs, flattenTokens, resolveAlias, type FlatToken, type TokenRef } from '../../../../viewers/tokens/token-utils';

type Story = StoryObj;

const flatTokenMap: Record<string, FlatToken> = {};
flattenTokens(avatarGroupLayout, [], flatTokenMap);

const resolveReference = (ref: string) => resolveAlias(ref, flatTokenMap);

// Используем весь объект компонента из JSON файла
const tokenRefs = collectRefs((avatarGroupLayout as any)?.eui?.['avatar-group'] ?? {}, ['eui', 'avatar-group']);

const meta: Meta = {
  title: 'Tokens/App/Components/Avatar Group/Layout',
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

export const Layout: Story = {
  name: 'Layout',
  render: () => (
    <TokenPage>
      <TokenSection
        title="Avatar Group Layout"
        description="Token definitions for avatar-group layout."
      />
      <TokenRefTable
        title="Layout"
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
