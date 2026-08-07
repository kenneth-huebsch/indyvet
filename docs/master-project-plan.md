# Vetic CMS Rebuild - Master Project Plan

## Goal

Rebuild the Vetic Home 1 marketing website as a reusable, CMS-driven platform using Next.js 16, Payload CMS 3, PostgreSQL, Tailwind CSS 4, and shadcn/ui, with AWS as the planned deployment target.

The implementation should be fully content-managed. Editors should be able to modify copy, images, navigation, testimonials, services, and page layouts without touching code.

## Guiding Principles

- Build a reusable marketing platform, not a one-off website.
- Every page section is a Payload Block backed by a React component.
- Keep presentation and data fetching separate.
- Prefer Server Components.
- Optimize for accessibility, performance, and editor experience.
- Complete and review each phase before beginning the next.

## Phase 0 - Technical Foundation

Create the project skeleton.

Deliverables:

- Next.js 16
- Payload CMS 3
- PostgreSQL
- Docker Compose
- Tailwind CSS 4
- shadcn/ui
- TypeScript strict mode
- ESLint / Prettier
- Media collection
- Admin authentication
- CI (GitHub Actions)
- Production Dockerfile

Acceptance Criteria:

- Local stack boots successfully.
- Payload admin works.
- Media uploads work.
- Production build succeeds.

## Phase 1 - Design System

Create reusable design tokens and UI primitives.

Deliverables:

- Typography
- Color tokens
- Layout primitives
- Buttons
- Cards
- Containers
- Motion utilities

Acceptance Criteria:

- No hard-coded colors.
- Components are reusable and documented.

## Phase 2 - CMS Data Model

Create Payload collections, globals, and blocks.

Collections:

- Pages
- Media
- Services
- Team
- Testimonials
- Blog Posts

Globals:

- Header
- Footer
- Site Settings

Acceptance Criteria:

- Editors can compose pages entirely from blocks.

## Phase 3 - Rendering Engine

Implement dynamic routing and block rendering.

Deliverables:

- Dynamic page loader
- Block registry
- Type-safe renderer

Acceptance Criteria:

- Any Payload page renders automatically.

## Phase 4 - Global Layout

Implement shared layout features.

Deliverables:

- Header
- Footer
- Metadata
- SEO
- Error pages
- Shared navigation

## Phase 5 - Hero Block

Recreate the Vetic hero section as a CMS block.

Acceptance Criteria:

- Matches reference design closely.
- Fully editable.

## Phase 6 - Homepage Blocks

Build remaining reusable blocks:

- Feature Grid
- About
- Stats
- Services
- Testimonials
- CTA
- FAQ
- Blog Preview
- Logo Cloud
- Newsletter

## Phase 7 - Homepage Assembly

Compose the homepage from CMS blocks and polish responsiveness and spacing.

## Phase 8 - Editor Experience

Improve Payload authoring with validation, defaults, conditional fields, live preview, drafts, and documentation.

## Phase 9 - SEO & Performance

Implement structured data, sitemap, robots, canonical URLs, caching, image optimization, and Lighthouse tuning.

## Phase 10 - Production Hardening

Add monitoring, analytics, security headers, backups, deployment documentation, and upgrade guidance.

AWS deployment service selection and production infrastructure are deferred to this phase.

## Phase 11 - Reusable Marketing Platform

Generalize the block library for future client sites.
