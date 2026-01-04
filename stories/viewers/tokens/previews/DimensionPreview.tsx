import type { CSSProperties } from 'react';
import { PREVIEW_BASE_HEIGHT, parseDimension } from '../token-utils';
import type { TokenPreviewProps } from '../TokenPreview';
import { AbstractPreview } from './AbstractPreview';

export const DimensionPreview = ({ token, resolvedValue }: TokenPreviewProps) => {
  const size = parseDimension(resolvedValue);
  if (!size) {
    return <AbstractPreview token={token} resolvedValue={resolvedValue} resolveReference={() => null} />;
  }
  
  return (
    <div style={{ 
      height: PREVIEW_BASE_HEIGHT,
      display: 'flex',
      alignItems: 'center'
    } as CSSProperties}>
      <div style={{ 
        width: size, 
        height: '20px', 
        background: '#94a3b8',
        borderRadius: '2px',
        maxWidth: '80px' // limit for very large values
      } as CSSProperties} />
    </div>
  );
};

