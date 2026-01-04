import type { CSSProperties } from 'react';
import { TokenSwatch } from '../TokenSwatch';
import { PREVIEW_BASE_HEIGHT } from '../token-utils';
import type { TokenPreviewProps } from '../TokenPreview';

export const ColorPreview = ({ token, resolvedValue, resolveReference }: TokenPreviewProps) => {
  console.log('[ColorPreview] Props:', {
    tokenPath: token?.path,
    tokenRef: token?.ref,
    tokenType: token?.type,
    resolvedValue,
    hasResolveReference: !!resolveReference
  });
  
  // Use resolvedValue from metadata if available
  // This ensures colors will be displayed correctly even if
  // resolveReference cannot resolve the alias (e.g., due to missing foundation tokens)
  return (
    <div style={{ 
      height: PREVIEW_BASE_HEIGHT,
      display: 'flex',
      alignItems: 'center'
    } as CSSProperties}>
      <TokenSwatch 
        reference={token?.ref || ''} 
        resolveReference={resolveReference || (() => null)}
        resolvedValue={resolvedValue} // Pass the already resolved value from metadata
      />
    </div>
  );
};

