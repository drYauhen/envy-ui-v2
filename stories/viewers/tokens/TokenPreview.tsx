import type { ComponentType } from 'react';
import type { TokenRef } from './token-utils';
import {
  ColorPreview,
  BorderWidthPreview,
  BorderStylePreview,
  DimensionPreview,
  DurationPreview,
  FontSizePreview,
  ShadowPreview,
  NumberPreview,
  StringPreview,
  BooleanPreview,
  AbstractPreview
} from './previews';

export type TokenPreviewProps = {
  token: TokenRef | null;
  resolvedValue: string | null;
  resolveReference: (ref: string) => string | null;
};

// Registry of all preview renderers by token type
const previewRenderers: Record<string, ComponentType<TokenPreviewProps>> = {
  color: ColorPreview,
  borderWidth: BorderWidthPreview,
  borderStyle: BorderStylePreview,
  dimension: DimensionPreview,
  duration: DurationPreview,
  fontSize: FontSizePreview,
  boxShadow: ShadowPreview,
  shadow: ShadowPreview,
  number: NumberPreview,
  string: StringPreview,
  boolean: BooleanPreview,
  stateEffect: AbstractPreview, // abstract type
};

/**
 * Main component for displaying token preview
 * Automatically selects the appropriate preview renderer based on token type
 */
export const TokenPreview = ({ token, resolvedValue, resolveReference }: TokenPreviewProps) => {
  console.log('[TokenPreview] Props:', {
    tokenPath: token?.path,
    tokenType: token?.type,
    resolvedValue,
    hasResolveReference: !!resolveReference
  });
  
  if (!token) {
    console.log('[TokenPreview] ❌ No token provided, using AbstractPreview');
    return <AbstractPreview token={null} resolvedValue={null} resolveReference={() => null} />;
  }

  const type = token.type || '';
  const PreviewComponent = previewRenderers[type] || AbstractPreview;
  console.log('[TokenPreview] Selected component:', type, '→', PreviewComponent.name || 'AbstractPreview');
  
  return (
    <PreviewComponent 
      token={token} 
      resolvedValue={resolvedValue}
      resolveReference={resolveReference}
    />
  );
};

