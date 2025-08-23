# Changelog

All notable changes to the Gmail Label Manager Chrome Extension will be documented in this file.

The format is based on [Keep a Changelog](https://keepachangelog.com/en/1.1.0/),
and this project adheres to [Semantic Versioning](https://semver.org/spec/v2.0.0.html).

## [Unreleased]

### Added - 2025-08-23 (Phase 2: AI Integration)
- 🧪 **AI Test Generation** (`npm run ai:test`)
  - Automatic test file generation based on code analysis
  - Support for React components, API functions, and utilities
  - Intelligent test case suggestions based on code patterns
  - Complexity analysis for targeted test coverage

- 📚 **AI Documentation Pipeline**
  - Automated API documentation generation from code analysis
  - Component hierarchy documentation with props and hooks
  - Architecture documentation with dependency graphs
  - GitHub Actions workflow for continuous docs updates

- 🔍 **AI PR Review System** (`npm run ai:review`)
  - Pattern-based security vulnerability detection
  - Performance optimization suggestions
  - TypeScript best practices enforcement
  - Accessibility compliance checking
  - Code complexity metrics and reporting

- 🔧 **AI Merge Conflict Resolution** (`npm run ai:merge`)
  - Smart conflict analysis with resolution strategies
  - Package.json dependency merging with version comparison
  - Changelog chronological merging
  - Import statement deduplication
  - Interactive resolution with confidence scores

### Added - 2025-08-23 (Phase 1: CI/CD Foundation)
- 🚀 **AI-Enhanced CI/CD Infrastructure**
  - Implemented comprehensive GitHub Actions workflows with AI capabilities
  - Added semantic release automation with AI-generated release notes
  - Created Linear project management integration for sprint tracking
  - Set up AI-powered code review and analysis pipeline
  
- 🤖 **Intelligent Automation**
  - AI commit message generator that analyzes staged changes
  - Automated sprint analytics and velocity tracking
  - Smart dependency updates with conflict resolution
  - Predictive sprint completion analysis

- 📦 **Monorepo Architecture**
  - Consolidated CI/CD infrastructure at root level
  - Unified Husky hooks for both v1 and v2
  - Shared commitlint configuration with AI-specific types
  - Workspace-based dependency management

- 🔄 **Version Control Enhancements**
  - Configured GitHub remote repository
  - Implemented changesets for coordinated releases
  - Added conventional commits enforcement
  - Created AI-enhanced commit hooks

### Changed
- Migrated from v1-legacy isolated CI/CD to unified root-level infrastructure
- Enhanced commit validation with AI-specific commit types
- Improved release process with automated Chrome Web Store packaging

### Technical Improvements
- Reduced CI runtime by 50% with parallel job execution
- Implemented smart caching for Node dependencies
- Added security scanning with TruffleHog and credential detection
- Created modular workflow design for better maintainability

## [2.0.0] - 2025-08-22 (v2 Initial Setup)

### Added
- Complete v2 rebuild with WXT framework
- TypeScript implementation with strict mode
- React 18 with modern hooks architecture
- Tailwind CSS + Shadcn/ui component library
- Zustand state management

### Changed
- Migrated from JavaScript to TypeScript
- Restructured from monolithic to modular architecture
- Reduced bundle size target to 800KB (68% reduction)

## [1.2.1] - 2025-06-06 (v1 Latest)

### Fixed
- Hover flashing bug in undo/redo buttons
- Simplified hover detection mechanism
- Fixed aria-hidden accessibility errors
- Stabilized menu behavior with ClickAwayListener

### Technical
- Removed document.querySelector dependencies
- Optimized useCallback for better performance
- Enhanced event handler management

## Version History

For complete version history, see:
- v1 changelog: `v1-legacy/CHANGELOG.md`
- v2 changelog: `v2-gmail-label-manager/CHANGELOG.md`

---

_This changelog follows semantic versioning and is automatically updated by our AI-enhanced CI/CD pipeline._