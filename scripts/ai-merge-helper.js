#!/usr/bin/env node

/**
 * AI Merge Conflict Resolution Helper
 * Provides intelligent suggestions for resolving merge conflicts
 */

const { execSync } = require('child_process');
const fs = require('fs');
const path = require('path');
const readline = require('readline');

const rl = readline.createInterface({
  input: process.stdin,
  output: process.stdout
});

// Conflict patterns and resolution strategies
const RESOLUTION_STRATEGIES = {
  packageJson: {
    pattern: /package\.json$/,
    strategy: 'merge-dependencies',
    handler: resolvePackageJsonConflict
  },
  packageLock: {
    pattern: /package-lock\.json$/,
    strategy: 'regenerate',
    handler: resolvePackageLockConflict
  },
  changelog: {
    pattern: /CHANGELOG\.md$/,
    strategy: 'merge-chronologically',
    handler: resolveChangelogConflict
  },
  imports: {
    pattern: /^import\s+/m,
    strategy: 'merge-all-imports',
    handler: resolveImportConflict
  },
  version: {
    pattern: /version["']\s*:\s*["']/,
    strategy: 'use-higher-version',
    handler: resolveVersionConflict
  },
  config: {
    pattern: /\.(json|yaml|yml|toml)$/,
    strategy: 'merge-objects',
    handler: resolveConfigConflict
  }
};

// Parse conflict markers from file
function parseConflicts(content) {
  const conflicts = [];
  const lines = content.split('\n');
  
  let inConflict = false;
  let currentConflict = {
    start: -1,
    middle: -1,
    end: -1,
    ours: [],
    theirs: [],
    base: []
  };
  let section = 'ours';
  
  lines.forEach((line, index) => {
    if (line.startsWith('<<<<<<<')) {
      inConflict = true;
      currentConflict.start = index;
      section = 'ours';
    } else if (line.startsWith('|||||||')) {
      currentConflict.middle = index;
      section = 'base';
    } else if (line.startsWith('=======')) {
      section = 'theirs';
    } else if (line.startsWith('>>>>>>>')) {
      currentConflict.end = index;
      conflicts.push({ ...currentConflict });
      currentConflict = {
        start: -1,
        middle: -1,
        end: -1,
        ours: [],
        theirs: [],
        base: []
      };
      inConflict = false;
    } else if (inConflict) {
      currentConflict[section].push(line);
    }
  });
  
  return conflicts;
}

// Resolve package.json conflicts
function resolvePackageJsonConflict(ours, theirs, base) {
  try {
    const oursPkg = JSON.parse(ours.join('\n'));
    const theirsPkg = JSON.parse(theirs.join('\n'));
    const basePkg = base.length > 0 ? JSON.parse(base.join('\n')) : {};
    
    // Merge dependencies
    const merged = { ...basePkg };
    
    // Merge all dependency fields
    const depFields = ['dependencies', 'devDependencies', 'peerDependencies', 'optionalDependencies'];
    
    depFields.forEach(field => {
      if (oursPkg[field] || theirsPkg[field]) {
        merged[field] = {
          ...(basePkg[field] || {}),
          ...(theirsPkg[field] || {}),
          ...(oursPkg[field] || {})
        };
        
        // Resolve version conflicts by taking the higher version
        if (oursPkg[field] && theirsPkg[field]) {
          Object.keys(merged[field]).forEach(dep => {
            if (oursPkg[field][dep] && theirsPkg[field][dep]) {
              merged[field][dep] = compareVersions(
                oursPkg[field][dep],
                theirsPkg[field][dep]
              );
            }
          });
        }
      }
    });
    
    // Merge other fields
    Object.keys(oursPkg).forEach(key => {
      if (!depFields.includes(key)) {
        merged[key] = oursPkg[key];
      }
    });
    
    Object.keys(theirsPkg).forEach(key => {
      if (!depFields.includes(key) && !merged[key]) {
        merged[key] = theirsPkg[key];
      }
    });
    
    return {
      resolved: JSON.stringify(merged, null, 2).split('\n'),
      confidence: 0.9,
      explanation: 'Merged all dependencies, using higher versions for conflicts'
    };
  } catch (error) {
    return {
      resolved: null,
      confidence: 0,
      explanation: `Failed to parse JSON: ${error.message}`
    };
  }
}

// Resolve package-lock.json conflicts
function resolvePackageLockConflict(ours, theirs, base) {
  return {
    resolved: null,
    confidence: 1.0,
    explanation: 'Package-lock.json should be regenerated with npm install',
    action: 'regenerate'
  };
}

// Resolve CHANGELOG conflicts
function resolveChangelogConflict(ours, theirs, base) {
  // Merge both sets of changes chronologically
  const allEntries = [...ours, ...theirs];
  
  // Try to detect date patterns
  const datePattern = /^##?\s*\[?(\d{4}-\d{2}-\d{2}|\d+\.\d+\.\d+)/;
  
  const entries = [];
  let currentEntry = [];
  
  allEntries.forEach(line => {
    if (datePattern.test(line)) {
      if (currentEntry.length > 0) {
        entries.push(currentEntry);
      }
      currentEntry = [line];
    } else {
      currentEntry.push(line);
    }
  });
  
  if (currentEntry.length > 0) {
    entries.push(currentEntry);
  }
  
  // Sort entries by date/version
  entries.sort((a, b) => {
    const aMatch = a[0].match(datePattern);
    const bMatch = b[0].match(datePattern);
    if (aMatch && bMatch) {
      return bMatch[1].localeCompare(aMatch[1]);
    }
    return 0;
  });
  
  // Flatten back to lines
  const resolved = entries.flatMap(entry => entry);
  
  return {
    resolved,
    confidence: 0.7,
    explanation: 'Merged changelog entries chronologically'
  };
}

// Resolve import conflicts
function resolveImportConflict(ours, theirs, base) {
  const allImports = new Set();
  
  // Collect all imports
  [...ours, ...theirs].forEach(line => {
    if (line.trim().startsWith('import')) {
      allImports.add(line.trim());
    }
  });
  
  // Sort imports
  const sorted = Array.from(allImports).sort((a, b) => {
    // External packages first
    const aExternal = !a.includes('./') && !a.includes('../');
    const bExternal = !b.includes('./') && !b.includes('../');
    
    if (aExternal && !bExternal) return -1;
    if (!aExternal && bExternal) return 1;
    
    return a.localeCompare(b);
  });
  
  return {
    resolved: sorted,
    confidence: 0.95,
    explanation: 'Merged and sorted all imports'
  };
}

// Resolve version conflicts
function resolveVersionConflict(ours, theirs, base) {
  const versionPattern = /["']?version["']?\s*:\s*["']([^"']+)["']/;
  
  const oursVersion = ours.join(' ').match(versionPattern)?.[1];
  const theirsVersion = theirs.join(' ').match(versionPattern)?.[1];
  
  if (oursVersion && theirsVersion) {
    const higher = compareVersions(oursVersion, theirsVersion);
    const resolved = ours.map(line => 
      line.replace(versionPattern, `"version": "${higher}"`)
    );
    
    return {
      resolved,
      confidence: 0.8,
      explanation: `Using higher version: ${higher}`
    };
  }
  
  return {
    resolved: null,
    confidence: 0,
    explanation: 'Could not detect version numbers'
  };
}

// Resolve config file conflicts
function resolveConfigConflict(ours, theirs, base) {
  try {
    const oursObj = JSON.parse(ours.join('\n'));
    const theirsObj = JSON.parse(theirs.join('\n'));
    
    // Deep merge objects
    const merged = deepMerge(theirsObj, oursObj);
    
    return {
      resolved: JSON.stringify(merged, null, 2).split('\n'),
      confidence: 0.6,
      explanation: 'Deep merged configuration objects'
    };
  } catch (error) {
    return {
      resolved: null,
      confidence: 0,
      explanation: 'Manual resolution required for non-JSON config'
    };
  }
}

// Compare semantic versions
function compareVersions(v1, v2) {
  const clean = v => v.replace(/[^0-9.]/g, '');
  const parts1 = clean(v1).split('.').map(Number);
  const parts2 = clean(v2).split('.').map(Number);
  
  for (let i = 0; i < Math.max(parts1.length, parts2.length); i++) {
    const p1 = parts1[i] || 0;
    const p2 = parts2[i] || 0;
    
    if (p1 > p2) return v1;
    if (p2 > p1) return v2;
  }
  
  return v1; // Default to ours if equal
}

// Deep merge objects
function deepMerge(target, source) {
  const output = { ...target };
  
  Object.keys(source).forEach(key => {
    if (source[key] && typeof source[key] === 'object' && !Array.isArray(source[key])) {
      if (key in target && typeof target[key] === 'object' && !Array.isArray(target[key])) {
        output[key] = deepMerge(target[key], source[key]);
      } else {
        output[key] = source[key];
      }
    } else {
      output[key] = source[key];
    }
  });
  
  return output;
}

// Analyze conflict and suggest resolution
function analyzeConflict(filePath, conflict) {
  const fileName = path.basename(filePath);
  const suggestions = [];
  
  // Check each resolution strategy
  Object.entries(RESOLUTION_STRATEGIES).forEach(([name, strategy]) => {
    if (strategy.pattern.test(fileName) || 
        strategy.pattern.test(conflict.ours.join('\n'))) {
      
      const result = strategy.handler(
        conflict.ours,
        conflict.theirs,
        conflict.base
      );
      
      if (result.resolved || result.action) {
        suggestions.push({
          strategy: name,
          ...result
        });
      }
    }
  });
  
  // If no specific strategy, try generic resolution
  if (suggestions.length === 0) {
    suggestions.push({
      strategy: 'manual',
      confidence: 0,
      explanation: 'Manual resolution required',
      hints: analyzeGenericConflict(conflict)
    });
  }
  
  return suggestions;
}

// Analyze generic conflict for hints
function analyzeGenericConflict(conflict) {
  const hints = [];
  
  // Check if one side is empty (addition/deletion)
  if (conflict.ours.length === 0) {
    hints.push('Their changes add new content');
  }
  if (conflict.theirs.length === 0) {
    hints.push('Our changes add new content');
  }
  
  // Check for similar lines
  const similarity = calculateSimilarity(
    conflict.ours.join('\n'),
    conflict.theirs.join('\n')
  );
  
  if (similarity > 0.8) {
    hints.push('Changes are very similar - likely formatting differences');
  } else if (similarity < 0.2) {
    hints.push('Changes are very different - careful review needed');
  }
  
  // Check for common patterns
  if (conflict.ours.some(l => l.includes('TODO')) || 
      conflict.theirs.some(l => l.includes('TODO'))) {
    hints.push('Contains TODO comments - check if tasks are completed');
  }
  
  return hints;
}

// Calculate string similarity
function calculateSimilarity(str1, str2) {
  const longer = str1.length > str2.length ? str1 : str2;
  const shorter = str1.length > str2.length ? str2 : str1;
  
  if (longer.length === 0) return 1.0;
  
  const editDistance = levenshteinDistance(longer, shorter);
  return (longer.length - editDistance) / longer.length;
}

// Levenshtein distance
function levenshteinDistance(str1, str2) {
  const matrix = [];
  
  for (let i = 0; i <= str2.length; i++) {
    matrix[i] = [i];
  }
  
  for (let j = 0; j <= str1.length; j++) {
    matrix[0][j] = j;
  }
  
  for (let i = 1; i <= str2.length; i++) {
    for (let j = 1; j <= str1.length; j++) {
      if (str2.charAt(i - 1) === str1.charAt(j - 1)) {
        matrix[i][j] = matrix[i - 1][j - 1];
      } else {
        matrix[i][j] = Math.min(
          matrix[i - 1][j - 1] + 1,
          matrix[i][j - 1] + 1,
          matrix[i - 1][j] + 1
        );
      }
    }
  }
  
  return matrix[str2.length][str1.length];
}

// Interactive conflict resolution
async function resolveInteractive(filePath, conflicts, suggestions) {
  console.log(`\n📄 ${filePath}`);
  console.log(`Conflicts: ${conflicts.length}\n`);
  
  for (let i = 0; i < conflicts.length; i++) {
    const conflict = conflicts[i];
    const suggestion = suggestions[i];
    
    console.log(`Conflict ${i + 1}/${conflicts.length}:`);
    console.log('─'.repeat(60));
    
    // Show conflict preview
    console.log('<<<<<<< OURS');
    console.log(conflict.ours.slice(0, 5).join('\n'));
    if (conflict.ours.length > 5) console.log('...');
    console.log('=======');
    console.log(conflict.theirs.slice(0, 5).join('\n'));
    if (conflict.theirs.length > 5) console.log('...');
    console.log('>>>>>>> THEIRS');
    console.log('');
    
    // Show suggestions
    if (suggestion.length > 0) {
      const best = suggestion.reduce((a, b) => 
        a.confidence > b.confidence ? a : b
      );
      
      console.log(`🤖 AI Suggestion (${Math.round(best.confidence * 100)}% confidence):`);
      console.log(`Strategy: ${best.strategy}`);
      console.log(`Explanation: ${best.explanation}`);
      
      if (best.hints) {
        console.log('Hints:');
        best.hints.forEach(hint => console.log(`  - ${hint}`));
      }
      
      if (best.action === 'regenerate') {
        console.log('\n⚠️  This file should be regenerated after resolving other conflicts');
      }
    }
    
    console.log('');
  }
}

// Main execution
async function main() {
  console.log('🤖 AI Merge Conflict Resolution Helper\n');
  
  // Get files with conflicts
  let conflictFiles;
  try {
    conflictFiles = execSync('git diff --name-only --diff-filter=U', { encoding: 'utf8' })
      .split('\n')
      .filter(Boolean);
  } catch (error) {
    console.log('No merge conflicts detected.');
    return;
  }
  
  if (conflictFiles.length === 0) {
    console.log('No merge conflicts detected.');
    return;
  }
  
  console.log(`Found ${conflictFiles.length} files with conflicts:\n`);
  conflictFiles.forEach(file => console.log(`  - ${file}`));
  console.log('');
  
  // Process each file
  for (const file of conflictFiles) {
    const content = fs.readFileSync(file, 'utf8');
    const conflicts = parseConflicts(content);
    
    if (conflicts.length === 0) {
      console.log(`✓ ${file} - No conflicts found`);
      continue;
    }
    
    // Analyze each conflict
    const suggestions = conflicts.map(conflict => 
      analyzeConflict(file, conflict)
    );
    
    // Interactive resolution
    await resolveInteractive(file, conflicts, suggestions);
    
    // Special handling for package-lock.json
    if (file === 'package-lock.json') {
      console.log('\n📦 Package-lock.json detected');
      console.log('Recommended action:');
      console.log('  1. Resolve package.json conflicts first');
      console.log('  2. Delete package-lock.json');
      console.log('  3. Run: npm install');
      console.log('  4. Commit the regenerated package-lock.json\n');
    }
  }
  
  console.log('\n' + '='.repeat(60));
  console.log('Resolution Summary:');
  console.log('');
  console.log('Next steps:');
  console.log('1. Review and apply the suggested resolutions');
  console.log('2. Test the resolved code thoroughly');
  console.log('3. Run: git add <resolved-files>');
  console.log('4. Run: git commit');
  console.log('');
  
  rl.close();
}

// Run if called directly
if (require.main === module) {
  main().catch(error => {
    console.error('Error:', error.message);
    process.exit(1);
  });
}

module.exports = { parseConflicts, analyzeConflict };