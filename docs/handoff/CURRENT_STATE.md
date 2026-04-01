# Current State

## Repo Summary

Yantra is a Next.js 16 App Router product with live authentication, a protected learner area, a public docs/help center, Supabase-backed persistence, and two separate Gemini-backed assistants:

- `Yantra` for learning and product guidance inside the main app
- `Support Desk` for docs-grounded customer care inside `/docs`

The current codebase is best described as:

- a polished public product and conversion layer
- a real auth, onboarding, and profile foundation
- a protected learner dashboard with seeded persisted starter data
- a live docs/help center
- live AI-assisted support surfaces

It is no longer accurate to describe the repo as only a static frontend shell.

## Live Runtime Surfaces

### Public app routes

- `/` marketing landing page
- `/login` sign-in experience
- `/signup` sign-up experience
- `/onboarding` post-signup onboarding flow
- `/auth/reset-password` primary password recovery completion route
- `/reset-password` mirror of the reset-password experience
- `/docs` docs home
- `/docs/[slug]` docs article pages
- `/privacy`
- `/terms`
- `/status`

### Protected app routes

- `/dashboard` learner dashboard
- `/dashboard/student-profile` editable student profile

### Auth utility routes

- `/auth/confirm` handles Supabase email confirmation and Google OAuth code exchange
- `/auth/signout` clears the session and redirects to `/login`

### API routes

- `POST /api/chat`
- `GET /api/chat/history`
- `GET /api/profile`
- `PUT /api/profile`
- `POST /api/access-requests`
- `POST /api/docs-support`

## What Works Today

- local Next.js development, linting, and production builds
- Vercel-compatible deployment
- Supabase SSR auth with cookie refresh through `proxy.ts`
- email/password auth
- Google sign-in through Supabase OAuth
- password reset email flow and reset page
- onboarding flow for new accounts
- redirect protection for `/dashboard` and `/dashboard/student-profile`
- automatic first-profile creation in Supabase for signed-in users
- profile editing and saving from the student profile page
- dashboard data loading from Supabase dashboard tables, with starter seeding and fallback behavior
- Gemini chat requests using `gemini-2.5-flash`
- authenticated Yantra chat history restore across sessions
- access-request submission with validation, persistence, and success/error states
- standalone docs system with searchable guides and article pages
- a separate docs-grounded `Support Desk` assistant inside `/docs`

## What Is Real But Limited

### Access requests

The landing-page access form is wired end to end from the public site to `POST /api/access-requests`, and the route persists records in Supabase. There is still no internal admissions or partner-review UI in this repo.

### Dashboard data

The dashboard is no longer purely hardcoded. `src/lib/supabase/dashboard.ts` loads `student_dashboard_paths`, `student_skill_progress`, `student_curriculum_nodes`, and `student_weekly_activity`, and seeds starter records when they are missing.

The limitation is that those records still represent starter product content, not a genuinely adaptive learner engine. The data is persisted, but the logic is still mostly seeded and presentation-led.

### Student profile persistence

The student profile is real. It is stored in Supabase, seeded on first access, sanitized on write, and exposed through `/api/profile`.

The profile now includes onboarding-oriented fields as well:

- `userRole`
- `ageRange`
- `primaryLearningGoals`
- `learningPace`
- `onboardingCompleted`
- `onboardingCompletedAt`

### Yantra chat continuity

Authenticated learners resume a single rolling Yantra conversation from Supabase-backed history. Public marketing chat remains ephemeral. This is one rolling thread, not a multi-thread inbox.

### Docs and Support Desk

`/docs` is now a real product surface with:

- a docs home page
- article pages under `/docs/[slug]`
- a separate `Support Desk` support assistant

`Support Desk` is not Yantra. It is grounded locally against `src/features/docs/docs-content.ts` through `app/api/docs-support/route.ts`. It does not read live user data and does not persist support conversations.

## Known Placeholder Areas

- room cards are still preview surfaces, not real practice-room engines
- dashboard recommendations are seeded, not truly adaptive
- teacher, institution, analytics, certification, and hiring flows are not built
- access requests have no internal review workflow yet
- docs support has no ticket handoff, analytics, or escalation layer

## Important Runtime Structure

- `app/` contains route entrypoints and API handlers
- `src/features/marketing/` contains the public landing page
- `src/features/auth/` contains login, signup, and reset experiences
- `src/features/onboarding/` contains the onboarding experience
- `src/features/dashboard/` contains the dashboard and profile experiences
- `src/features/docs/` contains the docs home, article pages, and support widget
- `src/features/chat/` contains the main Yantra chat widget and prompt configuration
- `src/lib/supabase/` contains browser, server, env, proxy, profile, and dashboard helpers
- `supabase/schema.sql` defines the required database tables and RLS policies
- `proxy.ts` refreshes Supabase auth cookies on matching requests

## Important Reference Assets

- `docs/reference/dashboard-sample/` contains dashboard design references
- `docs/reference/Login-signup-sample/` contains login/signup design references
- `docs/reference/Docs page design/` contains docs design references
- `docs/reference/build-plan/` contains the broader product-plan PDF and extracted text

These are still useful inputs and should not be removed without approval.

## Immediate Recommended Builder Flow

1. Confirm env vars and Supabase setup from `engineering/SETUP_AND_DEPLOYMENT.md`.
2. Decide whether the task belongs to marketing, auth, onboarding, docs, dashboard, chat, or platform foundations.
3. Keep runtime work separate from cleanup or archival changes.
4. Update the relevant feature doc and this handoff note when behavior changes.

## Best Next Work

- replace seeded dashboard behavior with real learner-adaptive state
- add tests around auth redirects, profile APIs, dashboard seeding, and chat/support routes
- add internal review tooling for access requests
- add observability for Yantra chat and Support Desk
- decide how docs support should evolve beyond local docs retrieval
