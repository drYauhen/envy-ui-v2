import type { CSSProperties } from 'react';
import { PREVIEW_BASE_HEIGHT } from '../token-utils';
import type { TokenPreviewProps } from '../TokenPreview';

export const BorderStylePreview = ({ resolvedValue }: TokenPreviewProps) => {
  const style = resolvedValue || 'solid';
  return (
    <div style={{ 
      height: PREVIEW_BASE_HEIGHT,
      display: 'flex',
      alignItems: 'center'
    } as CSSProperties}>
      <div style={{ 
        width: '24px', 
        height: '24px', 
        border: `2px ${style} #000`,
        background: 'transparent'
      } as CSSProperties} />
    </div>
  );
};

