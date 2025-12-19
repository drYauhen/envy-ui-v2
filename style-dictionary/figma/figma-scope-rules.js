// Pattern-based Figma scope derivation. No token source changes required.
// Scopes follow Figma Variables semantics for numeric properties.

module.exports.FIGMA_SCOPE_RULES = [
  { match: /\.shape\.corner\./, scopes: ['CORNER_RADIUS'] },
  { match: /\.shape\.orientation\..*corner\./, scopes: ['CORNER_RADIUS'] },
  { match: /\.shape\.default\.radius$/, scopes: ['CORNER_RADIUS'] },
  { match: /\.shape\.round\.radius$/, scopes: ['CORNER_RADIUS'] },
  { match: /\.shape\.circle\.radius$/, scopes: ['CORNER_RADIUS'] },

  { match: /\.size\..*\.height$/, scopes: ['FRAME_HEIGHT'] },
  { match: /\.size\..*\.width$/, scopes: ['FRAME_WIDTH'] },

  { match: /\.padding\.inline$/, scopes: ['PADDING_HORIZONTAL'] },
  { match: /\.padding\.block$/, scopes: ['PADDING_VERTICAL'] },
  { match: /\.padding\.(left|right)$/, scopes: ['PADDING_HORIZONTAL'] },
  { match: /\.padding\.(top|bottom)$/, scopes: ['PADDING_VERTICAL'] },

  { match: /\.gap$/, scopes: ['ITEM_SPACING'] },
  { match: /\.separator\.thickness$/, scopes: ['STROKE_WEIGHT'] },
  { match: /\.separator\.inset$/, scopes: ['PADDING_HORIZONTAL'] },

  { match: /\.border\.width$/, scopes: ['STROKE_WEIGHT'] },

  { match: /\.focus\..*width/, scopes: ['STROKE_WEIGHT'] },
  { match: /\.focus\..*offset/, scopes: ['PADDING_HORIZONTAL'] }
];

module.exports.deriveFigmaScopes = function deriveFigmaScopes(tokenPath) {
  return module.exports.FIGMA_SCOPE_RULES.filter((rule) => rule.match.test(tokenPath)).flatMap((rule) => rule.scopes);
};
