# Master Project Plan
## Vetic Website Recreation with Payload CMS

## Project Objective

Recreate the **Vetic Home 1** website as faithfully as possible using a modern React-based technology stack while replacing Webflow's content management capabilities with Payload CMS.

The completed website should be visually indistinguishable from the reference implementation while allowing non-technical editors to manage text, images, navigation, testimonials, services, blog content, and other structured content through the Payload CMS admin interface.

This is **not** intended to be a generic website builder or page builder. The site's structure, layout, styling, and user experience are entirely developer-controlled. Payload CMS exists solely to manage content.

The final deliverable should feel like a handcrafted Next.js application rather than a CMS-generated website.

---

# Reference Website

Target Website:

https://vetic.webflow.io/home/home-1

The objective is to reproduce the website's:

- Visual design
- Layout
- Spacing
- Typography
- Animations
- Responsiveness
- User experience

Minor implementation differences are acceptable where required by the technology stack, but the user experience should remain functionally and visually equivalent.

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

## Phase 1 - Design System

Establish the visual foundation for the website.

Execution checklist: [`docs/phase-1/phase-1-implementation-plan.md`](phase-1/phase-1-implementation-plan.md)

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
- `/` is a component showcase only (no marketing page).

---

## Phase 2 - Payload CMS Data Model

Implement the CMS structure that supports the website.

Collections

- Media
- Services
- Team Members
- Testimonials
- Blog Posts

Globals

- Header
- Footer
- Site Settings

Singleton Documents

- Home Page

Acceptance Criteria

- All editable website content is represented within Payload.
- Editors can update content without modifying code.

---

## Phase 3 - Frontend Foundation

Build the shared application infrastructure.

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

Acceptance Criteria

- Every page shares a consistent application shell.
- Frontend successfully consumes Payload content.

---

## Phase 4 - Homepage Recreation

Recreate the Vetic homepage as accurately as possible.

Implement every homepage section using React components connected to Payload-managed content.

Acceptance Criteria

- Homepage closely matches the reference website.
- Responsive behavior matches the reference.
- Animations feel equivalent.
- All editable content comes from Payload.

---

## Phase 5 - Remaining Pages

Recreate the remaining pages from the Vetic website.

Examples include:

- About
- Services
- Team
- Blog
- Contact
- Legal pages

Acceptance Criteria

- All pages visually match the reference implementation.
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

- The Vetic website has been faithfully recreated.
- The website is powered by Next.js and Payload CMS.
- All intended content is editable through Payload.
- Editors cannot alter layout or design.
- The website performs well on desktop and mobile.
- The application is fully deployable to production.
- The implementation is clean, maintainable, and ready for future enhancements.