import type { CSSProperties } from 'react';
import { PREVIEW_BASE_HEIGHT } from '../token-utils';
import type { TokenPreviewProps } from '../TokenPreview';

export const AbstractPreview = ({ token }: TokenPreviewProps) => {
  return (
    <div style={{ 
      height: PREVIEW_BASE_HEIGHT,
      display: 'flex',
      alignItems: 'center'
    } as CSSProperties}>
      <div style={{ 
        fontSize: '0.7rem', 
        color: '#94a3b8',
        fontStyle: 'italic',
        padding: '4px 8px',
        background: '#f1f5f9',
        borderRadius: '4px',
        lineHeight: 1
      } as CSSProperties}>
        Abstract
      </div>
    </div>
  );
};

