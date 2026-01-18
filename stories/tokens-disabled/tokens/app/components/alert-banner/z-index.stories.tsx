import type { Meta, StoryObj } from '@storybook/react';
import alertBannerZIndex from '../../../../../tokens/app/components/alert-banner/z-index.json';
import { TokenPage, TokenSection } from '../../../../viewers/tokens/TokenLayout';
import { TokenRefTable } from '../../../../viewers/tokens/TokenRefTable';
import { TokenSwatch } from '../../../../viewers/tokens/TokenSwatch';
import { collectRefs, flattenTokens, resolveAlias, type FlatToken, type TokenRef } from '../../../../viewers/tokens/token-utils';
import { getSectionParameters } from '../../../../../.storybook/preview';

type Story = StoryObj;

const flatTokenMap: Record<string, FlatToken> = {};
flattenTokens(alertBannerZIndex, [], flatTokenMap);

const resolveReference = (ref: string) => resolveAlias(ref, flatTokenMap);

// Use the entire component object from the JSON file
const tokenRefs = collectRefs((alertBannerZIndex as any)?.eui?.['alert-banner'] ?? {}, ['eui', 'alert-banner']);

const meta: Meta = {
  title: 'Tokens/App/Components/Alert Banner/Z Index',
  tags: ['autodocs'],
  parameters: {
    // Apply section-specific parameters automatically
    ...getSectionParameters('Tokens/App/Components/Alert Banner/Z Index'),
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

export const ZIndex: Story = {
  name: 'Z Index',
  render: () => (
    <TokenPage>
      <TokenSection
        title="Alert Banner Z Index"
        description="Token definitions for alert-banner z-index."
      />
      <TokenRefTable
        title="Z Index"
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
