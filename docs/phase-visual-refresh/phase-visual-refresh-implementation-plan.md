# Visual Refresh Implementation Plan

## Editorial clinic look and feel

This is the **living visual source of truth**. Phases 1–4 used [Vetic Home 1](https://vetic.webflow.io/home/home-1) as a temporary scaffold. Public chrome and `/` now follow the client homepage concept (cream / sage / ink, serif headlines, square buttons, hairline grids).

Editors still manage content only. Layout, styling, and section composition remain in code. Do not invent mockup-only copy or add Payload fields for values / independence blocks.

---

## Design reference

- Primary: client homepage concept (editorial clinic). Do not match Vetic Home 1.
- Type: Newsreader (headings) + Source Sans 3 (body), unless licensed brand fonts are supplied later.
- Palette: paper `#fbfaf6`, ink `#153027`, cream `#f2ecdf`, sage `#a9b8a5`, sage-light `#e4e9df`, stone `#e9e3d8`, footer `#10291f`.

---

## Decisions locked

- No new collections, blocks, or required fields
- Featured Posts and Testimonials stay on `/`, restyled
- Hero images: `[0]` hero, `[1]` about intro, `[2]` process/approach
- `hero.marqueeTags` remain in CMS but are not rendered
- CSS-only motion (`ScrollReveal`); no Framer Motion
- Empty CMS URLs still render non-linking surfaces
- Phase 5 inner pages inherit this visual system, not Vetic

---

## Homepage section order

1. Hero (`home.hero`)
2. About intro (`home.about` + `hero.images[1]`)
3. Services (`home.services`)
4. Process / approach + promo band + steps (`home.process` + `hero.images[2]`)
5. Featured posts (`home.featuredPosts`)
6. Team (`home.team`)
7. Testimonials (`home.testimonials`)
8. Bottom CTA (`home.bottomCta`)

---

## Deliverables checklist

### Tokens and primitives

- [x] Editorial tokens in `src/styles/globals.css`
- [x] Newsreader + Source Sans 3 in `src/app/(frontend)/layout.tsx`
- [x] Square uppercase buttons; serif, regular-weight headings
- [x] Removed Vetic paw badges, pink underline, and marquee homepage usage

### Chrome

- [x] Sticky paper header (not a pill)
- [x] Full-bleed dark footer using existing NAP / link groups / copyright

### Homepage

- [x] Split hero with a single photo
- [x] Remaining sections restyled to the concept while mapping existing CMS fields

### Tests and docs

- [x] Fixture tests assert CMS strings and new slots, not Vetic chrome
- [x] Living skills / AGENTS.md / master plan point here
- [x] Completed Phase 1–4 docs bannered as historical for visual design

---

## Non-goals

- Phase 5 routes
- New homepage globals
- Service icon uploads
- Copying the client HTML mockup or its embedded photos into the repo
