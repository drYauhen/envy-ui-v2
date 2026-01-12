import * as React from 'react';

type StoryStackProps = {
  children: React.ReactNode;
  style?: React.CSSProperties;
};

type StorySectionProps = {
  title?: string;
  children: React.ReactNode;
  style?: React.CSSProperties;
};

const stackStyle: React.CSSProperties = {
  display: 'flex',
  flexDirection: 'column',
  gap: '1.5rem'
};

const sectionStyle: React.CSSProperties = {
  display: 'flex',
  flexDirection: 'column',
  gap: '0.75rem'
};

const titleStyle: React.CSSProperties = {
  fontSize: '0.8125rem',
  fontWeight: 600,
  color: '#64748b',
  textTransform: 'uppercase',
  letterSpacing: '0.06em'
};

export const StoryStack: React.FC<StoryStackProps> = ({ children, style }) => (
  <div style={{ ...stackStyle, ...style }}>{children}</div>
);

export const StorySection: React.FC<StorySectionProps> = ({ title, children, style }) => (
  <section style={{ ...sectionStyle, ...style }}>
    {title ? <div style={titleStyle}>{title}</div> : null}
    {children}
  </section>
);
