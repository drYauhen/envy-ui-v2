import * as React from 'react';

export type ThemePresetContext = 'app' | 'website' | 'report';

export type ThemePresetDefinition = {
  components?: {
    handsontable?: {
      props?: Record<string, unknown>;
      layout?: {
        centerContent?: boolean;
        maxWidth?: string;
      };
      styles?: Record<string, string>;
      $meta?: {
        description?: string;
        vendor?: string;
        version?: string;
      };
    };
  };
};

const presetCache = new Map<string, Promise<ThemePresetDefinition | null>>();

/**
 * Resolves token references in an object using CSS custom properties.
 * Replaces {eui.token.path} with var(--eui-token-path).
 *
 * @param obj - Object containing potential token references
 * @returns New object with resolved token references
 *
 * @example
 * ```ts
 * const input = { color: "{eui.color.text.primary}" };
 * const output = resolveTokenReferences(input);
 * // { color: "var(--eui-color-text-primary)" }
 * ```
 */
export function resolveTokenReferences<T>(obj: T): T {
  if (obj === null || obj === undefined) {
    return obj;
  }

  if (typeof obj === 'string') {
    // Check if string contains token reference: {eui.token.path}
    const tokenRefPattern = /^\{(eui\.[a-z0-9.-]+)\}$/i;
    const match = obj.match(tokenRefPattern);

    if (match) {
      // Convert eui.color.text.primary → --eui-color-text-primary
      const tokenPath = match[1].replace(/\./g, '-');
      return `var(--${tokenPath})` as unknown as T;
    }

    return obj;
  }

  if (Array.isArray(obj)) {
    return obj.map((item) => resolveTokenReferences(item)) as unknown as T;
  }

  if (typeof obj === 'object') {
    const resolved: Record<string, unknown> = {};

    for (const [key, value] of Object.entries(obj)) {
      resolved[key] = resolveTokenReferences(value);
    }

    return resolved as T;
  }

  return obj;
}

export function loadThemePresets(context: ThemePresetContext, theme: string) {
  const key = `${context}:${theme}`;

  if (!presetCache.has(key)) {
    const request = fetch(`/tokens/${context}/themes/${theme}.presets.meta.json`)
      .then((response) => (response.ok ? response.json() : null))
      .catch(() => null);

    presetCache.set(key, request);
  }

  return presetCache.get(key)!;
}

/**
 * React hook for accessing theme presets for a specific component.
 * Automatically resolves token references to CSS custom properties.
 *
 * @param context - Theme context (app, website, report)
 * @param theme - Theme name (default, toy-r-us, etc.)
 * @param component - Component name (handsontable, etc.)
 * @returns Object containing component presets with resolved token references
 *
 * @example
 * ```tsx
 * function MyTable() {
 *   const presets = useThemePresets('app', 'default', 'handsontable');
 *
 *   if (!presets) return null;
 *
 *   return (
 *     <HotTable
 *       {...presets.props}
 *       data={tableData}
 *     />
 *   );
 * }
 * ```
 */
export function useThemePresets(
  context: ThemePresetContext,
  theme: string,
  component: 'handsontable'
) {
  const [presets, setPresets] = React.useState<ThemePresetDefinition['components'] | undefined>(
    undefined
  );

  React.useEffect(() => {
    loadThemePresets(context, theme)
      .then((definition) => {
        if (!definition?.components) {
          setPresets(undefined);
          return;
        }

        // Resolve token references in the component presets
        const componentPresets = definition.components[component];
        if (!componentPresets) {
          setPresets(undefined);
          return;
        }

        const resolved = resolveTokenReferences(componentPresets);
        setPresets({ [component]: resolved } as ThemePresetDefinition['components']);
      })
      .catch(() => {
        setPresets(undefined);
      });
  }, [context, theme, component]);

  return presets?.[component] ?? null;
}
