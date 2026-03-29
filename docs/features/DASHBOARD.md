# Dashboard

## Routes And Ownership

- `/dashboard`
- `/dashboard/student-profile`
- dashboard entry: `app/dashboard/page.tsx`
- dashboard implementation: `src/features/dashboard/StudentDashboard.tsx`
- dashboard data loader: `src/lib/supabase/dashboard.ts`
- student profile entry: `app/dashboard/student-profile/page.tsx`
- student profile implementation: `src/features/dashboard/StudentProfilePage.tsx`

## Route Protection

All dashboard routes are protected server-side.

Each route:

- checks whether Supabase env vars are configured
- reads the authenticated learner through `requireAuthenticatedProfile()`
- redirects unauthenticated requests to `/login`

The route-guard helper supports onboarding enforcement, but the current dashboard routes do not require onboarding completion before render. New accounts still reach onboarding first through the signup flow.

## `/dashboard`

### Purpose

The main dashboard is the protected learner home surface. It mixes real identity and persisted starter dashboard data with polished UI shells for future product layers.

### What is dynamic today

- learner full name
- learner first name
- learner email
- learner profile-derived role and onboarding context
- dashboard path row from `student_dashboard_paths`
- skill cards from `student_skill_progress`
- curriculum nodes from `student_curriculum_nodes`
- weekly momentum bars from `student_weekly_activity`

### Starter-data behavior

`src/lib/supabase/dashboard.ts` now does more than just return hardcoded UI data.

It:

1. loads the authenticated learner
2. queries the four dashboard tables
3. seeds starter rows when data is missing
4. falls back to a local starter dashboard shape when the dashboard schema or RLS is missing

That means the dashboard state is persisted, but it is still seeded starter content rather than a real adaptive learner engine.

### What is still static or seeded today

- rooms remain mock preview surfaces
- AI quick prompts are product copy, not dynamic recommendations
- unlock logic is still starter logic
- next-action intelligence is still seeded
- there is no analytics or event pipeline

### Embedded behavior

- room cards stay as mock UI and open shared Yantra chat prompts
- the main AI panel opens the shared Yantra chat modal
- the header includes a docs entry point
- same-page section links intentionally bypass the global route-transition loader

## `/dashboard/student-profile`

### Purpose

This is the most direct persisted dashboard surface in the current product. It lets the authenticated learner review and update their profile record while still exposing surrounding dashboard-style panels.

### Current profile fields

- `name`
- `classDesignation`
- `skillLevel`
- `progress`
- `academicYear`
- `userRole`
- `ageRange`
- `primaryLearningGoals`
- `learningPace`
- `onboardingCompleted`
- `onboardingCompletedAt`

### Persistence behavior

- the server seeds a default profile row on first access if one does not exist
- the page saves changes through `PUT /api/profile`
- the payload is validated with `normalizeStudentProfileInput()`
- stored values are sanitized before upsert

### Supporting UI

The page also includes:

- overview, roster, curriculum, and performance sections
- docs and logout shortcuts in the side support area
- updates and settings panels
- a direct sign-out path through `/auth/signout`

Only the profile record is genuinely user-edited today. The surrounding roster, curriculum, notifications, and performance content remains demo or seeded product copy.

## Current Strengths

- protected routes are real
- learner identity and profile are backed by Supabase
- the dashboard has a persisted starter-data layer instead of only local arrays
- the profile screen exposes a genuine save path
- dashboard and profile surfaces share a consistent visual system

## Current Limitations

- room cards are still mock UI, not dedicated room routes
- dashboard persistence is starter-state persistence, not adaptive personalization
- no real curriculum or recommendation engine
- no analytics or event tracking
- no tests around protected-route, dashboard-seed, or profile-save behavior

## Recommended Next Work

- replace seeded dashboard copy with real learner-adaptive state
- add tests for `/api/profile`, dashboard seeding, and route protection
- decide the redesigned room system before reintroducing dedicated room routes
- replace static or starter curriculum/performance sections with real models
