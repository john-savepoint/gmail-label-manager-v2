# Gmail Label Manager v2.0 - Project Context

## Overview
This is the Gmail Label Manager Chrome Extension project undergoing a complete v2.0 rebuild. The project is transitioning from a legacy MVP (v1) to a production-ready commercial product using modern technologies.

## CRITICAL: Required Reading
**ALL team members and AI agents MUST read the Product Requirements Document first:**
- **PRD Location**: `/docs/rebuild/PRD_v2.0.md`

## Project Structure

### Current State
- **v1-legacy/**: Original codebase (JavaScript, no TypeScript, 2,651-line components)
- **v2-gmail-label-manager/**: New WXT-based rebuild (TypeScript, React, modular architecture)
- **docs/rebuild/**: All v2 planning and requirements documentation
- **docs/v1-archive/**: Legacy documentation and assets

### Technology Stack (v2)
- **Framework**: WXT (Web Extension Framework)
- **Language**: TypeScript with strict mode
- **UI Framework**: React 18
- **Styling**: Tailwind CSS + Shadcn/ui
- **State Management**: Zustand
- **Build Tool**: Vite (via WXT)
- **Testing**: Vitest + Playwright
- **Package Manager**: npm

## Key Documentation Files
1. `/docs/rebuild/PRD_v2.0.md` - Product Requirements (READ FIRST)
2. `/docs/rebuild/TECH_STACK_ANALYSIS.md` - Technology decisions and justifications
3. `/docs/rebuild/AGILE_TASK_BREAKDOWN.md` - 224 development tasks across 6 sprints
4. `/docs/rebuild/PROJECT_SUMMARY.md` - Executive summary

## Linear Project Management
- **Project**: Gmail Label Manager v2.0 - Complete Rebuild
- **Current Sprint**: Sprint 1 (Foundation & Setup)
- **Active Branch**: `john/sav-10-task-001-initialize-new-wxt-project-with-typescript-template`
- **Linear Issue Tracking**: All tasks are tracked in Linear with SAV-XX identifiers

## Development Guidelines

### TypeScript Configuration
Strict mode is enforced with the following settings:
```json
{
  "strict": true,
  "noUnusedLocals": true,
  "noUnusedParameters": true,
  "exactOptionalPropertyTypes": true,
  "noUncheckedIndexedAccess": true
}
```

### Code Organization
- Use feature-based folder structure
- Keep components under 300 lines
- Implement proper error boundaries
- Use React hooks and functional components
- No "any" types - properly type everything

### Gmail API Integration
- OAuth 2.0 with PKCE via Chrome Identity API
- Rate limit: 250 units/second
- Required scopes:
  - `https://www.googleapis.com/auth/gmail.labels`
  - `https://www.googleapis.com/auth/gmail.readonly`

## Current Project Directory Structure

```
./
├── .claude/
│   └── settings.local.json
├── .serena/
│   ├── cache/
│   │   └── typescript/
│   ├── memories/
│   │   ├── code_style_conventions.md
│   │   ├── gmail_api_patterns.md
│   │   ├── project_overview.md
│   │   ├── project_structure.md
│   │   ├── suggested_commands.md
│   │   ├── task_completion_checklist.md
│   │   └── tech_stack.md
│   └── project.yml
├── .vscode/
│   └── settings.json
├── docs/
│   ├── rebuild/
│   │   ├── AGILE_TASK_BREAKDOWN.md
│   │   ├── PRD_v2.0.md
│   │   ├── PROJECT_SUMMARY.md
│   │   └── TECH_STACK_ANALYSIS.md
│   └── v1-archive/
│       └── [legacy files]
├── node_modules/
├── v1-legacy/
│   ├── src/
│   │   ├── assets/
│   │   ├── background/
│   │   ├── content/
│   │   ├── features/
│   │   ├── lib/
│   │   └── popup/
│   └── [other v1 files]
└── v2-gmail-label-manager/
    ├── .wxt/
    ├── node_modules/
    ├── public/
    │   └── icons/
    ├── src/
    │   ├── components/
    │   ├── entrypoints/
    │   │   ├── background.ts
    │   │   └── popup/
    │   │       ├── index.html
    │   │       ├── main.tsx
    │   │       ├── App.tsx
    │   │       └── style.css
    │   ├── lib/
    │   ├── styles/
    │   ├── types/
    │   └── utils/
    ├── package.json
    ├── tsconfig.json
    └── wxt.config.ts
```

## Key Features (v2.0)

### Core Features
1. **Label Management**: CRUD operations, bulk actions, color management
2. **Hierarchical Organization**: Nested labels with tree view
3. **Smart Search**: Real-time filtering and highlighting
4. **Backup/Restore**: JSON export/import functionality
5. **Undo/Redo**: Action history management

### Premium Features (Subscription Model)
- Advanced automation rules
- Multi-account support
- Team collaboration
- API access
- Priority support

## Performance Targets
- Initial load: < 300ms
- Label operations: < 100ms
- Search response: < 50ms
- Bundle size: < 800KB (68% reduction from v1)

## Important Notes

### For New Development
1. Always check Linear for task assignments and status
2. Follow the sprint plan in AGILE_TASK_BREAKDOWN.md
3. Update Linear issues as work progresses
4. Use conventional commits for version control
5. Test across Chrome, Edge, and Brave browsers

### Known Issues from v1
- Massive component files (2,651 lines)
- No TypeScript type safety
- No automated testing
- Poor error handling
- Bundle size too large (2.5MB)

### v2 Solutions
- Modular architecture with small, focused components
- Full TypeScript with strict mode
- Comprehensive test coverage
- Proper error boundaries and logging
- Optimized bundle with code splitting

## Contact & Resources
- **Linear Project**: [Gmail Label Manager v2.0](https://linear.app/save-point-au/project/gmail-label-manager-v20-complete-rebuild-f3b41cfa5aab)
- **Repository**: This repository
- **Documentation**: See `/docs/rebuild/` directory

---

**Remember**: Always read `/docs/rebuild/PRD_v2.0.md` before starting any work on this project.