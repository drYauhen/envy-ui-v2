import type { Meta, StoryObj } from '@storybook/react';
import shapeTokens from '../../../tokens/app/foundations/shape.json';
import { TokenPage, TokenSection } from '../../viewers/tokens/TokenLayout';
import { TokenRefTable } from '../../viewers/tokens/TokenRefTable';
import { collectRefs, flattenTokens, resolveAlias, type FlatToken, type TokenRef } from '../../viewers/tokens/token-utils';

type Story = StoryObj;

const flatTokenMap: Record<string, FlatToken> = {};
flattenTokens(shapeTokens, [], flatTokenMap);

const resolveReference = (ref: string) => resolveAlias(ref, flatTokenMap);

const radiusRefs = collectRefs((shapeTokens as any)?.eui?.radius ?? {}, ['eui', 'radius']);

const meta: Meta = {
  title: 'Tokens/App/Foundations/Shape',
  tags: ['autodocs'],
  parameters: {
    layout: 'fullscreen'
  }
};

export default meta;

const renderPreview = (token: TokenRef) => {
  const value = resolveReference(token.ref) || token.ref;
  
  return (
    <div style={{
      display: 'flex',
      alignItems: 'center',
      gap: '12px'
    }}>
      <div style={{
        width: '48px',
        height: '48px',
        background: 'var(--eui-color-brand-700, #066a8d)',
        borderRadius: value === '9999px' ? '50%' : value,
        border: '1px solid var(--eui-color-border-default, #cbd5e1)'
      }} />
      <span style={{ fontSize: '0.875rem', color: '#64748b' }}>{value}</span>
    </div>
  );
};

export const Radius: Story = {
  name: 'Radius',
  render: () => (
    <TokenPage>
      <TokenSection
        title="Foundation Shape Tokens"
        description="Base shape tokens (radius) used across all contexts. These values are context-agnostic and provide the foundation for semantic shape tokens."
      />
      <TokenRefTable
        title="Radius"
        refs={radiusRefs}
        emptyMessage="No radius tokens found."
        renderPreview={renderPreview}
        tokenLabel="Token path"
        referenceLabel="Value"
        showType
      />
    </TokenPage>
  )
};

