import React from 'react';
import type { DocViewerProps } from '../docs/DocViewer';
import { DocViewer } from '../docs/DocViewer';

type MarkdownViewerProps = Pick<DocViewerProps, 'markdownPath' | 'fallback'>;

export const MarkdownViewer = ({ markdownPath, fallback = 'Loading...' }: MarkdownViewerProps) => (
  <DocViewer markdownPath={markdownPath} fallback={fallback} />
);
