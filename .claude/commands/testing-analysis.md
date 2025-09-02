---
allowed-tools: mcp__linear-server__get_issue, mcp__linear-server__create_comment, mcp__linear-server__create_issue, Bash(npm test:*), Bash(npm run:*), Bash(git show:*), Read
argument-hint: [issue-id]
description: Conduct comprehensive testing analysis beyond basic unit tests
---

# Testing Analysis for Issue: $1

## Testing Context
- Get the parent Linear issue and understand functionality changes
- Find the dedicated testing analysis sub-issue  
- Review code changes and identify testing requirements
- Understand existing test coverage and gaps

## Comprehensive Testing Strategy

### 1. Integration Testing
- Test interactions between modified components
- Verify API endpoint functionality and contracts
- Test database integration and data persistence
- Validate third-party service integrations

### 2. End-to-End Testing  
- Test complete user workflows involving the changes
- Verify cross-browser compatibility (if frontend changes)
- Test mobile responsiveness (if UI changes)
- Validate user experience flows

### 3. Performance Testing
- Load testing for new or modified endpoints
- Memory usage analysis for algorithmic changes
- Database query performance evaluation
- Frontend rendering performance (if applicable)

### 4. Security Testing
- Input validation and sanitization testing
- Authentication and authorization testing
- SQL injection and XSS vulnerability testing
- Data privacy and compliance validation

### 5. Accessibility Testing
- WCAG compliance verification (if UI changes)
- Screen reader compatibility testing
- Keyboard navigation testing
- Color contrast and visual accessibility

### 6. Regression Testing
- Verify existing functionality still works
- Test edge cases and error conditions
- Validate backward compatibility
- Check for unintended side effects

## Testing Execution Plan
1. **Automated Test Suite**: Execute all existing automated tests
2. **New Test Development**: Create tests for new functionality
3. **Manual Testing**: Perform exploratory testing for edge cases
4. **Performance Benchmarking**: Measure and compare performance metrics
5. **Security Validation**: Run security scanning tools and manual tests
6. **User Acceptance**: Validate against original acceptance criteria

## Test Documentation Requirements
- Test case descriptions and expected outcomes
- Test data requirements and setup procedures
- Environment configuration for testing
- Test execution results and evidence
- Defect reports with reproduction steps
- Performance benchmarks and analysis

## Output Requirements
Create comprehensive testing report in the testing analysis sub-issue including:
- Complete test strategy and execution plan
- Detailed test results for each testing category
- Performance metrics and analysis
- Security testing findings
- Accessibility compliance assessment
- Defect summary with severity and priority
- Recommendations for additional testing
- New issues for critical bugs or testing gaps

## Your Task
Execute comprehensive testing beyond the basic unit tests for issue $1, document all findings and results in the appropriate Linear sub-issue, and create bug reports or testing enhancement issues as needed.