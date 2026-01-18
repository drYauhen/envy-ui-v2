import type { Meta, StoryObj } from '@storybook/react';
import alertBannerColors from '../../../../../tokens/app/components/alert-banner/colors.json';
// Attempt to load metadata (may not exist)
let alertBannerColorsMeta: any = null;
try {
  alertBannerColorsMeta = require('../../../../../tokens/app/components/alert-banner/colors.meta.json');
} catch {
  // Metadata not found - this is fine
}

import { TokenPage, TokenSection } from '../../../../viewers/tokens/TokenLayout';
import { TokenRefTable } from '../../../../viewers/tokens/TokenRefTable';
import { TokenSwatch } from '../../../../viewers/tokens/TokenSwatch';
import { collectRefs, flattenTokens, resolveAlias, type FlatToken, type TokenRef, getResolvedFromMetadata } from '../../../../viewers/tokens/token-utils';
import { getSectionParameters } from '../../../../../.storybook/preview';

type Story = StoryObj;

const flatTokenMap: Record<string, FlatToken> = {};
flattenTokens(alertBannerColors, [], flatTokenMap);

const resolveReference = (ref: string) => resolveAlias(ref, flatTokenMap);

// Load metadata (if file exists)
const metadata = alertBannerColorsMeta || null;

// Use the entire component object from the JSON file
const tokenRefs = collectRefs((alertBannerColors as any)?.eui?.['alert-banner'] ?? {}, ['eui', 'alert-banner']);

const meta: Meta = {
  title: 'Tokens/App/Components/Alert Banner/Colors',
  tags: ['autodocs'],
  parameters: {
    // Apply section-specific parameters automatically
    ...getSectionParameters('Tokens/App/Components/Alert Banner/Colors'),
    layout: 'fullscreen'
  }
};

export default meta;

const renderPreview = (token: TokenRef) => {
  if (token.path.includes('color') || token.path.includes('background') || token.path.includes('border')) {
    // Get resolved value from metadata
    const tokenPath = token.path.split('.');
    const resolvedFromMeta = metadata ? getResolvedFromMetadata(metadata, tokenPath) : null;
    
    return (
      <TokenSwatch 
        reference={token.ref} 
        resolveReference={resolveReference}
        resolvedValue={resolvedFromMeta} // Pass resolved value from metadata
      />
    );
  }
  return null;
};

export const Colors: Story = {
  name: 'Colors',
  render: () => (
    <TokenPage>
      <TokenSection
        title="Alert Banner Colors"
        description="Token definitions for alert-banner colors."
      />
      <TokenRefTable
        title="Colors"
        refs={tokenRefs}
        emptyMessage="No tokens found."
        renderPreview={renderPreview}
        metadata={metadata}
        tokenLabel="Token path"
        referenceLabel="Reference"
        showType
      />
    </TokenPage>
  )
};
