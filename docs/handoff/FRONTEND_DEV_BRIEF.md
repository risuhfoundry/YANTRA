# Frontend Developer Brief

## One-Line Product Idea

Yantra is an AI-powered learning platform that helps a learner understand what to learn, how to learn it, and what to do next through a personalized product experience instead of a random course list.

## What Yantra Is Trying To Become

The long-term idea is not just "a website with a dashboard."

The product direction is:

- AI-guided learning
- personalized learner onboarding and identity
- a protected learner workspace
- roadmap, practice, and progress surfaces
- future teacher, institution, certification, and career-outcome layers

In simple terms: we want the product to feel like a learning operating system, not a static education landing page.

## Current Reality Of The Product

The repo is no longer a mock landing page, but it is also nowhere near the full product vision.

The most honest way to explain the status is:

- frontend shell and visual language: substantially built
- auth and profile foundation: real and working
- dashboard shell: real, but much of the data is still presentation-only
- AI chat: real, but still limited
- full learning engine: not built yet

## Rough Completion Estimate

These are practical estimates, not exact project accounting:

- visual/product shell across the main surfaces: roughly 60% done
- real platform logic and persistent learning system: roughly 25% done
- full long-term product vision: still early, probably under 25% complete

Why the numbers are different:

- many major pages and interactions exist visually
- but the core intelligence, dynamic roadmap logic, practice systems, analytics, teacher flows, and institution layer are still missing

## What Is Already Built

### Public and product-entry surfaces

- marketing landing page
- login page
- signup page
- onboarding flow
- password reset flow
- legal/info pages
- docs/support surface

### Protected product surfaces

- learner dashboard
- editable student profile

### Real infrastructure already working

- Supabase auth
- email/password auth
- Google sign-in path
- protected routes
- first-time profile creation
- profile persistence
- chat API and frontend chat UI
- access-request persistence

## What Is Real But Still Limited

### Dashboard

The dashboard looks like a product, but much of it is still static or seeded presentation content:

- cards are styled and placed
- sections are structured
- learner identity is real
- most progress, rooms, curriculum, momentum, and recommendation logic is still hardcoded

### Chat

Chat works, but it is still not the final version:

- UI exists
- prompts exist
- API exists
- richer learner memory, streaming, analytics, and moderation are still not there

### Onboarding

Onboarding exists and now routes correctly:

- new signup goes into onboarding
- login goes into dashboard
- the UX still needs polish, cleanup, and further responsive refinement

### Docs/support

The docs system exists as a real product surface now:

- docs landing page
- docs article pages
- docs shell
- support widget and docs support API path

It still needs refinement, content scaling, and a stronger information architecture.

## Current Website Structure

### Public routes

- `/`
- `/login`
- `/signup`
- `/onboarding`
- `/auth/reset-password`
- `/docs`
- `/docs/[slug]`
- `/privacy`
- `/terms`
- `/status`

### Protected routes

- `/dashboard`
- `/dashboard/student-profile`

### API routes

- `/api/access-requests`
- `/api/chat`
- `/api/chat/history`
- `/api/profile`
- `/api/docs-support`

## Important Frontend Ownership Areas

If this developer is mainly focused on frontend, the most relevant folders are:

- `src/features/marketing/`
- `src/features/auth/`
- `src/features/onboarding/`
- `src/features/dashboard/`
- `src/features/docs/`
- `src/features/chat/`
- `src/features/legal/`
- `src/features/motion/`
- `src/styles/globals.css`

He should understand `app/` route entrypoints, but most day-to-day UI work will land in `src/features/`.

## What Still Needs To Be Done

## 1. Marketing Site Work

This is a major area for a frontend developer because the landing page is still too large and too centralized.

Tasks:

- split `MarketingLandingPage.tsx` into section-level components
- move static copy into structured config objects
- improve mobile and tablet responsiveness section by section
- tighten hero, section spacing, and CTA hierarchy
- create reusable section primitives instead of one giant feature file
- improve performance of heavy visual sections if they feel expensive
- refine conversion paths into signup, login, chat, and access request
- create cleaner states for loading, errors, and success in public flows

## 2. Auth And Onboarding UX

This area is already live, so the work here is not greenfield. It is polish, reliability, clarity, and responsiveness.

Tasks:

- refine signup and login UI states
- improve error-state clarity and empty-state clarity
- improve mobile layout density and spacing
- further polish onboarding step flow, especially mobile
- reduce unnecessary text duplication on small screens
- make the step transitions feel cleaner and more intentional
- review accessibility of forms, labels, focus states, and CTA ordering
- make auth and onboarding feel visually consistent with the rest of the platform

## 3. Dashboard Frontend Refactor

The dashboard is visually strong, but still too tied to inline demo content and large files.

Tasks:

- split `StudentDashboard.tsx` into section components
- move hardcoded arrays and content blocks into typed data files
- build reusable card components for stats, curriculum items, rooms, and quick actions
- create better responsive behavior for large laptops, tablets, and small desktop screens
- add skeleton states and empty states
- prepare UI structure so real backend data can drop in later without redesigning everything
- clean up spacing, hierarchy, and section balance across the dashboard

## 4. Student Profile UX

This is one of the real persisted product surfaces, so it deserves more frontend maturity.

Tasks:

- improve form grouping and readability
- improve mobile profile editing flow
- refine save states and feedback patterns
- clean up secondary panels like settings/help/notifications
- reduce visual clutter where data is still static
- make the page feel clearly connected to the learner dashboard, not like a separate microsite

## 5. Docs And Support Surface

This is a good task bucket if he wants meaningful work without depending on deep backend changes.

Tasks:

- refine docs home layout and hierarchy
- improve docs article readability and navigation
- improve support widget layout and interaction flow
- add stronger responsive behavior for docs pages
- improve article cards, search affordances, and category grouping
- create reusable docs UI pieces so content can scale cleanly
- make docs feel like a proper product help center, not just a styled side page

## 6. Chat UI Work

The backend exists, but the frontend experience can still improve a lot.

Tasks:

- improve chat modal responsiveness
- improve message spacing and hierarchy
- refine quick prompt presentation
- improve loading, retry, and error states
- make the launcher and modal transitions feel more premium
- improve long-message readability
- prepare the chat UI for future features like persistent threads, tool outputs, or streaming

## 7. Shared Design-System Style Work

A frontend developer can create a lot of value here even without touching backend logic.

Tasks:

- standardize buttons, chips, cards, panels, and section shells
- standardize spacing rules between surfaces
- standardize motion usage
- standardize heading scale and text rhythm
- reduce repeated class patterns by extracting reusable UI pieces where it makes sense
- make the responsive behavior more systematic instead of page-by-page improvisation

## 8. Route-Level Cleanup And Product Consistency

There are many smaller surfaces that still need polish to feel like one coherent product.

Tasks:

- review `/privacy`, `/terms`, and `/status`
- align those pages with the main design system
- make route transitions feel consistent
- make all public pages feel like one brand system
- clean up inconsistencies between marketing, auth, onboarding, dashboard, and docs

## What Is Not His Main Job Right Now

He should know these are important, but they are not the main frontend ownership areas unless specifically asked:

- deep Supabase logic
- Gemini route logic
- database schema design
- teacher/institution backend
- analytics infrastructure
- full roadmap-generation engine

He should design UI and structure with these future systems in mind, but he does not need to solve them alone right now.

## What We Expect From The Product

The product should eventually feel like this:

- a learner signs up and immediately understands where they are
- onboarding feels intentional and personalized
- the dashboard feels alive, useful, and clearly personalized
- chat feels like an actual AI mentor, not just a floating chatbot
- the learner always knows the next step
- the product looks premium, focused, and trustworthy on every screen size

## What We Expect From Him As A Frontend Developer

We are not expecting him to "just make pages pretty."

We expect him to:

- take ownership of frontend quality
- improve responsiveness seriously
- componentize large surfaces
- reduce UI debt
- build reusable UI patterns
- turn placeholder-looking sections into production-ready frontend shells
- prepare the UI for real data integration later
- identify inconsistencies and fix them proactively

## Practical First Sprint For Him

If you want to give him a clear starting path, this is a strong first batch:

1. Refactor and split the marketing landing page.
2. Polish login, signup, and onboarding responsiveness.
3. Refactor the dashboard into reusable sections and typed config.
4. Improve the student profile UX.
5. Improve docs/support responsiveness and structure.

That alone is enough meaningful frontend work for a solid stretch without him ever feeling underused.

## Suggested Message To Him

You are not joining an empty frontend. You are joining a product that already has a real auth base, a real profile flow, a real protected dashboard shell, chat, docs, and a public conversion layer. Your job is to turn the existing surfaces into a cleaner, more scalable, more responsive product frontend, while also preparing them for real data and future product layers.
