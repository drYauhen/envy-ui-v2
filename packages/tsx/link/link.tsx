import * as React from 'react';
import systemMeta from '../../../system.meta.json';

export type LinkCleanProps = React.AnchorHTMLAttributes<HTMLAnchorElement>;

const SYSTEM_PREFIX = systemMeta?.tokens?.prefix ?? 'eui';

function mergeRelWithSecurity(rel?: string) {
  const relParts = new Set((rel ?? '').split(/\s+/).filter(Boolean));
  relParts.add('noopener');
  relParts.add('noreferrer');
  return Array.from(relParts).join(' ');
}

export const LinkClean = React.forwardRef<HTMLAnchorElement, LinkCleanProps>(function LinkClean(
  { className, target, rel, children, ...rest },
  ref
) {
  const explicitLinkTarget = (rest as LinkCleanProps & { 'data-eui-link-target'?: string })['data-eui-link-target'];
  const resolvedRel = target === '_blank' ? mergeRelWithSecurity(rel) : rel;
  const resolvedLinkTarget = explicitLinkTarget ?? (target === '_blank' ? 'new-tab' : undefined);

  return (
    <a
      {...rest}
      ref={ref}
      className={[`${SYSTEM_PREFIX}-link`, className].filter(Boolean).join(' ')}
      target={target}
      rel={resolvedRel}
      data-eui-link-target={resolvedLinkTarget}
    >
      {children}
    </a>
  );
});
