export type ThemePresetContext = 'app' | 'website' | 'report';

export type ThemePresetDefinition = {
  components?: {
    handsontable?: {
      props?: Record<string, unknown>;
      layout?: {
        centerContent?: boolean;
        maxWidth?: string;
      };
    };
  };
};

const presetCache = new Map<string, Promise<ThemePresetDefinition | null>>();

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
