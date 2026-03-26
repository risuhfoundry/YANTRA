# Design System Strategy: The Obsidian Lens

## 1. Overview & Creative North Star
This design system is built upon the **"Obsidian Lens"**—a creative North Star that treats the interface not as a flat screen, but as a multi-layered optical instrument. We are moving away from the "SaaS-standard" grid of boxed components toward a cinematic, editorial experience.

To break the "template" look, we prioritize **intentional asymmetry** and **atmospheric depth**. Rather than aligning every card to a rigid 12-column grid, use the 8.5rem (`24`) and 7rem (`20`) spacing tokens to create "breathing pockets" where data can live. Overlap glass containers slightly and use radial glows to pull the user’s eye toward specific focal points, mimicking the way a camera lens handles light and depth of field.

---

## 2. Color & Surface Philosophy
The palette is strictly monochrome, relying on the interplay of light and shadow rather than hue to convey meaning.

### The "No-Line" Rule
Standard 1px solid borders for sectioning are strictly prohibited. Boundaries must be defined by:
1.  **Background Shifts:** Place a `surface-container-high` card against a `surface-container-low` background.
2.  **Tonal Transitions:** Use subtle background variations to separate header from body.
3.  **Glassmorphism:** Use `backdrop-blur-2xl` with a `white/10` stroke for floating elements only.

### Surface Hierarchy & Nesting
Treat the UI as a physical stack of materials.
-   **Base Layer:** `surface` (#131313) or `surface-container-lowest`.
-   **Content Blocks:** `surface-container` or `surface-container-low`.
-   **Interactive/Elevated:** `surface-container-highest` or `surface-bright`.

### The "Glass & Gradient" Rule
For "high-impact" data or floating modals, use a frosted-glass effect. Combine a semi-transparent `surface-container-high` (approx 60% opacity) with `backdrop-blur-2xl`. 
**Signature Texture:** Apply a very subtle radial gradient from `primary` to `primary-container` at 5% opacity across large background areas to give the "darkness" a physical, liquid depth.

---

## 3. Typography: Technical Elegance
The typography system balances the brutalist, futuristic tech of Space Grotesk with the invisible utility of Inter.

*   **Display & Headline (Space Grotesk):** These are your "Editorial" voices. Use `display-lg` for hero metrics and `headline-md` for section titles. The wide apertures of Space Grotesk provide the "futuristic" feel.
*   **Body (Inter):** All long-form content and descriptions use Inter. It is the "Workhorse" that ensures high legibility against dark, blurred backgrounds.
*   **Labels (JetBrains Mono):** Use `label-sm` in **ALL CAPS** with `0.1em` letter spacing for technical metadata, timestamps, and micro-labels. This evokes the feel of a high-end instrument panel.

---

## 4. Elevation & Depth
Depth is the core differentiator of this system. We do not use structural lines; we use **Tonal Layering.**

### The Layering Principle
Stacking containers creates natural hierarchy. A `surface-container-highest` card sitting on a `surface-container-low` section creates a perceived "lift." 

### Ambient Shadows
When an element must float (e.g., a dropdown or modal):
-   **Color:** Use a tinted version of `on-surface` (white) at 4% opacity.
-   **Blur:** Minimum 40px to 80px.
-   **Spread:** -10px to keep the shadow "tucked" under the element.

### Ghost Borders
The user prompt specifies `white/10` borders. In this system, these are "Ghost Borders." They should only be used on glass containers (`backdrop-blur-2xl`) to define the edge of the "frosted" pane. Never use them on solid background containers.

### Atmospheric Radial Glows
Place a large (400px+), low-opacity (10-15%) radial gradient of `primary` behind key dashboard widgets. This creates a "cinematic glow" that makes the data feel like it is emitting light from within the screen.

---

## 5. Components

### Buttons
-   **Primary:** Solid `primary` (White) fill with `on-primary` (Black) text. 32px (`xl`) corner radius.
-   **Secondary:** `white/10` Ghost Border with `backdrop-blur-md`.
-   **Tertiary:** Ghost button, `label-md` (JetBrains Mono) text only.
-   **States:** On hover, primary buttons should trigger a subtle radial glow behind them.

### Cards & Containers
-   **Corners:** Use `lg` (2rem/32px) for main layout containers and `md` (1.5rem/24px) for nested elements.
-   **Spacing:** Use `6` (2rem) or `8` (2.75rem) internal padding. Never crowd the content.
-   **Dividers:** Strictly forbidden. Use a `1.4rem` (`4`) vertical gap instead.

### Input Fields
-   **Style:** Minimalist bottom-border only or a fully glass-morphic container.
-   **Active State:** The border transitions from `white/10` to `white/40`. No high-contrast focus rings. Use a soft glow.

### Interactive "Chips"
-   Use `JetBrains Mono` for chip text.
-   Background: `surface-container-highest`.
-   Radius: `full`.

---

## 6. Do’s and Don’ts

### Do:
-   **Do** use extreme whitespace. If you think there is enough room, add another 1rem.
-   **Do** use `Space Grotesk` for numbers. Metrics should feel like "Design Objects."
-   **Do** vary the opacity of text. Use `on-surface-variant` for secondary info to create visual hierarchy without changing font size.

### Don't:
-   **Don't** use pure hex black (#000000) for large surfaces. Use the `background` token (#131313) to allow for depth and shadows.
-   **Don't** use 1px solid white lines. They feel "cheap" and digital. Use `white/10` or tonal shifts.
-   **Don't** use standard "Drop Shadows." Use ambient, diffused glows.
-   **Don't** use icons as the primary way to communicate. Let the editorial typography do the work. Use icons only as secondary "wayfinding" marks.

---

## 7. Signature Elements: Atmospheric Instrumentation
To truly achieve the "Cinematic" feel, every dashboard should include one "Atmospheric" element:
1.  **A Hero Metric:** A single `display-lg` value in `Space Grotesk` with a soft radial glow behind it.
2.  **Breadcrumbs:** Using `JetBrains Mono` with `>` separators at `label-sm`.
3.  **The "Glass Blade":** A side navigation bar that is 100% height, using `backdrop-blur-2xl` and a single `white/10` border on the right edge.