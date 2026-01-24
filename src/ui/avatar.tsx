import * as React from 'react';
import systemMeta from '../../system.meta.json';

export type AvatarSize = 'sm' | 'md' | 'lg';
export type AvatarRole = 'lead';

export type AvatarProps = React.HTMLAttributes<HTMLDivElement> & {
  /**
   * Avatar size (controls diameter and initials size).
   * @default 'md'
   */
  size?: AvatarSize;
  /**
   * Optional semantic role for the avatar.
   * Use 'lead' to apply the accent border in groups.
   */
  avatarRole?: AvatarRole;
  /**
   * Image source for the avatar.
   */
  src?: string;
  /**
   * Image alt text. Defaults to `name` when provided.
   */
  alt?: string;
  /**
   * Full name used to derive initials when `src` is not provided.
   */
  name?: string;
  /**
   * Explicit initials fallback (overrides derived initials).
   */
  initials?: string;
};

const SYSTEM_PREFIX = systemMeta?.tokens?.prefix ?? 'eui';
const prefixedDataAttr = (name: string) => `data-${SYSTEM_PREFIX}-${name}`;

const getInitials = (value: string): string => {
  const parts = value.trim().split(/\s+/);
  if (parts.length >= 2) {
    return (parts[0][0] + parts[parts.length - 1][0]).toUpperCase();
  }
  return value.substring(0, 2).toUpperCase();
};

export const Avatar = React.forwardRef<HTMLDivElement, AvatarProps>(function Avatar(
  {
    size = 'md',
    avatarRole,
    src,
    alt,
    name,
    initials,
    className,
    children,
    ...rest
  },
  ref
) {
  const { role: hostRole, ['aria-label']: ariaLabel, ...restProps } = rest;
  const resolvedInitials = initials ?? (name ? getInitials(name) : undefined);
  const resolvedAlt = alt ?? name ?? '';
  const resolvedAriaLabel = ariaLabel ?? (!src && !children ? name ?? resolvedInitials : undefined);
  const resolvedRole = hostRole ?? (!src && !children && resolvedAriaLabel ? 'img' : undefined);

  const content = children ??
    (src ? (
      <img src={src} alt={resolvedAlt} />
    ) : (
      <span className={`${SYSTEM_PREFIX}-avatar-initials`}>{resolvedInitials}</span>
    ));

  return (
    <div
      ref={ref}
      className={[`${SYSTEM_PREFIX}-avatar`, className].filter(Boolean).join(' ')}
      {...{
        [prefixedDataAttr('size')]: size,
        [prefixedDataAttr('role')]: avatarRole
      }}
      role={resolvedRole}
      aria-label={resolvedAriaLabel}
      {...restProps}
    >
      {content}
    </div>
  );
});

Avatar.displayName = 'Avatar';
