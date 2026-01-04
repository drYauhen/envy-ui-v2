import type { CSSProperties } from 'react';
import { PREVIEW_BASE_HEIGHT } from '../token-utils';
import type { TokenPreviewProps } from '../TokenPreview';

export const BooleanPreview = ({ resolvedValue }: TokenPreviewProps) => {
  const value = resolvedValue === 'true' || resolvedValue === '1';
  return (
    <div style={{ 
      height: PREVIEW_BASE_HEIGHT,
      display: 'flex',
      alignItems: 'center'
    } as CSSProperties}>
      <div style={{ 
        fontSize: '0.75rem', 
        color: value ? '#10b981' : '#ef4444',
        fontWeight: 600,
        lineHeight: 1
      } as CSSProperties}>
        {value ? '✓' : '✗'}
      </div>
    </div>
  );
};

