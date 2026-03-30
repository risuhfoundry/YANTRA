# Marketing Site

## Route And Ownership

- route: `/`
- entry file: `app/page.tsx`
- main implementation: `src/features/marketing/MarketingLandingPage.tsx`
- supporting config: `src/features/marketing/marketing-content.ts`

## Purpose

The marketing site is the public-facing narrative and conversion layer for Yantra.

Today it is responsible for:

- explaining the product story
- directing visitors into signup, login, and docs
- collecting access intent through the access-request form
- opening the main Yantra assistant with guided prompts

## Main Sections

The landing page currently includes:

- fixed navigation with in-page anchors plus a docs route entry
- hero section
- animated ticker
- about/platform framing
- capability cards
- visual use-case grid
- access/contact section
- footer

## Live User Actions

### Account entry

- primary CTA routes to `/signup`
- auth links route to `/login` and `/signup`

### Docs entry

- top navigation includes a single `Docs` route entry to `/docs`
- the docs system is intentionally linked in a few high-value places, not sprayed across the whole app

### Chat entry

The page is wrapped in `ChatProvider`, so CTA buttons can open the shared Yantra chat modal and optionally pre-send prompts from `yantraCtaPrompts`.

### Access requests

The access/contact area uses `src/features/access/AccessRequestForm.tsx`, which submits to `POST /api/access-requests`.

That flow is live and persists requests in Supabase.

## Current Strengths

- strong visual identity and motion language
- clear conversion paths into signup, docs, and chat
- real access-request submission flow with persistence
- public surface still renders cleanly even when Supabase-backed actions are unavailable

## Current Limitations

- still implemented in one large feature file
- content is hardcoded
- no CMS or structured content source
- no deeper marketing routes yet

## Guidance For Future Work

- keep the landing page as the public route boundary
- extract large section blocks into smaller files before the component grows further
- move static content into typed config objects if copy variants increase
- add an internal admissions or partner-review workflow before expanding the access form further
