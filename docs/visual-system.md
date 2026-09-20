# IndyVet Visual System

**Authoritative public-UI reference for all marketing pages.** Derive inner pages from this document and the live `/` implementation. Do not invent a parallel look.

Editors manage content only. Layout, styling, and section composition stay in code.

---

## Brand feel

Editorial clinic: calm paper surfaces, sage accents, ink type, serif headlines at regular weight, square uppercase buttons, hairline grids. Quiet and clinical—not playful, not SaaS-dashboard, not purple gradient.

| Do | Don’t |
| --- | --- |
| Square corners on chrome and CTAs | Pill nav, rounded mega-cards, soft “marketing cards” as default |
| Hairline borders (`border-line`) | Heavy drop shadows, glow, gradient blobs as the main idea |
| One job per section | Hero clutter (stats, address blocks, promo chips) |
| Alternating paper / cream / sage-light bands | Flat single-color page with identical section chrome |
| CMS-driven copy and media | Hardcoded mockup-only copy or decorative fake content |

---

## Source of truth in code

| Concern | Location |
| --- | --- |
| Tokens / Tailwind theme | `src/styles/globals.css` |
| Fonts | `src/app/(frontend)/layout.tsx` (Newsreader + Source Sans 3) |
| Typography primitive | `src/components/ui/typography.tsx` |
| Buttons | `src/components/ui/button.tsx` |
| Layout | `src/components/ui/container.tsx`, `src/components/ui/section.tsx` |
| Site chrome | `src/components/site/SiteHeader.tsx`, `SiteFooter.tsx`, `MobileNav.tsx` |
| Homepage patterns | `src/components/home/*` |
| Motion | `src/components/home/ScrollReveal.tsx` (CSS only) |
| Media | `src/components/media/MediaImage.tsx`, `src/components/home/HomePhoto.tsx` |

Prefer extending these primitives over one-off class soup. Promote homepage helpers (`HomeEyebrow`, `HomeHeadline`, `CmsCta`, `HomePhoto`) into shared page components when a second route needs them.

---

## Palette

Named tokens (use Tailwind classes / CSS variables—not raw hex in new work when a token exists):

| Role | Token / class | Hex |
| --- | --- | --- |
| Paper / page | `background` | `#fbfaf6` |
| Ink | `foreground` / `primary` | `#153027` |
| Cream band | `cream` | `#f2ecdf` |
| Sage | `sage` | `#a9b8a5` |
| Sage wash | `sage-light` | `#e4e9df` |
| Stone | `stone` | `#e9e3d8` |
| Hairline | `line` / `border` | `#d2ccbf` |
| Muted copy | `muted-foreground` | `#68736d` |
| Deep footer / chart ink | `footer` | `#10291f` |

Supporting ink used on the homepage for secondary body copy (prefer consolidating to tokens over time):

- Soft body: `#415149`, `#435149`
- Grid body: `#59645f`, `#606b65`
- Soft numeral: `#8c9992`
- Ink-on-dark promo body: `#d9e0db`
- Light-on-dark headline: `#f8f4eb`

Selection highlight: `bg-sage-light`. Focus ring: ink (`ring`).

**Public site does not use dark mode.** Ignore `.dark` token overrides for marketing UI.

---

## Typography

| Face | CSS var | Role |
| --- | --- | --- |
| Newsreader | `--font-heading` / `font-heading` | Display and section headlines |
| Source Sans 3 | `--font-sans` / body default | UI, body, labels, nav |

### Scale (`Typography` variants)

| Variant | Use |
| --- | --- |
| `display` | Page / hero H1 |
| `h2` | Section titles (`HomeHeadline`) |
| `h3` / `h4` | Subheads when needed; many list titles use small uppercase sans instead |
| `body-large` / `body` / `small` | Supporting copy |
| `label` | Eyebrows and meta tags (11px, extrabold, uppercase, wide tracking) |
| `caption` | Fine print |

Headlines stay **regular weight** serif (`font-normal`), slightly tight tracking, `text-balance` on section titles. Do not bold entire headlines.

### Recurring type patterns

- **Eyebrow** → `HomeEyebrow` / `variant="label"`, usually `mb-3` or `mb-4` above the title.
- **Section title** → `HomeHeadline` (`h2` / `h2` variant).
- **Hero title** → `HomeHeadline as="h1"` (`display`).
- **Card / grid title** → small uppercase sans, ~`text-[13px]`–`text-sm`, `tracking-[0.08em]`.
- **Index numeral** → serif, muted (`text-muted-foreground` or soft sage-gray), zero-padded (`01`).

---

## Radius, elevation, density

| Token | Value | Intent |
| --- | --- | --- |
| Button / nav radius | `0` | Sharp chrome |
| Default radius | `0.125rem` | Nearly square |
| Photo frame | `rounded-[2px]` via `HomePhoto` | Barely softened media |
| Elevation | Prefer hairlines over shadow | Shadows exist (`shadow-sm`…) but marketing sections avoid card elevation |

Section vertical rhythm on `/` is typically **~68–76px** (`py-[68px]`, `py-[74px]`, `py-[76px]`). Token aliases also exist: `py-section-sm` (2.5rem), `py-section-md` (4.25rem), `py-section-lg` (5.5rem). Prefer those tokens for new pages unless matching an adjacent homepage band.

---

## Layout

- **Content width:** `Container` → `max-w-content` (73.75rem) with `px-[1.125rem]` / `md:px-gutter` (1.75rem).
- **Narrow measure:** `Container size="medium"` (36rem) for longform or form columns.
- **Section shell:** full-bleed background + top hairline (`border-t border-line`) + inner `Container`.
- **Default page canvas:** `bg-background` on the page root.

### Surface sequence (homepage)

Use this alternating language on inner pages so the site feels continuous:

1. Paper (`bg-background`) — hero, services, posts, testimonials  
2. Cream (`bg-cream`) — about, team  
3. Sage wash (`bg-sage-light`) — process intro, bottom CTA, site chrome  
4. Ink promo (`bg-primary` + light type) — emphasis band only  
5. Split bands — full-bleed 50/50 image + copy (bottom CTA)

Do not invent new brand colors for a single page.

---

## Chrome

### Header

- Sticky, `z-40`, `border-b border-line`, `bg-sage-light`
- Height **82px**; content aligned to `max-w-content`
- Flat nav (no mega-menu): 12px bold, slight tracking
- Primary CTA via `Button` (header CTA, else site booking)
- Breakpoint: desktop nav / CTA from **821px**; `MobileNav` below
- Mobile panel: same sage-light surface, square ghost menu control

### Footer

- Full width, `bg-sage-light`, `border-t border-line`, `py-[42px]`
- Multi-column NAP / link groups / hours / contact
- Group titles: 11px bold uppercase
- Links and meta: `text-xs text-muted-foreground`
- No cart, shop, or public auth chrome

---

## Buttons and CTAs

Use `Button` / `CmsCta` only. Shape: **square**, **11px extrabold uppercase**, tracking `0.08em`, `min-h-button`.

| Variant | When |
| --- | --- |
| `primary` | Default action (book, submit) |
| `outline` | Secondary on paper/cream |
| `secondary` | Soft cream fill |
| `ghost` | Icon / quiet controls (mobile menu) |
| Ink-band inversion | On `bg-primary`: light fill, ink text (see process promo) |

Empty CMS URLs still render a non-linking surface (`CmsCta` as `span`)—do not invent stub routes for missing URLs.

---

## Imagery

- Prefer `HomePhoto` / `MediaImage` with `object-cover`, fill, and explicit `sizes`.
- Photos sit in a near-square frame (`rounded-[2px]`), not floating cards with heavy shadow.
- Common aspects: hero/about ~tall min-heights; posts `aspect-[4/3]`; team `aspect-[3/4]`; avatars `size-12`.
- Missing media: omit the photo or use a quiet placeholder (initials on cream for team)—never broken-image chrome.

---

## Section patterns (reuse on inner pages)

### A. Split narrative (hero / about / process)

Two-column grid from `md`, copy + photo. Eyebrow → headline → body/rich text → CTA. Optional tag row as `label` chips without pill backgrounds.

### B. Section header + hairline grid

Eyebrow + title row, then a **CSS grid with shared `border-line`** (`border-t border-l` on the grid, `border-b border-r` on cells). Used for services, featured posts, testimonials. No soft `Card` shadow for these lists.

### C. Numbered steps

Same hairline idea; large serif index (`01`) above a short title and 13px body.

### D. Ink promo band

Single-column, max ~590px measure, light serif headline, muted light body, inverted primary button.

### E. Split bottom CTA

`md:grid-cols-2`, image | sage-light copy + primary CTA. Full-bleed edge-to-edge within the section (no inset card).

### F. Team roster

Intro column + 2-column photo grid; name/role under photo in a hairline box on paper.

**Avoid for marketing layouts:** default `Card` (`rounded-lg shadow-sm`) unless the interaction truly needs a contained control surface.

---

## Motion

- Only `ScrollReveal`: fade/slide up on intersect; respects `prefers-reduced-motion`.
- No Framer Motion (or similar) on public pages unless a future phase explicitly adds it.
- Keep motion sparse: section intros and key blocks, not every cell.

---

## Inner-page recipe (Phase 5+)

Build new routes so a visitor leaving `/` does not feel a theme change.

1. **Reuse chrome** from `(frontend)/layout.tsx`—do not fork header/footer.
2. **Page root:** `bg-background` (same as home).
3. **Page hero:** Pattern A (split) or a single-column paper hero with eyebrow + `display`/`h1` + short lede + primary/outline CTA pair. Keep the first viewport lean (brand already lives in the header).
4. **Body sections:** Stack patterns B–F with `border-t border-line` and alternating surfaces from the sequence above.
5. **Typography:** same variants and eyebrow/headline helpers.
6. **Lists of entities** (services, team, posts, FAQs): hairline grids or simple stacked rows—not rounded shadow cards.
7. **Forms (contact):** square inputs matching existing `Input` / `Label` tokens; primary submit button; cream or paper panel with hairline—not a floating modal card.
8. **Content model:** fill existing globals/collections; do not add layout fields for editors.
9. **Empty states:** omit empty sections; keep non-linking CTAs when URLs are missing.
10. **Verification:** compare side-by-side with `/` for color, type, button shape, and border language before calling a page done.

### Suggested page skeletons

| Page | Hero | Following bands |
| --- | --- | --- |
| About | Split mission + namesake | Stacked team bios with photos, ink CTA band |
| Services index | Paper title + lede | Accordion of full service bodies with feature images, ink CTA band |
| Service detail | *(not used)* — full copy lives on `/services` accordion | — |
| Team | Paper or cream intro | Roster grid (pattern F) |
| Blog index | Paper title | Featured hairline grid / post rows |
| Post detail | Paper title + meta labels | Longform in `Container` / medium measure |
| Contact | Paper title | Form + NAP sidebar, optional map, emergency referrals band |
| Emergency | *(merged into Contact)* — `/contact#emergency` | — |

---

## Locked product / visual decisions

- No Products, cart, checkout, or public sign-in UI.
- Featured Posts stay editorial (not commerce).
- Header nav stays flat.
- `hero.marqueeTags` may exist in CMS but are not rendered.
- Inner pages inherit this system only.

---

## Checklist before shipping a new page

- [ ] Uses `Container`, `Typography`, `Button` / `CmsCta`, and shared photo helpers
- [ ] Surfaces are paper / cream / sage-light / ink promo only
- [ ] Section separators are `border-line` hairlines
- [ ] Buttons are square uppercase; headlines are regular-weight serif
- [ ] No pill header, no default shadow cards for content grids
- [ ] Motion is `ScrollReveal` only (or none)
- [ ] Feels continuous with `/` at mobile and desktop widths
