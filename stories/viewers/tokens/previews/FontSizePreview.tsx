import type { CSSProperties } from 'react';
import { PREVIEW_BASE_HEIGHT, PREVIEW_FLEXIBLE_TYPES, parseDimension } from '../token-utils';
import type { TokenPreviewProps } from '../TokenPreview';

export const FontSizePreview = ({ resolvedValue }: TokenPreviewProps) => {
  const size = parseDimension(resolvedValue) || '1rem';
  const isFlexible = PREVIEW_FLEXIBLE_TYPES.includes('fontSize');
  
  return (
    <div style={{ 
      minHeight: PREVIEW_BASE_HEIGHT, // minimum height = base
      display: 'flex',
      alignItems: 'center',
      // Height can increase if font size is large
    } as CSSProperties}>
      <div style={{ 
        fontSize: size,
        lineHeight: 1.2,
        fontWeight: 600,
        display: 'inline-block',
      } as CSSProperties}>
        Aa
      </div>
    </div>
  );
};

