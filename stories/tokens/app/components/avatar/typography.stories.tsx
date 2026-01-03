import type { Meta, StoryObj } from '@storybook/react';
import avatarTypography from '../../../../../tokens/app/components/avatar/typography.json';
import { TokenPage, TokenSection } from '../../../../viewers/tokens/TokenLayout';
import { TokenRefTable } from '../../../../viewers/tokens/TokenRefTable';
import { TokenSwatch } from '../../../../viewers/tokens/TokenSwatch';
import { collectRefs, flattenTokens, resolveAlias, type FlatToken, type TokenRef } from '../../../../viewers/tokens/token-utils';
import { getSectionParameters } from '../../../../../.storybook/preview';

type Story = StoryObj;

const flatTokenMap: Record<string, FlatToken> = {};
flattenTokens(avatarTypography, [], flatTokenMap);

const resolveReference = (ref: string) => resolveAlias(ref, flatTokenMap);

// Используем весь объект компонента из JSON файла
const tokenRefs = collectRefs((avatarTypography as any)?.eui?.['avatar'] ?? {}, ['eui', 'avatar']);

const meta: Meta = {
  title: 'Tokens/App/Components/Avatar/Typography',
  tags: ['autodocs'],
  parameters: {
    // Apply section-specific parameters automatically
    ...getSectionParameters('Tokens/App/Components/Avatar/Typography'),
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

export const Typography: Story = {
  name: 'Typography',
  render: () => (
    <TokenPage>
      <TokenSection
        title="Avatar Typography"
        description="Token definitions for avatar typography."
      />
      <TokenRefTable
        title="Typography"
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
