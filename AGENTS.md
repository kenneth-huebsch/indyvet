# IndyVet Agent Guide

## Project Snapshot

- Stack: Next.js 16 App Router, Payload CMS 3, PostgreSQL 17, Tailwind CSS 4, shadcn/ui, TypeScript strict, npm, and Node 22.
- The application root is this repository. Do not introduce a nested application, monorepo, or second package manager.
- Payload admin and API routes in `src/app/(payload)/` are generated. Do not hand-edit them.
- The frontend route group is `src/app/(frontend)/`. Shared frontend code belongs in `src/components/` and `src/lib/`.
- Site chrome (header/footer/nav) lives in `src/components/site/` and is fed by Payload globals via `src/lib/payload.ts` (`getSiteChrome`). Media, SEO, link, and rich-text helpers live under `src/lib/` and `src/components/media/` / `src/components/rich-text/`.
- Payload configuration is in `src/payload.config.ts`. Collections, blocks, and globals belong under `src/payload/`.
- Do not commit accidental regenerations of `src/payload-types.ts` or `src/app/(payload)/admin/importMap.js` unless intentional schema/config work caused them.
## Project Skills

Use the project skills when their scope matches the work:

- `.agents/skills/indyvet-development/SKILL.md` for Payload, Next.js, schema, TypeScript, and frontend changes.
- `.agents/skills/indyvet-operations/SKILL.md` for starting, validating, troubleshooting, and stopping the local application stack.
- `.agents/skills/payload/SKILL.md` is the Payload reference index. Consult its `reference/` documents for collection, field, access-control, hook, adapter, and query details.

## Source And Schema Rules

- Keep TypeScript strict. Do not introduce `any` or weaken compiler settings to silence errors.
- Prefer Server Components. Add client components only when browser state or browser APIs require them.
- Use `@/` imports for code under `src/` and `@payload-config` for the Payload config.
- Keep `src/payload/blocks/` empty until a feature requires it. Preserve its `.gitkeep` when otherwise empty.
- Content collections live in `src/payload/collections/`. Page and site globals live in `src/payload/globals/`. Shared field helpers live in `src/payload/fields/`; shared access helpers in `src/payload/access.ts`.
- Do not add Products, cart, checkout, or public sign-in collections. Pharmacy / Order Online is an outbound link in Site Settings. Home “Products” is modeled as Featured Posts.
- Media files use local disk storage at repository-root `media/` via `staticDir: 'media'`. The directory is intentionally gitignored.
- After changing Payload collections, fields, globals, or blocks:
  1. Create a migration with `npx payload migrate:create <name>`.
  2. Apply it locally with `npx payload migrate`.
  3. Regenerate types with `npm run generate:types`.
  4. Commit the migration and generated `src/payload-types.ts`.
- Do not edit a migration that has been applied outside the current local development database. Create a follow-up migration instead.

## Local Environment

- Copy `.env.example` to `.env`; never commit, print, or expose values from `.env`.
- Required variables are `DATABASE_URI`, `PAYLOAD_SECRET`, and `NEXT_PUBLIC_SERVER_URL`.
- The Compose file runs PostgreSQL only. The local service is named `db`, exposes port `5432`, and is healthy when `docker compose ps` reports `healthy`.
- Use `docker compose down` only when the database should be stopped. Never run `docker compose down -v` or delete the `pgdata` volume without explicit approval because it destroys local data.

## Commands And Validation

- Install dependencies: `npm install`.
- Start PostgreSQL: `docker compose up -d`.
- Inspect PostgreSQL: `docker compose ps` and `docker compose logs db`.
- Apply migrations: `npx payload migrate`.
- Start the application: `npm run dev`.
- Validate code: `npm test`, `npm run lint`, `npx tsc --noEmit`, `npx prettier --check .`, and `npm run build`.
- Build the production image with explicit non-production build values. Do not use real secrets in terminal history or Docker build arguments.
- For an end-to-end change, verify `/admin`, authenticated admin behavior, and local Media upload behavior in addition to static checks.

## Change Discipline

- Read `docs/master-project-plan.md` and the applicable phase document before beginning planned work. Follow approved phase checklists in order and update them only for work actually completed.
- Do not add marketing content, extra Payload collections, globals, blocks, cloud storage, AWS resources, Vercel configuration, or other future-phase scope unless the current task explicitly requests it.
- Preserve user changes and uncommitted work. Do not use destructive Git commands, force pushes, or database-volume deletion without explicit approval.
- Before committing, inspect `git status`, `git diff`, and recent commits. Run the narrowest relevant verification and report any check that could not run.
