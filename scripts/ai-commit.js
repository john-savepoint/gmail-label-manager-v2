#!/usr/bin/env node

/**
 * AI-Enhanced Commit Message Generator
 * Analyzes staged changes and generates conventional commit messages
 */

const { execSync } = require('child_process');
const fs = require('fs');
const path = require('path');
const readline = require('readline');

const rl = readline.createInterface({
  input: process.stdin,
  output: process.stdout
});

// Conventional commit types with AI hints
const COMMIT_TYPES = {
  feat: {
    description: 'A new feature',
    keywords: ['add', 'new', 'create', 'implement', 'introduce'],
    filePatterns: [/components\/new/, /features\//]
  },
  fix: {
    description: 'A bug fix',
    keywords: ['fix', 'resolve', 'correct', 'repair', 'patch'],
    filePatterns: [/fixes\//, /patches\//]
  },
  docs: {
    description: 'Documentation changes',
    keywords: ['document', 'readme', 'docs', 'comment'],
    filePatterns: [/\.md$/, /docs\//, /README/]
  },
  style: {
    description: 'Code style changes',
    keywords: ['format', 'style', 'prettier', 'eslint', 'lint'],
    filePatterns: [/\.css$/, /\.scss$/, /styles\//]
  },
  refactor: {
    description: 'Code refactoring',
    keywords: ['refactor', 'restructure', 'reorganize', 'optimize'],
    filePatterns: [/refactor\//, /utils\//]
  },
  perf: {
    description: 'Performance improvements',
    keywords: ['performance', 'optimize', 'speed', 'faster', 'cache'],
    filePatterns: [/perf\//, /optimization\//]
  },
  test: {
    description: 'Test changes',
    keywords: ['test', 'spec', 'coverage', 'jest', 'vitest'],
    filePatterns: [/\.test\.(js|ts)/, /\.spec\.(js|ts)/, /test\//, /__tests__\//]
  },
  build: {
    description: 'Build system changes',
    keywords: ['build', 'webpack', 'vite', 'rollup', 'bundle'],
    filePatterns: [/webpack\./, /vite\./, /rollup\./, /build\//]
  },
  ci: {
    description: 'CI/CD changes',
    keywords: ['ci', 'github', 'actions', 'workflow', 'pipeline'],
    filePatterns: [/\.github\//, /\.yml$/, /\.yaml$/]
  },
  chore: {
    description: 'Maintenance tasks',
    keywords: ['chore', 'maintain', 'update', 'upgrade', 'deps'],
    filePatterns: [/package\.json$/, /lock$/]
  }
};

// Get staged files
function getStagedFiles() {
  try {
    const files = execSync('git diff --cached --name-only', { encoding: 'utf8' })
      .split('\n')
      .filter(Boolean);
    return files;
  } catch (error) {
    console.error('Error getting staged files:', error.message);
    return [];
  }
}

// Get diff for staged files
function getStagedDiff() {
  try {
    return execSync('git diff --cached', { encoding: 'utf8' });
  } catch (error) {
    console.error('Error getting staged diff:', error.message);
    return '';
  }
}

// Analyze changes to suggest commit type
function analyzeChanges(files, diff) {
  const scores = {};
  
  // Initialize scores
  Object.keys(COMMIT_TYPES).forEach(type => {
    scores[type] = 0;
  });
  
  // Analyze file paths
  files.forEach(file => {
    Object.entries(COMMIT_TYPES).forEach(([type, config]) => {
      config.filePatterns.forEach(pattern => {
        if (pattern.test(file)) {
          scores[type] += 2;
        }
      });
    });
  });
  
  // Analyze diff content
  const diffLines = diff.toLowerCase().split('\n');
  diffLines.forEach(line => {
    Object.entries(COMMIT_TYPES).forEach(([type, config]) => {
      config.keywords.forEach(keyword => {
        if (line.includes(keyword)) {
          scores[type] += 1;
        }
      });
    });
  });
  
  // Find the type with highest score
  let suggestedType = 'chore';
  let maxScore = 0;
  
  Object.entries(scores).forEach(([type, score]) => {
    if (score > maxScore) {
      maxScore = score;
      suggestedType = type;
    }
  });
  
  return suggestedType;
}

// Detect the scope from changed files
function detectScope(files) {
  if (files.length === 0) return null;
  
  // Check for v1 or v2 specific changes
  const isV1 = files.some(f => f.startsWith('v1-legacy/'));
  const isV2 = files.some(f => f.startsWith('v2-gmail-label-manager/'));
  
  if (isV1 && !isV2) return 'v1';
  if (isV2 && !isV1) return 'v2';
  if (isV1 && isV2) return 'monorepo';
  
  // Check for specific feature areas
  const scopes = {
    'popup': /popup/,
    'content': /content/,
    'background': /background/,
    'api': /api/,
    'ui': /ui|components/,
    'docs': /docs|README/,
    'ci': /\.github|workflows/,
    'deps': /package.*json/,
    'test': /test|spec/
  };
  
  for (const [scope, pattern] of Object.entries(scopes)) {
    if (files.some(f => pattern.test(f))) {
      return scope;
    }
  }
  
  return null;
}

// Generate commit message summary
function generateSummary(files, diff) {
  // Extract the main change from the diff
  const addedLines = diff.match(/^\+[^+].*/gm) || [];
  const removedLines = diff.match(/^-[^-].*/gm) || [];
  
  if (files.length === 1) {
    const file = path.basename(files[0]);
    const action = addedLines.length > removedLines.length ? 'update' : 'remove';
    return `${action} ${file}`;
  }
  
  if (files.length > 1) {
    const commonDir = findCommonDirectory(files);
    return `update ${commonDir || 'multiple files'}`;
  }
  
  return 'update project files';
}

// Find common directory for multiple files
function findCommonDirectory(files) {
  if (files.length === 0) return null;
  
  const dirs = files.map(f => path.dirname(f));
  const commonParts = dirs[0].split('/');
  
  for (let i = 1; i < dirs.length; i++) {
    const parts = dirs[i].split('/');
    for (let j = 0; j < commonParts.length; j++) {
      if (commonParts[j] !== parts[j]) {
        commonParts.splice(j);
        break;
      }
    }
  }
  
  return commonParts.join('/') || null;
}

// Interactive commit message builder
async function buildCommitMessage() {
  const files = getStagedFiles();
  const diff = getStagedDiff();
  
  if (files.length === 0) {
    console.log('❌ No staged files found. Please stage your changes first.');
    process.exit(1);
  }
  
  console.log('\n🤖 AI Commit Message Generator\n');
  console.log('📝 Staged files:');
  files.forEach(f => console.log(`  - ${f}`));
  console.log('');
  
  // Analyze and suggest
  const suggestedType = analyzeChanges(files, diff);
  const suggestedScope = detectScope(files);
  const suggestedSummary = generateSummary(files, diff);
  
  console.log('🎯 AI Suggestions:');
  console.log(`  Type: ${suggestedType} (${COMMIT_TYPES[suggestedType].description})`);
  if (suggestedScope) {
    console.log(`  Scope: ${suggestedScope}`);
  }
  console.log(`  Summary: ${suggestedSummary}`);
  console.log('');
  
  // Ask for confirmation or modification
  return new Promise((resolve) => {
    rl.question('Press Enter to accept, or type your own commit message: ', (answer) => {
      if (answer.trim() === '') {
        // Use AI suggestion
        const scope = suggestedScope ? `(${suggestedScope})` : '';
        const message = `${suggestedType}${scope}: ${suggestedSummary}`;
        resolve(message);
      } else {
        // Use user input
        resolve(answer);
      }
      rl.close();
    });
  });
}

// Main execution
async function main() {
  try {
    const message = await buildCommitMessage();
    
    console.log('\n📝 Committing with message:');
    console.log(`  "${message}"`);
    console.log('');
    
    // Execute the commit
    try {
      execSync(`git commit -m "${message}"`, { stdio: 'inherit' });
      console.log('✅ Commit successful!');
    } catch (error) {
      console.error('❌ Commit failed:', error.message);
      process.exit(1);
    }
  } catch (error) {
    console.error('Error:', error.message);
    process.exit(1);
  }
}

// Run if called directly
if (require.main === module) {
  main();
}

module.exports = { analyzeChanges, detectScope, generateSummary };