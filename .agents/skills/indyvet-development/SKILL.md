---
name: indyvet-development
description: Use when developing or changing the IndyVet Next.js and Payload application, including collections, schema migrations, generated types, frontend routes, Tailwind, and shadcn/ui.
---

# IndyVet Development

## Start Here

1. Read the repository `AGENTS.md`.
2. Read the applicable plan and phase checklist in `docs/` before changing planned work.
3. For Payload behavior, start with `.agents/skills/payload/SKILL.md` and then the relevant reference document.
4. Inspect the existing implementation before proposing a new abstraction, collection, route, or component.

## Repository Boundaries

- `src/app/(payload)/` contains generated Payload admin and API routes. Never hand-edit it.
- `src/app/(frontend)/` contains the public application routes and layouts.
- `src/payload/collections/` contains collection definitions.
- `src/payload/globals/` contains site and page singletons (Header, Footer, Site Settings, Home, About, Contact, Emergency).
- `src/payload/fields/` contains reusable field helpers (`link`, `seo`). Prefer these over duplicating group shapes.
- `src/payload/access.ts` contains shared access helpers (`anyone`, `authenticated`, `authenticatedOrPublished`).
- `src/payload/blocks/` is reserved until a feature explicitly needs blocks. Preserve `.gitkeep` when empty.
- `src/styles/globals.css` is the Tailwind 4 and shadcn/ui CSS entrypoint.
- `src/payload-types.ts` is generated and committed. Do not hand-edit it.
- `scripts/` may hold one-off Local API utilities. It is excluded from `tsconfig.json` so it does not break `next build`.

## Content Model (Phase 2)

Collections own reusable entities. Globals own section chrome and relationships. Editors fill fields; they do not rearrange layout.

| Kind | Slugs |
| --- | --- |
| Collections | `media`, `users`, `services`, `team-members`, `testimonials`, `posts`, `faqs`, `emergency-referrals` |
| Globals | `site-settings`, `header`, `footer`, `home-page`, `about-page`, `contact-page`, `emergency-page` |

Locked product decisions:

- No Products, cart, checkout, or public storefront auth collections.
- Home template “Products” section is **Featured Posts** (`home-page.featuredPosts` → `posts`).
- Pharmacy / Order Online is `site-settings.pharmacy` (outbound URL). Booking is `site-settings.booking` (Vetter CTA / embed URL).
- Drafts are enabled on `services`, `team-members`, and `posts`. Public read uses `authenticatedOrPublished` where drafts apply.
- Contact form labels live on `contact-page`; submission / email delivery is a later phase.
- Source of truth checklist: `docs/phase-2/phase-2-implementation-plan.md`.

Do not invent parallel collections for the same content. Prefer relationships from page globals into existing collections.

## Payload Change Workflow

Use this sequence whenever a collection, field, global, block, or other database-backed Payload configuration changes:

```bash
npx payload migrate:create <descriptive-name>
npx payload migrate
npm run generate:types
npx tsc --noEmit
```

- Review the generated SQL migration before committing it.
- Do not modify a migration that may already be applied outside the active local database.
- Use Payload types from `@/payload-types` where application code needs document types.
- Preserve the `postgresAdapter`, lexical editor, `sharp`, and environment-driven secrets in `src/payload.config.ts` unless the task explicitly changes them.
- After schema changes, confirm the affected collection or global appears and saves correctly in `/admin`.

## Frontend Rules

- Prefer Server Components by default.
- Use `@/` aliases for imports under `src/`.
- Follow the established Tailwind 4 CSS-first setup in `src/styles/globals.css`.
- `components.json` is shadcn/ui configuration only. Do not add components merely because shadcn is initialized.
- Keep new components focused and accessible; avoid marketing or placeholder content unless explicitly requested.

## Frontend Foundation (Phase 3)

Shared chrome and Payload → frontend mapping already exist. Reuse them before inventing parallel helpers.

| Area | Location |
| --- | --- |
| Site shell | `src/components/site/` — `SiteHeader`, `SiteFooter`, `MobileNav` |
| Layout wiring | `src/app/(frontend)/layout.tsx` via `getSiteChrome()` |
| Payload client / chrome fetch | `src/lib/payload.ts` (`getPayloadClient`, `getSiteChrome` with React `cache`) |
| Media helpers / image | `src/lib/media.ts`, `src/components/media/MediaImage.tsx` |
| SEO metadata merge | `src/lib/seo.ts` (`buildMetadata`) |
| Link normalization | `src/lib/links.ts` |
| Lexical rich text | `src/components/rich-text/RichText.tsx` (`@payloadcms/richtext-lexical/react`) |

Locked chrome conventions:

- Design reference for shell geometry: [Vetic Home 1](https://vetic.webflow.io/home/home-1) — pill header, contained dark footer, mobile collapse ≤991px. No cart, shop, or public auth chrome.
- Header nav is **flat** (`header.navItems`). Do not add mega-menu schema unless a phase explicitly requires it.
- Header `cta` is preferred; fall back to `site-settings.booking` when Header CTA is empty.
- NAP, social, pharmacy, and booking live on `site-settings`. Footer owns logo, link groups, and copyright only.
- Source of truth checklist: `docs/phase-3/phase-3-implementation-plan.md`.

Frontend mapping tests use Payload-shaped fixtures + `renderToStaticMarkup` (no DB). Keep that pattern for shell and section components unless a phase requires Local API integration.

## Required Checks

Run the narrowest relevant check first. Before completion, run all applicable checks:

```bash
npm test
npm run lint
npx tsc --noEmit
npx prettier --check .
npm run build
```

If the schema changed, also run `npm run generate:types` and apply the migration to a local database before validating the affected Payload workflow.

Phase 2+ Payload schema work must include:

- Unit tests for shared access helpers (and field helpers where non-trivial).
- Vitest integration tests against Postgres via the Payload Local API (create/read, draft visibility, unauthenticated write denial, Home Featured Posts, Site Settings booking/pharmacy).

Phase 3+ frontend mapping work must include fixture-based tests that assert shell (or page) components render from Payload-shaped data, not only static showcase markup.

Do not treat a one-off `scripts/` smoke file as a substitute for the Vitest suite.

When running Local API scripts under `scripts/`, preload `.env` (Vitest does this automatically; bare `tsx` does not):

```bash
npx cross-env NODE_OPTIONS=--no-deprecation tsx -r dotenv/config scripts/<script>.ts
```

Do not commit accidental regenerations of `src/payload-types.ts` or `src/app/(payload)/admin/importMap.js` unless the change was caused by intentional schema/config work in the same change set.
