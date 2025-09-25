import '@testing-library/jest-dom'
import { vi } from 'vitest'

// Mock Chrome API
global.chrome = {
  runtime: {
    id: 'test-extension-id',
    getURL: vi.fn((path) => `chrome-extension://test-extension-id/${path}`),
    sendMessage: vi.fn(),
    onMessage: {
      addListener: vi.fn(),
      removeListener: vi.fn(),
    },
  },
  identity: {
    getAuthToken: vi.fn(),
    getProfileUserInfo: vi.fn(),
  },
  tabs: {
    create: vi.fn(),
    query: vi.fn(),
  },
  storage: {
    local: {
      get: vi.fn(),
      set: vi.fn(),
      remove: vi.fn(),
    },
  },
  action: {
    setBadgeText: vi.fn(),
    setBadgeBackgroundColor: vi.fn(),
  },
} as any

// Mock browser API (for Firefox compatibility)
global.browser = {
  runtime: {
    id: 'test-extension-id',
    getURL: vi.fn((path) => `moz-extension://test-extension-id/${path}`),
    sendMessage: vi.fn(),
    onMessage: {
      addListener: vi.fn(),
      removeListener: vi.fn(),
    },
  },
  identity: {
    getAuthToken: vi.fn(),
    getProfileUserInfo: vi.fn(),
  },
  tabs: {
    create: vi.fn(),
    query: vi.fn(),
  },
  storage: {
    local: {
      get: vi.fn(),
      set: vi.fn(),
      remove: vi.fn(),
    },
  },
} as any