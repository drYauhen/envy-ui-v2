import type { CSSProperties } from 'react';
import { PREVIEW_BASE_HEIGHT } from '../token-utils';
import type { TokenPreviewProps } from '../TokenPreview';

export const ShadowPreview = ({ resolvedValue }: TokenPreviewProps) => {
  return (
    <div style={{ 
      height: PREVIEW_BASE_HEIGHT,
      display: 'flex',
      alignItems: 'center'
    } as CSSProperties}>
      <div style={{ 
        width: '24px', 
        height: '24px', 
        background: '#fff',
        borderRadius: '4px',
        boxShadow: resolvedValue || 'none'
      } as CSSProperties} />
    </div>
  );
};

