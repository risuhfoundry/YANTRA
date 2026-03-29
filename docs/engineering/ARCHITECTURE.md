# Architecture

## Current Stack

- Framework: Next.js 16 App Router
- UI: React 19
- Styling: Tailwind CSS v4 through `src/styles/globals.css`
- Motion and scroll behavior: `motion` and `lenis`
- Icons: `lucide-react`
- Auth and persistence: Supabase SSR + `@supabase/supabase-js`
- AI provider: Google Gemini through `@google/genai`
- Deployment target: Vercel

## Runtime Surfaces

### Marketing Site

- route: `/`
- entry: `app/page.tsx`
- main implementation: `src/features/marketing/MarketingLandingPage.tsx`
- responsibilities:
  - public product narrative
  - access-request CTA surface
  - signup/login/docs entry points
  - Yantra chat entry points

### Authentication And Onboarding

- routes: `/login`, `/signup`, `/onboarding`, `/auth/confirm`, `/auth/reset-password`, `/reset-password`, `/auth/signout`
- main implementations:
  - `src/features/auth/AuthExperience.tsx`
  - `src/features/auth/ResetPasswordExperience.tsx`
  - `src/features/onboarding/RoleOnboardingExperience.tsx`
- responsibilities:
  - email/password sign-in
  - email/password sign-up
  - Google sign-in through Supabase OAuth
  - email verification redirect handling
  - password recovery and password update
  - onboarding for new accounts
  - sign-out
  - redirecting authenticated users away from auth pages

### Docs And Support

- routes: `/docs`, `/docs/[slug]`
- main implementation: `src/features/docs/`
- responsibilities:
  - standalone public docs/help center
  - article-based support content
  - local docs search
  - separate Support Desk customer-care assistant

### Student Dashboard

- route: `/dashboard`
- entry: `app/dashboard/page.tsx`
- main implementation: `src/features/dashboard/StudentDashboard.tsx`
- responsibilities:
  - protected learner dashboard shell
  - display of learner identity from authenticated profile data
  - loading seeded persisted starter dashboard data
  - Yantra chat entry points

### Student Profile

- route: `/dashboard/student-profile`
- entry: `app/dashboard/student-profile/page.tsx`
- main implementation: `src/features/dashboard/StudentProfilePage.tsx`
- responsibilities:
  - protected profile editing experience
  - loading current learner profile from Supabase
  - persisting edits through `/api/profile`
  - linking into the docs/help system

### APIs

- `POST /api/chat`
  - validates and sanitizes recent Yantra chat messages
  - calls Gemini with the Yantra system prompt
  - persists rolling chat history for authenticated users
- `GET /api/chat/history`
  - returns the authenticated learner's latest persisted Yantra conversation
- `GET /api/profile`
  - returns the authenticated learner profile and seeded defaults
- `PUT /api/profile`
  - validates profile input and upserts the authenticated learner profile
- `POST /api/access-requests`
  - validates name/email/message and persists the request
- `POST /api/docs-support`
  - validates Support Desk messages
  - builds docs-grounded context
  - calls Gemini with the separate Support Desk prompt

## Auth And Session Boundary

Supabase SSR is wired through three layers:

1. `src/lib/supabase/client.ts`
   Browser client for interactive auth actions inside client components.
2. `src/lib/supabase/server.ts`
   Server client for route handlers and server components.
3. `proxy.ts` plus `src/lib/supabase/proxy.ts`
   Request-level cookie refresh for Supabase sessions.

Protected routes do not rely on client-only checks. `app/dashboard/page.tsx` and `app/dashboard/student-profile/page.tsx` read the authenticated user server-side and redirect unauthenticated requests to `/login`.

## Persistence Model

### Current persisted data

- Supabase auth users
- `public.profiles`
- `public.access_requests`
- `public.chat_histories`
- `public.student_dashboard_paths`
- `public.student_skill_progress`
- `public.student_curriculum_nodes`
- `public.student_weekly_activity`

### `public.profiles` fields

- `id`
- `email`
- `full_name`
- `class_designation`
- `skill_level`
- `progress`
- `academic_year`
- `user_role`
- `age_range`
- `primary_learning_goals`
- `learning_pace`
- `onboarding_completed`
- `onboarding_completed_at`
- `created_at`
- `updated_at`

The profile model is defined in the app as `StudentProfile` in `src/features/dashboard/student-profile-model.ts`. Writes are sanitized before persistence.

### Dashboard starter-data tables

The dashboard loader persists starter product data across:

- `public.student_dashboard_paths`
- `public.student_skill_progress`
- `public.student_curriculum_nodes`
- `public.student_weekly_activity`

These tables make the dashboard load from Supabase instead of only local arrays, but the underlying product logic is still starter data rather than true adaptive learning state.

## Request Flows

### Login flow

1. User opens `/login`.
2. `app/login/page.tsx` checks whether Supabase env vars exist.
3. If a valid session already exists, the route redirects to `/dashboard`.
4. `AuthExperience` submits `signInWithPassword()` from the browser client.
5. On success, the client transitions to `/dashboard`.

### Google sign-in flow

1. User clicks the Google button on `/login` or `/signup`.
2. `AuthExperience` calls `signInWithOAuth({ provider: 'google' })`.
3. Supabase returns through `/auth/confirm` with an OAuth `code`.
4. `/auth/confirm` exchanges the code for the session cookie.
5. The route redirects to `/dashboard` or `/onboarding`, depending on the requested `next` path.

### Signup flow

1. User opens `/signup`.
2. `AuthExperience` calls `signUp()` with `emailRedirectTo=/auth/confirm?next=/onboarding`.
3. Supabase sends the confirmation email when email confirmation is enabled.
4. `/auth/confirm` verifies the OTP and redirects into `/onboarding`.
5. If Supabase returns a session immediately, the client routes straight to `/onboarding`.

### Onboarding flow

1. `/onboarding` requires an authenticated user.
2. If the onboarding schema is unavailable, the route redirects to `/dashboard`.
3. If onboarding is already complete, the route redirects to `/dashboard`.
4. `RoleOnboardingExperience` collects role, age range, learning goals, and pace.
5. The resulting state is stored in `public.profiles`.

### Password reset flow

1. User opens `/login` and enters an email address.
2. `AuthExperience` calls `resetPasswordForEmail()` with `redirectTo=/auth/reset-password`.
3. Supabase redirects the recovery link into `/auth/reset-password`.
4. `ResetPasswordExperience` updates the password through `updateUser({ password })`.
5. The temporary recovery session is signed out and the learner is redirected to `/login`.

### Dashboard/profile load flow

1. A protected route checks `hasSupabaseEnv()`.
2. The route calls `requireAuthenticatedProfile()`.
3. If no session exists, the route redirects to `/login`.
4. If the learner has no `profiles` row yet, the server inserts a seeded default row.
5. `/dashboard` then calls `getAuthenticatedDashboardData()`.
6. The dashboard loader queries the dashboard tables, seeds them if needed, and falls back gracefully when the schema is missing.

### Profile save flow

1. `StudentProfilePage` sends `PUT /api/profile`.
2. `normalizeStudentProfileInput()` validates the incoming payload.
3. `updateAuthenticatedProfile()` upserts the row keyed by the authenticated user id.
4. The updated profile is returned to the client.

### Yantra chat flow

1. Marketing and dashboard pages wrap their UI in `ChatProvider`.
2. On first open, the provider tries to load `/api/chat/history`.
3. Authenticated learners receive their last persisted conversation; public users keep the in-memory welcome state.
4. The provider sends the most recent sanitized conversation to `/api/chat`.
5. The route truncates model input to the last 12 messages, calls Gemini, and persists the updated rolling history for authenticated learners.

### Docs Support Desk flow

1. Docs pages mount `DocsSupportWidget`.
2. The widget posts recent support messages plus the current article slug to `/api/docs-support`.
3. `docs-support.ts` ranks relevant docs sections from the local docs content source.
4. The route sends the selected excerpts to Gemini with the separate Support Desk system prompt.
5. The client renders the answer plus article source links.

## State Boundaries

### Persistent

- auth session
- student profile row
- access-request rows
- authenticated Yantra chat history
- starter dashboard rows

### Client-only

- dashboard section state
- mobile nav and panel open states
- access-request form status
- docs search query
- docs support open/expand state
- docs support conversation state

### Seeded or presentation-led

- room cards
- many dashboard recommendation phrases
- marketing copy blocks
- docs article content and support knowledge base

## Current Constraints

- dashboard logic is seeded and starter-oriented, not truly adaptive
- room cards are still preview surfaces
- Yantra chat continuity is limited to one rolling authenticated conversation
- Support Desk is grounded to local docs content only
- there is no test suite, analytics layer, or monitoring stack yet

## Recommended Evolution

- keep route wiring and API handlers in `app/`
- keep surface-specific UI in `src/features/`
- keep Supabase integration inside `src/lib/supabase/`
- keep Yantra and Support Desk as separate assistants with separate prompts and jobs
- add richer dashboard intelligence, chat/support observability, and access-request review tooling before expanding product surface area further
