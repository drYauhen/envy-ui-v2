import type { Meta, StoryObj } from '@storybook/react';
import heroSectionColors from '../../../../tokens/app/components/hero-section/colors.json';
import heroSectionSize from '../../../../tokens/app/components/hero-section/size.json';
import heroSectionSpacing from '../../../../tokens/app/components/hero-section/spacing.json';
import heroSectionTypography from '../../../../tokens/app/components/hero-section/typography.json';
import { TokenPage, TokenSection } from '../../../viewers/tokens/TokenLayout';
import { TokenRefTable } from '../../../viewers/tokens/TokenRefTable';
import { TokenSwatch } from '../../../viewers/tokens/TokenSwatch';
import { collectRefs, flattenTokens, resolveAlias, type FlatToken, type TokenRef } from '../../../viewers/tokens/token-utils';

type Story = StoryObj;

const flatTokenMap: Record<string, FlatToken> = {};
flattenTokens(heroSectionColors, [], flatTokenMap);
flattenTokens(heroSectionSize, [], flatTokenMap);
flattenTokens(heroSectionSpacing, [], flatTokenMap);
flattenTokens(heroSectionTypography, [], flatTokenMap);

const resolveReference = (ref: string) => resolveAlias(ref, flatTokenMap);

const allRefs: TokenRef[] = [
  ...collectRefs((heroSectionColors as any)?.eui?.hero.section ?? {}, ['eui', 'hero.section']),
  ...collectRefs((heroSectionSize as any)?.eui?.hero.section ?? {}, ['eui', 'hero.section']),
  ...collectRefs((heroSectionSpacing as any)?.eui?.hero.section ?? {}, ['eui', 'hero.section']),
  ...collectRefs((heroSectionTypography as any)?.eui?.hero.section ?? {}, ['eui', 'hero.section']),
];

const meta: Meta = {
  title: 'Tokens/App/Components/Hero Section',
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

export const HeroSection: Story = {
  name: 'Hero Section',
  render: () => (
    <TokenPage>
      <TokenSection
        title="Hero Section Component Tokens"
        description="Token definitions for hero-section component."
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
