import type { Meta, StoryObj } from '@storybook/react';
import semanticButton from '../../tokens/components/button/colors.json';
import focusTokens from '../../tokens/components/button/focus.json';
import sizeTokens from '../../tokens/components/button/size.json';
import shapeTokens from '../../tokens/components/button/shape.json';
import semanticBackground from '../../tokens/semantic/colors/background.json';
import semanticFocus from '../../tokens/semantic/colors/focus.json';
import foundationBrand from '../../tokens/foundations/colors/brand.json';
import foundationNeutral from '../../tokens/foundations/colors/neutral.json';
import foundationAccent from '../../tokens/foundations/colors/accent.json';
import { TokenPage, TokenSection } from '../viewers/tokens/TokenLayout';
import { TokenRefTable } from '../viewers/tokens/TokenRefTable';
import { TokenSwatch } from '../viewers/tokens/TokenSwatch';
import { collectRefs, flattenTokens, resolveAlias, type FlatToken, type TokenRef } from '../viewers/tokens/token-utils';

type Story = StoryObj;

const flatColorMap: Record<string, FlatToken> = {};
flattenTokens(foundationBrand, [], flatColorMap);
flattenTokens(foundationNeutral, [], flatColorMap);
flattenTokens(foundationAccent, [], flatColorMap);
flattenTokens(semanticBackground, [], flatColorMap);
flattenTokens(semanticFocus, [], flatColorMap);
flattenTokens(semanticButton, [], flatColorMap);
flattenTokens(focusTokens, [], flatColorMap);
flattenTokens(sizeTokens, [], flatColorMap);
flattenTokens(shapeTokens, [], flatColorMap);

const resolveReference = (ref: string) => resolveAlias(ref, flatColorMap);

const allRefs: TokenRef[] = [
  ...collectRefs((semanticButton as any)?.ui?.button ?? {}, ['ui', 'button']),
  ...collectRefs((focusTokens as any)?.ui?.button ?? {}, ['ui', 'button']),
  ...collectRefs((sizeTokens as any)?.ui?.button ?? {}, ['ui', 'button']),
  ...collectRefs((shapeTokens as any)?.ui?.button ?? {}, ['ui', 'button'])
];

const byPrefix = (prefix: string) => allRefs.filter((token) => token.path.startsWith(prefix));
const colorRefs = byPrefix('ui.button.').filter(
  (token) =>
    !token.path.startsWith('ui.button.states') &&
    !token.path.startsWith('ui.button.focus') &&
    !token.path.startsWith('ui.button.size') &&
    !token.path.startsWith('ui.button.shape')
);
const stateRefs = byPrefix('ui.button.states');
const focusRefs = byPrefix('ui.button.focus');
const sizeRefs = byPrefix('ui.button.size');
const shapeRefs = byPrefix('ui.button.shape');

const meta: Meta = {
  title: 'Tokens/Components/Button/Colors',
  tags: ['autodocs'],
  parameters: {
    layout: 'fullscreen'
  }
};

export default meta;

const renderPreview = (token: TokenRef) => (
  <TokenSwatch reference={token.ref} resolveReference={resolveReference} />
);

export const Button: Story = {
  name: 'Button',
  render: () => (
    <TokenPage>
      <TokenSection
        title="Overview"
        description={
          'Button token slice (v0.1) aggregated from existing semantic files. Values shown are aliases/references only; no new tokens were added. Categories without explicit tokens are shown as placeholders.'
        }
      />

      <TokenRefTable
        title="Colors"
        refs={colorRefs.filter((token) => token.path.startsWith('ui.button'))}
        emptyMessage="No Button color tokens found."
        renderPreview={renderPreview}
        tokenLabel="Token path"
        referenceLabel="References"
        showType
      />

      <TokenRefTable
        title="States"
        refs={stateRefs.filter((token) => token.path.startsWith('ui.button.states'))}
        emptyMessage="No explicit state tokens defined yet."
        renderPreview={renderPreview}
        tokenLabel="Token path"
        referenceLabel="References"
        showType
      />

      <TokenRefTable
        title="Focus"
        refs={focusRefs.filter((token) => token.path.startsWith('ui.button.focus'))}
        emptyMessage="No focus tokens found."
        renderPreview={renderPreview}
        tokenLabel="Token path"
        referenceLabel="References"
        showType
      />

      <TokenRefTable
        title="Size"
        refs={sizeRefs}
        emptyMessage="No size tokens found."
        renderPreview={renderPreview}
        tokenLabel="Token path"
        referenceLabel="References"
        showType
      />

      <TokenRefTable
        title="Shape"
        refs={shapeRefs}
        emptyMessage="No button-specific shape tokens defined yet."
        renderPreview={renderPreview}
        tokenLabel="Token path"
        referenceLabel="References"
        showType
      />
    </TokenPage>
  )
};
