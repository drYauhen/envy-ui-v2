import type { Meta, StoryObj } from '@storybook/react';
import badgeTokens from '../../../tokens/components/badge.tokens.json';
import avatarTokens from '../../../tokens/components/avatar.tokens.json';
import avatarGroupTokens from '../../../tokens/components/avatar-group.tokens.json';
import tooltipTokens from '../../../tokens/components/tooltip.tokens.json';
import inputTokens from '../../../tokens/components/input.tokens.json';
import inputGroupTokens from '../../../tokens/components/input-group.tokens.json';
import neutral from '../../../tokens/primitives/neutral.json';
import brand from '../../../tokens/primitives/brand.json';
import accent from '../../../tokens/primitives/accent.json';
import status from '../../../tokens/primitives/status.json';
import statusApplication from '../../../tokens/primitives/status-application.json';
import dimension from '../../../tokens/primitives/dimension.json';
import spacing from '../../../tokens/primitives/spacing.json';
import border from '../../../tokens/primitives/border.json';
import shape from '../../../tokens/primitives/shape.json';
import typography from '../../../tokens/primitives/typography.json';
import opacity from '../../../tokens/primitives/opacity.json';
import transition from '../../../tokens/primitives/transition.json';
import signal from '../../../tokens/primitives/signal.json';
import rawColors from '../../../tokens/contexts/app/raw/colors.json';
import rawBorder from '../../../tokens/contexts/app/raw/border.json';
import rawDimension from '../../../tokens/contexts/app/raw/dimension.json';
import rawOpacity from '../../../tokens/contexts/app/raw/opacity.json';
import rawShape from '../../../tokens/contexts/app/raw/shape.json';
import rawSpacing from '../../../tokens/contexts/app/raw/spacing.json';
import rawTransition from '../../../tokens/contexts/app/raw/transition.json';
import rawTypography from '../../../tokens/contexts/app/raw/typography.json';
import semanticBackground from '../../../tokens/contexts/app/semantics/colors/background.json';
import semanticBorder from '../../../tokens/contexts/app/semantics/colors/border.json';
import semanticFocus from '../../../tokens/contexts/app/semantics/colors/focus.json';
import semanticStatus from '../../../tokens/contexts/app/semantics/colors/status.json';
import semanticText from '../../../tokens/contexts/app/semantics/colors/text.json';
import semanticNeutral from '../../../tokens/contexts/app/semantics/colors/neutral.json';
import semanticSpacing from '../../../tokens/contexts/app/semantics/spacing.json';
import semanticShape from '../../../tokens/contexts/app/semantics/shape.json';
import semanticBorderTokens from '../../../tokens/contexts/app/semantics/border.json';
import semanticFontFamily from '../../../tokens/contexts/app/semantics/typography/font-family.json';
import semanticFontSize from '../../../tokens/contexts/app/semantics/typography/font-size.json';
import semanticFontWeight from '../../../tokens/contexts/app/semantics/typography/font-weight.json';
import semanticLineHeight from '../../../tokens/contexts/app/semantics/typography/line-height.json';
import semanticLetterSpacing from '../../../tokens/contexts/app/semantics/typography/letter-spacing.json';
import semanticTextTransform from '../../../tokens/contexts/app/semantics/typography/text-transform.json';
import { TokenPage } from '../../viewers/tokens/TokenLayout';
import { TokenRefTable } from '../../viewers/tokens/TokenRefTable';
import { flattenTokens, resolveAlias } from '../../viewers/tokens/token-utils';

type Story = StoryObj;

type TokenRef = {
  path: string;
  ref: string;
  type?: string;
};

const meta: Meta = {
  title: 'Tokens/Components',
  tags: ['autodocs']
};

export default meta;

const tokenSources = [
  neutral,
  brand,
  accent,
  status,
  statusApplication,
  dimension,
  spacing,
  border,
  shape,
  typography,
  opacity,
  transition,
  signal,
  rawColors,
  rawBorder,
  rawDimension,
  rawOpacity,
  rawShape,
  rawSpacing,
  rawTransition,
  rawTypography,
  semanticBackground,
  semanticBorder,
  semanticFocus,
  semanticStatus,
  semanticText,
  semanticNeutral,
  semanticSpacing,
  semanticShape,
  semanticBorderTokens,
  semanticFontFamily,
  semanticFontSize,
  semanticFontWeight,
  semanticLineHeight,
  semanticLetterSpacing,
  semanticTextTransform
];

const buildTokenMap = (sources: unknown[]) => {
  const merged = sources.reduce<Record<string, { value: string; type?: string }>>((acc, source) => {
    return { ...acc, ...flattenTokens(source) };
  }, {});

  const withDashedKeys = { ...merged };
  Object.entries(merged).forEach(([key, value]) => {
    const dashedKey = key.replace(/\./g, '-');
    if (!(dashedKey in withDashedKeys)) {
      withDashedKeys[dashedKey] = value;
    }
  });

  return withDashedKeys;
};

const tokenMap = buildTokenMap(tokenSources);
const resolveReference = (ref: string) => resolveAlias(ref, tokenMap);

const collectRefs = (node: unknown, path: string[] = []): TokenRef[] => {
  if (!node || typeof node !== 'object' || Array.isArray(node)) return [];

  const obj = node as Record<string, any>;
  const refs: TokenRef[] = [];

  if (obj.$value !== undefined && obj.$value !== null) {
    const ref = typeof obj.$value === 'string' ? obj.$value : String(obj.$value);
    refs.push({ path: path.join('.'), ref, type: typeof obj.$type === 'string' ? obj.$type : undefined });
  }

  for (const [key, value] of Object.entries(obj)) {
    if (key === '$value' || key === '$type') continue;
    refs.push(...collectRefs(value, [...path, key]));
  }

  return refs;
};

const sortRefs = (refs: TokenRef[]) =>
  [...refs].sort((a, b) => a.path.localeCompare(b.path));

const badgeRefs = sortRefs(collectRefs(badgeTokens));
const avatarRefs = sortRefs(collectRefs(avatarTokens));
const avatarGroupRefs = sortRefs(collectRefs(avatarGroupTokens));
const tooltipRefs = sortRefs(collectRefs(tooltipTokens));
const inputRefs = sortRefs(collectRefs(inputTokens));
const inputGroupRefs = sortRefs(collectRefs(inputGroupTokens));

const renderComponentTokens = (title: string, refs: TokenRef[]) => (
  <TokenPage>
    <TokenRefTable
      title={title}
      refs={refs}
      emptyMessage="No tokens found."
      autoPreview
      showResolved
      showType
      resolveReference={resolveReference}
    />
  </TokenPage>
);

export const Badge: Story = {
  name: 'Badge Tokens',
  render: () => renderComponentTokens('Badge Tokens', badgeRefs)
};

export const Avatar: Story = {
  name: 'Avatar Tokens',
  render: () => renderComponentTokens('Avatar Tokens', avatarRefs)
};

export const AvatarGroup: Story = {
  name: 'Avatar Group Tokens',
  render: () => renderComponentTokens('Avatar Group Tokens', avatarGroupRefs)
};

export const Tooltip: Story = {
  name: 'Tooltip Tokens',
  render: () => renderComponentTokens('Tooltip Tokens', tooltipRefs)
};

export const Input: Story = {
  name: 'Input Tokens',
  render: () => renderComponentTokens('Input Tokens', inputRefs)
};

export const InputGroup: Story = {
  name: 'Input Group Tokens',
  render: () => renderComponentTokens('Input Group Tokens', inputGroupRefs)
};
