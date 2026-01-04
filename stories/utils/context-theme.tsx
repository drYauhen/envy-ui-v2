import * as React from 'react';

export type ContextName = 'app' | 'website' | 'report';

export const DEFAULT_CONTEXT_THEMES: Record<ContextName, string> = {
  app: 'default',
  website: 'default',
  report: 'print'
};

type ContextThemeValues = Record<ContextName, string>;

const ContextThemeContext = React.createContext<ContextThemeValues>(DEFAULT_CONTEXT_THEMES);

type ContextThemeProviderProps = {
  themes?: Partial<ContextThemeValues>;
  children: React.ReactNode;
};

export function ContextThemeProvider({ themes, children }: ContextThemeProviderProps) {
  const value = React.useMemo(() => ({
    ...DEFAULT_CONTEXT_THEMES,
    ...(themes ?? {})
  }), [themes]);

  return (
    <ContextThemeContext.Provider value={value}>
      {children}
    </ContextThemeContext.Provider>
  );
}

export function useContextTheme(context: ContextName) {
  const themes = React.useContext(ContextThemeContext);
  return themes[context] ?? DEFAULT_CONTEXT_THEMES[context];
}

type ContextThemeScopeProps = React.HTMLAttributes<HTMLElement> & {
  context?: ContextName;
  theme?: string;
  as?: React.ElementType;
  'data-eui-context'?: ContextName;
  'data-eui-theme'?: string;
};

export function ContextThemeScope({
  context,
  theme,
  as: Component = 'div',
  ...rest
}: ContextThemeScopeProps) {
  const { ['data-eui-context']: dataContext, ['data-eui-theme']: dataTheme, ...otherProps } = rest as {
    'data-eui-context'?: ContextName;
    'data-eui-theme'?: string;
  };
  const resolvedContext = context ?? dataContext;
  const fallbackContext: ContextName = 'app';
  const themeFromContext = useContextTheme(resolvedContext ?? fallbackContext);

  if (!resolvedContext) {
    return <Component {...otherProps} />;
  }

  const resolvedTheme = theme ?? dataTheme ?? themeFromContext;

  return (
    <Component
      data-eui-context={resolvedContext}
      data-eui-theme={resolvedTheme}
      {...otherProps}
    />
  );
}
