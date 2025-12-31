import type { Meta, StoryObj } from '@storybook/react';
import cardTokens from '../../../../tokens/app/components/card/variant.json';
import semanticColors from '../../../../tokens/app/semantic/colors/background.json';
import semanticBorder from '../../../../tokens/app/semantic/colors/border.json';
import semanticShadow from '../../../../tokens/app/semantic/shadow.json';
import semanticShape from '../../../../tokens/app/semantic/shape.json';
import { TokenPage, TokenSection } from '../../../viewers/tokens/TokenLayout';
import { TokenRefTable } from '../../../viewers/tokens/TokenRefTable';
import { TokenSwatch } from '../../../viewers/tokens/TokenSwatch';
import { collectRefs, flattenTokens, resolveAlias, type FlatToken, type TokenRef } from '../../../viewers/tokens/token-utils';

type Story = StoryObj;

const flatTokenMap: Record<string, FlatToken> = {};
flattenTokens(semanticColors, [], flatTokenMap);
flattenTokens(semanticBorder, [], flatTokenMap);
flattenTokens(semanticShadow, [], flatTokenMap);
flattenTokens(semanticShape, [], flatTokenMap);
flattenTokens(cardTokens, [], flatTokenMap);

const resolveReference = (ref: string) => resolveAlias(ref, flatTokenMap);

const allRefs = collectRefs((cardTokens as any)?.eui?.card ?? {}, ['eui', 'card']);

const byCategory = (category: string) => allRefs.filter((token) => token.path.includes(category));

const shadowRefs = byCategory('shadow');
const borderRefs = byCategory('border');
const backgroundRefs = byCategory('background');
const radiusRefs = byCategory('radius');

const meta: Meta = {
  title: 'Tokens/App/Components/Card',
  tags: ['autodocs'],
  parameters: {
    layout: 'fullscreen'
  }
};

export default meta;

const renderPreview = (token: TokenRef) => {
  if (token.path.includes('shadow') || token.path.includes('background') || token.path.includes('border')) {
    return <TokenSwatch reference={token.ref} resolveReference={resolveReference} />;
  }
  return null;
};

export const Card: Story = {
  name: 'Card',
  render: () => (
    <TokenPage>
      <TokenSection
        title="Card Component Tokens"
        description="Token definitions for Card component variants (elevated, flat, strong)."
      />

      <TokenRefTable
        title="Shadow"
        refs={shadowRefs}
        emptyMessage="No shadow tokens found."
        renderPreview={renderPreview}
        tokenLabel="Token path"
        referenceLabel="Reference"
        showType
      />

      <TokenRefTable
        title="Background"
        refs={backgroundRefs}
        emptyMessage="No background tokens found."
        renderPreview={renderPreview}
        tokenLabel="Token path"
        referenceLabel="Reference"
        showType
      />

      <TokenRefTable
        title="Border"
        refs={borderRefs}
        emptyMessage="No border tokens found."
        renderPreview={renderPreview}
        tokenLabel="Token path"
        referenceLabel="Reference"
        showType
      />

      <TokenRefTable
        title="Radius"
        refs={radiusRefs}
        emptyMessage="No radius tokens found."
        renderPreview={renderPreview}
        tokenLabel="Token path"
        referenceLabel="Reference"
        showType
      />
    </TokenPage>
  )
};

