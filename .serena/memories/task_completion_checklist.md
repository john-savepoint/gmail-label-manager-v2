# Task Completion Checklist

## Before Marking Any Task Complete

### 1. Code Quality Checks (MANDATORY)
```bash
# Run these commands - ALL must pass
npm run lint:check        # Check for linting errors
npm run format:check      # Check formatting
npm run quality:check     # Combined quality check

# If any fail, fix them:
npm run quality:fix       # Auto-fix all issues
```

### 2. Extension Validation
```bash
npm run build                    # Build the extension
npm run validate:extension       # Validate structure
npm run test:extension          # Test loading scenarios
```

### 3. Manual Testing Checklist
- [ ] Load extension in Chrome Developer Mode
- [ ] Test in Gmail with actual account
- [ ] Verify OAuth flow works
- [ ] Check all three console contexts for errors:
  - Popup console (right-click popup → Inspect)
  - Background console (chrome://extensions → service worker)
  - Content script console (F12 on Gmail)
- [ ] Test with different Gmail layouts if applicable

### 4. Git Commit (When Requested)
```bash
# Stage changes
git add .

# Commit with conventional format
git commit -m "type(scope): description"
# Examples:
# feat(labels): add bulk selection
# fix(ui): resolve dropdown width issue
# chore(deps): update dependencies

# DO NOT push unless explicitly requested
```

### 5. Update Documentation
- [ ] Update CLAUDE.md if adding new features
- [ ] Update README.md if changing setup instructions
- [ ] Add comments only for complex logic

### 6. Performance Verification
- [ ] No console errors in any context
- [ ] Gmail doesn't freeze or lag
- [ ] Extension popup opens quickly
- [ ] Bulk operations handle 300+ labels

### 7. Final Checks
- [ ] All features work as expected
- [ ] No regression in existing functionality
- [ ] Code follows project conventions
- [ ] No hardcoded values or test data

## Common Issues to Check

### OAuth/API Issues
- Extension ID in manifest matches OAuth console
- API scopes are sufficient
- Access token is being retrieved

### UI Issues  
- Dropdown resizing works in all contexts
- No style conflicts with Gmail
- Icons and colors display correctly

### Performance Issues
- MutationObserver properly throttled
- No infinite loops or excessive re-renders
- Memory usage reasonable with many labels

## Critical Files to Review
- `manifest.json` - Version, permissions correct
- `background.js` - API calls error handling
- `gmail-ui-enhancer.js` - DOM manipulation safe
- `UnifiedLabelManager.jsx` - State updates correct

## When Task is Complete
1. Run all quality checks
2. Test in actual Gmail account
3. Verify no console errors
4. Commit if requested (DO NOT push)
5. Update task status in todo list
6. Report completion to user with summary