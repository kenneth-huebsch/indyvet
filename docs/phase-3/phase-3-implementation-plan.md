# Phase 3 Implementation Plan

## Frontend Foundation

This is the Phase 3 source of truth. Execute the checklist in order.

---

## Objective

Build the shared application shell and frontend utilities so every public page can consume Payload globals and sit inside chrome defined by [`docs/visual-system.md`](../visual-system.md).

Editors still manage content only. Layout and chrome structure remain in code.

---

## Decisions locked

- Sticky sage-light header + sage-light footer (see visual system)
- Flat `header.navItems` only — no mega-dropdown schema
- Header `cta` preferred; Site Settings `booking` is fallback when Header CTA is empty
- Footer NAP comes from Site Settings `contact` (Footer global has no NAP fields)
- No cart, shop, public auth chrome
- No Payload schema / migrations in this phase
- Mobile nav collapses below 821px

---

## Non-goals

- Homepage / About / Contact / Emergency marketing section recreation (Phases 4–5)
- Live Preview, draft UX polish (Phase 6)
- Sitemap, robots, JSON-LD, Lighthouse hardening (Phase 7)
- Contact form submission / email delivery
- Nested nav / mega-menu schema changes

---

## Shell inventory

| Region                                       | Implementation                   |
| -------------------------------------------- | -------------------------------- |
| Single sticky header                         | `SiteHeader`                     |
| Logo, flat links, CTA                        | Header global + booking fallback |
| Hamburger below 821px                        | `MobileNav` client toggle        |
| Full-bleed sage-light footer                 | `SiteFooter`                     |
| Footer logo + link columns + NAP + copyright | Footer + Site Settings           |

---

## Deliverables checklist

### Documentation

- [x] This plan exists under `docs/phase-3/`
- [x] Master project plan Phase 3 section links here

### Data access and utilities

- [x] `src/lib/payload.ts` — `getPayloadClient`, `getSiteChrome`
- [x] `src/lib/media.ts` — Media type guards / URL helpers
- [x] `src/lib/seo.ts` — `buildMetadata` merge helper
- [x] `src/lib/links.ts` — link normalization

### Components

- [x] `src/components/media/MediaImage.tsx`
- [x] `src/components/rich-text/RichText.tsx`
- [x] `src/components/site/SiteHeader.tsx`
- [x] `src/components/site/MobileNav.tsx`
- [x] `src/components/site/SiteFooter.tsx`

### Layout wiring

- [x] `(frontend)/layout.tsx` fetches chrome and renders Header / main / Footer
- [x] Default metadata from Site Settings `defaultSeo` + `brand.siteName`
- [x] Homepage route at `/` uses the shared shell

### Automated tests

- [x] `SiteHeader.test.tsx` — Payload-shaped fixture → nav / CTA / no cart
- [x] `SiteFooter.test.tsx` — link groups, copyright, NAP
- [x] `seo.test.ts`, `media.test.ts`, `RichText.test.tsx`

### Verification

- [x] `npm test`
- [x] `npm run lint`
- [x] `npx tsc --noEmit`
- [x] `npm run build`
- [x] Manual: `/` shows content inside shell matching [`docs/visual-system.md`](../visual-system.md)

---

## Access conventions

Public Local API reads of globals use the same public-read access already configured in Phase 2 (`read: anyone` on Header, Footer, Site Settings).

---

## Definition of done

Phase 3 is complete when:

- Every frontend page shares Header + Footer fed by Payload globals
- Shell matches [`docs/visual-system.md`](../visual-system.md)
- Ecommerce / auth chrome is absent
- SEO defaults come from Site Settings
- Media and rich-text helpers exist for Phase 4
- Automated tests cover Payload-shaped data → shell markup
- Required verification commands pass
