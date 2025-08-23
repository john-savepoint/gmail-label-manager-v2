# Project Structure

## Root Directory
```
gmailLabelUtilityTool/
├── gmail-label-manager/        # Main extension source code
├── node_modules/               # Dependencies (root level)
├── .claude/                    # Claude configuration
├── .vscode/                    # VS Code settings
├── package.json               # Root package with minimal deps
├── projectBrief.md            # Original project requirements
└── [backup/test files]        # Various JSON backups and tests
```

## Extension Directory Structure
```
gmail-label-manager/
├── src/                       # Source code
│   ├── assets/               # Static assets
│   │   ├── css/             # CSS overrides for Gmail
│   │   └── icons/           # Extension icons (16, 32, 48, 128px)
│   ├── background/          # Service worker
│   │   └── background.js    # API calls, OAuth, message handling
│   ├── content/             # Content scripts for Gmail
│   │   ├── gmail-ui-enhancer.js         # Main content script (965 lines)
│   │   └── [other enhancers]            # Alternative implementations
│   ├── features/            # Feature modules (partially implemented)
│   │   ├── labels/         # Label management features
│   │   ├── colors/         # Color system utilities
│   │   ├── settings/       # Settings panel
│   │   └── bulk-operations/
│   ├── lib/                # Shared libraries
│   │   ├── stores/         # Zustand stores
│   │   │   ├── authStore.js
│   │   │   ├── labelStore.js
│   │   │   ├── undoStore.js
│   │   │   └── settingsStore.js
│   │   ├── gmail-colors.js      # Color system
│   │   ├── gmail-api.js         # API helpers
│   │   └── label-utils.js       # Label utilities
│   └── popup/              # Extension popup UI
│       ├── popup.html      # Popup entry point
│       ├── popup.jsx       # Main React app
│       ├── App.jsx         # App component with tabs
│       ├── components/     # React components
│       │   ├── UnifiedLabelManager.jsx  # Main label manager (1539 lines)
│       │   ├── BackupRestore.jsx
│       │   ├── AuthSection.jsx
│       │   └── [other components]
│       └── styles/         # Component styles
├── scripts/                # Build and utility scripts
│   ├── validate-extension.js
│   ├── test-extension-loading.js
│   └── prepare-store-package.js
├── dist/                   # Built extension (git-ignored)
├── .github/                # GitHub Actions workflows
├── .changeset/            # Changeset configuration
├── .husky/                # Git hooks
├── manifest.json          # Extension manifest
├── vite.config.js         # Vite build configuration
├── package.json           # Extension dependencies
├── .eslintrc.js          # ESLint configuration
├── .prettierrc           # Prettier configuration
└── CLAUDE.md             # Claude-specific instructions
```

## Key File Responsibilities

### Core Extension Files
- `manifest.json` - Extension configuration, permissions, OAuth
- `background.js` - Service worker, API calls, message routing
- `gmail-ui-enhancer.js` - Gmail DOM manipulation, UI enhancements
- `popup.jsx` - Extension popup interface

### Major Components
- `UnifiedLabelManager.jsx` - Label list, bulk ops, editing (needs refactoring)
- `BackupRestore.jsx` - Import/export functionality
- `AuthSection.jsx` - Google authentication UI

### State Management
- `authStore.js` - Authentication state
- `labelStore.js` - Label CRUD operations
- `undoStore.js` - Undo/redo functionality
- `settingsStore.js` - User preferences

### Configuration
- `vite.config.js` - Multi-entry build setup
- `.eslintrc.js` - Linting rules
- `commitlint.config.js` - Commit message format

## Build Output (dist/)
```
dist/
├── manifest.json
├── popup.html
├── popup.js
├── background.js
├── gmail-ui-enhancer.js
├── gmail-overrides.css
└── assets/
    └── icons/
```

## Refactoring Needs
1. `gmail-ui-enhancer.js` (965 lines) - Split into modules
2. `UnifiedLabelManager.jsx` (1539 lines) - Break into smaller components
3. Feature modules partially implemented - Complete modularization