import type { CSSProperties } from 'react';
import { PREVIEW_BASE_HEIGHT } from '../token-utils';
import type { TokenPreviewProps } from '../TokenPreview';

export const DurationPreview = ({ resolvedValue }: TokenPreviewProps) => {
  return (
    <div style={{ 
      height: PREVIEW_BASE_HEIGHT,
      display: 'flex',
      alignItems: 'center'
    } as CSSProperties}>
      <div style={{ 
        fontSize: '0.75rem', 
        color: '#64748b',
        lineHeight: 1
      } as CSSProperties}>
        {resolvedValue || '-'}
      </div>
    </div>
  );
};

