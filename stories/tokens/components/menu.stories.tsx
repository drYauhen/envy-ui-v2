import type { Meta, StoryObj } from '@storybook/react';
import menuColors from '../../../tokens/app/components/menu/colors.json';
import menuBorder from '../../../tokens/app/components/menu/border.json';
import menuShape from '../../../tokens/app/components/menu/shape.json';
import menuShadow from '../../../tokens/app/components/menu/shadow.json';
import menuSize from '../../../tokens/app/components/menu/size.json';
import menuSpacing from '../../../tokens/app/components/menu/spacing.json';
import semanticColors from '../../../tokens/app/semantic/colors/background.json';
import semanticShape from '../../../tokens/app/semantic/shape.json';
import semanticShadow from '../../../tokens/app/semantic/shadow.json';
import { TokenPage, TokenSection } from '../../viewers/tokens/TokenLayout';
import { TokenRefTable } from '../../viewers/tokens/TokenRefTable';
import { TokenSwatch } from '../../viewers/tokens/TokenSwatch';
import { collectRefs, flattenTokens, resolveAlias, type FlatToken, type TokenRef } from '../../viewers/tokens/token-utils';

type Story = StoryObj;

const flatTokenMap: Record<string, FlatToken> = {};
flattenTokens(semanticColors, [], flatTokenMap);
flattenTokens(semanticShape, [], flatTokenMap);
flattenTokens(semanticShadow, [], flatTokenMap);
flattenTokens(menuColors, [], flatTokenMap);
flattenTokens(menuBorder, [], flatTokenMap);
flattenTokens(menuShape, [], flatTokenMap);
flattenTokens(menuShadow, [], flatTokenMap);
flattenTokens(menuSize, [], flatTokenMap);
flattenTokens(menuSpacing, [], flatTokenMap);

const resolveReference = (ref: string) => resolveAlias(ref, flatTokenMap);

const allRefs: TokenRef[] = [
  ...collectRefs((menuColors as any)?.eui?.menu ?? {}, ['eui', 'menu']),
  ...collectRefs((menuBorder as any)?.eui?.menu ?? {}, ['eui', 'menu']),
  ...collectRefs((menuShape as any)?.eui?.menu ?? {}, ['eui', 'menu']),
  ...collectRefs((menuShadow as any)?.eui?.menu ?? {}, ['eui', 'menu']),
  ...collectRefs((menuSize as any)?.eui?.menu ?? {}, ['eui', 'menu']),
  ...collectRefs((menuSpacing as any)?.eui?.menu ?? {}, ['eui', 'menu'])
];

const byCategory = (category: string) => allRefs.filter((token) => token.path.includes(category));

const colorRefs = byCategory('colors');
const borderRefs = byCategory('border');
const shapeRefs = byCategory('shape');
const shadowRefs = byCategory('shadow');
const sizeRefs = byCategory('size');
const spacingRefs = byCategory('spacing');

const meta: Meta = {
  title: 'Tokens/Components/Menu',
  tags: ['autodocs'],
  parameters: {
    layout: 'fullscreen'
  }
};

export default meta;

const renderPreview = (token: TokenRef) => {
  if (token.path.includes('colors') || token.path.includes('border') || token.path.includes('shadow')) {
    return <TokenSwatch reference={token.ref} resolveReference={resolveReference} />;
  }
  return null;
};

export const Menu: Story = {
  name: 'Menu',
  render: () => (
    <TokenPage>
      <TokenSection
        title="Menu Component Tokens"
        description="Token definitions for Menu component including colors, border, shape, shadow, size, and spacing."
      />

      <TokenRefTable
        title="Colors"
        refs={colorRefs}
        emptyMessage="No color tokens found."
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
        title="Shape"
        refs={shapeRefs}
        emptyMessage="No shape tokens found."
        renderPreview={renderPreview}
        tokenLabel="Token path"
        referenceLabel="Reference"
        showType
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
        title="Size"
        refs={sizeRefs}
        emptyMessage="No size tokens found."
        renderPreview={renderPreview}
        tokenLabel="Token path"
        referenceLabel="Reference"
        showType
      />

      <TokenRefTable
        title="Spacing"
        refs={spacingRefs}
        emptyMessage="No spacing tokens found."
        renderPreview={renderPreview}
        tokenLabel="Token path"
        referenceLabel="Reference"
        showType
      />
    </TokenPage>
  )
};

