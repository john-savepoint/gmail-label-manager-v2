Gmail Advanced Label & Workflow Manager: Version 2.0 - Feature Roadmap & Bug Fixes
Date: 2025-06-02
Version: 2.0 Planning Document

1. Introduction
   Following the successful launch and adoption of the Gmail Advanced Label & Workflow Manager (MVP), this document outlines the roadmap for Version 2.0. This next phase focuses on addressing identified bugs, enhancing existing functionality, introducing powerful new features (including AI-driven tools and Vim navigation), and implementing a monetization strategy. The goal is to solidify the extension as an indispensable tool for Gmail power users.
2. Critical Bug Fixes (MVP Remediation)
   [BUG-001] Label Import Functionality:

Description: Current import fails to correctly process label colors, top-level labels, and hierarchical structures. Results in 400 Bad Request API errors.
Action: Refactor import logic to create labels hierarchically (parents first). Debug and validate API request payloads for POST .../users/me/labels.

[BUG-002] Accessibility: aria-hidden Conflict:

Description: aria-hidden is incorrectly applied to an element with a focused descendant.
Action: Resolve per WAI-ARIA specifications (e.g., using inert or adjusting focus management) to ensure accessibility.

[BUG-003] Recursive Sub-Label Search:

Description: Context menu option appears on non-label elements; action incorrectly refreshes the extension UI instead of executing the search.
Action: Correct context menu targeting logic. Ensure the search function is properly invoked and executes the Gmail search.

[BUG-004] Modal Obscuring Background Content:

Description: During label import from backup, background pane changes are obscured by the active modal.
Action: Prevent modals from obscuring critical background information or manage UI updates to avoid this conflict.

[BUG-005] Color Display in Bulk Operations:

Description: Current label colors are not accurately displayed in the bulk operations UI.
Action: Ensure the UI correctly fetches and displays current label colors during bulk editing tasks.

3. Core Feature Enhancements & Technical Refinements
   [ENH-001] State Persistence: Implement mechanisms for the extension's UI (popup, settings pages) to retain user selections and input states across sessions.
   [ENH-002] Multi-Account Context Awareness: Ensure all operations, especially API calls, are correctly scoped to the active Gmail account tab, particularly for users with multiple Google accounts.
   [ENH-003] Advanced Progress Tracking: Develop a more detailed and user-friendly progress indication system for long-running tasks (e.g., percentage, current step, estimated time).
   [ENH-004] Google Label Color Standardization & Migration:

Utilize Gmail's official color palette.
Develop a migration tool for users with custom (non-standard) label colors to map them to the official palette, with manual and automated (closest match) options.

[ENH-005] Google Workspace Compatibility: Verify and ensure full functionality for Google Workspace accounts. 4. New Major Features
[FTR-MAJ-001] AI-Powered Label & Filter Organization Suite:

Label System Setup Wizard: An AI tool that analyzes existing labels (optional) and guides users through creating an optimized label structure via interactive questions or automated discovery (keyword-based search, sender extraction, confirmation, and rule creation). Includes presets.
AI Filter Injection: AI-assisted creation of Gmail filters based on email content, user habits, or common patterns.
BYO AI API / Paid Tier: Offer AI features via user's own API key or through a paid subscription tier for managed AI access.

[FTR-MAJ-002] Vim Mail Mode:

Implement comprehensive Vim-like keyboard navigation and command mode for Gmail.
Define an intuitive and customizable set of key bindings (see detailed list in notes).
Include a keyboard shortcut help overlay/display (Cmd/Ctrl+H).

[FTR-MAJ-003] Label & Filter Templates Marketplace:

Allow users to create, save, import, and export "Label Templates" and "Filter Templates."
Develop a Library/Store/Marketplace for users to share or acquire these templates. (Phased approach likely needed).

[FTR-MAJ-004] Advanced "Filter Like This" Workflow:

From multi-selected emails, initiate a process to:

Analyze selected emails.
Optionally search for similar emails.
Apply a chosen label to all relevant emails.
Automatically generate and propose a new Gmail filter (with options like including/excluding CC).

5. UI/UX Enhancements & New Productivity Tools
   [FTR-UIX-001] Resizable Gmail Left Sidebar: Allow users to adjust the width of the main Gmail navigation panel.
   [FTR-UIX-002] Enhanced Label Display Universally:

In all label dropdowns/search results: display label colors, clear hierarchy, full text on hover.
Add inline search and "Recently Used" sections to label selection dropdowns.

[FTR-UIX-003] Dynamic Text Input Sizing: Text inputs within resizable dropdowns should also resize.
[FTR-UIX-004] Improved Multi-Label Assignment in Filters: Streamline assigning multiple labels to a single filter.
[FTR-UIX-005] Gmail Filter Page Enhancements: Option to group filters by label; cleaner, condensed parameter display.
[FTR-UIX-006] Wider "Search In" Dropdown (Advanced Search): Improve visibility of long label names.
[FTR-UIX-007] Collapsible Label Hierarchy in Message View: Option for a "breakout arrow" on labels in the message list to show/hide full hierarchy.
[FTR-UIX-008] Date Format Toggle: Clickable dates in message list to cycle formats.
[FTR-UIX-009] Independent Scrolling for User Label List: Improve sidebar usability for users with many labels.
[FTR-UIX-010] Sidebar Label Hover Tools: Quick actions (hide, color) on hover for labels in the sidebar.
[FTR-UIX-011] Email Response Status Indicator: Visual cue next to emails indicating replied/awaiting reply status (excluding category tabs).
[FTR-UIX-012] Visual Cue for "Hidden" Labels: Grey text for labels set to "hide in message list."
[FTR-UIX-013] "View Emails in Label" Context Menu: Quick search access from label sidebar.
[FTR-UIX-014] Label Utility Tool: Numbering prefixes and bulk case changing for label names.
[FTR-UIX-015] Legacy Label Handling (AI Setup): Non-destructive AI setup; option to group old labels under "Legacy" and hide them.
[FTR-UIX-016] Default to Advanced Search (Optional): Setting to make Gmail search bar behave like advanced search by default.
[FTR-UIX-017] Near-Native Group-By/Sort Button (Exploratory): Investigate feasibility of enhanced sorting/grouping in email list. 6. Monetization Strategy Implementation
[MON-001] Subscription Tiers:

Monthly: $5.00
Annual: $30.00 (offers savings)

[MON-002] Educational Discount: 50% off for verified .edu email addresses.
[MON-003] Promotional Mechanisms: Implement referral codes and free/discount codes for marketing campaigns.
[MON-004] Premium Features: Clearly delineate free vs. paid features (e.g., advanced AI tools, extensive template library access, VIM mode could be premium). 7. Branding & Presentation
[BRD-001] New Extension Icon: Design a modern, professional extension icon.
[BRD-002] Active State Icon: Icon visually changes when on a Gmail page.
[BRD-003] UI Branding: Ensure no third-party logos/branding in the extension's UI. 8. Settings & Configuration
[CFG-001] Quick Settings Panel: Easy access to common extension settings.
[CFG-002] Settings Presets: Allow users to save and load configurations for the extension. 9. Updated Technical Considerations
API Usage: Increased reliance on Gmail API necessitates robust error handling, rate limit management, and efficient batching for new features.
AI Integration: If using third-party AI APIs, manage keys securely (client-side for BYO, server-side for paid tier). Consider costs and rate limits of AI services.
Vim Mode Implementation: Requires careful event handling and management of focus within the Gmail DOM to avoid conflicts.
Marketplace Backend: If implementing a template marketplace, this will require significant backend infrastructure (database, API, user accounts for sharing).
Performance: Continued vigilance on performance impact, especially with more DOM manipulations and background processes. 10. Prioritization & Phasing (Suggested)
Given the scope, a phased rollout is recommended:

Phase 2.1 (Immediate Focus):

All Critical Bug Fixes (Section 2).
Core Feature Enhancements & Technical Refinements (Section 3).
High-impact UI/UX improvements with lower complexity.

Phase 2.2 (Major Feature Introduction):

Vim Mail Mode.
AI-Powered Label & Filter Organization Suite (potentially core AI wizard first).
Monetization infrastructure.

Phase 2.3 (Ecosystem & Advanced Tools):

Label & Filter Templates Marketplace.
More complex AI features and advanced productivity tools.
