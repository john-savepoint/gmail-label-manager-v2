---
allowed-tools: mcp__linear-server__get_issue, mcp__linear-server__create_issue, mcp__linear-server__create_comment, mcp__linear-server__list_issues, Bash(git show:*), Bash(git diff:*)
argument-hint: [issue-id]
description: Conduct comprehensive code review for completed issue
---

# Code Review for Issue: $1

## Critical Review Stance
Assume the code has problems until proven otherwise. Your job is to find issues, not validate existing work.

## Review Context
- Get the parent Linear issue details
- Find the associated sub-issue for this code review
- Identify the commits and changes made
- Understand the requirements that were supposed to be met

## Code Analysis Areas
1. **Security Review**: Look for vulnerabilities, input validation, authentication issues
2. **Performance Analysis**: Identify potential bottlenecks, inefficient algorithms, resource usage
3. **Logic Verification**: Check for edge cases, error handling, business logic correctness
4. **Code Quality**: Assess maintainability, readability, adherence to standards
5. **Requirements Compliance**: Verify implementation matches acceptance criteria

## Review Process
1. Examine all modified files and understand the changes
2. Check for common security vulnerabilities
3. Assess performance implications of the changes
4. Verify error handling and edge case coverage
5. Check adherence to project coding standards
6. Validate that acceptance criteria are actually met

## Output Requirements
Create a detailed report in the dedicated code review sub-issue including:
- Security assessment results
- Performance analysis findings  
- Logic and correctness evaluation
- Code quality observations
- Requirements compliance verification
- Specific recommendations for improvements
- New issues to create if critical problems found

## Your Task
Conduct a thorough, critical review of the code changes for issue $1, document all findings in the appropriate Linear sub-issue, and create additional issues for any critical problems discovered.