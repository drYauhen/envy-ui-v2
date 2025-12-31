import type { Meta, StoryObj } from '@storybook/react';
import modalColors from '../../../../tokens/app/components/modal/colors.json';
import modalShadow from '../../../../tokens/app/components/modal/shadow.json';
import modalShape from '../../../../tokens/app/components/modal/shape.json';
import modalSize from '../../../../tokens/app/components/modal/size.json';
import modalSpacing from '../../../../tokens/app/components/modal/spacing.json';
import modalBackdrop from '../../../../tokens/app/components/modal/backdrop.json';
import semanticColors from '../../../../tokens/app/semantic/colors/background.json';
import semanticShape from '../../../../tokens/app/semantic/shape.json';
import semanticShadow from '../../../../tokens/app/semantic/shadow.json';
import { TokenPage, TokenSection } from '../../viewers/tokens/TokenLayout';
import { TokenRefTable } from '../../viewers/tokens/TokenRefTable';
import { TokenSwatch } from '../../viewers/tokens/TokenSwatch';
import { collectRefs, flattenTokens, resolveAlias, type FlatToken, type TokenRef } from '../../viewers/tokens/token-utils';

type Story = StoryObj;

const flatTokenMap: Record<string, FlatToken> = {};
flattenTokens(semanticColors, [], flatTokenMap);
flattenTokens(semanticShape, [], flatTokenMap);
flattenTokens(semanticShadow, [], flatTokenMap);
flattenTokens(modalColors, [], flatTokenMap);
flattenTokens(modalShadow, [], flatTokenMap);
flattenTokens(modalShape, [], flatTokenMap);
flattenTokens(modalSize, [], flatTokenMap);
flattenTokens(modalSpacing, [], flatTokenMap);
flattenTokens(modalBackdrop, [], flatTokenMap);

const resolveReference = (ref: string) => resolveAlias(ref, flatTokenMap);

const allRefs: TokenRef[] = [
  ...collectRefs((modalColors as any)?.eui?.modal ?? {}, ['eui', 'modal']),
  ...collectRefs((modalShadow as any)?.eui?.modal ?? {}, ['eui', 'modal']),
  ...collectRefs((modalShape as any)?.eui?.modal ?? {}, ['eui', 'modal']),
  ...collectRefs((modalSize as any)?.eui?.modal ?? {}, ['eui', 'modal']),
  ...collectRefs((modalSpacing as any)?.eui?.modal ?? {}, ['eui', 'modal']),
  ...collectRefs((modalBackdrop as any)?.eui?.modal ?? {}, ['eui', 'modal'])
];

const byCategory = (category: string) => allRefs.filter((token) => token.path.includes(category));

const colorRefs = byCategory('colors');
const shadowRefs = byCategory('shadow');
const shapeRefs = byCategory('shape');
const sizeRefs = byCategory('size');
const spacingRefs = byCategory('spacing');
const backdropRefs = byCategory('backdrop');

const meta: Meta = {
  title: 'Tokens/App/Components/Modal',
  tags: ['autodocs'],
  parameters: {
    layout: 'fullscreen'
  }
};

export default meta;

const renderPreview = (token: TokenRef) => {
  if (token.path.includes('colors') || token.path.includes('shadow') || token.path.includes('backdrop')) {
    return <TokenSwatch reference={token.ref} resolveReference={resolveReference} />;
  }
  return null;
};

export const Modal: Story = {
  name: 'Modal',
  render: () => (
    <TokenPage>
      <TokenSection
        title="Modal Component Tokens"
        description="Token definitions for Modal component including colors, shadow, shape, size, spacing, and backdrop."
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
        title="Shadow"
        refs={shadowRefs}
        emptyMessage="No shadow tokens found."
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

      <TokenRefTable
        title="Backdrop"
        refs={backdropRefs}
        emptyMessage="No backdrop tokens found."
        renderPreview={renderPreview}
        tokenLabel="Token path"
        referenceLabel="Reference"
        showType
      />
    </TokenPage>
  )
};

