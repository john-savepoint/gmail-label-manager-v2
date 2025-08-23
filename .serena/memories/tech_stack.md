# Technology Stack

## Frontend
- **React 18.2.0** - Main UI framework for popup and components
- **Material-UI 5.14.0** - Component library for professional UI
- **Zustand 4.4.0** - State management for auth and labels
- **Split.js 1.6.5** - Professional resizing functionality for Gmail sidebar

## Build System
- **Vite 4.4.0** - Fast build tool with HMR support
- **vite-plugin-chrome-extension 0.0.7** - Chrome extension bundling
- **hot-reload-extension-vite 1.0.13** - Development hot reload

## Code Quality
- **ESLint 8.45.0** - JavaScript linting with React plugins
- **Prettier 3.0.0** - Code formatting
- **Husky 9.1.7** - Git hooks for pre-commit checks
- **lint-staged 16.1.2** - Run linters on staged files
- **Commitlint 19.8.1** - Conventional commit enforcement

## Version Management
- **Changesets 2.29.5** - Version and changelog management

## Chrome Extension Architecture
- **Manifest V3** - Latest Chrome extension manifest version
- **Service Worker** - Background script for API calls
- **Content Scripts** - DOM manipulation for Gmail UI
- **Chrome Identity API** - OAuth authentication
- **Chrome Storage API** - Settings persistence

## APIs
- **Gmail API** - Label management operations
- **Chrome Runtime API** - Message passing between components
- **Chrome Tabs API** - Tab management for Gmail integration

## Development Environment
- **Node.js 16+** required
- **npm** for package management
- **Chrome Developer Mode** for extension testing