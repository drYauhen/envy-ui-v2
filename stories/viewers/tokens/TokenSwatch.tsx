import type { CSSProperties } from 'react';

type TokenSwatchProps = {
  reference: string;
  resolveReference: (reference: string) => string | null;
  resolvedValue?: string | null; // Optional already resolved value from metadata
};

/**
 * Checks if a value is a valid CSS color
 * Supports: hex, rgb, rgba, hsl, hsla, oklch, lab, lch, etc.
 */
function isValidColor(value: string | null): boolean {
  if (!value) return false;
  
  // Hex colors
  if (value.startsWith('#')) return true;
  
  // CSS color functions
  const colorFunctionPattern = /^(rgb|rgba|hsl|hsla|oklch|lab|lch|color)\(/i;
  if (colorFunctionPattern.test(value)) return true;
  
  // CSS named colors
  const namedColors = ['transparent', 'currentColor'];
  if (namedColors.includes(value.toLowerCase())) return true;
  
  return false;
}

export const TokenSwatch = ({ reference, resolveReference, resolvedValue }: TokenSwatchProps) => {
  console.log('[TokenSwatch] Props:', {
    reference,
    resolvedValue,
    hasResolveReference: !!resolveReference
  });
  
  // Priority: resolvedValue (from metadata) > resolveReference(reference)
  const resolved = resolvedValue ?? resolveReference(reference);
  console.log('[TokenSwatch] Final resolved value:', resolved);
  
  const size = 28;
  const isValid = isValidColor(resolved);
  console.log('[TokenSwatch] Is valid color:', isValid);

  const style: CSSProperties = {
    width: size,
    height: size,
    borderRadius: 6,
    border: '1px solid #e2e8f0',
    background: isValid
      ? resolved || '#e2e8f0'
      : 'repeating-linear-gradient(45deg, #e2e8f0, #e2e8f0 8px, #ffffff 8px, #ffffff 16px)'
  };

  return (
    <div style={{ display: 'inline-flex', alignItems: 'center', gap: '0.5rem' }}>
      <span style={style} aria-label={resolved ?? 'Unresolved color'} />
      <span style={{ fontSize: '0.82rem', color: '#475569' }}>{resolved ?? '-'}</span>
    </div>
  );
};
