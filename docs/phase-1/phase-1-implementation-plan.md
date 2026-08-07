# Phase 1 Implementation Plan

## Design System Foundation

This is the Phase 1 source of truth. Execute the checklist in order. Do not invent product or architectural alternatives.

Supersedes: [`phase-1-execution-plan.md`](./phase-1-execution-plan.md)

---

## Objective

Build the reusable visual foundation for recreating https://vetic.webflow.io/home/home-1.

Match quality: visually equivalent by eye against the reference homepage (DevTools-assisted extraction is allowed; pixel-perfect CSS dumps are not required).

---

## Non-goals

Do not implement any of the following in this phase:

- Marketing pages or section layouts (nav, footer, hero, services, etc.)
- Payload collections, globals, blocks, or schema changes
- Form submission, validation libraries, or business logic
- SEO metadata work beyond leaving the existing layout metadata alone
- Framer Motion / `motion` package
- A parallel token system outside the existing shadcn + Tailwind CSS variables
- A Vetic dark theme (keep existing `.dark` variables if present; theme to the light reference)

---

## Prerequisites

Already present from Phase 0:

- Next.js 16 App Router, Tailwind CSS 4, shadcn/ui (`components.json` → base-nova, lucide)
- [`src/styles/globals.css`](../../src/styles/globals.css) with CSS variables and `@theme inline`
- `tw-animate-css` imported in `globals.css`
- Frontend route group at `src/app/(frontend)/`

Reference: https://vetic.webflow.io/home/home-1

---

## Locked conventions

Follow these exactly:

| Topic | Rule |
| --- | --- |
| Tokens | Extend existing CSS variables + `@theme inline` in `src/styles/globals.css`. No separate `design-tokens.ts` unless a value must be read from TypeScript. |
| Components | shadcn-style primitives under `src/components/ui/` using `@/components/ui` alias |
| Icons | Lucide only (`lucide-react`) |
| Motion | `tw-animate-css` only — do not add Framer Motion |
| Styling | No inline styles; no raw color values in JSX; use theme tokens / utilities |
| React | Server Components by default; Client Components only when browser APIs or interactive state require them |
| TypeScript | Strict; no `any` |
| A11y | WCAG AA contrast, visible focus, semantic HTML, `prefers-reduced-motion` honored |
| Responsiveness | Mobile / tablet / desktop via CSS utilities — no separate mobile components |
| Verification UI | Replace `/` with a minimal component showcase only (not a marketing page) |

### Directory layout

```text
src/
  components/
    ui/
      button.tsx
      badge.tsx
      card.tsx
      container.tsx
      section.tsx
      divider.tsx
      typography.tsx
      icon.tsx
      label.tsx
      input.tsx
      textarea.tsx
      select.tsx
      checkbox.tsx
    motion/
      index.ts          # tw-animate helper class names / thin wrappers only
  styles/
    globals.css         # tokens + base styles (extend existing)
  lib/
    utils.ts            # cn() helper if missing; create via shadcn pattern
  app/
    (frontend)/
      page.tsx          # component showcase only
```

File names may use the shadcn single-file pattern above. Do not scatter primitives under marketing folders.

---

## Implementation checklist

### 1. Extract visual language from the reference

- [x] Open https://vetic.webflow.io/home/home-1 on desktop and a narrow viewport
- [x] Record observed values (by eye + DevTools) for: primary/secondary/accent/background/surface/muted/border colors; success/warning/danger if present, otherwise keep sensible semantic defaults that meet WCAG AA
- [x] Record fonts (family, weights), type scale roles, line heights
- [x] Record spacing rhythm, section gaps, container max-widths, radii, shadows
- [x] Encode those values as CSS variables in `:root` and map them through `@theme inline` in `src/styles/globals.css`
- [x] Update base layer: body, links, lists, selection, focus rings, scroll behavior — keep custom CSS minimal; prefer utilities

### 2. Typography

- [x] Implement reusable typography for: Display, H1, H2, H3, H4, Body Large, Body, Small Text, Caption, Label, Link
- [x] Expose via `src/components/ui/typography.tsx` (and/or shared utility classes backed by tokens)
- [x] Confirm type looks equivalent by eye to the reference homepage

### 3. Layout tokens and primitives

- [x] Ensure spacing, radius (sm/md/lg/full), shadow (sm/md/lg), and container width tokens exist in the theme
- [x] Implement `Container` (`src/components/ui/container.tsx`) — page content width matching the reference
- [x] Implement `Section` (`src/components/ui/section.tsx`) — vertical section spacing
- [x] Implement `Divider` (`src/components/ui/divider.tsx`)

### 4. Shared UI primitives

- [x] `Button` — variants: primary, secondary, outline, ghost, link; states: hover, active, disabled, focus
- [x] `Card` — reusable surface matching reference card treatment
- [x] `Badge`
- [x] `Icon` — Lucide wrapper for consistent size/color; do not add other icon libraries

### 5. Form visuals

Visuals only. No submit handlers, no react-hook-form, no Payload fields.

- [x] `Label`
- [x] `Input`
- [x] `Textarea`
- [x] `Select`
- [x] `Checkbox`
- [x] Shared focus, error, and disabled styles using theme tokens

### 6. Motion utilities (`tw-animate-css`)

- [x] Add reusable helpers under `src/components/motion/` (class-name constants and/or thin wrappers) for: fade in, slide up, slide left, slide right, stagger children, scale on hover
- [x] Timing/easing should feel similar to the reference by eye
- [x] Disable or neutralize motion under `prefers-reduced-motion`
- [x] Do not implement parallax, scroll hijacking, or complex timelines
- [x] Do not install Framer Motion

### 7. Component showcase on `/`

- [x] Replace `src/app/(frontend)/page.tsx` with a minimal showcase that renders every Phase 1 primitive (typography samples, buttons, card, badge, icon, form controls, section/container/divider, motion demos)
- [x] Do not add marketing copy, hero imagery, nav, or footer
- [x] Keep `src/app/(frontend)/layout.tsx` structural only (fonts may be wired here if required for the extracted typefaces)

---

## Verification checklist

- [x] `npm run lint` passes
- [x] `npx tsc --noEmit` passes
- [x] `npm run build` passes
- [x] `/` shows the showcase only — no marketing layout
- [x] Components match the reference look by eye (color, type, spacing, controls)
- [x] Keyboard focus is visible on interactive controls
- [x] Contrast meets WCAG AA for text/controls used in the showcase
- [x] Reduced-motion preference does not leave broken/jarring animations
- [x] No Payload collection/global/block/migration changes
- [x] No Framer Motion dependency added to `package.json`

---

## Definition of done

Phase 1 is complete when another developer can recreate the Vetic homepage in a later phase using only these tokens and primitives, without inventing new visual foundations or duplicating styling.
