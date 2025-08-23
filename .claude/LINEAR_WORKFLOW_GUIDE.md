# Linear Workflow Guide - Issue Lifecycle Management

## Purpose
This guide ensures consistent and comprehensive issue management in Linear for the Gmail Label Manager project. Follow this checklist for every issue to maintain project clarity and traceability.

---

## 🚀 When Starting an Issue

### 1. Pre-Work Setup
- [ ] **Verify Issue Assignment**: Ensure issue is assigned to you
- [ ] **Check Prerequisites**: Verify all blocking issues are completed
- [ ] **Review Description**: Read acceptance criteria and technical details thoroughly
- [ ] **Check Branch Name**: Note the auto-generated branch name from Linear

### 2. Status Transition
- [ ] Move from `Backlog` → `Todo` (when planning to work on it soon)
- [ ] Move from `Todo` → `In Progress` (when starting work)

### 3. Initial Comment
Add a comment with:
```markdown
## 🚀 Development Started

**Branch**: `[branch-name]`
**Start Time**: [timestamp]
**Approach**: [brief description of implementation plan]
**Dependencies**: [list any dependencies or blockers]
```

### 4. Update Labels
Add relevant labels:
- Sprint label (e.g., `sprint-1`)
- Technical area (e.g., `typescript`, `setup`, `api-integration`)
- Feature area (e.g., `authentication`, `ui-ux`, `testing`)

---

## 🔄 During Development

### 1. Progress Updates
Add comments for:
- [ ] Major milestones reached
- [ ] Blockers encountered
- [ ] Design decisions made
- [ ] Dependencies discovered

### 2. Link Related Items
- [ ] Link to related issues using `#SAV-XX`
- [ ] Attach relevant documentation links
- [ ] Add screenshots/recordings if UI changes

### 3. Sub-Issues Management
If task needs breakdown:
- [ ] Create sub-issues with `parentId` set
- [ ] Update parent issue description with sub-issue list
- [ ] Track sub-issue completion

---

## ✅ When Completing an Issue

### 1. Code Completion Checklist
- [ ] All acceptance criteria met
- [ ] Tests written and passing
- [ ] Linting and type checking pass
- [ ] Documentation updated
- [ ] Code committed with conventional commit message

### 2. Final Comment Template
```markdown
## ✅ Task Completed

### Summary
[Brief description of what was implemented]

### Changes Made
- ✓ [List of specific changes]
- ✓ [File modifications]
- ✓ [New files created]

### Technical Details
- **Branch**: `[branch-name]`
- **Commit**: `[commit-hash]`
- **Files Modified**: [count]
- **Lines Added/Removed**: +[added] -[removed]

### Testing
- [ ] Unit tests passing
- [ ] Integration tests passing
- [ ] Manual testing completed
- [ ] Cross-browser testing (if applicable)

### Documentation
- [ ] Code comments added
- [ ] README updated (if needed)
- [ ] API docs updated (if applicable)

### Next Steps
[Any follow-up tasks or considerations]
```

### 3. Status & Label Updates
- [ ] Move to `In Review` (if PR created)
- [ ] Move to `Done` (when merged/completed)
- [ ] Add `completed` label
- [ ] Remove `in-progress` label
- [ ] Update priority if needed

### 4. Metadata Updates
- [ ] Set completion date
- [ ] Update estimate vs actual time (if tracked)
- [ ] Link to PR (if applicable)
- [ ] Link to deployed version (if applicable)

---

## 📊 Issue Priority Guidelines

### P0 - Critical (Urgent)
- Blocking other work
- Security issues
- Production breaks
- Sprint-critical path items

### P1 - High (Important)
- Core features
- Major bugs
- Sprint commitments

### P2 - Medium (Normal)
- Enhancement features
- Non-critical bugs
- Nice-to-have improvements

### P3 - Low
- Minor improvements
- Documentation
- Technical debt (non-urgent)

---

## 🏷️ Label Categories

### Sprint Labels
- `sprint-1` through `sprint-6`
- Only one sprint label per issue

### Status Labels
- `blocked` - Waiting on external dependency
- `ready-for-review` - Code complete, needs review
- `needs-qa` - Requires testing
- `completed` - Work is done

### Technical Labels
- `bug` - Defect in existing functionality
- `feature` - New functionality
- `refactor` - Code improvement without behavior change
- `documentation` - Docs only
- `testing` - Test-related work
- `infrastructure` - Build/deploy/tooling

### Component Labels
- `frontend` - UI/UX work
- `backend` - Service/API work
- `api-integration` - External API work
- `database` - Data layer work
- `security` - Security-related tasks

---

## 📝 Comment Best Practices

### Good Comments Include:
1. **Context**: Why decisions were made
2. **Problems**: Issues encountered and solutions
3. **Links**: References to docs, Stack Overflow, etc.
4. **Code Snippets**: Key implementation details
5. **Screenshots**: UI changes or error messages

### Comment Triggers:
- Starting work
- Major decision point
- Blocker encountered
- Blocker resolved
- PR created
- Review feedback addressed
- Task completed

---

## 🔗 Relationship Management

### Parent/Child Issues
- Use for breaking down large tasks
- Parent issue should list all children
- Close parent only when all children complete

### Blocking/Blocked By
- Mark dependencies explicitly
- Add comment explaining the dependency
- Update when blocker is resolved

### Related Issues
- Link issues that share context
- Cross-reference in comments
- Consider combining if too similar

---

## 📅 Time Management

### Estimates
- Add time estimates when creating issues
- Update if scope changes significantly
- Track actual vs estimated for retrospectives

### Due Dates
- Set for milestone/deadline-driven work
- Update if timeline changes
- Add comment explaining any delays

---

## 🚨 Special Situations

### When Blocked
1. Add `blocked` label
2. Comment with blocker details
3. Move to `Todo` or create blocking issue
4. Tag relevant team members

### When Scope Changes
1. Update description
2. Add comment explaining change
3. Update estimates
4. Consider splitting into multiple issues

### When Deferring
1. Move to `Backlog`
2. Remove sprint label
3. Add comment with reason
4. Update priority

### When Cancelling
1. Move to `Cancelled` status
2. Add detailed comment why
3. Link to replacement issue if applicable

---

## 📋 Quick Checklist

### Daily Workflow
```markdown
Morning:
□ Review assigned issues
□ Update issue statuses
□ Check for blockers
□ Plan day's work

During Work:
□ Keep issue in "In Progress"
□ Add progress comments
□ Update if blocked

End of Day:
□ Update issue status
□ Add progress comment
□ Push code changes
□ Update tomorrow's plan
```

### Sprint Workflow
```markdown
Sprint Start:
□ Review sprint goals
□ Verify issue assignments
□ Check dependencies
□ Set issue priorities

Sprint End:
□ Complete issue updates
□ Move incomplete work
□ Add retrospective notes
□ Update velocity metrics
```

---

## 🎯 Quality Gates

Before marking an issue as `Done`, verify:

### Code Quality
- [ ] Follows project conventions
- [ ] No commented-out code
- [ ] No console.logs (unless intentional)
- [ ] Error handling implemented
- [ ] TypeScript types properly defined

### Testing
- [ ] Unit tests cover new code
- [ ] Integration tests pass
- [ ] Manual testing completed
- [ ] Edge cases considered

### Documentation
- [ ] Code is self-documenting
- [ ] Complex logic has comments
- [ ] README updated if needed
- [ ] API changes documented

### Review
- [ ] Self-review completed
- [ ] Peer review (if required)
- [ ] Feedback addressed
- [ ] Approved for merge

---

## 📚 Templates

### Bug Report Comment
```markdown
## 🐛 Bug Found

**Severity**: [Critical/High/Medium/Low]
**Environment**: [Development/Staging/Production]
**Browser**: [Chrome/Firefox/Edge]

### Description
[What's broken]

### Steps to Reproduce
1. [Step 1]
2. [Step 2]
3. [Step 3]

### Expected Behavior
[What should happen]

### Actual Behavior
[What actually happens]

### Screenshots/Logs
[Attach evidence]
```

### Retrospective Comment
```markdown
## 📊 Task Retrospective

### What Went Well
- [Positive point 1]
- [Positive point 2]

### What Could Improve
- [Improvement area 1]
- [Improvement area 2]

### Lessons Learned
- [Learning 1]
- [Learning 2]

### Time Analysis
- Estimated: [X hours]
- Actual: [Y hours]
- Difference: [±Z hours]
- Reason: [Why different]
```

---

## 🔄 Continuous Improvement

This guide should be updated when:
- New patterns emerge
- Process improvements identified
- Team agreements change
- Tools/integrations added

Last Updated: 2025-08-23
Version: 1.0.0

---

**Remember**: Consistent issue management helps the entire team understand project status and enables better collaboration!