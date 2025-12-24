# Quick Reference Guide

## Getting Absolute Paths

### On macOS/Linux:

```bash
# Get current directory absolute path
pwd

# Get absolute path of a specific file/directory
realpath /path/to/file
# or
readlink -f /path/to/file

# Alternative (if realpath not available):
cd /path/to/directory && pwd
```

### Quick Commands:

1. **Get current directory path:**
   ```bash
   pwd
   ```

2. **Get path to a specific file:**
   ```bash
   realpath filename.css
   ```

3. **Get path to a directory:**
   ```bash
   cd /path/to/directory && pwd
   ```

## Example Workflow:

1. Navigate to old system directory:
   ```bash
   cd /Users/username/Projects/old-envy-ui
   ```

2. Get absolute path:
   ```bash
   pwd
   # Output: /Users/username/Projects/old-envy-ui
   ```

3. Get path to specific component:
   ```bash
   cd components/sidebar && pwd
   # Output: /Users/username/Projects/old-envy-ui/components/sidebar
   ```

4. Copy and paste the path when asking to analyze the component.

