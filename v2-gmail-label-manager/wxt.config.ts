import { defineConfig } from 'wxt';

export default defineConfig({
  modules: ['@wxt-dev/module-react'],
  
  manifest: {
    name: 'Gmail Label Manager',
    version: '2.0.0',
    description: 'Advanced Gmail label and workflow management with AI-powered features',
    permissions: [
      'identity',
      'storage',
      'tabs'
    ],
    host_permissions: [
      'https://mail.google.com/*',
      'https://www.googleapis.com/*'
    ],
    oauth2: {
      client_id: process.env.GOOGLE_CLIENT_ID || '',
      scopes: [
        'https://www.googleapis.com/auth/gmail.labels',
        'https://www.googleapis.com/auth/gmail.readonly'
      ]
    }
  },
  
  srcDir: 'src',
  publicDir: 'public',
  entrypointsDir: 'entrypoints',
  
  // Vite configuration for development and debugging
  vite: () => ({
    build: {
      sourcemap: true,
    },
    esbuild: {
      sourcemap: true,
    },
  }),
  
  // Note: manualChunks is not compatible with WXT's build process
  // WXT handles code splitting automatically
});