import type { ReactNode } from 'react';
import {
  TokenSection,
  tokenTableStyle,
  tokenTdStyle,
  tokenTextStyle,
  tokenThStyle
} from './TokenLayout';
import type { TokenRef } from './token-utils';

type TokenRefTableProps = {
  title: string;
  refs: TokenRef[];
  emptyMessage: string;
  renderPreview?: (token: TokenRef) => ReactNode;
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
  showType = false,
  tokenLabel = 'Token',
  referenceLabel = 'Reference',
  typeLabel = 'Type'
}: TokenRefTableProps) => (
  <TokenSection title={title}>
    {refs.length === 0 ? (
      <p style={tokenTextStyle}>{emptyMessage}</p>
    ) : (
      <table style={tokenTableStyle}>
        <thead>
          <tr>
            <th style={tokenThStyle}>{tokenLabel}</th>
            <th style={tokenThStyle}>{referenceLabel}</th>
            {renderPreview ? <th style={tokenThStyle}>Preview</th> : null}
            {showType ? <th style={tokenThStyle}>{typeLabel}</th> : null}
          </tr>
        </thead>
        <tbody>
          {refs.map((token) => (
            <tr key={token.path}>
              <td style={tokenTdStyle}>{token.path}</td>
              <td style={tokenTdStyle}>{token.ref}</td>
              {renderPreview ? <td style={tokenTdStyle}>{renderPreview(token)}</td> : null}
              {showType ? <td style={tokenTdStyle}>{token.type ?? '-'}</td> : null}
            </tr>
          ))}
        </tbody>
      </table>
    )}
  </TokenSection>
);
