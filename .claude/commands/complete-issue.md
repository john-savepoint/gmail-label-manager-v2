---
allowed-tools: mcp__linear-server__update_issue, mcp__linear-server__create_comment, Bash(git add:*), Bash(git commit:*), Bash(git push:*), Bash(npm test:*), Bash(npm run build:*)
argument-hint: [issue-id]
description: Complete work on a Linear issue and trigger sub-agent reviews
---

# Complete Issue: $1

## Pre-Completion Validation
- Run full test suite to ensure all tests pass
- Execute build process to verify no build errors
- Confirm all acceptance criteria are met
- Verify all changes are committed

## Final Commit and Push
- Stage all changes for final commit
- Create comprehensive commit message linking to Linear issue
- Push feature branch to remote repository

## Linear Update
- Update issue status to "In Review"
- Add completion summary with:
  - Work accomplished
  - Files modified
  - Tests run and results
  - Commit hash references
  - Next steps for sub-agent reviews

## Sub-Agent Trigger
- Activate the four sub-agent reviews:
  1. Code Review Agent
  2. CI/CD Integration Expert
  3. Testing Agent  
  4. Documentation & Orchestration Agent

## Your Task
1. Validate all work is complete and tested
2. Commit and push all changes with proper documentation
3. Update Linear issue with comprehensive completion report
4. Trigger the sub-agent review workflow
5. Do NOT mark issue as "Done" - that happens after sub-agent reviews