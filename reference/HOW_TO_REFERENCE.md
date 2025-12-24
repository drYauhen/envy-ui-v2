# How to Reference Old System Components

## Option 1: Copy Files to Reference Directory (Recommended for team sharing)

1. Copy component files from old system to `reference/old-system/[component-name]/`
2. Create a `NOTES.md` with key features and behaviors
3. Reference in conversation: "Look at `reference/old-system/sidebar/`"

**Pros:** Files are in the repo, team can access them
**Cons:** Need to manually copy files

## Option 2: Use Absolute Paths (Recommended for personal use)

1. Keep old system in another directory/repository
2. Provide absolute path when referencing:
   ```
   "Look at /path/to/old-system-repo/components/sidebar/sidebar.html"
   ```
3. I can read any accessible file using absolute paths

**Pros:** No file copying needed, always up-to-date
**Cons:** Only works if old system is accessible locally

## Option 3: Create Reference Documentation

1. Create a markdown file describing the component structure
2. Include key CSS classes, HTML structure, and behaviors
3. Reference: "See `reference/old-system/sidebar/DOCUMENTATION.md`"

**Pros:** Lightweight, focused on important details
**Cons:** Less detailed than actual code

## Best Practice Workflow

When recreating a component from the old system:

1. **Analysis:** "Look at `/path/to/old-system/components/[component]/` and analyze its structure"
2. **Implementation:** "Recreate this component in the new system using tokens"
3. **Review:** Compare functionality and styling

## Example Request Format

```
Look at the sidebar implementation in:
/path/to/old-envy-ui/components/sidebar/

Key files:
- sidebar.css (main styles)
- sidebar.html (structure)
- sidebar.js (if needed for behavior)

Please recreate this component in the new system:
- Use design tokens instead of hardcoded values
- Maintain the same visual appearance
- Follow the new system architecture
```

