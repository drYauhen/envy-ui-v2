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
    "TSX + React Aria",
    "Templates",
    "Tailwind",
    "Web Components"
  ] as const,

  // Section status badges (short labels)
  sectionStatus: {
    "Docs": null, // No badge
    "Tokens": "active",
    "HTML + CSS": "active",
    "TSX (Clean)": "future",
    "TSX + React Aria": "active",
    "Templates": "future",
    "Tailwind": "future",
    "Web Components": "exp"
  } as const,

  // Badge labels (short)
  badgeLabels: {
    active: "Active",
    exp: "Exp",
    future: "Future"
  } as const,

  // Badge tooltips (descriptions)
  badgeTooltips: {
    active: "Actively developed and maintained. Ready for production use.",
    exp: "Experimental/Exploratory. Proof of concept. Not production-ready.",
    future: "Planned for future development. Placeholder for upcoming features."
  } as const,

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

