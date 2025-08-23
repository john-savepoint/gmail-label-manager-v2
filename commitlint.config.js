module.exports = {
  extends: ['@commitlint/config-conventional'],
  rules: {
    'type-enum': [
      2,
      'always',
      [
        'feat',     // New feature
        'fix',      // Bug fix
        'docs',     // Documentation changes
        'style',    // Code style changes (formatting, etc)
        'refactor', // Code refactoring
        'perf',     // Performance improvements
        'test',     // Test additions or corrections
        'build',    // Build system changes
        'ci',       // CI/CD changes
        'chore',    // Maintenance tasks
        'revert',   // Revert previous commit
        'ai',       // AI-generated or AI-related changes
      ],
    ],
    'scope-enum': [
      2,
      'always',
      [
        // Project areas
        'v1',
        'v2',
        'root',
        'monorepo',
        
        // Features
        'popup',
        'content',
        'background',
        'api',
        'auth',
        'labels',
        'backup',
        'undo',
        'bulk',
        'search',
        
        // Technical
        'ui',
        'utils',
        'hooks',
        'store',
        'types',
        
        // Infrastructure
        'ci',
        'cd',
        'deps',
        'config',
        'docs',
        'release',
        'test',
        
        // Chrome Extension specific
        'extension',
        'manifest',
        'permissions',
        'oauth',
        'gmail',
        
        // AI/Automation
        'ai',
        'automation',
        'linear',
        'sprint',
      ],
    ],
    'subject-case': [2, 'never', ['sentence-case', 'start-case', 'pascal-case', 'upper-case']],
    'subject-empty': [2, 'never'],
    'subject-full-stop': [2, 'never', '.'],
    'type-case': [2, 'always', 'lower-case'],
    'type-empty': [2, 'never'],
    'header-max-length': [2, 'always', 100],
    'body-max-line-length': [2, 'always', 100],
    'footer-max-line-length': [2, 'always', 100],
  },
  parserPreset: {
    parserOpts: {
      headerPattern: /^(\w+)(?:\(([^)]+)\))?!?: (.+)$/,
      breakingHeaderPattern: /^(\w+)(?:\(([^)]+)\))?!: (.+)$/,
    },
  },
  prompt: {
    questions: {
      type: {
        description: "Select the type of change you're committing",
        enum: {
          feat: {
            description: '✨ A new feature',
            title: 'Features',
            emoji: '✨',
          },
          fix: {
            description: '🐛 A bug fix',
            title: 'Bug Fixes',
            emoji: '🐛',
          },
          docs: {
            description: '📚 Documentation only changes',
            title: 'Documentation',
            emoji: '📚',
          },
          style: {
            description: '💎 Code style changes (white-space, formatting, etc)',
            title: 'Styles',
            emoji: '💎',
          },
          refactor: {
            description: '📦 Code change that neither fixes a bug nor adds a feature',
            title: 'Code Refactoring',
            emoji: '📦',
          },
          perf: {
            description: '🚀 Code change that improves performance',
            title: 'Performance Improvements',
            emoji: '🚀',
          },
          test: {
            description: '🚨 Adding missing tests or correcting existing tests',
            title: 'Tests',
            emoji: '🚨',
          },
          build: {
            description: '🛠 Changes that affect the build system or external dependencies',
            title: 'Builds',
            emoji: '🛠',
          },
          ci: {
            description: '⚙️ Changes to CI configuration files and scripts',
            title: 'Continuous Integrations',
            emoji: '⚙️',
          },
          chore: {
            description: "🔧 Other changes that don't modify src or test files",
            title: 'Chores',
            emoji: '🔧',
          },
          revert: {
            description: '🗑 Reverts a previous commit',
            title: 'Reverts',
            emoji: '🗑',
          },
          ai: {
            description: '🤖 AI-generated or AI-related changes',
            title: 'AI/Automation',
            emoji: '🤖',
          },
        },
      },
    },
  },
};