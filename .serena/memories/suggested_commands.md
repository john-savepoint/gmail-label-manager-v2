# Suggested Development Commands

## Core Development Workflow
```bash
# Install dependencies
npm install

# Development (choose one based on task)
npm run dev                 # Start Vite dev server (for testing React components)
npm run dev:extension       # Build extension in watch mode (for testing in Chrome)

# Build for production
npm run build              # Build extension to dist/ folder
npm run build:ci           # Build with validation (for CI/CD)

# Quality checks - RUN THESE BEFORE COMMITTING
npm run lint               # Fix linting issues automatically
npm run format             # Format code with Prettier
npm run quality:check      # Check both lint and format (non-fixing)
npm run quality:fix        # Fix all quality issues
```

## Chrome Extension Loading
```bash
# 1. Build the extension first
npm run build

# 2. Load in Chrome:
#    - Open chrome://extensions
#    - Enable "Developer mode" (top right)
#    - Click "Load unpacked"
#    - Select the dist/ folder (NOT the project root!)
#    - Copy the extension ID for OAuth setup
```

## Testing & Validation
```bash
npm run validate:extension  # Validate extension structure
npm run test:extension      # Test extension loading scenarios
npm run type-check          # TypeScript checking (if configured)
```

## Version Management
```bash
npm run changeset:add       # Add a changeset for version bump
npm run changeset:version   # Update package versions
npm run release            # Create release (version + commit + push)
```

## Chrome Web Store Preparation
```bash
npm run store:prepare      # Prepare store submission assets
npm run store:package      # Build and package for store
```

## OAuth Configuration
```bash
npm run update-oauth       # Update OAuth configuration
```

## Git Workflow
```bash
# Commits must follow conventional format
git add .
git commit -m "feat(labels): add bulk selection feature"
git commit -m "fix(ui): resolve dropdown width issue"
git commit -m "chore(deps): update Material-UI to v5.14.1"

# Pre-commit hooks run automatically:
# - ESLint fixing
# - Prettier formatting
# - Commit message validation
```

## Debugging Commands
```bash
# View different console contexts:
# 1. Popup console: Right-click popup → Inspect
# 2. Background console: chrome://extensions → Service worker link
# 3. Content script: F12 on Gmail page

# Check for errors
grep -r "console.error" src/
grep -r "TODO" src/
```

## System Commands (macOS/Darwin)
```bash
ls -la              # List files with details
find . -name "*.js" # Find JavaScript files
grep -r "pattern"   # Search for pattern in files
open .              # Open current directory in Finder
pbcopy < file.txt   # Copy file contents to clipboard
```

## Common Development Tasks
```bash
# Clean and rebuild
rm -rf dist/ node_modules/
npm install
npm run build

# Check what will be included in extension
ls -la dist/

# Monitor file changes during development
npm run dev:extension  # Watches and rebuilds on changes
```

## Important Notes
- Always run `npm run build` before loading extension in Chrome
- Run quality checks (`npm run quality:check`) before committing
- OAuth client ID must be updated after getting extension ID
- Check all three console contexts when debugging
- dist/ folder is git-ignored, only source files are committed