# Open Work

## Highest-Priority Product And Engineering Work

### Foundation hardening

- add tests for auth redirects, onboarding writes, profile reads/writes, dashboard seeding, and API routes
- add monitoring and error reporting for auth, chat, and docs support
- harden deployment checks and post-deploy smoke validation

### Dashboard intelligence

- replace seeded dashboard copy with real learner-adaptive state
- connect progress, milestones, and recommendations to meaningful persistent learner activity
- define room unlock and recommendation logic
- replace demo curriculum and performance sections with real models

### Yantra chat and Support Desk

- pass richer learner context into Yantra prompts
- decide on streaming versus non-streaming responses
- add operational visibility for chat and docs-support failures
- decide whether Support Desk should stay ephemeral or gain persistence and escalation paths

### Access and support operations

- build an internal review workflow for `access_requests`
- define support analytics or ticket handoff if docs support becomes a core channel
- add clearer admissions or partner triage tooling

### Practice rooms

- Python execution environment
- neural-net builder
- dataset explorer
- prompt lab
- shared evaluation and feedback framework

### Institution and outcome layers

- teacher dashboard
- class analytics
- classroom mode or smartboard behavior
- certification workflows
- portfolio and hiring signals

## Current Product Gaps

- onboarding exists, but it is still a lean first-pass experience
- the dashboard persists starter data, but it is not truly adaptive yet
- the access pipeline persists requests, but no one can review them inside the product
- docs support exists, but it is still a local docs-grounded support layer rather than a full customer-support system

## Current Engineering Gaps

- no automated test suite
- no analytics or observability layer
- no internal access-request operations UI
- no content-management workflow for docs or marketing content
- no richer learner-memory or support-escalation system

## Cleanup Work That Needs Approval

These are intentionally not executed yet:

- deleting root-level local artifacts such as `dist/` or `node_modules_broken/`
- moving or removing reference assets under `docs/reference/`
- large-scale file-organization cleanup that is unrelated to runtime behavior
