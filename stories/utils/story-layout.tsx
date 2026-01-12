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

export const StoryStack: React.FC<StoryStackProps> = ({ children, style }) => (
  <div className="eui-stack eui-story-stack" data-eui-gap="lg" style={style}>
    {children}
  </div>
);

export const StorySection: React.FC<StorySectionProps> = ({ title, children, style }) => (
  <section className="eui-stack eui-story-section" data-eui-gap="sm" style={style}>
    {title ? <div className="eui-text-overline eui-story-section-title">{title}</div> : null}
    {children}
  </section>
);
