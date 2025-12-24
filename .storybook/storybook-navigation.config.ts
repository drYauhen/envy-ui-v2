export default {
  sections: {
    "HTML + CSS": {
      path: "HTML + CSS/Components",
      componentGroups: [
        {
          name: "Avatar Group",
          components: ["Avatar", "AvatarGroup"],
          divider: true
        },
        {
          name: "Button Group",
          components: ["Button", "ButtonGroup"],
          divider: true
        },
        {
          name: "Form Inputs Group",
          components: ["Input", "InputGroup", "Select", "Textarea"],
          divider: true
        },
        {
          name: "Form Controls Group",
          components: ["Checkbox", "Switch"],
          divider: true
        },
        {
          name: "Layout Group",
          components: ["Card", "Layout"],
          divider: true
        }
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
      path: "TSX + React Aria/Components",
      componentGroups: [
        {
          name: "Form Inputs Group",
          components: ["Select", "MultiSelect", "SearchableSelect"],
          divider: true
        }
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
      path: "Web Components/Components",
      componentGroups: [],
      otherComponents: [
        "Button"
      ]
    }
  }
} as const;

