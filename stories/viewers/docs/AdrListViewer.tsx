import React from 'react';
import { adrs, type AdrListItem } from './adr-list-data';
import { exportNameToSlug, titleToStorySlug } from './adr-links';

type AdrListViewerProps = {
  title?: string;
  description?: React.ReactNode;
  adrs?: AdrListItem[];
};

const statusToTone = (status: string) => {
  const normalized = status.toLowerCase();
  if (normalized.startsWith('accepted')) return 'success';
  if (normalized.startsWith('exploratory')) return 'info';
  if (normalized.startsWith('proposed')) return 'warning';
  if (normalized.startsWith('rejected')) return 'error';
  if (normalized.startsWith('superseded')) return 'neutral';
  return 'neutral';
};

/**
 * AdrListViewer Component
 * 
 * Displays a list of Architectural Decision Records (ADR).
 * 
 * This component follows the pattern for documentation list viewers:
 * - Styles are provided by docs shell utilities in src/ui/docs.css
 * - Data is separated in adr-list-data.ts (easy to update)
 * - Component handles rendering logic only
 * 
 * This pattern can be reused for other documentation sections.
 */
export const AdrListViewer: React.FC<AdrListViewerProps> = ({
  title = 'Architectural Decision Records (ADR)',
  description,
  adrs: customAdrs
}) => {
  const adrsList = customAdrs || adrs;

  const defaultDescription = (
    <>
      <p>
        Architectural Decision Records (ADR) capture the history of architectural reasoning and decision-making over time.
        They reflect how thinking evolved at specific moments and are not guaranteed to describe the current or final state of the system.
      </p>
      <p>
        ADR documents serve as a historical record of architectural thinking, context for understanding why certain approaches were explored,
        and reference material for reflection and analysis.
      </p>
    </>
  );

  return (
    <div
      className="eui-docs eui-docs-container eui-container eui-stack"
      data-eui-container="standard"
      data-eui-gap="lg"
    >
      <h1 className="eui-text-heading-5 eui-docs-title">{title}</h1>
      <div className="eui-text-body eui-docs-description">
        {description || defaultDescription}
      </div>
      <ul className="eui-docs-list eui-stack" data-eui-gap="sm">
        {adrsList.map((adr) => {
          // Use exportName if provided, otherwise generate from title
          let storySlug: string;
          if (adr.exportName) {
            storySlug = exportNameToSlug(adr.exportName);
          } else {
            // Convert title to story slug (same logic as AdrViewer.tsx)
            storySlug = titleToStorySlug(adr.title);
          }
          const storyPath = `?path=/story/docs-adr--${storySlug}`;
          return (
            <li key={adr.number}>
              <a 
                href={storyPath}
                className="eui-card eui-docs-list-link"
                data-eui-variant="elevated"
              >
                <div className="eui-card__body eui-stack" data-eui-gap="xs">
                  <div className="eui-text-title-md">
                    ADR-{adr.number}: {adr.title}
                  </div>
                  <div
                    className="eui-inline eui-text-caption eui-docs-item-meta"
                    data-eui-gap="sm"
                    data-eui-wrap="true"
                  >
                    <span className="eui-badge" data-eui-variant="subtle" data-eui-tone={statusToTone(adr.status)}>
                      {adr.status}
                    </span>
                    <span>Date: {adr.date}</span>
                  </div>
                </div>
              </a>
            </li>
          );
        })}
      </ul>
    </div>
  );
};
