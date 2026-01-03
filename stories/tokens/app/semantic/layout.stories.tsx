import type { Meta, StoryObj } from '@storybook/react';
import containerTokens from '../../../../tokens/app/semantic/layout/container.json';
import pageTokens from '../../../../tokens/app/semantic/layout/page.json';
import sectionTokens from '../../../../tokens/app/semantic/layout/section.json';
import toolbarTokens from '../../../../tokens/app/semantic/layout/toolbar.json';
import { TokenPage, TokenSection } from '../../../viewers/tokens/TokenLayout';
import { TokenRefTable } from '../../../viewers/tokens/TokenRefTable';
import { collectRefs, flattenTokens, resolveAlias, type FlatToken, type TokenRef } from '../../../viewers/tokens/token-utils';
import { getSectionParameters } from '../../../../.storybook/preview';

type Story = StoryObj;

const flatTokenMap: Record<string, FlatToken> = {};
flattenTokens(containerTokens, [], flatTokenMap);
flattenTokens(pageTokens, [], flatTokenMap);
flattenTokens(sectionTokens, [], flatTokenMap);
flattenTokens(toolbarTokens, [], flatTokenMap);

const resolveReference = (ref: string) => resolveAlias(ref, flatTokenMap);

const containerRefs = collectRefs((containerTokens as any)?.eui?.layout?.container ?? {}, ['eui', 'layout', 'container']);
const pageRefs = collectRefs((pageTokens as any)?.eui?.layout?.page ?? {}, ['eui', 'layout', 'page']);
const sectionRefs = collectRefs((sectionTokens as any)?.eui?.layout?.section ?? {}, ['eui', 'layout', 'section']);
const toolbarRefs = collectRefs((toolbarTokens as any)?.eui?.layout?.toolbar ?? {}, ['eui', 'layout', 'toolbar']);

const meta: Meta = {
  title: 'Tokens/App/Semantic/Layout',
  tags: ['autodocs'],
  parameters: {
    // Apply section-specific parameters automatically
    ...getSectionParameters('Tokens/App/Semantic/Layout'),
    layout: 'fullscreen'
  }
};

export default meta;

const renderPreview = (token: TokenRef) => {
  const value = resolveReference(token.ref) || token.ref;
  const numericValue = parseFloat(value);
  const unit = value.replace(/[\d.]/g, '');
  
  if (token.path.includes('maxWidth') || token.path.includes('width')) {
    return (
      <div style={{
        display: 'flex',
        alignItems: 'center',
        gap: '8px'
      }}>
        <div style={{
          width: `${Math.min(numericValue / 10, 200)}px`,
          height: '24px',
          background: 'var(--eui-color-brand-700, #066a8d)',
          borderRadius: '4px',
          minWidth: '4px'
        }} />
        <span style={{ fontSize: '0.875rem', color: '#64748b' }}>{value}</span>
      </div>
    );
  }
  
  if (token.path.includes('spacing') || token.path.includes('padding') || token.path.includes('gap')) {
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
  }
  
  return null;
};

export const Layout: Story = {
  name: 'Layout',
  render: () => (
    <TokenPage>
      <TokenSection
        title="Semantic Layout Tokens"
        description="Semantic layout tokens for containers, pages, sections, and toolbars. These tokens are optimized for the app-default context/theme."
      />
      <TokenRefTable
        title="Container"
        refs={containerRefs}
        emptyMessage="No container tokens found."
        renderPreview={renderPreview}
        tokenLabel="Token path"
        referenceLabel="Value"
        showType
      />
      <TokenRefTable
        title="Page"
        refs={pageRefs}
        emptyMessage="No page tokens found."
        renderPreview={renderPreview}
        tokenLabel="Token path"
        referenceLabel="Value"
        showType
      />
      <TokenRefTable
        title="Section"
        refs={sectionRefs}
        emptyMessage="No section tokens found."
        renderPreview={renderPreview}
        tokenLabel="Token path"
        referenceLabel="Value"
        showType
      />
      <TokenRefTable
        title="Toolbar"
        refs={toolbarRefs}
        emptyMessage="No toolbar tokens found."
        renderPreview={renderPreview}
        tokenLabel="Token path"
        referenceLabel="Value"
        showType
      />
    </TokenPage>
  )
};

