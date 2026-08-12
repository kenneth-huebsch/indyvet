# Phase 4 Implementation Plan

## Homepage Recreation

This is the Phase 4 source of truth. Execute the checklist in order.

---

## Objective

Replace the Phase 1 showcase at `/` with a faithful recreation of [Vetic Home 1](https://vetic.webflow.io/home/home-1), fed by the existing `home-page` global and related collections.

Editors still manage content only. Layout, styling, and section composition remain in code.

---

## Design reference

- Primary: https://vetic.webflow.io/home/home-1
- Not the template marketing landing at https://vetic.webflow.io/

---

## Decisions locked

- Replace `/` with the CMS homepage; no `/design-system` showcase route
- CSS-equivalent motion only (`tw-animate-css`, CSS marquees, light Intersection Observer) — no Framer Motion
- One-off seed script for representative local content / visual QA
- Honor CMS link URLs via `resolveLink`; empty URLs render non-linking surfaces (no Phase 5 stub routes)
- Featured Posts replaces Products (no price, cart, or buy UI)
- No Payload schema / migrations unless a real gap appears

---

## Non-goals

- About / Services / Team / Blog / Contact / Emergency marketing pages (Phase 5)
- Live Preview, draft UX polish (Phase 6)
- Sitemap, robots, JSON-LD, Lighthouse hardening (Phase 7)
- Contact form submission / email delivery
- Framer Motion, Products / commerce collections

---

## Section inventory

| Order | Region           | CMS group          | Component           |
| ----- | ---------------- | ------------------ | ------------------- |
| 1     | Hero + collage   | `hero`             | `HomeHero`          |
| 2     | Tag marquee      | `hero.marqueeTags` | `HomeMarquee`       |
| 3     | Services         | `services`         | `HomeServices`      |
| 4     | Process          | `process`          | `HomeProcess`       |
| 5     | Featured Posts   | `featuredPosts`    | `HomeFeaturedPosts` |
| 6     | About + marquees | `about`            | `HomeAbout`         |
| 7     | Team             | `team`             | `HomeTeam`          |
| 8     | Testimonials     | `testimonials`     | `HomeTestimonials`  |
| 9     | Bottom CTA       | `bottomCta`        | `HomeBottomCta`     |

Chrome remains Phase 3 `SiteHeader` / `SiteFooter`.

---

## Deliverables checklist

### Documentation

- [x] This plan exists under `docs/phase-4/`
- [x] Master project plan Phase 4 section links here

### Data access

- [x] `getHomePage()` in `src/lib/payload.ts` (React `cache`, depth 2)
- [x] Thin populated-doc helpers as needed

### Components

- [x] `src/components/home/` section components + shared marquee / CTA / scroll-reveal helpers
- [x] CSS marquee keyframes + reduced-motion safe behavior

### Route

- [x] `(frontend)/page.tsx` composes CMS sections (showcase removed)
- [x] `generateMetadata` from `home-page.seo` + site defaults
- [x] Showcase assertions removed from `page.test.tsx`

### Seed

- [x] `scripts/seed-home-page.ts` for representative Home content

Run:

```bash
npx cross-env NODE_OPTIONS=--no-deprecation tsx -r dotenv/config scripts/seed-home-page.ts
```

### Automated tests

- [x] Fixture-based section tests under `src/components/home/`
- [x] Page-level test: mocked `getHomePage` → sections present; Featured Posts, no Products/cart

### Verification

- [x] `npm test`
- [x] `npm run lint`
- [x] `npx tsc --noEmit`
- [x] `npx prettier --check .` (Phase 4 touched files)
- [x] `npm run build`
- [x] Manual: seed → `/` side-by-side vs Home 1 (desktop + ≤991px)

---

## Definition of done

Phase 4 is complete when:

- `/` matches Home 1 structure, spacing language, and responsive behavior closely enough for side-by-side review
- All editable homepage copy/images/relationships come from Payload
- Motion feels equivalent under CSS constraints; reduced-motion safe
- Automated section + page tests pass; required verification commands pass
- Seed script documented and usable for local visual QA
- No Phase 5 routes, Framer Motion, or Products UI
