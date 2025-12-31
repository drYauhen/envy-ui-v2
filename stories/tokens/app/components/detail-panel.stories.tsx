import type { Meta, StoryObj } from '@storybook/react';
import detail-panelColors from '../../../../tokens/app/components/detail-panel/colors.json';
import detail-panelShadow from '../../../../tokens/app/components/detail-panel/shadow.json';
import detail-panelSize from '../../../../tokens/app/components/detail-panel/size.json';
import detail-panelSpacing from '../../../../tokens/app/components/detail-panel/spacing.json';
import { TokenPage, TokenSection } from '../../viewers/tokens/TokenLayout';
import { TokenRefTable } from '../../viewers/tokens/TokenRefTable';
import { TokenSwatch } from '../../viewers/tokens/TokenSwatch';
import { collectRefs, flattenTokens, resolveAlias, type FlatToken, type TokenRef } from '../../viewers/tokens/token-utils';

type Story = StoryObj;

const flatTokenMap: Record<string, FlatToken> = {};
flattenTokens(detail-panelColors, [], flatTokenMap);
flattenTokens(detail-panelShadow, [], flatTokenMap);
flattenTokens(detail-panelSize, [], flatTokenMap);
flattenTokens(detail-panelSpacing, [], flatTokenMap);

const resolveReference = (ref: string) => resolveAlias(ref, flatTokenMap);

const allRefs: TokenRef[] = [
  ...collectRefs((detail-panelColors as any)?.eui?.detail.panel ?? {}, ['eui', 'detail.panel']),
  ...collectRefs((detail-panelShadow as any)?.eui?.detail.panel ?? {}, ['eui', 'detail.panel']),
  ...collectRefs((detail-panelSize as any)?.eui?.detail.panel ?? {}, ['eui', 'detail.panel']),
  ...collectRefs((detail-panelSpacing as any)?.eui?.detail.panel ?? {}, ['eui', 'detail.panel']),
];

const meta: Meta = {
  title: 'Tokens/App/Components/Detail Panel',
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

export const DetailPanel: Story = {
  name: 'Detail Panel',
  render: () => (
    <TokenPage>
      <TokenSection
        title="Detail Panel Component Tokens"
        description="Token definitions for detail-panel component."
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
