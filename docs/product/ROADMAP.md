# Roadmap

## Current Phase

Yantra has moved beyond the initial shell stage and is now in the transition from foundation to product depth.

What already exists:

- branded public landing page
- login, signup, onboarding, and password reset flows
- Google sign-in through Supabase
- public docs/help center with article pages
- a separate Support Desk assistant for docs and troubleshooting
- Supabase-backed protected routes
- persisted learner profiles
- persisted public access requests
- persisted starter dashboard data
- Gemini-backed Yantra chat with authenticated history restore

What is still incomplete:

- real adaptive learning state
- dynamic roadmap engine
- real practice-room tooling
- analytics and observability
- internal support and access-request operations
- teacher and institution workflows

## Practical Roadmap

### Phase 1: Foundation Layer

Status: largely shipped

What this phase delivered:

- auth foundation
- onboarding foundation
- profile persistence
- starter dashboard persistence
- access-request persistence
- main Yantra chat
- docs/help center and Support Desk
- deployment-ready Vercel + Supabase setup

### Phase 2: Make The Learner Surface Truly Data-Driven

Goal: replace seeded dashboard behavior with real learner state.

Priority items:

- typed learner dashboard data model
- dynamic progress and milestone data
- recommendation logic tied to learner activity
- curriculum state tied to profile and onboarding context
- room unlock logic

### Phase 3: Deepen AI Continuity And Support

Goal: make both assistants more useful and more operationally trustworthy.

Priority items:

- richer learner context for Yantra
- observability for Yantra and Support Desk
- decide on streaming
- decide whether Support Desk needs persistence, escalation, or handoff
- improve docs retrieval once the knowledge base grows

### Phase 4: Build Real Practice Rooms

Goal: make Yantra hands-on instead of mostly explanatory.

Priority items:

- Python practice room
- neural-network builder
- dataset explorer
- prompt lab
- evaluation and feedback loops

### Phase 5: Expand Into Institutional And Outcome Layers

Goal: turn the learner product into a broader platform.

Priority items:

- teacher dashboard
- class analytics
- classroom and smartboard behaviors
- certifications
- portfolio and employer-facing signals

## Rule For Contributors

Before starting a feature, be explicit about whether it:

- hardens the current foundation
- makes existing learner surfaces truly data-driven
- deepens support and AI continuity
- adds new product surface area

That distinction matters because the repo already has a real auth/profile/docs base. Work that ignores it will usually create churn.
