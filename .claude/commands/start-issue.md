---
allowed-tools: mcp__linear-server__get_issue, mcp__linear-server__list_issues, mcp__linear-server__update_issue, Bash(git worktree:*), Bash(git checkout:*), Bash(git pull:*), Bash(cd:*), Bash(pwd:*)
argument-hint: [issue-id]
description: Initialize work on a Linear issue with proper work tree setup
---

# Start Issue: $1

## Context Check
First, let me check the Linear issue and surrounding context:

!`echo "Checking Linear issue: $1"`

## Linear Issue Analysis
- Get issue details: Get the complete Linear issue information
- Check for duplicates: Search for similar issues to prevent duplicate work
- Verify status: Ensure issue is ready for work

## Work Tree Setup
- Synchronize dev branch with remote
- Create isolated work tree for this issue
- Set up feature branch
- Update Linear issue with work tree information

## Validation
- Confirm work tree creation successful
- Verify build system works in new environment
- Update issue status to "In Progress"

## Your Task
1. Analyze the Linear issue $1 comprehensively
2. Check for any duplicate or conflicting work
3. Create a clean work tree environment
4. Begin development work according to SOP requirements