---
allowed-tools: Task
argument-hint: [issue-id]
description: Trigger complete sub-agent workflow for issue review
---

# Sub-Agent Workflow for Issue: $1

## Workflow Overview
This command triggers the complete four-agent review process for issue $1 in the correct sequence.

## Agent Sequence
The sub-agents will be executed in this order:

1. **Code Review Agent** - Critical security, performance, and quality analysis
2. **CI/CD Integration Expert** - Infrastructure and deployment impact analysis  
3. **Testing Agent** - Comprehensive testing beyond unit tests
4. **Documentation & Orchestration Agent** - Documentation updates and next issue preparation

## Execution Plan
Each agent will:
- Create or update their dedicated Linear sub-issue
- Conduct thorough analysis in their specialty area
- Document findings with specific recommendations
- Create additional Linear issues for critical problems found
- Pass context to the next agent in sequence

## Quality Gates
The workflow ensures:
- No single agent can mark parent issue as "Done"
- All findings are documented and traceable
- Critical issues are identified and addressed
- Project documentation stays current
- Next development phase is properly prepared

## Your Task
Execute the complete sub-agent review workflow for issue $1 by triggering each specialized agent in sequence, ensuring comprehensive review and quality assurance before the issue can be marked as complete.