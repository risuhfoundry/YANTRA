# Rooms Index Design Strategy

## North Star

This screen should feel like a protected Yantra workspace, not a catalog page.

The learner is inside one skill track and should immediately understand:

- where they are
- what room comes next
- what is already complete
- what remains locked
- why a room is locked

The page should preserve Yantra's existing product mood:

- black obsidian base
- editorial typography
- soft frosted-glass panels
- subtle white glow
- quiet, premium, AI-native atmosphere

## Layout Principle

Use a three-zone desktop layout:

- left: sticky skill context and progression summary
- center: searchable room sequence
- right: sticky selected-room detail panel

On tablet and mobile:

- collapse to a stacked flow
- keep the skill summary near the top
- keep search and filters visible early
- move the selected-room detail panel below the active room list

## UX Goals

The page is not a random room library.
It is a guided skill progression surface.

Every design decision should reinforce:

- sequential progression
- next best room
- clear lock states
- one active room at a time

## Visual Rules

- avoid loud color accents
- avoid default SaaS card grids
- avoid thick borders
- avoid playful learning-app styling
- use big typography and quiet spacing instead of extra widgets
- let the active room and next action carry the focus

## Required States

- completed room
- current room
- unlocked upcoming room
- locked room
- locked milestone room

Each state should be readable without needing a tooltip.

## Page Sections

### 1. Top Product Bar

Match the existing protected Yantra shell.
Brand on the left.
Simple navigation in the middle.
Docs, AI, and learner identity actions on the right.

### 2. Skill Hero

Show:

- skill name
- short editorial description
- room completion count
- mastery percentage
- recommended CTA

This should feel large and calm, not dashboard-heavy.

### 3. Search And Filters

Keep these compact and premium.

Use:

- search field
- filter pills
- sort control

Search should help discovery, but progression should remain the dominant mental model.

### 4. Room Sequence

Rooms should read like a chaptered path.

Use:

- large room numbers
- strong status hierarchy
- subtle connectors or progression rhythm
- clear visual distinction for current vs locked rooms

### 5. Selected Room Panel

The side panel should explain the active room clearly and support one action:

- enter room if unlocked
- show why locked if locked

The panel should feel like an intelligent preview, not a generic settings sidebar.

## Responsive Behavior

### Desktop

- 3-zone composition
- sticky left and right side panels
- main content rail in the middle

### Tablet

- reduce to 2 major content bands
- allow side information to stack
- keep room list dominant

### Mobile

- top bar stays compact
- hero compresses vertically
- search sits above room list
- room list becomes full-width stacked cards
- selected-room detail follows active room content

## Content Sample

Use this track for the mock:

- Python Foundations

Use these rooms:

1. Variables and Output
2. Conditionals and Labels
3. Loops and Collections
4. Functions and Reuse
5. Practice Challenge: Learner Scoreboard

Mock progression:

- room 1 completed
- room 2 current
- room 3 unlocked next
- room 4 locked
- room 5 milestone locked

## Final Quality Bar

The result should look like a real Yantra internal product screen that could sit naturally between:

- the current dashboard
- the current Python room shell

It should feel more premium, more immersive, and more scalable than the previous sample while staying grounded in the same design system.
