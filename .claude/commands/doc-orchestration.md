---
allowed-tools: mcp__linear-server__get_issue, mcp__linear-server__list_issues, mcp__linear-server__update_issue, mcp__linear-server__create_comment, Read, Edit, Write
argument-hint: [issue-id]  
description: Update documentation and orchestrate next issue preparation
---

# Documentation & Orchestration for Issue: $1

## Context Review
- Get the parent Linear issue and all completed sub-agent reviews
- Understand the full scope of changes made
- Review findings from Code Review, CI/CD, and Testing agents
- Analyze impact on project architecture and documentation

## Documentation Update Tasks

### 1. Project Documentation Updates
- Update README.md with new features or changes
- Modify API documentation for endpoint changes  
- Update architectural documentation for structural changes
- Revise user guides for functionality changes
- Update troubleshooting guides for known issues

### 2. Technical Documentation
- Update inline code documentation and comments
- Modify configuration documentation
- Update deployment and setup instructions
- Revise development environment setup guides
- Update testing documentation and procedures

### 3. Changelog Management
- Add comprehensive changelog entry for this issue
- Include breaking changes, new features, and bug fixes
- Document any migration steps required
- Update version information if applicable

## Orchestration Tasks

### 4. Surrounding Issue Analysis
- Check issues immediately before and after current issue (±2)
- Identify potential conflicts or dependencies with upcoming work
- Review project timeline and milestone alignment
- Assess resource requirements for next phases

### 5. Next Issue Preparation
Find the next major issue in the sequence and:
- Add contextual summary from current issue
- Document any outputs or artifacts from current work
- Identify dependencies that are now resolved
- Note any new dependencies created by current work
- Prepare resource requirements (MCP servers, documentation needed)

### 6. Pre-Investigation for Next Issue
- Research technical approaches for next issue
- Identify required Context7 or other MCP server documentation
- Assess complexity and potential challenges
- Recommend preparation steps for next development cycle

## Quality Assurance Review
- Validate all sub-agent recommendations have been addressed
- Confirm all documentation is accurate and current
- Verify next issue preparation is complete
- Check for any missing integration or testing work

## Final Orchestration Report
Create comprehensive final report in the documentation & orchestration sub-issue:

### Completed Work Summary
- What was accomplished in this issue
- Key changes and their impact
- Documentation updates made
- Quality assurance validation results

### Next Issue Preparation
- Summary for next issue developers
- Critical information and context to pass forward
- Resource requirements and recommendations
- Potential challenges and approaches researched

### Project Status Update
- Impact on overall project timeline
- Dependencies resolved and created
- Recommendations for project management
- Quality metrics and observations

## Your Task
1. Update all relevant project documentation to reflect changes from issue $1
2. Analyze surrounding issues and prepare comprehensive context for next issue
3. Pre-investigate next issue requirements and approaches
4. Create final orchestration report consolidating all findings and preparing project for next phase