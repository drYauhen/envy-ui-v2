import type { Meta, StoryObj } from '@storybook/react';
import alertBannerBorder from '../../../../tokens/app/components/alert-banner/border.json';
import alertBannerColors from '../../../../tokens/app/components/alert-banner/colors.json';
import alertBannerSpacing from '../../../../tokens/app/components/alert-banner/spacing.json';
import alertBannerZIndex from '../../../../tokens/app/components/alert-banner/z-index.json';
import { TokenPage, TokenSection } from '../../viewers/tokens/TokenLayout';
import { TokenRefTable } from '../../viewers/tokens/TokenRefTable';
import { TokenSwatch } from '../../viewers/tokens/TokenSwatch';
import { collectRefs, flattenTokens, resolveAlias, type FlatToken, type TokenRef } from '../../viewers/tokens/token-utils';

type Story = StoryObj;

const flatTokenMap: Record<string, FlatToken> = {};
flattenTokens(alertBannerBorder, [], flatTokenMap);
flattenTokens(alertBannerColors, [], flatTokenMap);
flattenTokens(alertBannerSpacing, [], flatTokenMap);
flattenTokens(alertBannerZIndex, [], flatTokenMap);

const resolveReference = (ref: string) => resolveAlias(ref, flatTokenMap);

const allRefs: TokenRef[] = [
  ...collectRefs((alertBannerBorder as any)?.eui?.alert.banner ?? {}, ['eui', 'alert.banner']),
  ...collectRefs((alertBannerColors as any)?.eui?.alert.banner ?? {}, ['eui', 'alert.banner']),
  ...collectRefs((alertBannerSpacing as any)?.eui?.alert.banner ?? {}, ['eui', 'alert.banner']),
  ...collectRefs((alertBannerZIndex as any)?.eui?.alert.banner ?? {}, ['eui', 'alert.banner']),
];

const meta: Meta = {
  title: 'Tokens/App/Components/Alert Banner',
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

export const AlertBanner: Story = {
  name: 'Alert Banner',
  render: () => (
    <TokenPage>
      <TokenSection
        title="Alert Banner Component Tokens"
        description="Token definitions for alert-banner component."
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
