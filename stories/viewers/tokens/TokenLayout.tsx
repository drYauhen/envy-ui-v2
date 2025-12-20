import type { CSSProperties, ReactNode } from 'react';

export const tokenPageStyle: CSSProperties = {
  display: 'flex',
  flexDirection: 'column',
  gap: '1rem',
  padding: '1.5rem',
  background: '#f8fafc',
  color: '#0f172a'
};

export const tokenSectionStyle: CSSProperties = {
  padding: '1rem',
  border: '1px solid #e2e8f0',
  borderRadius: '0.75rem',
  background: '#ffffff',
  boxShadow: '0 1px 3px rgba(15, 23, 42, 0.06)'
};

export const tokenHeadingStyle: CSSProperties = {
  margin: '0 0 0.35rem',
  fontSize: '1rem',
  fontWeight: 700
};

export const tokenTextStyle: CSSProperties = {
  margin: 0,
  fontSize: '0.92rem',
  color: '#475569',
  lineHeight: 1.5
};

export const tokenTableStyle: CSSProperties = {
  width: '100%',
  borderCollapse: 'collapse',
  fontSize: '0.92rem'
};

export const tokenThStyle: CSSProperties = {
  textAlign: 'left',
  padding: '0.5rem',
  background: '#f1f5f9',
  color: '#0f172a',
  borderBottom: '1px solid #e2e8f0',
  fontWeight: 700
};

export const tokenTdStyle: CSSProperties = {
  padding: '0.5rem',
  borderBottom: '1px solid #e2e8f0',
  color: '#0f172a'
};

export const TokenPage = ({ children }: { children: ReactNode }) => (
  <div style={tokenPageStyle}>{children}</div>
);

export const TokenSection = ({
  title,
  description,
  children
}: {
  title: string;
  description?: ReactNode;
  children?: ReactNode;
}) => (
  <div style={tokenSectionStyle}>
    <p style={tokenHeadingStyle}>{title}</p>
    {description ? <p style={tokenTextStyle}>{description}</p> : null}
    {children}
  </div>
);
