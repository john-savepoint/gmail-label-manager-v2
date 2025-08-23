#!/usr/bin/env node

/**
 * AI PR Review Automation
 * Provides intelligent code review suggestions for pull requests
 */

const { execSync } = require('child_process');
const fs = require('fs');
const path = require('path');

// Review categories and patterns
const REVIEW_PATTERNS = {
  security: {
    priority: 'high',
    patterns: [
      { regex: /api[_-]?key/gi, message: 'Potential API key exposure' },
      { regex: /password\s*=\s*["'][^"']+["']/gi, message: 'Hardcoded password detected' },
      { regex: /token\s*=\s*["'][^"']+["']/gi, message: 'Hardcoded token detected' },
      { regex: /eval\(/g, message: 'Use of eval() is dangerous' },
      { regex: /innerHTML\s*=/g, message: 'Direct innerHTML assignment can lead to XSS' },
      { regex: /document\.write/g, message: 'document.write is unsafe' },
      { regex: /chrome\.tabs\.executeScript/g, message: 'Script injection requires careful validation' }
    ]
  },
  performance: {
    priority: 'medium',
    patterns: [
      { regex: /console\.(log|debug|info)/g, message: 'Remove console statements before production' },
      { regex: /setTimeout.*0\)/g, message: 'Consider using requestAnimationFrame instead of setTimeout(0)' },
      { regex: /for\s*\(.*in\s+/g, message: 'for...in loops are slower than for...of or regular for loops' },
      { regex: /\.forEach\(/g, message: 'Consider using for...of for better performance' },
      { regex: /JSON\.parse\(JSON\.stringify/g, message: 'Deep cloning via JSON is inefficient' }
    ]
  },
  bestPractices: {
    priority: 'low',
    patterns: [
      { regex: /var\s+/g, message: 'Use const or let instead of var' },
      { regex: /==(?!=)/g, message: 'Use === for strict equality' },
      { regex: /!=(?!=)/g, message: 'Use !== for strict inequality' },
      { regex: /catch\s*\(\s*\)/g, message: 'Empty catch blocks hide errors' },
      { regex: /async\s+function.*\{[^}]*\}/g, checkFor: 'await', message: 'Async function without await' },
      { regex: /TODO|FIXME|HACK/gi, message: 'Unresolved TODO/FIXME/HACK comment' }
    ]
  },
  typescript: {
    priority: 'medium',
    patterns: [
      { regex: /:\s*any\b/g, message: 'Avoid using "any" type' },
      { regex: /@ts-ignore/g, message: '@ts-ignore suppresses TypeScript errors' },
      { regex: /@ts-nocheck/g, message: '@ts-nocheck disables all TypeScript checking' },
      { regex: /as\s+any\b/g, message: 'Avoid type assertion to "any"' },
      { regex: /\/\/\s*@ts-expect-error/g, message: 'Address @ts-expect-error comments' }
    ]
  },
  react: {
    priority: 'medium',
    patterns: [
      { regex: /componentWillMount|componentWillReceiveProps|componentWillUpdate/g, message: 'Deprecated lifecycle method' },
      { regex: /array\.index\s+as\s+key/gi, message: 'Using array index as key can cause issues' },
      { regex: /setState\([^)]*this\.state/g, message: 'setState should use callback for state-dependent updates' },
      { regex: /useEffect\(\s*\(\)\s*=>\s*\{[^}]*\},\s*\[\s*\]\s*\)/g, checkFor: 'cleanup', message: 'useEffect with empty deps might need cleanup' }
    ]
  },
  accessibility: {
    priority: 'medium',
    patterns: [
      { regex: /<img(?![^>]*alt\s*=)/gi, message: 'img tag missing alt attribute' },
      { regex: /<button(?![^>]*aria-label)/gi, message: 'Button might need aria-label' },
      { regex: /onClick(?![^}]*onKeyDown)/gi, message: 'onClick without keyboard handler' },
      { regex: /<div[^>]*onClick/gi, message: 'Interactive div should be a button' }
    ]
  }
};

// Complexity analysis
function analyzeComplexity(content) {
  const lines = content.split('\n');
  const metrics = {
    loc: lines.length,
    complexity: 0,
    depth: 0,
    functions: 0
  };
  
  let currentDepth = 0;
  let maxDepth = 0;
  
  lines.forEach(line => {
    // Count opening braces for depth
    const openBraces = (line.match(/\{/g) || []).length;
    const closeBraces = (line.match(/\}/g) || []).length;
    currentDepth += openBraces - closeBraces;
    maxDepth = Math.max(maxDepth, currentDepth);
    
    // Count complexity indicators
    if (/if\s*\(|while\s*\(|for\s*\(/.test(line)) metrics.complexity++;
    if (/function\s+\w+|const\s+\w+\s*=\s*\(/.test(line)) metrics.functions++;
  });
  
  metrics.depth = maxDepth;
  
  return metrics;
}

// Check for test coverage
function checkTestCoverage(changedFiles) {
  const suggestions = [];
  
  changedFiles.forEach(file => {
    const ext = path.extname(file);
    const baseName = path.basename(file, ext);
    const dir = path.dirname(file);
    
    // Check for corresponding test file
    const testPatterns = [
      path.join(dir, '__tests__', `${baseName}.test${ext}`),
      path.join(dir, '__tests__', `${baseName}.spec${ext}`),
      path.join(dir, `${baseName}.test${ext}`),
      path.join(dir, `${baseName}.spec${ext}`)
    ];
    
    const hasTest = testPatterns.some(pattern => fs.existsSync(pattern));
    
    if (!hasTest && (ext === '.ts' || ext === '.tsx' || ext === '.js' || ext === '.jsx')) {
      suggestions.push({
        file,
        type: 'test',
        message: 'No test file found for this component/module',
        priority: 'medium'
      });
    }
  });
  
  return suggestions;
}

// Review individual file
function reviewFile(filePath, diff) {
  const issues = [];
  const suggestions = [];
  
  // Read file content if it exists
  let content = '';
  if (fs.existsSync(filePath)) {
    content = fs.readFileSync(filePath, 'utf8');
  }
  
  // Apply review patterns
  Object.entries(REVIEW_PATTERNS).forEach(([category, config]) => {
    config.patterns.forEach(pattern => {
      const matches = content.matchAll(pattern.regex);
      for (const match of matches) {
        // Check if this is in the diff (new or modified line)
        const lineNum = content.substring(0, match.index).split('\n').length;
        
        if (pattern.checkFor) {
          // Special check (e.g., async without await)
          const functionBody = match[0];
          if (!new RegExp(pattern.checkFor).test(functionBody)) {
            issues.push({
              category,
              line: lineNum,
              message: pattern.message,
              priority: config.priority,
              snippet: match[0].substring(0, 100)
            });
          }
        } else {
          issues.push({
            category,
            line: lineNum,
            message: pattern.message,
            priority: config.priority,
            snippet: match[0].substring(0, 100)
          });
        }
      }
    });
  });
  
  // Analyze complexity
  const complexity = analyzeComplexity(content);
  if (complexity.complexity > 10) {
    suggestions.push({
      type: 'complexity',
      message: `High cyclomatic complexity (${complexity.complexity}). Consider refactoring.`,
      priority: 'medium'
    });
  }
  
  if (complexity.depth > 5) {
    suggestions.push({
      type: 'nesting',
      message: `Deep nesting detected (depth: ${complexity.depth}). Consider extracting functions.`,
      priority: 'low'
    });
  }
  
  if (complexity.loc > 300) {
    suggestions.push({
      type: 'size',
      message: `File is large (${complexity.loc} lines). Consider splitting into smaller modules.`,
      priority: 'low'
    });
  }
  
  return { issues, suggestions, metrics: complexity };
}

// Generate PR review comment
function generateReviewComment(results) {
  let comment = '## 🤖 AI Code Review\n\n';
  
  // Summary
  const totalIssues = results.reduce((sum, r) => sum + r.issues.length, 0);
  const highPriority = results.reduce((sum, r) => 
    sum + r.issues.filter(i => i.priority === 'high').length, 0);
  
  comment += '### Summary\n';
  comment += `- Files reviewed: ${results.length}\n`;
  comment += `- Issues found: ${totalIssues}\n`;
  comment += `- High priority: ${highPriority}\n\n`;
  
  if (totalIssues === 0) {
    comment += '✅ **No issues detected!** The code looks good.\n\n';
  }
  
  // High priority issues
  if (highPriority > 0) {
    comment += '### 🔴 High Priority Issues\n\n';
    results.forEach(result => {
      const highIssues = result.issues.filter(i => i.priority === 'high');
      if (highIssues.length > 0) {
        comment += `**${result.file}**\n`;
        highIssues.forEach(issue => {
          comment += `- Line ${issue.line}: ${issue.message}\n`;
          comment += `  \`\`\`${result.file.endsWith('.ts') ? 'typescript' : 'javascript'}\n`;
          comment += `  ${issue.snippet}\n`;
          comment += `  \`\`\`\n`;
        });
        comment += '\n';
      }
    });
  }
  
  // Medium priority issues
  const mediumIssues = results.reduce((all, r) => 
    all.concat(r.issues.filter(i => i.priority === 'medium')), []);
  
  if (mediumIssues.length > 0) {
    comment += '### 🟡 Medium Priority Issues\n\n';
    const byCategory = {};
    mediumIssues.forEach(issue => {
      if (!byCategory[issue.category]) byCategory[issue.category] = [];
      byCategory[issue.category].push(issue);
    });
    
    Object.entries(byCategory).forEach(([category, issues]) => {
      comment += `**${category}:**\n`;
      issues.slice(0, 5).forEach(issue => {
        comment += `- ${issue.message}\n`;
      });
      if (issues.length > 5) {
        comment += `- ...and ${issues.length - 5} more\n`;
      }
      comment += '\n';
    });
  }
  
  // Suggestions
  const allSuggestions = results.reduce((all, r) => all.concat(r.suggestions), []);
  if (allSuggestions.length > 0) {
    comment += '### 💡 Suggestions\n\n';
    allSuggestions.forEach(suggestion => {
      comment += `- ${suggestion.message}\n`;
    });
    comment += '\n';
  }
  
  // Test coverage
  const missingTests = results.filter(r => 
    r.suggestions.some(s => s.type === 'test')
  );
  
  if (missingTests.length > 0) {
    comment += '### 🧪 Test Coverage\n\n';
    comment += 'The following files are missing tests:\n';
    missingTests.forEach(result => {
      comment += `- ${result.file}\n`;
    });
    comment += '\nConsider adding tests to maintain code quality.\n\n';
  }
  
  // Metrics
  comment += '### 📊 Code Metrics\n\n';
  comment += '| File | Lines | Complexity | Max Depth | Functions |\n';
  comment += '|------|-------|------------|-----------|----------|\n';
  results.forEach(result => {
    const m = result.metrics;
    comment += `| ${path.basename(result.file)} | ${m.loc} | ${m.complexity} | ${m.depth} | ${m.functions} |\n`;
  });
  
  comment += '\n---\n';
  comment += '*Generated by AI Code Review Bot*\n';
  
  return comment;
}

// Main execution
async function main() {
  const args = process.argv.slice(2);
  const prBranch = args[0] || 'HEAD';
  const baseBranch = args[1] || 'main';
  
  console.log('🤖 AI PR Review\n');
  console.log(`Comparing ${prBranch} against ${baseBranch}...\n`);
  
  // Get changed files
  const changedFiles = execSync(
    `git diff --name-only ${baseBranch}...${prBranch}`,
    { encoding: 'utf8' }
  ).split('\n').filter(f => 
    f && (f.endsWith('.ts') || f.endsWith('.tsx') || 
          f.endsWith('.js') || f.endsWith('.jsx'))
  );
  
  if (changedFiles.length === 0) {
    console.log('No JavaScript/TypeScript files changed.');
    return;
  }
  
  console.log(`Reviewing ${changedFiles.length} files...\n`);
  
  // Review each file
  const results = [];
  
  for (const file of changedFiles) {
    if (!fs.existsSync(file)) {
      console.log(`Skipping deleted file: ${file}`);
      continue;
    }
    
    const diff = execSync(
      `git diff ${baseBranch}...${prBranch} -- "${file}"`,
      { encoding: 'utf8' }
    );
    
    const review = reviewFile(file, diff);
    results.push({
      file,
      ...review
    });
    
    console.log(`✓ ${file}`);
    if (review.issues.length > 0) {
      console.log(`  Issues: ${review.issues.length}`);
      const high = review.issues.filter(i => i.priority === 'high').length;
      if (high > 0) console.log(`  ⚠️  High priority: ${high}`);
    }
  }
  
  // Check test coverage
  const testSuggestions = checkTestCoverage(changedFiles);
  testSuggestions.forEach(suggestion => {
    const result = results.find(r => r.file === suggestion.file);
    if (result) {
      result.suggestions.push(suggestion);
    }
  });
  
  // Generate review comment
  const comment = generateReviewComment(results);
  
  // Output review
  console.log('\n' + '='.repeat(60) + '\n');
  console.log(comment);
  
  // Save to file for GitHub Actions
  fs.writeFileSync('pr-review.md', comment);
  
  // Exit with error if high priority issues found
  const hasHighPriority = results.some(r => 
    r.issues.some(i => i.priority === 'high')
  );
  
  if (hasHighPriority) {
    console.log('\n❌ High priority issues found. Please address before merging.');
    process.exit(1);
  }
  
  console.log('\n✅ Review complete. No blocking issues found.');
}

// Run if called directly
if (require.main === module) {
  main().catch(error => {
    console.error('Error:', error.message);
    process.exit(1);
  });
}

module.exports = { reviewFile, generateReviewComment };