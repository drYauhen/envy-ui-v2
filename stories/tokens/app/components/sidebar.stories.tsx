import type { Meta, StoryObj } from '@storybook/react';
import sidebarAnimation from '../../../../tokens/app/components/sidebar/animation.json';
import sidebarColors from '../../../../tokens/app/components/sidebar/colors.json';
import sidebarSize from '../../../../tokens/app/components/sidebar/size.json';
import sidebarSpacing from '../../../../tokens/app/components/sidebar/spacing.json';
import { TokenPage, TokenSection } from '../../../viewers/tokens/TokenLayout';
import { TokenRefTable } from '../../../viewers/tokens/TokenRefTable';
import { TokenSwatch } from '../../../viewers/tokens/TokenSwatch';
import { collectRefs, flattenTokens, resolveAlias, type FlatToken, type TokenRef } from '../../../viewers/tokens/token-utils';

type Story = StoryObj;

const flatTokenMap: Record<string, FlatToken> = {};
flattenTokens(sidebarAnimation, [], flatTokenMap);
flattenTokens(sidebarColors, [], flatTokenMap);
flattenTokens(sidebarSize, [], flatTokenMap);
flattenTokens(sidebarSpacing, [], flatTokenMap);

const resolveReference = (ref: string) => resolveAlias(ref, flatTokenMap);

const allRefs: TokenRef[] = [
  ...collectRefs((sidebarAnimation as any)?.eui?.sidebar ?? {}, ['eui', 'sidebar']),
  ...collectRefs((sidebarColors as any)?.eui?.sidebar ?? {}, ['eui', 'sidebar']),
  ...collectRefs((sidebarSize as any)?.eui?.sidebar ?? {}, ['eui', 'sidebar']),
  ...collectRefs((sidebarSpacing as any)?.eui?.sidebar ?? {}, ['eui', 'sidebar']),
];

const meta: Meta = {
  title: 'Tokens/App/Components/Sidebar',
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

export const Sidebar: Story = {
  name: 'Sidebar',
  render: () => (
    <TokenPage>
      <TokenSection
        title="Sidebar Component Tokens"
        description="Token definitions for sidebar component."
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
