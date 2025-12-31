/**
 * Storybook Navigation Configuration
 * 
 * This is the single source of truth for Storybook navigation ordering.
 * Edit this file to change section order, component grouping, or special sorting rules.
 */

export const navigationConfig = {
  // Top-level section order (left to right in sidebar)
  sectionOrder: [
    "Docs",
    "Tokens",
    "HTML + CSS",
    "TSX (Clean)",
    "TSX",
    "TSX + React Aria",
    "Web Components",
    "Tailwind",
    "Templates"
  ] as const,

  // Special sorting rules for specific sections/subsections
  specialRules: {
    // Docs/ADR: "ADR Overview" should always be first
    "Docs/ADR": {
      firstItem: "ADR Overview"
    }
  },

  // Component grouping and ordering within sections
  sections: {
    "HTML + CSS": {
      componentGroups: [
        { components: ["Avatar", "AvatarGroup"] },
        { components: ["Button", "ButtonGroup"] },
        { components: ["Input", "InputGroup", "Select", "Textarea"] },
        { components: ["Checkbox", "Switch"] },
        { components: ["Card", "Layout"] }
      ],
      otherComponents: [
        "AlertBanner",
        "Counter",
        "FormElementsContextThemeTest",
        "FormLayout",
        "Icon",
        "Label",
        "Menu",
        "Modal",
        "Skeleton",
        "Table"
      ]
    },
    "TSX + React Aria": {
      componentGroups: [
        { components: ["Select", "MultiSelect", "SearchableSelect"] }
      ],
      otherComponents: [
        "AlertBanner",
        "Button",
        "FormLayout",
        "Icon",
        "Menu"
      ]
    },
    "Web Components": {
      componentGroups: [],
      otherComponents: ["Button"]
    }
  }
} as const;

