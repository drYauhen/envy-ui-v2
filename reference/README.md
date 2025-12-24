# Reference Documentation

This directory contains references to the old system implementation for migration and component recreation purposes.

## Structure

- `old-system/` - References to the old system components
- Each component reference should include:
  - Original HTML/CSS implementation
  - Component structure and behavior notes
  - Key styling decisions
  - Migration notes

## How to Use

When referencing old system components:

1. Copy relevant HTML/CSS files from the old system to `reference/old-system/[component-name]/`
2. Add notes about key features and behaviors in a `NOTES.md` file
3. Reference these files when asking to recreate components in the new system

## External Repository Reference

If the old system is in a different repository, you can reference it using absolute paths:

```
/path/to/old-system-repo/components/sidebar/
```

The AI assistant can read files from any accessible directory using absolute paths.

