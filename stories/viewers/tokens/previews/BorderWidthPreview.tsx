import type { CSSProperties } from 'react';
import { PREVIEW_BASE_HEIGHT, parseDimension } from '../token-utils';
import type { TokenPreviewProps } from '../TokenPreview';

export const BorderWidthPreview = ({ resolvedValue }: TokenPreviewProps) => {
  const width = parseDimension(resolvedValue) || '1px';
  return (
    <div style={{ 
      height: PREVIEW_BASE_HEIGHT,
      display: 'flex',
      alignItems: 'center'
    } as CSSProperties}>
      <div style={{ 
        height: width, 
        width: '60px', 
        background: '#000',
        borderRadius: '2px',
        maxHeight: '20px' // limit to not exceed base height
      } as CSSProperties} />
    </div>
  );
};

