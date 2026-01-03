import type { Meta, StoryObj } from '@storybook/react';
import breakpointsTokens from '../../../../tokens/app/foundations/breakpoints.json';
import { TokenPage, TokenSection } from '../../../viewers/tokens/TokenLayout';
import { TokenRefTable } from '../../../viewers/tokens/TokenRefTable';
import { collectRefs, flattenTokens, resolveAlias, type FlatToken, type TokenRef } from '../../../viewers/tokens/token-utils';
import { getSectionParameters } from '../../../../.storybook/preview';

type Story = StoryObj;

const flatTokenMap: Record<string, FlatToken> = {};
flattenTokens(breakpointsTokens, [], flatTokenMap);

const resolveReference = (ref: string) => resolveAlias(ref, flatTokenMap);

const breakpointRefs = collectRefs((breakpointsTokens as any)?.eui?.breakpoint ?? {}, ['eui', 'breakpoint']);

const meta: Meta = {
  title: 'Tokens/App/Foundations/Breakpoints',
  tags: ['autodocs'],
  parameters: {
    // Apply section-specific parameters automatically
    ...getSectionParameters('Tokens/App/Foundations/Breakpoints'),
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
        width: `${Math.min(numericValue / 20, 200)}px`,
        height: '24px',
        background: 'var(--eui-color-brand-700, #066a8d)',
        borderRadius: '4px',
        minWidth: '4px'
      }} />
      <span style={{ fontSize: '0.875rem', color: '#64748b' }}>{value}</span>
    </div>
  );
};

export const Breakpoints: Story = {
  name: 'Breakpoints',
  render: () => (
    <TokenPage>
      <TokenSection
        title="Foundation Breakpoint Tokens"
        description="Base breakpoint values for responsive design. These values define the desktop-first breakpoint system for the App context."
      />
      <TokenRefTable
        title="Breakpoint Scale"
        refs={breakpointRefs}
        emptyMessage="No breakpoint tokens found."
        renderPreview={renderPreview}
        tokenLabel="Token path"
        referenceLabel="Value"
        showType
      />
    </TokenPage>
  )
};

