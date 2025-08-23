#!/usr/bin/env node

/**
 * AI Test Generator
 * Analyzes code changes and generates appropriate test cases
 */

const { execSync } = require('child_process');
const fs = require('fs');
const path = require('path');

// Test generation patterns based on file type
const TEST_PATTERNS = {
  component: {
    react: {
      template: `import { render, screen, fireEvent } from '@testing-library/react';
import { describe, it, expect, vi } from 'vitest';
import { {{componentName}} } from '{{importPath}}';

describe('{{componentName}}', () => {
  it('should render without crashing', () => {
    render(<{{componentName}} />);
    expect(screen.getByRole('{{primaryRole}}')).toBeInTheDocument();
  });

  {{additionalTests}}
});`,
      patterns: ['renders correctly', 'handles props', 'fires events', 'manages state']
    },
    vanilla: {
      template: `import { describe, it, expect, beforeEach, afterEach } from 'vitest';
import { {{functionName}} } from '{{importPath}}';

describe('{{functionName}}', () => {
  {{setupTeardown}}

  it('should {{testDescription}}', () => {
    // Arrange
    {{arrange}}
    
    // Act
    {{act}}
    
    // Assert
    {{assert}}
  });

  {{additionalTests}}
});`,
      patterns: ['returns expected value', 'handles edge cases', 'validates input', 'throws on error']
    }
  },
  api: {
    template: `import { describe, it, expect, beforeAll, afterAll } from 'vitest';
import { vi } from 'vitest';
import { {{apiFunction}} } from '{{importPath}}';

// Mock Chrome API
vi.mock('webextension-polyfill', () => ({
  {{mockImplementation}}
}));

describe('{{apiFunction}}', () => {
  beforeAll(() => {
    // Setup mocks
    {{setupMocks}}
  });

  afterAll(() => {
    vi.restoreAllMocks();
  });

  it('should {{testDescription}}', async () => {
    // Arrange
    {{arrange}}
    
    // Act
    const result = await {{apiFunction}}({{params}});
    
    // Assert
    expect(result).{{assertion}};
  });

  {{additionalTests}}
});`,
    patterns: ['successful API call', 'handles errors', 'retries on failure', 'respects rate limits']
  },
  integration: {
    template: `import { describe, it, expect, beforeEach } from 'vitest';
import { chromium } from 'playwright';

describe('{{featureName}} Integration', () => {
  let browser;
  let page;

  beforeEach(async () => {
    browser = await chromium.launch();
    page = await browser.newPage();
    await page.goto('chrome-extension://{{extensionId}}/popup.html');
  });

  afterEach(async () => {
    await browser.close();
  });

  it('should {{testScenario}}', async () => {
    // Navigate to feature
    {{navigation}}
    
    // Perform actions
    {{actions}}
    
    // Verify results
    {{verification}}
  });

  {{additionalScenarios}}
});`,
    patterns: ['end-to-end flow', 'user interactions', 'data persistence', 'error recovery']
  }
};

// Analyze file to determine test type
function analyzeFile(filePath) {
  const content = fs.readFileSync(filePath, 'utf8');
  const fileName = path.basename(filePath);
  const ext = path.extname(filePath);
  
  // Detect React component
  if (content.includes('import React') || content.includes('from \'react\'')) {
    return {
      type: 'component',
      subtype: 'react',
      componentName: extractComponentName(content),
      hasProps: content.includes('props') || content.includes('Props'),
      hasState: content.includes('useState') || content.includes('useReducer'),
      hasEffects: content.includes('useEffect'),
      hasMemo: content.includes('useMemo') || content.includes('useCallback')
    };
  }
  
  // Detect API function
  if (content.includes('chrome.') || content.includes('browser.') || 
      content.includes('fetch') || content.includes('axios')) {
    return {
      type: 'api',
      functionNames: extractFunctionNames(content),
      hasAsync: content.includes('async'),
      hasErrorHandling: content.includes('try') && content.includes('catch'),
      endpoints: extractEndpoints(content)
    };
  }
  
  // Detect utility function
  if (ext === '.ts' || ext === '.js') {
    return {
      type: 'component',
      subtype: 'vanilla',
      functionNames: extractFunctionNames(content),
      hasExports: content.includes('export'),
      complexity: calculateComplexity(content)
    };
  }
  
  return { type: 'unknown' };
}

// Extract component name from React file
function extractComponentName(content) {
  const match = content.match(/(?:export\s+)?(?:default\s+)?(?:function|const)\s+(\w+)/);
  return match ? match[1] : 'Component';
}

// Extract function names from file
function extractFunctionNames(content) {
  const matches = content.matchAll(/(?:export\s+)?(?:async\s+)?function\s+(\w+)/g);
  return Array.from(matches).map(m => m[1]);
}

// Extract API endpoints from file
function extractEndpoints(content) {
  const matches = content.matchAll(/['"](\/api\/[^'"]+)['"]/g);
  return Array.from(matches).map(m => m[1]);
}

// Calculate cyclomatic complexity
function calculateComplexity(content) {
  const conditions = (content.match(/if\s*\(|while\s*\(|for\s*\(|\?\s*:/g) || []).length;
  return conditions < 5 ? 'low' : conditions < 10 ? 'medium' : 'high';
}

// Generate test cases based on analysis
function generateTestCases(analysis, filePath) {
  const testCases = [];
  
  if (analysis.type === 'component' && analysis.subtype === 'react') {
    // React component tests
    testCases.push({
      name: 'Render test',
      description: 'Component renders without errors',
      type: 'unit'
    });
    
    if (analysis.hasProps) {
      testCases.push({
        name: 'Props test',
        description: 'Component handles props correctly',
        type: 'unit'
      });
    }
    
    if (analysis.hasState) {
      testCases.push({
        name: 'State test',
        description: 'Component manages state correctly',
        type: 'unit'
      });
    }
    
    if (analysis.hasEffects) {
      testCases.push({
        name: 'Side effects test',
        description: 'useEffect hooks work correctly',
        type: 'unit'
      });
    }
  }
  
  if (analysis.type === 'api') {
    testCases.push({
      name: 'Success test',
      description: 'API call succeeds with valid data',
      type: 'integration'
    });
    
    testCases.push({
      name: 'Error handling test',
      description: 'API handles errors gracefully',
      type: 'integration'
    });
    
    if (analysis.hasAsync) {
      testCases.push({
        name: 'Async test',
        description: 'Async operations complete correctly',
        type: 'integration'
      });
    }
  }
  
  return testCases;
}

// Generate test file content
function generateTestFile(analysis, testCases, filePath) {
  const fileName = path.basename(filePath, path.extname(filePath));
  const testFileName = `${fileName}.test${path.extname(filePath)}`;
  
  let template = '';
  
  if (analysis.type === 'component' && analysis.subtype === 'react') {
    template = TEST_PATTERNS.component.react.template;
    template = template.replace(/{{componentName}}/g, analysis.componentName);
    template = template.replace('{{importPath}}', `./${fileName}`);
    template = template.replace('{{primaryRole}}', 'button'); // Default, should be smarter
    
    const additionalTests = testCases.slice(1).map(tc => `
  it('${tc.description}', () => {
    // TODO: Implement ${tc.name}
    expect(true).toBe(true);
  });`).join('\n');
    
    template = template.replace('{{additionalTests}}', additionalTests);
  }
  
  return {
    fileName: testFileName,
    content: template
  };
}

// Main execution
async function main() {
  const args = process.argv.slice(2);
  const targetFile = args[0];
  
  if (!targetFile) {
    // Analyze all changed files
    const changedFiles = execSync('git diff --cached --name-only', { encoding: 'utf8' })
      .split('\n')
      .filter(f => f && (f.endsWith('.ts') || f.endsWith('.tsx') || f.endsWith('.js') || f.endsWith('.jsx')));
    
    console.log('🤖 AI Test Generator\n');
    console.log(`📝 Analyzing ${changedFiles.length} changed files...\n`);
    
    for (const file of changedFiles) {
      if (!fs.existsSync(file)) continue;
      
      const analysis = analyzeFile(file);
      const testCases = generateTestCases(analysis, file);
      
      console.log(`📄 ${file}`);
      console.log(`  Type: ${analysis.type}${analysis.subtype ? `/${analysis.subtype}` : ''}`);
      console.log(`  Suggested tests: ${testCases.length}`);
      testCases.forEach(tc => {
        console.log(`    - ${tc.name}: ${tc.description}`);
      });
      console.log('');
      
      // Generate test file
      const testFile = generateTestFile(analysis, testCases, file);
      const testDir = path.dirname(file);
      const testPath = path.join(testDir, '__tests__', testFile.fileName);
      
      // Create __tests__ directory if it doesn't exist
      const testDirPath = path.join(testDir, '__tests__');
      if (!fs.existsSync(testDirPath)) {
        fs.mkdirSync(testDirPath, { recursive: true });
      }
      
      // Write test file if it doesn't exist
      if (!fs.existsSync(testPath) && testFile.content) {
        fs.writeFileSync(testPath, testFile.content);
        console.log(`  ✅ Generated: ${testPath}\n`);
      }
    }
  } else {
    // Analyze specific file
    if (!fs.existsSync(targetFile)) {
      console.error(`File not found: ${targetFile}`);
      process.exit(1);
    }
    
    const analysis = analyzeFile(targetFile);
    const testCases = generateTestCases(analysis, targetFile);
    const testFile = generateTestFile(analysis, testCases, targetFile);
    
    console.log('🤖 AI Test Generator\n');
    console.log(`📄 ${targetFile}`);
    console.log(`Type: ${analysis.type}${analysis.subtype ? `/${analysis.subtype}` : ''}\n`);
    console.log('Suggested test cases:');
    testCases.forEach(tc => {
      console.log(`  - ${tc.name}: ${tc.description}`);
    });
    
    if (testFile.content) {
      console.log('\nGenerated test file:');
      console.log('---');
      console.log(testFile.content);
      console.log('---');
    }
  }
}

// Run if called directly
if (require.main === module) {
  main().catch(error => {
    console.error('Error:', error.message);
    process.exit(1);
  });
}

module.exports = { analyzeFile, generateTestCases, generateTestFile };