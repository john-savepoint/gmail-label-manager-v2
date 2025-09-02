---
allowed-tools: mcp__linear-server__get_issue, mcp__linear-server__create_comment, mcp__linear-server__create_issue, Bash(git show:*), Bash(git diff:*), Read
argument-hint: [issue-id]
description: Analyze CI/CD integration impact for completed issue
---

# CI/CD Integration Analysis for Issue: $1

## Analysis Context
- Get the parent Linear issue and understand changes made
- Find the dedicated CI/CD integration sub-issue
- Examine all configuration and deployment-related changes
- Understand the project's CI/CD pipeline structure

## CI/CD Impact Assessment Areas

### 1. Build Process Impact
- Analyze changes to build configuration files
- Identify new dependencies or build steps required
- Check for build tool version compatibility
- Assess build time implications

### 2. Deployment Configuration  
- Review changes to deployment scripts
- Identify new environment variables required
- Check for database migration needs
- Assess configuration file updates needed

### 3. Environment Requirements
- Identify new infrastructure dependencies
- Check for updated resource requirements (memory, CPU)
- Review security configuration changes
- Assess monitoring and logging needs

### 4. Integration Dependencies
- Identify new third-party service integrations
- Check API compatibility requirements
- Review authentication/authorization changes
- Assess data pipeline impacts

### 5. Testing Pipeline Impact
- Review automated test configuration changes
- Identify new test environments needed
- Check for performance testing requirements
- Assess end-to-end test updates needed

## Integration Checklist
- [ ] Build configuration updated for new dependencies
- [ ] Environment variables documented and configured
- [ ] Database migrations created and tested
- [ ] Deployment scripts updated for changes
- [ ] Monitoring and alerting configured
- [ ] Rollback procedures documented
- [ ] Security configurations reviewed

## Output Requirements
Create comprehensive analysis in the CI/CD integration sub-issue covering:
- Detailed impact assessment for each area
- Required configuration changes with specific instructions
- New infrastructure or environment requirements
- Risk assessment and mitigation strategies
- Rollback and recovery procedures
- Timeline and dependencies for deployment

## Your Task
Analyze all CI/CD implications of the changes in issue $1, document comprehensive findings in the appropriate Linear sub-issue, and create additional issues for complex integration work if needed.