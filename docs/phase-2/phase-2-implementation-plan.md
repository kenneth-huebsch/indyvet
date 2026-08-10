# Phase 2 Implementation Plan

## Payload CMS Data Model

This is the Phase 2 source of truth. Execute the checklist in order.

---

## Objective

Implement the Payload CMS collections and globals that support recreating [Vetic Home 1](https://vetic.webflow.io/home/home-1) with Indy Veterinary Care content from [indyvetcare.com](https://indyvetcare.com/).

Editors manage content only. Layout, styling, and section composition remain in code (Phases 3–5).

---

## Decisions locked

- Design reference: Vetic Home 1
- Content source: indyvetcare.com
- Home **Products** section replaced by **Featured Posts** (relationship to Blog Posts)
- Pharmacy / Order Online is an outbound link in Site Settings (not a Products collection)
- Expanded beyond the original master list: FAQs, Emergency Referrals, About Page, Contact Page, Emergency Page, booking CTA config
- Excluded: Products, cart, checkout, public sign-in/sign-up, orders
- Keep `Users` for Payload admin authentication only

---

## Non-goals

- Marketing page React recreation (Phases 3–5)
- Bulk blog / content seed import
- Live Preview, draft UX polish (Phase 6)
- SEO hardening (Phase 7)
- Contact form submission / email delivery

---

## Deliverables checklist

### Documentation

- [x] This plan exists under `docs/phase-2/`
- [x] Master project plan Phase 2 section matches this scope

### Shared fields

- [x] `src/payload/fields/link.ts` — label + URL group
- [x] `src/payload/fields/seo.ts` — SEO group (title, description, OG image)

### Collections

- [x] Services (`services`)
- [x] Team Members (`team-members`)
- [x] Testimonials (`testimonials`)
- [x] Blog Posts (`posts`)
- [x] FAQs (`faqs`)
- [x] Emergency Referrals (`emergency-referrals`)

### Globals

- [x] Site Settings (`site-settings`)
- [x] Header (`header`)
- [x] Footer (`footer`)
- [x] Home Page (`home-page`)
- [x] About Page (`about-page`)
- [x] Contact Page (`contact-page`)
- [x] Emergency Page (`emergency-page`)

### Wiring and schema

- [x] Registered in `src/payload.config.ts`
- [x] Migration created and applied
- [x] `src/payload-types.ts` regenerated

### Verification (static)

- [x] Home Page has Featured Posts (no Products fields)
- [x] Site Settings has booking + pharmacy outbound links
- [x] `npx tsc --noEmit`, `npm run lint`, `npm run build` pass

### Automated tests (required)

Phase 2 is not done without automated coverage. One-off smoke scripts alone are not enough.

- [x] Unit: `src/payload/access.test.ts` — `anyone`, `authenticated`, `authenticatedOrPublished`
- [x] Unit: shared field helpers + content-model definitions (`src/payload/fields.test.ts`)
- [x] Integration (Vitest + Payload Local API, Postgres required): `src/payload/phase-2.integration.test.ts`
  - Create and read one document per content collection
  - Draft visibility for anonymous readers
  - Unauthenticated `create` denied
  - Home Featured Posts (no Products) + Site Settings booking/pharmacy
  - About / Contact / Emergency / Header / Footer minimal updates
- [x] `npm test` passes with DB up and migrations applied

Optional (not required for Phase 2 close): Playwright against `/admin` UI.

---

## Access conventions

- Content collections/globals: public `read` (draft-aware where drafts are enabled)
- Create / update / delete: authenticated Payload users only

---

## Testing notes

- Prefer Vitest colocated under `src/payload/` (unit) and `src/payload/**/*.integration.test.ts` or `src/payload/phase-2.integration.test.ts` for Local API tests.
- Load `.env` for integration tests (`DATABASE_URI`, `PAYLOAD_SECRET`).
- Clean up documents created by tests (delete by id) so local DB stays tidy.
- `scripts/phase-2-smoke.ts` may remain as a manual helper; it does **not** replace the Vitest suite.

---

## Home Page sections (field groups)

1. Hero
2. Services
3. Process
4. Featured Posts (replaces Products)
5. About teaser
6. Team
7. Testimonials
8. Bottom CTA
