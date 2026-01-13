import React from 'react';
import { adrFilenameMap } from './adr-filename-map';
import { DocViewer } from './DocViewer';

type AdrViewerProps = {
  adrNumber: string;
  title: string;
  status: string;
  date: string;
};

export const AdrViewer = ({ adrNumber, title, status, date }: AdrViewerProps) => {
  const filename = adrFilenameMap[adrNumber] || `ADR-${adrNumber}.md`;
  const filePath = `/docs/adr/${filename}`;

  return (
    <DocViewer
      markdownPath={filePath}
      status={status}
      date={date}
      fallback="Loading ADR document..."
    />
  );
};
