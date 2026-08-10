# Phase 1 Execution Plan
## Design System Foundation

> **Superseded.** Use [`phase-1-implementation-plan.md`](./phase-1-implementation-plan.md) as the Phase 1 source of truth. This file is retained for history only.

## Objective

Create the design system that will serve as the visual foundation for the recreation of the Vetic website.

This phase is **not** concerned with recreating any pages. Instead, it establishes the reusable visual language, styling conventions, and UI primitives that every page will use.

The design system should be derived from the Vetic reference website so that subsequent phases can recreate the site accurately while maintaining consistency and minimizing duplicated styling.

Reference Website:

https://vetic.webflow.io/home/home-1

---

# Scope

## In Scope

- Global typography
- Color system
- Spacing scale
- Layout primitives
- Shared UI components
- Motion utilities
- Icon strategy
- Design tokens
- Global CSS
- Tailwind theme configuration

## Out of Scope

- Homepage implementation
- Payload collections
- Payload globals
- Business logic
- Routing
- Content management
- Page-specific components
- Forms
- Navigation
- Footer
- Hero
- SEO

No marketing pages should be created during this phase.

---

# Goals

The completed design system should allow future phases to recreate every page of the reference website without introducing duplicated styles or inconsistent implementations.

Every visual decision should exist in exactly one place whenever practical.

---

# Deliverables

## 1. Design Token System

Create a centralized token system for:

### Colors

- Primary
- Secondary
- Accent
- Background
- Surface
- Muted
- Border
- Success
- Warning
- Danger

Avoid using raw color values directly inside React components.

---

## Typography

Create reusable typography styles for:

- Display
- H1
- H2
- H3
- H4
- Body Large
- Body
- Small Text
- Caption
- Labels
- Links

Typography should match the reference site as closely as practical.

---

## Spacing

Define a spacing scale that supports the layouts found throughout the reference website.

Examples include:

- Component spacing
- Section spacing
- Grid spacing
- Card padding
- Vertical rhythm

Spacing should be tokenized rather than hardcoded repeatedly.

---

## Border Radius

Define reusable radius tokens.

Examples:

- Small
- Medium
- Large
- Full

---

## Shadows

Create reusable elevation tokens.

Examples:

- Small
- Medium
- Large

---

## Container System

Create layout primitives for:

- Page container
- Section wrapper
- Content width
- Grid layouts
- Flex layouts

Container widths should closely match the reference implementation.

---

# Shared Components

Implement reusable UI primitives.

## Button

Support:

- Primary
- Secondary
- Outline
- Ghost
- Text Link

Include:

- Hover state
- Active state
- Disabled state
- Focus state

---

## Card

Support reusable card styling that matches the reference website.

---

## Badge

Reusable badge component.

---

## Section

Reusable section wrapper responsible for vertical spacing.

---

## Container

Reusable content container.

---

## Divider

Reusable horizontal divider.

---

## Icon Wrapper

Reusable styling for icons.

---

## Motion Utilities

Create reusable Framer Motion wrappers.

Supported animations:

- Fade In
- Slide Up
- Slide Left
- Slide Right
- Stagger Children
- Scale on Hover

Animation timing should feel similar to the reference website.

Do not implement parallax, scroll hijacking, or complex timeline animations.

---

# Tailwind Configuration

Update Tailwind configuration to expose:

- Colors
- Typography
- Radius
- Shadows
- Container widths
- Spacing tokens

The goal is to avoid arbitrary values throughout the application.

---

# Global Styles

Create the global stylesheet.

Responsibilities include:

- Font loading
- Base typography
- Body styling
- Link styling
- List styling
- Selection styling
- Focus rings
- Scroll behavior

Keep the stylesheet minimal.

Favor utility classes over custom CSS.

---

# Accessibility

All components must:

- Meet WCAG AA contrast requirements
- Have visible keyboard focus
- Use semantic HTML
- Respect reduced motion preferences
- Support screen readers where appropriate

---

# Responsiveness

Design primitives must support:

- Mobile
- Tablet
- Desktop

Avoid creating separate mobile components.

Responsiveness should be achieved through CSS.

---

# Directory Structure

Suggested organization:

```text
src/
  components/
    ui/
      button/
      badge/
      card/
      container/
      divider/
      section/
      typography/

    motion/

  styles/
    globals.css

  lib/
    design-tokens.ts
```

The exact structure may vary, but components should remain organized and discoverable.

---

# Coding Standards

- TypeScript strict mode
- No use of `any`
- Functional React components
- Prefer Server Components unless client-side rendering is required
- No duplicated styling
- No inline styles
- Favor composition over inheritance
- Keep components small and focused

---

# Acceptance Criteria

This phase is complete when:

- A complete visual foundation exists for the project.
- Shared UI primitives have been implemented.
- Styling is centralized and reusable.
- Tailwind configuration reflects the design system.
- Motion utilities are available for future phases.
- Components are responsive.
- Accessibility requirements are satisfied.
- No marketing pages have been implemented.
- No Payload content model has been introduced.

---

# Definition of Done

Another developer should be able to recreate the Vetic homepage using only the design system produced during this phase, without needing to invent additional visual primitives or duplicate styling.