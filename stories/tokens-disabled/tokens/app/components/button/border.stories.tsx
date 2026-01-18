import type { Meta, StoryObj } from '@storybook/react';
import { useEffect, useState } from 'react';
import buttonBorder from '../../../../../tokens/app/components/button/border.json';
import { TokenPage, TokenSection } from '../../../../viewers/tokens/TokenLayout';
import { TokenRefTable } from '../../../../viewers/tokens/TokenRefTable';
import { collectRefs, flattenTokens, resolveAlias, type FlatToken, type TokenRef } from '../../../../viewers/tokens/token-utils';
import { getSectionParameters } from '../../../../../.storybook/preview';

type Story = StoryObj;

const flatTokenMap: Record<string, FlatToken> = {};
flattenTokens(buttonBorder, [], flatTokenMap);

const resolveReference = (ref: string) => resolveAlias(ref, flatTokenMap);

// Use the entire component object from the JSON file
const tokenRefs = collectRefs((buttonBorder as any)?.eui?.['button'] ?? {}, ['eui', 'button']);

const meta: Meta = {
  title: 'Tokens/App/Components/Button/Border',
  tags: ['autodocs'],
  parameters: {
    // Apply section-specific parameters automatically
    ...getSectionParameters('Tokens/App/Components/Button/Border'),
    layout: 'fullscreen'
  }
};

export default meta;

export const Border: Story = {
  name: 'Border',
  render: () => {
    // Load metadata inside component via fetch
    const [metadata, setMetadata] = useState<any>(null);
    
    useEffect(() => {
      // Use fetch to load JSON from static files
      fetch('/tokens/app/components/button/border.meta.json')
        .then((response) => {
          if (!response.ok) {
            throw new Error(`HTTP ${response.status}`);
          }
          return response.json();
        })
        .then((meta) => {
          setMetadata(meta);
          console.log('[border.stories] ✅ Metadata loaded:', {
            hasMetadata: !!meta,
            metadataKeys: meta ? Object.keys(meta) : []
          });
        })
        .catch((e: any) => {
          console.warn('[border.stories] ⚠️ Metadata not found:', e.message || e);
          setMetadata(null);
        });
    }, []);
    
    return (
      <TokenPage>
        <TokenSection
          title="Button Border"
          description="Token definitions for button border."
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
    );
  }
};
