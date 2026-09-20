# Master Project Plan

## Indy Veterinary Care Website with Payload CMS

## Project Objective

Build the Indy Veterinary Care marketing website with Next.js and Payload CMS. The public visual language follows the client’s editorial homepage concept (cream / sage / ink, serif headlines, square buttons, hairline grids)—not a replica of a third-party template.

Non-technical editors manage text, images, navigation, testimonials, services, blog content, and other structured content through Payload. They cannot change layout or design.

This is **not** a generic website builder. Structure, layout, styling, and UX stay in code. Payload exists solely to manage content.

The final deliverable should feel like a handcrafted Next.js application rather than a CMS-generated website.

---

# Visual source of truth

Authoritative reference: [`docs/visual-system.md`](visual-system.md)

Public UI follows the editorial clinic system documented there (cream / sage / ink, serif headlines, square buttons, hairline grids).

---

# Technology Stack

Frontend

- Next.js 16 (App Router)
- React
- Tailwind CSS 4
- shadcn/ui
- tw-animate-css (subtle animations; Framer Motion deferred unless later phases require it)

Backend

- Payload CMS 3
- PostgreSQL

Infrastructure

- Docker Compose (local development)
- Vercel (deployment)

Language

- TypeScript (strict mode)

---

# Project Philosophy

The frontend owns the design.

Payload owns the content.

Editors can modify content but cannot modify the website's layout, page structure, styling, or component hierarchy.

Every visual aspect of the website is implemented in code.

When future design changes are required, they should be made by updating React components rather than configuring the CMS.

---

# Content Management Goals

Payload CMS should allow editors to manage:

- Homepage copy
- Images
- Navigation
- Footer content
- Company information
- Services
- Team members
- Testimonials
- Blog posts
- SEO metadata
- Contact information

Editors should **not** be able to:

- Create new page layouts
- Rearrange sections
- Add or remove components
- Modify styling
- Change spacing
- Configure animations
- Change page composition

---

# Project Phases

## Phase 0 - Technical Foundation ✅

Establish the development environment and project infrastructure.

Deliverables

- Next.js 16
- Payload CMS 3
- PostgreSQL
- Docker Compose
- Tailwind CSS 4
- shadcn/ui
- TypeScript strict mode
- ESLint
- Prettier
- Media collection
- Authentication
- CI configuration
- Vercel deployment configuration

Acceptance Criteria

- Local development environment is fully operational.
- Payload Admin loads successfully.
- Media uploads function correctly.
- Production build completes successfully.

---

## Phase 1 - Design System ✅

Establish the visual foundation for the website. Current rules live in [`docs/visual-system.md`](visual-system.md).

Deliverables

- Typography system
- Color palette
- Spacing scale
- Buttons
- Cards
- Form visuals (inputs, labels, selects, checkboxes — no submit logic)
- Layout primitives
- Motion utilities (`tw-animate-css`)
- Shared UI components

Acceptance Criteria

- No duplicated styling.
- No hardcoded design inconsistencies.
- Components are reusable throughout the project.

---

## Phase 2 - Payload CMS Data Model ✅

Implement the CMS structure that supports the website.

Execution checklist: [`docs/phase-2/phase-2-implementation-plan.md`](phase-2/phase-2-implementation-plan.md)

Collections

- Media
- Services
- Team Members
- Testimonials
- Blog Posts
- FAQs
- Emergency Referrals

Globals

- Header
- Footer
- Site Settings (NAP, social, booking CTA, pharmacy outbound link, default SEO)

Singleton Documents

- Home Page (section groups; Products replaced by Featured Posts)
- About Page
- Contact Page
- Emergency Page

Excluded

- Products, cart, checkout, public sign-in / sign-up, orders

Acceptance Criteria

- All editable website content is represented within Payload.
- Editors can update content without modifying code.
- Home Page has no Products / commerce fields.
- Automated tests cover access helpers, Local API create/read for each content collection, draft visibility, unauthenticated write denial, Home Featured Posts (no Products), and Site Settings booking/pharmacy fields. See [`docs/phase-2/phase-2-implementation-plan.md`](phase-2/phase-2-implementation-plan.md).

---

## Phase 3 - Frontend Foundation ✅

Build the shared application infrastructure.

Execution checklist: [`docs/phase-3/phase-3-implementation-plan.md`](phase-3/phase-3-implementation-plan.md)

Deliverables

- Global layout
- Header
- Footer
- Navigation
- Metadata
- SEO framework
- Image handling
- Rich text rendering
- Shared utilities
- Tests for Payload → frontend data mapping / rendering of shared shell content (header, footer, site settings)

Acceptance Criteria

- Every page shares a consistent application shell.
- Frontend successfully consumes Payload content.
- Automated tests cover shell components consuming Payload globals (not only static showcase markup).

---

## Phase 4 - Homepage Recreation ✅

Build the CMS-driven homepage in the editorial visual system.

Execution checklist: [`docs/phase-4/phase-4-implementation-plan.md`](phase-4/phase-4-implementation-plan.md)  
Visual rules: [`docs/visual-system.md`](visual-system.md)

Implement every homepage section using React components connected to Payload-managed content.

Acceptance Criteria

- Homepage matches [`docs/visual-system.md`](visual-system.md).
- Responsive behavior is solid on mobile and desktop.
- Motion is CSS/`ScrollReveal` only.
- All editable content comes from Payload.
- Automated tests cover homepage section rendering from Home Page global + related collections.

---

## Phase 5 - Remaining Pages

Build the remaining marketing pages in the editorial visual system, using existing globals and collections. Follow [`docs/visual-system.md`](visual-system.md) so inner pages stay continuous with `/`.

- **Services** (`/services`) — done: `services-page` global + accordion of full service bodies; seed via `scripts/seed-services-page.ts`
- **About** (`/about`) — done: `about-page` global + mission / namesake / stacked team bios; seed via `scripts/seed-about-page.ts`
- **Blog** (`/blog`, `/blog/[slug]`) — done: `blog-page` global + Posts SEO/categories; import via `scripts/seed-blog.ts`
- **Contact** (`/contact`) — done: contact form + NAP/hours + emergency referrals (`#emergency`); seed via `scripts/seed-contact-page.ts`

Examples still outstanding:

- Team *(merged into About)*
- Emergency *(merged into Contact)*
- Legal pages

Acceptance Criteria

- Pages share the visual-system chrome, type, color, button, and hairline-grid language.
- Content is managed through Payload where appropriate.

---

## Phase 6 - Editor Experience

Improve the authoring workflow.

Deliverables

- Logical field grouping
- Validation
- Helpful descriptions
- Default values
- Live preview
- Draft and publish workflow
- Media organization

Acceptance Criteria

- A non-technical editor can confidently update website content without developer assistance.

---

## Phase 7 - SEO and Performance

Optimize the finished website.

Deliverables

- Open Graph metadata
- Twitter Cards
- JSON-LD
- Sitemap
- Robots.txt
- Canonical URLs
- Image optimization
- Route caching

Target Lighthouse Scores

- Performance: 95+
- Accessibility: 100
- Best Practices: 100
- SEO: 100

---

## Phase 8 - Production Hardening

Prepare the application for long-term production use.

Deliverables

- Analytics integration
- Error monitoring
- Security headers
- Backup strategy
- Deployment documentation
- Upgrade documentation

Acceptance Criteria

- Website is production-ready and maintainable.

---

# Coding Standards

- Use Server Components by default.
- Keep business logic separate from presentation.
- Use strict TypeScript.
- Avoid the `any` type.
- Use generated Payload types whenever possible.
- Keep components focused and maintainable.
- Use Next.js Image for all images.
- Prefer composition over duplication.
- Maintain WCAG AA accessibility standards.
- Optimize for Core Web Vitals.

---

# Definition of Done

The project is complete when:

- The public site uses the editorial visual system and existing Payload content.
- The website is powered by Next.js and Payload CMS.
- All intended content is editable through Payload.
- Editors cannot alter layout or design.
- The website performs well on desktop and mobile.
- The application is fully deployable to production.
- The implementation is clean, maintainable, and ready for future enhancements.
