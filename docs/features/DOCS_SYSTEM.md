# Docs System

## Routes And Ownership

- docs home: `app/docs/page.tsx`
- docs article route: `app/docs/[slug]/page.tsx`
- docs shell: `src/features/docs/DocsShell.tsx`
- docs home implementation: `src/features/docs/DocsHomePage.tsx`
- docs article implementation: `src/features/docs/DocsArticlePage.tsx`
- docs content model: `src/features/docs/docs-content.ts`
- support widget: `src/features/docs/DocsSupportWidget.tsx`
- docs support route: `app/api/docs-support/route.ts`
- docs support retrieval and prompt logic: `src/features/docs/docs-support.ts`

## Purpose

The docs system is a standalone public support surface for:

- getting started
- account creation and sign-in guidance
- onboarding explanation
- dashboard and product understanding
- password recovery
- common issue handling
- FAQ-style support

It is intentionally not wired everywhere in the product. The app links to docs from a few high-value moments only:

- marketing nav
- auth pages
- dashboard header
- student profile help/docs shortcut

## Main Surfaces

### `/docs`

The docs home acts as the support hub.

It includes:

- docs hero
- client-side article search
- quick-start cards
- common task cards
- grouped category sections
- support-lane shortcuts

### `/docs/[slug]`

Each article page includes:

- sticky docs sidebar
- large article hero
- section-based long-form content
- optional right-rail table of contents on large screens
- related-guides cards
- previous/next article navigation

## Support Desk

The docs pages mount a separate AI assistant called `Support Desk`.

Important:

- `Support Desk` is not Yantra.
- Yantra is the learning and teaching assistant in the marketing site and dashboard.
- Support Desk is a docs-grounded customer-care assistant focused on access, onboarding, support, and troubleshooting.

## How Support Desk Works

1. The widget lives only inside the docs shell.
2. User messages post to `POST /api/docs-support`.
3. The route normalizes recent support messages.
4. `docs-support.ts` searches a local knowledge base built from `docs-content.ts`.
5. The route sends the user messages plus selected docs excerpts to Gemini.
6. Gemini responds using the separate `Support Desk` system prompt.

## Current Runtime Details

- model: `gemini-2.5-flash`
- server runtime: Node.js
- grounding source: local docs article content from `docs-content.ts`
- current-article awareness: yes, via `activeSlug`
- support message persistence: no
- external retrieval or vector store: no

## Current Strengths

- standalone docs/help center route
- dedicated article information architecture
- responsive shell with mobile docs drawer
- separate support AI identity and prompt
- grounded support answers based on local docs content

## Current Limitations

- docs content is still hand-authored in code
- search is local article search, not a full search system
- Support Desk does not persist conversations
- no analytics, ticketing, or escalation workflow
- no vector retrieval or external knowledge source

## Recommended Next Work

- strengthen the docs information architecture as content grows
- add instrumentation around support questions and failure cases
- decide whether Support Desk should persist sessions or escalate to human support later
- consider semantic retrieval once the docs corpus becomes too large for simple local ranking
