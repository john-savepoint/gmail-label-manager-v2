---
allowed-tools: mcp__linear-server__list_issues, mcp__linear-server__get_issue
argument-hint: [issue-id]
description: Check surrounding Linear issues for context and prevent duplicate work
---

# Context Check for Issue: $1

## Contextual Awareness Protocol
Before working on issue $1, check surrounding issues to prevent duplicate work and understand dependencies.

## Context Queries

### Adjacent Issue Check
Check issues immediately surrounding the current one:
- Issue $1-2 (two before current)
- Issue $1-1 (one before current)  
- Issue $1+1 (one after current)
- Issue $1+2 (two after current)

### Similar Work Search
Search for issues that might overlap with current work:
- Search by component/feature keywords
- Search by similar functionality
- Search for related technical terms
- Check for blocked or dependent issues

## Duplication Prevention
If similar work is found:
- Compare scope and requirements
- Identify if work is redundant  
- Check for dependencies between issues
- Determine if consolidation is needed

## Context Documentation
Document findings including:
- Related issues discovered
- Potential conflicts or overlaps
- Dependencies identified
- Recommendations for coordination

## Your Task
Perform comprehensive context analysis for issue $1, identify any potential conflicts or duplications, and ensure the work fits properly within the overall project plan before beginning development.