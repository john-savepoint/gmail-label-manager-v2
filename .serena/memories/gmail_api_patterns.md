# Gmail API Integration Patterns

## Authentication Flow
```javascript
// Get auth token via Chrome Identity API
chrome.identity.getAuthToken({ interactive: true }, (token) => {
  if (chrome.runtime.lastError) {
    console.error('Auth error:', chrome.runtime.lastError);
    return;
  }
  // Use token for API calls
});
```

## Color System Critical Rules
1. **NEVER use hex colors directly with Gmail API**
2. Gmail only accepts color IDs 0-18 or null
3. Always validate colors before API calls using `validateColorCombination()`
4. Map hex colors to Gmail color IDs using `mapHexToGmailColorId()`

## Label API Patterns

### Create Label
```javascript
const response = await fetch('https://gmail.googleapis.com/gmail/v1/users/me/labels', {
  method: 'POST',
  headers: {
    'Authorization': `Bearer ${token}`,
    'Content-Type': 'application/json',
  },
  body: JSON.stringify({
    name: 'Label Name',
    color: {
      backgroundColor: '#fb4c2f',  // Must be from approved list
      textColor: '#ffffff'
    },
    labelListVisibility: 'labelShow',
    messageListVisibility: 'show'
  })
});
```

### Update Label  
```javascript
// PATCH for partial updates
const response = await fetch(`https://gmail.googleapis.com/gmail/v1/users/me/labels/${labelId}`, {
  method: 'PATCH',
  headers: {
    'Authorization': `Bearer ${token}`,
    'Content-Type': 'application/json',
  },
  body: JSON.stringify({
    color: { backgroundColor: '#fb4c2f', textColor: '#ffffff' }
  })
});
```

### Batch Operations
```javascript
// Use batching for multiple operations
const batch = gapi.client.newBatch();
labels.forEach(label => {
  batch.add(gapi.client.gmail.users.labels.update({
    userId: 'me',
    id: label.id,
    resource: { color: newColor }
  }));
});
await batch.execute();
```

## Rate Limiting Strategy
- Gmail API: 250 quota units per second
- Implement exponential backoff on 429 errors
- Batch requests when possible (max 100 per batch)
- Add delays between bulk operations (100ms minimum)

```javascript
async function withRateLimit(operation, delay = 100) {
  try {
    const result = await operation();
    await new Promise(resolve => setTimeout(resolve, delay));
    return result;
  } catch (error) {
    if (error.status === 429) {
      // Exponential backoff
      await new Promise(resolve => setTimeout(resolve, 2000));
      return withRateLimit(operation, delay * 2);
    }
    throw error;
  }
}
```

## Error Handling Patterns
```javascript
// Common API errors
switch (error.status) {
  case 400:
    // Bad request - invalid label name or missing parent
    console.error('Invalid label configuration:', error);
    break;
  case 401:
    // Unauthorized - token expired
    chrome.identity.removeCachedAuthToken({ token });
    // Re-authenticate
    break;
  case 403:
    // Forbidden - insufficient scopes
    console.error('Missing permissions:', error);
    break;
  case 429:
    // Rate limited - implement backoff
    break;
}
```

## Message Passing Pattern
```javascript
// Content script → Background
chrome.runtime.sendMessage({
  action: 'createLabel',
  data: { name: 'Test', color: {...} }
}, response => {
  if (response.success) {
    console.log('Label created:', response.data);
  } else {
    console.error('Failed:', response.error);
  }
});

// Background script handler
chrome.runtime.onMessage.addListener((request, sender, sendResponse) => {
  if (request.action === 'createLabel') {
    createLabel(request.data)
      .then(result => sendResponse({ success: true, data: result }))
      .catch(error => sendResponse({ success: false, error: error.message }));
    return true; // Keep channel open for async response
  }
});
```

## Special Characters Handling
- Labels with '&' may cause issues
- Forward slashes '/' indicate hierarchy
- Escape special characters in API calls
- Gmail auto-creates parent labels if missing

## Hierarchical Labels
```javascript
// Creating nested label "Work/Projects/Alpha"
// Gmail will auto-create "Work" and "Work/Projects" if they don't exist
const response = await createLabel({
  name: 'Work/Projects/Alpha',
  // Parent labels created automatically
});
```

## Gmail System Labels
Cannot modify these system labels:
- INBOX, SENT, DRAFT, SPAM, TRASH, UNREAD, STARRED, IMPORTANT
- CATEGORY_PERSONAL, CATEGORY_SOCIAL, CATEGORY_PROMOTIONS, CATEGORY_UPDATES, CATEGORY_FORUMS

Can modify visibility but not delete or rename them.