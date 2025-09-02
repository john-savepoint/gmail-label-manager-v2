---
allowed-tools: Bash(git worktree:*), Bash(git branch:*), Bash(git push:*), mcp__linear-server__create_comment
argument-hint: [issue-id]
description: Clean up work tree after successful issue completion and merge
---

# Work Tree Cleanup for Issue: $1

## Prerequisites
Before cleanup, verify:
- Issue has been successfully merged to dev branch
- CI/CD pipeline is passing
- All sub-agent reviews are complete
- Issue is marked as "Done" in Linear

## Cleanup Process

### 1. Verify Merge Status
- Confirm feature branch has been merged to dev
- Check that remote dev branch includes the changes
- Verify CI/CD pipeline completed successfully

### 2. Remote Branch Cleanup
- Delete the remote feature branch (no longer needed)
- Verify remote branch deletion was successful

### 3. Work Tree Removal  
- Remove the local work tree directory
- Confirm work tree has been completely removed
- Update git work tree registry

### 4. Local Branch Cleanup
- Delete the local feature branch (merged copy)
- Clean up any orphaned references
- Verify git repository is in clean state

## Validation Steps
After cleanup:
- Confirm work tree no longer exists in filesystem
- Verify git worktree list shows tree is removed
- Check git branch list shows feature branch is gone
- Validate main codebase is unaffected

## Documentation
Log cleanup completion in Linear issue including:
- Confirmation of successful merge
- Work tree removal timestamp
- Branch cleanup verification
- Final project status

## Your Task
Perform complete cleanup of the work tree and branches for issue $1 after confirming successful merge and completion, ensuring no artifacts remain that could cause confusion in future development.