import type { CSSProperties } from 'react';

type TokenSwatchProps = {
  reference: string;
  resolveReference: (reference: string) => string | null;
};

export const TokenSwatch = ({ reference, resolveReference }: TokenSwatchProps) => {
  const resolved = resolveReference(reference);
  const size = 28;

  const style: CSSProperties = {
    width: size,
    height: size,
    borderRadius: 6,
    border: '1px solid #e2e8f0',
    background:
      resolved && resolved.startsWith('#')
        ? resolved
        : 'repeating-linear-gradient(45deg, #e2e8f0, #e2e8f0 8px, #ffffff 8px, #ffffff 16px)'
  };

  return (
    <div style={{ display: 'inline-flex', alignItems: 'center', gap: '0.5rem' }}>
      <span style={style} aria-label={resolved ?? 'Unresolved color'} />
      <span style={{ fontSize: '0.82rem', color: '#475569' }}>{resolved ?? '-'}</span>
    </div>
  );
};
