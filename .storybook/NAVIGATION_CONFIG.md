# Storybook Navigation Configuration

This file describes how to configure the order and grouping of components in the Storybook left sidebar menu.

## Configuration File

The configuration is located in `.storybook/storybook-navigation.config.ts` (TypeScript file for better type support).

## Configuration Structure

```typescript
{
  sections: {
    "HTML + CSS": {
      path: "HTML + CSS/Components",
      componentGroups: [
        {
          name: "Avatar Group",
          components: ["Avatar", "AvatarGroup"],
          divider: true
        }
      ],
      otherComponents: ["AlertBanner", "Counter", ...]
    }
  }
}
```

## How It Works

1. **Sections** - define the main Storybook sections (e.g., "HTML + CSS", "TSX + React Aria")
2. **componentGroups** - logically related components that should be grouped together
3. **otherComponents** - components that are not in groups but should be sorted in a specific order
4. **divider** - flag for visual separation between groups (currently not implemented)

## Sorting Rules

1. Components from `componentGroups` come first, in the order specified in the config
2. Within a group, components are sorted in the order specified in the `components` array
3. Then come components from `otherComponents` in the specified order
4. Remaining components are sorted alphabetically

## Example: Adding a New Group

```typescript
{
  name: "Form Inputs Group",
  components: ["Input", "InputGroup", "Select", "Textarea"],
  divider: true
}
```

## Example: Adding a Component to otherComponents

Simply add the component name (exactly as it appears in the story file `title`, after the last `/`) to the `otherComponents` array:

```typescript
{
  otherComponents: [
    "AlertBanner",
    "Counter",
    "MyNewComponent"
  ]
}
```

## Important Notes

- Component names must exactly match the name in the story file `title` (the part after the last `/`)
- For example, if `title: 'HTML + CSS/Components/Input'`, use `"Input"` in the config
- The order in the `components` array determines the display order in the menu
- If a component is not listed in groups or `otherComponents`, it will be sorted alphabetically at the end
