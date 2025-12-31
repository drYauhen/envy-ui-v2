import type { Meta, StoryObj } from '@storybook/react';
import spacingTokens from '../../../tokens/app/foundations/spacing.json';
import { TokenPage, TokenSection } from '../../viewers/tokens/TokenLayout';
import { TokenRefTable } from '../../viewers/tokens/TokenRefTable';
import { collectRefs, flattenTokens, resolveAlias, type FlatToken, type TokenRef } from '../../viewers/tokens/token-utils';

type Story = StoryObj;

const flatTokenMap: Record<string, FlatToken> = {};
flattenTokens(spacingTokens, [], flatTokenMap);

const resolveReference = (ref: string) => resolveAlias(ref, flatTokenMap);

const spacingRefs = collectRefs((spacingTokens as any)?.eui?.spacing ?? {}, ['eui', 'spacing']);

const meta: Meta = {
  title: 'Tokens/App/Foundations/Spacing',
  tags: ['autodocs'],
  parameters: {
    layout: 'fullscreen'
  }
};

export default meta;

const renderPreview = (token: TokenRef) => {
  const value = resolveReference(token.ref) || token.ref;
  const numericValue = parseFloat(value);
  const unit = value.replace(/[\d.]/g, '');
  
  return (
    <div style={{
      display: 'flex',
      alignItems: 'center',
      gap: '8px'
    }}>
      <div style={{
        width: `${numericValue * 4}px`,
        height: '24px',
        background: 'var(--eui-color-brand-700, #066a8d)',
        borderRadius: '4px',
        minWidth: '4px'
      }} />
      <span style={{ fontSize: '0.875rem', color: '#64748b' }}>{value}</span>
    </div>
  );
};

export const Spacing: Story = {
  name: 'Spacing',
  render: () => (
    <TokenPage>
      <TokenSection
        title="Foundation Spacing Tokens"
        description="Base spacing scale used across all contexts. These values are context-agnostic and provide the foundation for semantic spacing tokens."
      />
      <TokenRefTable
        title="Spacing Scale"
        refs={spacingRefs}
        emptyMessage="No spacing tokens found."
        renderPreview={renderPreview}
        tokenLabel="Token path"
        referenceLabel="Value"
        showType
      />
    </TokenPage>
  )
};

