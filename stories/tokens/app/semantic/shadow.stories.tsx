import type { Meta, StoryObj } from '@storybook/react';
import shadowTokens from '../../../../tokens/app/semantic/shadow.json';
import { TokenPage, TokenSection } from '../../viewers/tokens/TokenLayout';
import { TokenRefTable } from '../../viewers/tokens/TokenRefTable';
import { collectRefs, flattenTokens, resolveAlias, type FlatToken, type TokenRef } from '../../viewers/tokens/token-utils';

type Story = StoryObj;

const flatTokenMap: Record<string, FlatToken> = {};
flattenTokens(shadowTokens, [], flatTokenMap);

const resolveReference = (ref: string) => resolveAlias(ref, flatTokenMap);

const shadowRefs = collectRefs((shadowTokens as any)?.eui?.shadow ?? {}, ['eui', 'shadow']);

const meta: Meta = {
  title: 'Tokens/App/Semantic/Shadow',
  tags: ['autodocs'],
  parameters: {
    layout: 'fullscreen'
  }
};

export default meta;

const renderPreview = (token: TokenRef) => {
  const value = resolveReference(token.ref) || token.ref;
  
  if (value === 'none') {
    return (
      <div style={{
        display: 'flex',
        alignItems: 'center',
        gap: '12px'
      }}>
        <div style={{
          width: '64px',
          height: '64px',
          background: '#f1f5f9',
          borderRadius: '8px',
          border: '1px solid #e2e8f0'
        }} />
        <span style={{ fontSize: '0.875rem', color: '#64748b' }}>none</span>
      </div>
    );
  }
  
  return (
    <div style={{
      display: 'flex',
      alignItems: 'center',
      gap: '12px'
    }}>
      <div style={{
        width: '64px',
        height: '64px',
        background: '#ffffff',
        borderRadius: '8px',
        boxShadow: value,
        border: '1px solid #e2e8f0'
      }} />
      <span style={{ 
        fontSize: '0.75rem', 
        color: '#64748b',
        fontFamily: 'monospace',
        maxWidth: '200px',
        wordBreak: 'break-word'
      }}>{value}</span>
    </div>
  );
};

export const Shadow: Story = {
  name: 'Shadow',
  render: () => (
    <TokenPage>
      <TokenSection
        title="Semantic Shadow Tokens"
        description="Shadow tokens for elevation system. Optimized for app-default context/theme. Other contexts/themes may override these values."
      />
      <TokenRefTable
        title="Shadow Scale"
        refs={shadowRefs}
        emptyMessage="No shadow tokens found."
        renderPreview={renderPreview}
        tokenLabel="Token path"
        referenceLabel="Value"
        showType
      />
    </TokenPage>
  )
};

