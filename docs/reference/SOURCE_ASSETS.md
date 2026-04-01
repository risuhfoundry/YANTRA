# Source Assets

## Purpose

This file tracks the non-runtime materials currently informing the build.

These assets live under `docs/reference/` so the repo root stays focused on runtime code.

## Dashboard Design Inputs

### `docs/reference/dashboard-sample/DESIGN.md`

- design-system notes for the dashboard direction
- emphasizes cinematic monochrome UI, glassmorphism, asymmetry, and editorial hierarchy

### `docs/reference/dashboard-sample/code.html`

- reference implementation of the dashboard sample
- useful for section structure and content layout

### `docs/reference/dashboard-sample/screen.png`

- visual screenshot of the dashboard target state
- used to align composition, spacing, and hierarchy

## Login And Signup Design Inputs

### `docs/reference/Login-signup-sample/Login/`

- login reference HTML, screenshot, and design notes
- useful for auth atmosphere, layout proportion, and hierarchy

### `docs/reference/Login-signup-sample/sing up/`

- signup reference HTML, screenshot, and design notes
- note that the folder name is currently spelled `sing up` in the workspace

## Build Plan Inputs

### `docs/reference/build-plan/Yantra_AI_Build_Plan.pdf`

- broader product vision and long-range strategy
- includes architecture, practice rooms, AI teacher, curriculum, smartboard, and roadmap ideas

### `docs/reference/build-plan/tmp_yantra_pdf.txt`

- extracted text from the PDF
- helpful for searching sections quickly without reopening the PDF

## How To Use These Assets

- use them as design and product references
- do not treat them as the exact implementation contract
- prefer the live codebase and docs folder as the current source of truth

## Current Reference Structure

```text
docs/reference/
|-- Login-signup-sample/
|-- build-plan/
|-- dashboard-sample/
`-- SOURCE_ASSETS.md
```
