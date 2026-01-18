import type { Meta, StoryObj } from '@storybook/react';
import alertBannerBorder from '../../../../../tokens/app/components/alert-banner/border.json';
// Attempt to load metadata (may not exist)
let alertBannerBorderMeta: any = null;
try {
  alertBannerBorderMeta = require('../../../../../tokens/app/components/alert-banner/border.meta.json');
} catch {
  // Metadata not found - this is fine
}

import { TokenPage, TokenSection } from '../../../../viewers/tokens/TokenLayout';
import { TokenRefTable } from '../../../../viewers/tokens/TokenRefTable';
import { collectRefs, flattenTokens, resolveAlias, type FlatToken } from '../../../../viewers/tokens/token-utils';
import { getSectionParameters } from '../../../../../.storybook/preview';

type Story = StoryObj;

const flatTokenMap: Record<string, FlatToken> = {};
flattenTokens(alertBannerBorder, [], flatTokenMap);

const resolveReference = (ref: string) => resolveAlias(ref, flatTokenMap);

// Load metadata (if file exists)
const metadata = alertBannerBorderMeta || null;

// Use the entire component object from the JSON file
const tokenRefs = collectRefs((alertBannerBorder as any)?.eui?.['alert-banner'] ?? {}, ['eui', 'alert-banner']);

const meta: Meta = {
  title: 'Tokens/App/Components/Alert Banner/Border',
  tags: ['autodocs'],
  parameters: {
    // Apply section-specific parameters automatically
    ...getSectionParameters('Tokens/App/Components/Alert Banner/Border'),
    layout: 'fullscreen'
  }
};

export default meta;

export const Border: Story = {
  name: 'Border',
  render: () => (
    <TokenPage>
      <TokenSection
        title="Alert Banner Border"
        description="Token definitions for alert-banner border. Preview is automatically determined by token type."
      />
      <TokenRefTable
        title="Border"
        refs={tokenRefs}
        emptyMessage="No tokens found."
        autoPreview={true}
        resolveReference={resolveReference}
        metadata={metadata}
        tokenLabel="Token path"
        referenceLabel="Reference"
        showType
      />
    </TokenPage>
  )
};
