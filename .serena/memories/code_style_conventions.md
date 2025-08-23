# Code Style and Conventions

## JavaScript/React Conventions
- **ES6+ Modules** - Use modern JavaScript features
- **Functional Components** - React hooks over class components
- **Named Exports** - Prefer named exports for better tree-shaking
- **Async/Await** - Use async/await over promises where possible

## File Naming
- **Components:** PascalCase (e.g., `UnifiedLabelManager.jsx`)
- **Utilities:** camelCase (e.g., `gmail-colors.js`, `labelStore.js`)
- **CSS:** kebab-case (e.g., `gmail-overrides.css`)
- **React components:** `.jsx` extension
- **Plain JavaScript:** `.js` extension

## Code Organization
- **Single Responsibility** - Each module/component handles one concern
- **Separation of Concerns** - API calls in background, UI in popup, DOM in content scripts
- **Component Structure:**
  ```javascript
  // Imports
  // Constants
  // Component definition
  // PropTypes (if needed)
  // Export
  ```

## State Management (Zustand)
- Store files in `src/lib/stores/`
- Naming: `{feature}Store.js` (e.g., `authStore.js`, `labelStore.js`)
- Use persist middleware for user preferences

## CSS Conventions
- **Gmail Overrides:** Use `[data-enhanced="true"]` for targeting
- **Important Flags:** Required for Gmail style overrides
- **Scoped Styles:** Component-specific CSS in separate files
- **Material-UI:** Use sx prop or styled components

## Error Handling
- Comprehensive try-catch blocks in API calls
- User-friendly error messages via Snackbar
- Console logging for debugging (with prefixes like `[Gmail UI Enhancer]`)

## Performance
- Use `requestIdleCallback` for non-critical DOM operations
- Throttle MutationObserver callbacks
- Cache selectors and reuse DOM queries
- Implement debouncing for search and resize operations

## Chrome Extension Specific
- Message passing format: `{ action: 'actionName', data: {...} }`
- Use `chrome.runtime.lastError` checks
- Validate manifest permissions match API usage
- Content scripts must handle Gmail's dynamic DOM

## Comments
- Minimal comments - code should be self-documenting
- Only add comments for complex logic or workarounds
- Use JSDoc for public API functions

## Testing Approach
- Manual testing in Chrome Developer Mode
- Test across different Gmail layouts (Default, Priority, Multiple Inbox)
- Verify OAuth flow and API operations
- Check performance with large label counts (300+)