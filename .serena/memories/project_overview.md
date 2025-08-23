# Gmail Advanced Label & Workflow Manager - Project Overview

## Project Purpose
A Chrome Extension (Manifest V3) that enhances Gmail's label management capabilities by solving critical limitations:
- Truncated labels in narrow dropdowns (300px default)
- No recursive sub-label search capability
- Tedious one-by-one label management
- No backup/restore functionality for label configurations

## Current Version
- **Version:** 1.2.1
- **Status:** MVP complete, working extension with core features implemented

## Key Features
1. **UI Enhancements:**
   - Dynamic label dropdown resizing (minimum 800px, auto-adjusts to widest label)
   - Gmail sidebar resizing with Split.js
   - Recursive sub-label search via context menu
   
2. **Label Management (Gmail API):**
   - Complete CRUD operations for labels
   - Bulk operations (color changes, deletions)
   - Backup/Export to JSON
   - Import/Restore from JSON with conflict handling
   
3. **Authentication:**
   - OAuth 2.0 Google Sign-In
   - Gmail API integration for label operations

## Target Users
- Gmail power users with complex nested label structures (3+ levels)
- Teams needing to replicate label setups across accounts
- Users wanting efficient bulk label management

## Monetization Plan (v2.0)
- Subscription model: $5/month or $30/year
- Educational discount: 50% off for .edu emails
- Premium features: AI tools, templates, Vim mode