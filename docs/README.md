# Yantra Docs

This folder is the operating handbook for the live Yantra codebase.

Use it to understand what is actually implemented now, what is still placeholder, and where new work should land.

## What Is In This Folder

### Engineering

- `engineering/ARCHITECTURE.md`
  Runtime boundaries, request flows, persistence model, and current technical constraints.
- `engineering/CODEBASE_MAP.md`
  Route-by-route and folder-by-folder map of the active codebase.
- `engineering/SETUP_AND_DEPLOYMENT.md`
  Local setup, environment variables, validation commands, and deployment guidance.
- `engineering/SUPABASE_SETUP.md`
  Supabase auth setup, schema application, redirect configuration, and profile flow details.
- `engineering/WORKFLOW.md`
  Repo working rules, safe change categories, and contribution expectations.

### Features

- `features/MARKETING_SITE.md`
  What the landing page actually contains, including access and account-entry flows.
- `features/DASHBOARD.md`
  What the protected dashboard and student profile pages do today.
- `features/CHAT_SYSTEM.md`
  How the chat widget, prompt layer, and `/api/chat` route work.

### Product

- `product/PRODUCT_BRIEF.md`
  Current product position, live capabilities, and the gap between the prototype and the full vision.
- `product/ROADMAP.md`
  What has already moved from roadmap into implementation, and what still belongs to future phases.
- `product/OPEN_WORK.md`
  Concrete unfinished product and engineering work.

### Handoff

- `handoff/CURRENT_STATE.md`
  Fast practical handoff for the next engineer picking up the repo.
- `handoff/FRONTEND_DEV_BRIEF.md`
  Detailed product, structure, progress, and task brief for a frontend-heavy contributor.

### Reference

- `reference/SOURCE_ASSETS.md`
  Non-runtime design and product inputs used to shape the current build.

## Fast Start For A New Builder

1. Read `handoff/CURRENT_STATE.md`.
2. Read `engineering/SETUP_AND_DEPLOYMENT.md`.
3. Read `engineering/CODEBASE_MAP.md`.
4. Read the relevant file inside `features/`.
5. Read `product/OPEN_WORK.md` before starting implementation.

## Current Product Reality

Yantra now has:

- a public marketing surface
- login and signup flows
- Supabase-backed protected dashboard routes
- a persisted `profiles` table for the student profile
- Gemini-backed chat

Yantra still does not have:

- real learning-path generation
- persistent chat sessions
- production-grade access-request storage
- actual practice-room engines
- analytics, teacher tools, or institution workflows

The docs should reflect that distinction clearly. Avoid describing roadmap ideas as already shipped.

## Documentation Rules

- Treat this folder as the first source of truth for repo context.
- Update docs in the same change whenever routes, auth behavior, environment setup, APIs, or architecture change.
- Distinguish between live behavior, placeholder UI, and future work.
- Keep reference assets under `docs/reference/`; do not delete or relocate them without approval.
