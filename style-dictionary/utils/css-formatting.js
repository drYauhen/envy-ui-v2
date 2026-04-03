import { formattedVariables } from 'style-dictionary/utils';
import { propertyFormatNames } from 'style-dictionary/enums';

export function formatCssTokenDeclarations({
  tokens = [],
  dictionary,
  sort,
  indentation = '  ',
  includeEmptyValues = true
}) {
  const normalizedTokens = tokens.flatMap((token) => {
    const rawValue = token.value ?? token.$value ?? '';
    if (!includeEmptyValues && !rawValue) {
      return [];
    }
    const normalizedValue = typeof rawValue === 'string' ? rawValue : String(rawValue);
    return [{
      ...token,
      value: normalizedValue,
      $value: normalizedValue,
      original: token.original ?? { value: normalizedValue, $value: normalizedValue }
    }];
  });

  if (normalizedTokens.length === 0) {
    return '';
  }

  return formattedVariables({
    format: propertyFormatNames.css,
    dictionary: {
      ...dictionary,
      allTokens: normalizedTokens
    },
    usesDtcg: false,
    sort,
    formatting: {
      indentation
    }
  });
}
