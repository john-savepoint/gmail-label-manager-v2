# SOP 03: Git Work Tree Workflow Protocol

**Version:** 1.0  
**Created:** 2025-01-31  
**Last Modified:** 2025-01-31  

## Overview

This SOP defines the mandatory Git work tree workflow that ensures isolated development environments for each Linear issue while maintaining code stability and enabling concurrent development efforts.

## Core Principles

1. **Isolation**: Every issue gets its own isolated work tree
2. **Stability**: Main branch is always production-ready, dev branch is always buildable
3. **Traceability**: Every change is traceable to a specific Linear issue
4. **Automation**: CI/CD triggers automatically on dev branch updates

## 1. Branch Strategy

### 1.1 Primary Branches

**main branch:**
- Always production-ready and stable
- No direct development work
- Only receives merges from dev after full testing
- Tagged for releases

**dev branch:**
- Integration branch for all feature work
- Must always be in buildable state
- CI/CD pipeline triggers on every push
- Source for all work tree creation

### 1.2 Feature Branches (via Work Trees)
- Created automatically for each Linear issue
- Isolated in separate work tree directories
- Merged back to dev upon completion
- Automatically deleted after successful merge

## 2. Work Tree Directory Structure

### 2.1 Project Layout
```
/project-name/
├── /codebase/                 # Main repository (dev branch)
├── /work-trees/               # All active work trees
│   ├── /issue-1-project-setup/
│   ├── /issue-1.1-typescript-config/
│   ├── /issue-2-authentication/
│   └── /issue-2.1-oauth-implementation/
├── /docs/
├── /requirements/
└── /.sop/
```

### 2.2 Work Tree Naming Convention
**Format:** `issue-[ISSUE-ID]-[short-description]`

**Examples:**
- `issue-1-project-setup`
- `issue-1.1-typescript-config`
- `issue-2.1.3-password-validation`

**Rules:**
- Use lowercase letters only
- Replace spaces with hyphens
- Maximum 50 characters total
- Must be filesystem-safe

## 3. Work Tree Lifecycle

### 3.1 Work Tree Creation Protocol

**Prerequisites:**
- Linear issue must exist and be assigned
- Agent must be ready to begin work
- Codebase must be synchronized with remote dev

**Steps:**
```bash
# 1. Navigate to main codebase
cd /project-name/codebase

# 2. Ensure dev branch is current
git checkout dev
git pull origin dev

# 3. Create work tree from dev branch
git worktree add ../work-trees/issue-[ID]-[description] dev

# 4. Navigate to new work tree
cd ../work-trees/issue-[ID]-[description]

# 5. Create feature branch
git checkout -b feature/issue-[ID]-[description]

# 6. Update Linear with work tree information
# (via Linear MCP)
```

### 3.2 Development Phase Protocol

**Working in the Work Tree:**
- ALL development work occurs within the work tree directory
- No modifications to main codebase during active development
- Regular commits with descriptive messages
- Frequent status updates to Linear issue

**Commit Message Format:**
```
[ISSUE-ID]: Brief description of changes

- Detailed explanation of changes made
- Any breaking changes noted
- References to documentation or resources used

Linear-Issue: [ISSUE-URL]
```

### 3.3 Testing Protocol

**Local Testing Requirements:**
- Unit tests must pass before any commit
- Integration tests must pass before merge request
- Build process must complete successfully
- Linting and formatting must pass (via Husky hooks)

**Pre-Merge Testing:**
```bash
# Run full test suite
npm test              # or appropriate command for tech stack
npm run build         # or appropriate build command
npm run lint          # or appropriate linting command
npm run type-check    # if using TypeScript
```

### 3.4 Integration Protocol

**Preparing for Integration:**
```bash
# 1. Ensure all changes are committed
git add .
git commit -m "[ISSUE-ID]: Final changes for issue completion"

# 2. Update from dev branch
git fetch origin
git rebase origin/dev

# 3. Run final test suite
npm test && npm run build

# 4. Push feature branch
git push origin feature/issue-[ID]-[description]
```

**Merging to Dev:**
```bash
# 1. Switch to dev branch in main codebase
cd /project-name/codebase
git checkout dev

# 2. Merge feature branch
git merge --no-ff feature/issue-[ID]-[description]

# 3. Push to remote
git push origin dev

# 4. Update Linear issue status
# (via Linear MCP - mark as "In Review")
```

### 3.5 Work Tree Cleanup Protocol

**Post-Merge Cleanup:**
```bash
# 1. Delete remote feature branch
git push origin --delete feature/issue-[ID]-[description]

# 2. Remove work tree
git worktree remove ../work-trees/issue-[ID]-[description]

# 3. Delete local feature branch
git branch -d feature/issue-[ID]-[description]

# 4. Update Linear issue
# (Log cleanup completion via Linear MCP)
```

## 4. Concurrent Development Support

### 4.1 Multiple Work Trees
- Multiple issues can be developed simultaneously
- Each work tree is completely isolated
- No conflicts between concurrent development efforts
- Resource usage scales linearly with active issues

### 4.2 Work Tree Management Commands
```bash
# List all work trees
git worktree list

# Show work tree status
git worktree list --verbose

# Repair work trees (if filesystem moved)
git worktree repair

# Remove work tree (safe cleanup)
git worktree remove [path]
```

## 5. Change Set Management

### 5.1 Change Set Documentation
Every merge to dev must include:
- Comprehensive change description
- Impact analysis on existing functionality
- Migration notes (if applicable)
- Testing verification checklist
- Performance impact assessment

### 5.2 Change Set Template
```markdown
# Change Set: [ISSUE-ID]

## Summary
Brief description of changes made.

## Files Modified
- `path/to/file1.ts` - Description of changes
- `path/to/file2.ts` - Description of changes

## Impact Analysis
- **Breaking Changes**: Yes/No - Description if yes
- **Database Changes**: Yes/No - Description if yes
- **API Changes**: Yes/No - Description if yes
- **Configuration Changes**: Yes/No - Description if yes

## Testing Performed
- [ ] Unit tests passing
- [ ] Integration tests passing
- [ ] Manual testing completed
- [ ] Performance testing (if applicable)

## Deployment Notes
Any special considerations for deployment.
```

## 6. Quality Gates and Automation

### 6.1 Pre-Commit Hooks (Husky)
Required hooks for all work trees:
- Lint checking (ESLint, Prettier, etc.)
- Type checking (TypeScript)
- Unit test execution
- Security scanning
- Dependency vulnerability check

### 6.2 Pre-Push Hooks
- Integration test execution
- Build verification
- Bundle size analysis
- Code coverage threshold check

### 6.3 CI/CD Integration
**Dev Branch Pipeline:**
- Automated build and test
- Code quality analysis
- Security scanning
- Deployment to staging environment
- Automated testing in staging

**Main Branch Pipeline:**
- Full regression test suite
- Performance testing
- Security audit
- Production deployment
- Health checks and monitoring

## 7. Error Handling and Recovery

### 7.1 Work Tree Corruption
If work tree becomes corrupted:
```bash
# 1. Check work tree status
git worktree list

# 2. Remove corrupted work tree
git worktree remove [path] --force

# 3. Recreate from clean state
git worktree add [path] dev

# 4. Restore work from backup/commits
git checkout feature/issue-[ID]-[description]

# 5. Update Linear with recovery actions
```

### 7.2 Merge Conflicts
When conflicts occur during rebase or merge:
```bash
# 1. Identify conflicted files
git status

# 2. Resolve conflicts manually
# Edit files to resolve conflicts

# 3. Stage resolved files
git add [resolved-files]

# 4. Continue rebase/merge
git rebase --continue  # or git commit for merge

# 5. Verify build still works
npm test && npm run build

# 6. Document resolution in Linear
```

### 7.3 Failed CI/CD Pipeline
When dev branch build fails:
1. Immediately investigate and identify cause
2. Create hotfix work tree if necessary
3. Implement fix and test thoroughly
4. Fast-track merge to restore dev branch stability
5. Update all stakeholders via Linear

## 8. Performance Considerations

### 8.1 Disk Space Management
- Monitor work tree disk usage
- Clean up completed work trees promptly
- Archive old feature branches before deletion
- Regular cleanup of build artifacts

### 8.2 Git Performance
- Keep work trees clean (no unnecessary files)
- Regular git garbage collection
- Prune remote references periodically
- Monitor repository size growth

## Success Criteria

Work tree workflow is successful when:
- All development work is properly isolated
- No conflicts between concurrent development
- Dev branch maintains stability and buildability
- All changes are traceable to Linear issues
- CI/CD pipeline operates reliably
- Work tree cleanup is complete and timely