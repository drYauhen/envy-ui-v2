import type { Meta, StoryObj } from '@storybook/react';
import heroSectionTypography from '../../../../../tokens/app/components/hero-section/typography.json';
import { TokenPage, TokenSection } from '../../../../viewers/tokens/TokenLayout';
import { TokenRefTable } from '../../../../viewers/tokens/TokenRefTable';
import { TokenSwatch } from '../../../../viewers/tokens/TokenSwatch';
import { collectRefs, flattenTokens, resolveAlias, type FlatToken, type TokenRef } from '../../../../viewers/tokens/token-utils';
import { getSectionParameters } from '../../../../../.storybook/preview';

type Story = StoryObj;

const flatTokenMap: Record<string, FlatToken> = {};
flattenTokens(heroSectionTypography, [], flatTokenMap);

const resolveReference = (ref: string) => resolveAlias(ref, flatTokenMap);

// Use the entire component object from the JSON file
const tokenRefs = collectRefs((heroSectionTypography as any)?.eui?.['hero-section'] ?? {}, ['eui', 'hero-section']);

const meta: Meta = {
  title: 'Tokens/App/Components/Hero Section/Typography',
  tags: ['autodocs'],
  parameters: {
    // Apply section-specific parameters automatically
    ...getSectionParameters('Tokens/App/Components/Hero Section/Typography'),
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

export const Typography: Story = {
  name: 'Typography',
  render: () => (
    <TokenPage>
      <TokenSection
        title="Hero Section Typography"
        description="Token definitions for hero-section typography."
      />
      <TokenRefTable
        title="Typography"
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
