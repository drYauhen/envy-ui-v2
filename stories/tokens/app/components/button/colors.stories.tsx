import type { Meta, StoryObj } from '@storybook/react';
import { useEffect, useState } from 'react';
import buttonColors from '../../../../../tokens/app/components/button/colors.json';

import { TokenPage, TokenSection } from '../../../../viewers/tokens/TokenLayout';
import { TokenRefTable } from '../../../../viewers/tokens/TokenRefTable';
import { collectRefs, flattenTokens, resolveAlias, type FlatToken, type TokenRef } from '../../../../viewers/tokens/token-utils';
import { getSectionParameters } from '../../../../../.storybook/preview';

type Story = StoryObj;

const flatTokenMap: Record<string, FlatToken> = {};
flattenTokens(buttonColors, [], flatTokenMap);

const resolveReference = (ref: string) => resolveAlias(ref, flatTokenMap);

// Use the entire component object from the JSON file
const tokenRefs = collectRefs((buttonColors as any)?.eui?.['button'] ?? {}, ['eui', 'button']);
console.log('[colors.stories] Token refs collected:', {
  count: tokenRefs.length,
  firstToken: tokenRefs[0] ? {
    path: tokenRefs[0].path,
    ref: tokenRefs[0].ref,
    type: tokenRefs[0].type
  } : null
});

const meta: Meta = {
  title: 'Tokens/App/Components/Button/Colors',
  tags: ['autodocs'],
  parameters: {
    // Apply section-specific parameters automatically
    ...getSectionParameters('Tokens/App/Components/Button/Colors'),
    layout: 'fullscreen'
  }
};

export default meta;

export const Colors: Story = {
  name: 'Colors',
  render: () => {
    // Load metadata inside component via fetch
    const [metadata, setMetadata] = useState<any>(null);
    
    useEffect(() => {
      // Use fetch to load JSON from static files
      fetch('/tokens/app/components/button/colors.meta.json')
        .then((response) => {
          if (!response.ok) {
            throw new Error(`HTTP ${response.status}`);
          }
          return response.json();
        })
        .then((meta) => {
          setMetadata(meta);
          console.log('[colors.stories] ✅ Metadata loaded:', {
            hasMetadata: !!meta,
            metadataKeys: meta ? Object.keys(meta) : [],
            samplePath: meta?.eui?.button?.primary?.background?.base?.$resolved
          });
        })
        .catch((e: any) => {
          console.warn('[colors.stories] ⚠️ Metadata not found:', e.message || e);
          setMetadata(null);
        });
    }, []);
    
    console.log('[colors.stories] Render with metadata:', {
      hasMetadata: !!metadata,
      metadataStructure: metadata ? Object.keys(metadata) : []
    });
    
    return (
      <TokenPage>
        <TokenSection
          title="Button Colors"
          description="Token definitions for button colors."
        />
        <TokenRefTable
          title="Colors"
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
    );
  }
};
