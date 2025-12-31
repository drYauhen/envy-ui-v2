import type { Meta, StoryObj } from '@storybook/react';
import hero-sectionColors from '../../../../tokens/app/components/hero-section/colors.json';
import hero-sectionSize from '../../../../tokens/app/components/hero-section/size.json';
import hero-sectionSpacing from '../../../../tokens/app/components/hero-section/spacing.json';
import hero-sectionTypography from '../../../../tokens/app/components/hero-section/typography.json';
import { TokenPage, TokenSection } from '../../viewers/tokens/TokenLayout';
import { TokenRefTable } from '../../viewers/tokens/TokenRefTable';
import { TokenSwatch } from '../../viewers/tokens/TokenSwatch';
import { collectRefs, flattenTokens, resolveAlias, type FlatToken, type TokenRef } from '../../viewers/tokens/token-utils';

type Story = StoryObj;

const flatTokenMap: Record<string, FlatToken> = {};
flattenTokens(hero-sectionColors, [], flatTokenMap);
flattenTokens(hero-sectionSize, [], flatTokenMap);
flattenTokens(hero-sectionSpacing, [], flatTokenMap);
flattenTokens(hero-sectionTypography, [], flatTokenMap);

const resolveReference = (ref: string) => resolveAlias(ref, flatTokenMap);

const allRefs: TokenRef[] = [
  ...collectRefs((hero-sectionColors as any)?.eui?.hero.section ?? {}, ['eui', 'hero.section']),
  ...collectRefs((hero-sectionSize as any)?.eui?.hero.section ?? {}, ['eui', 'hero.section']),
  ...collectRefs((hero-sectionSpacing as any)?.eui?.hero.section ?? {}, ['eui', 'hero.section']),
  ...collectRefs((hero-sectionTypography as any)?.eui?.hero.section ?? {}, ['eui', 'hero.section']),
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
