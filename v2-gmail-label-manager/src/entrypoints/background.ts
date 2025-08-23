export default defineBackground(() => {
  console.log('Gmail Label Manager v2.0 - Background script initialized');
  
  // Handle extension installation or update
  browser.runtime.onInstalled.addListener(({ reason }) => {
    if (reason === 'install') {
      console.log('Extension installed - Welcome to Gmail Label Manager!');
      // Open onboarding page on first install
      browser.tabs.create({
        url: browser.runtime.getURL('/onboarding.html')
      });
    } else if (reason === 'update') {
      console.log('Extension updated to v2.0');
    }
  });
  
  // Listen for OAuth authentication requests
  browser.runtime.onMessage.addListener((message, sender, sendResponse) => {
    if (message.type === 'AUTH_REQUEST') {
      handleAuthentication().then(sendResponse);
      return true; // Keep message channel open for async response
    }
  });
});

async function handleAuthentication() {
  try {
    const token = await browser.identity.getAuthToken({ interactive: true });
    return { success: true, token };
  } catch (error) {
    console.error('Authentication failed:', error);
    return { success: false, error: error.message };
  }
}