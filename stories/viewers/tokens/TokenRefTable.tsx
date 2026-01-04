import type { ReactNode } from 'react';
import {
  TokenSection,
  tokenTableStyle,
  tokenTdStyle,
  tokenTdPreviewStyle,
  tokenTextStyle,
  tokenThStyle
} from './TokenLayout';
import type { TokenRef } from './token-utils';
import { TokenPreview } from './TokenPreview';
import { getResolvedFromMetadata } from './token-utils';

type TokenRefTableProps = {
  title: string;
  refs: TokenRef[];
  emptyMessage: string;
  renderPreview?: (token: TokenRef) => ReactNode;
  autoPreview?: boolean; // automatically determine preview by token type
  resolveReference?: (ref: string) => string | null; // for resolving aliases in autoPreview
  metadata?: Record<string, any> | null; // metadata with resolved values
  showType?: boolean;
  tokenLabel?: string;
  referenceLabel?: string;
  typeLabel?: string;
};

export const TokenRefTable = ({
  title,
  refs,
  emptyMessage,
  renderPreview,
  autoPreview = false,
  resolveReference,
  metadata,
  showType = false,
  tokenLabel = 'Token',
  referenceLabel = 'Reference',
  typeLabel = 'Type'
}: TokenRefTableProps) => {
  console.log('[TokenRefTable] Props:', {
    title,
    refsCount: refs.length,
    autoPreview,
    hasMetadata: !!metadata,
    hasResolveReference: !!resolveReference,
    hasRenderPreview: !!renderPreview
  });
  
  const hasPreview = renderPreview || autoPreview;
  
  // Function to get resolved value (priority: metadata > resolveReference)
  const getResolvedValue = (token: TokenRef): string | null => {
    console.log('[TokenRefTable.getResolvedValue] Token:', {
      path: token.path,
      ref: token.ref,
      type: token.type
    });
    
    // First try to get from metadata
    if (metadata) {
      const tokenPath = token.path.split('.');
      console.log('[TokenRefTable.getResolvedValue] Trying metadata, path:', tokenPath);
      const resolved = getResolvedFromMetadata(metadata, tokenPath);
      if (resolved) {
        console.log('[TokenRefTable.getResolvedValue] ✅ Found in metadata:', resolved);
        return resolved;
      }
      console.log('[TokenRefTable.getResolvedValue] ❌ Not found in metadata');
    } else {
      console.log('[TokenRefTable.getResolvedValue] ⚠️ No metadata provided');
    }
    
    // Fallback to resolveReference
    if (resolveReference) {
      console.log('[TokenRefTable.getResolvedValue] Trying resolveReference for:', token.ref);
      const resolved = resolveReference(token.ref);
      console.log('[TokenRefTable.getResolvedValue] resolveReference result:', resolved);
      return resolved;
    }
    
    console.log('[TokenRefTable.getResolvedValue] ❌ No resolveReference provided');
    return null;
  };
  
  return (
    <TokenSection title={title}>
      {refs.length === 0 ? (
        <p style={tokenTextStyle}>{emptyMessage}</p>
      ) : (
        <table style={tokenTableStyle}>
          <thead>
            <tr>
              <th style={tokenThStyle}>{tokenLabel}</th>
              <th style={tokenThStyle}>{referenceLabel}</th>
              {hasPreview ? <th style={tokenThStyle}>Preview</th> : null}
              {showType ? <th style={tokenThStyle}>{typeLabel}</th> : null}
            </tr>
          </thead>
          <tbody>
            {refs.map((token) => (
              <tr key={token.path}>
                <td style={tokenTdStyle}>{token.path}</td>
                <td style={tokenTdStyle}>{token.ref}</td>
                {hasPreview ? (
                  <td style={tokenTdPreviewStyle}>
                    {autoPreview ? (
                      (() => {
                        const resolvedValue = getResolvedValue(token);
                        console.log('[TokenRefTable] Rendering TokenPreview for:', token.path, 'with resolvedValue:', resolvedValue);
                        return (
                          <TokenPreview 
                            token={token} 
                            resolvedValue={resolvedValue}
                            resolveReference={resolveReference || (() => null)}
                          />
                        );
                      })()
                    ) : (
                      renderPreview?.(token)
                    )}
                  </td>
                ) : null}
                {showType ? <td style={tokenTdStyle}>{token.type ?? '-'}</td> : null}
              </tr>
            ))}
          </tbody>
        </table>
      )}
    </TokenSection>
  );
};
