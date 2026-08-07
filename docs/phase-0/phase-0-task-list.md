# Phase 0 Task List — Technical Foundation

Executable checklist derived from `phase-0-execution-plan.md`. All decisions are pre-made; execute top to bottom and do not add scope. Refer to the execution plan only if a step is ambiguous.

**Working dir:** repo root. **Stack:** Next.js >= 16.2.6, Payload 3, PostgreSQL 17, Tailwind 4, shadcn/ui, TS strict, npm, Node 22.

## 1. Docs updates (do first)

- [x] `docs/master-project-plan.md`:
  - Stack line: remove "and Vercel".
  - Phase 0 deliverables: replace "CI and Vercel configuration" with "CI (GitHub Actions)"; add "Production Dockerfile".
  - Phase 10: add note that deployment targets AWS (specific services TBD).
- [x] `docs/phase-0-agent-handoff.md`:
  - Scope/Build: remove "Configure Vercel deployment"; add "Create production Dockerfile".
  - Deliverables: add "Production Dockerfile builds successfully".

## 2. Git + scaffold

- [x] `git init`.
- [x] Scaffold: `npx create-payload-app@latest` — blank template, **Postgres** adapter, npm, target = repo root. If the CLI refuses the non-empty dir (because of `docs/`), scaffold into a temp folder and move the contents into the root.
- [x] Check installed `next` version; if `< 16.2.6`, run `npm install next@latest react@latest react-dom@latest`. On any npm `ERESOLVE`, retry with `--legacy-peer-deps` (applies to all installs below).
- [x] Remove template demo content: keep only the **Users** collection (auth) and the generated `src/app/(payload)/` route group. Delete template example pages, example collections, and seed data.
- [x] `.gitignore`: `node_modules`, `.env`, `.next`, `/media`, `*.tsbuildinfo`; ignore `payload-types.ts` only if the template already does (otherwise commit generated types).

## 3. Project structure

Create/align to:

```text
src/app/(frontend)/       src/payload/collections/   (Users.ts, Media.ts)
src/app/(payload)/        src/payload/globals/       (empty + .gitkeep)
src/components/  (empty)  src/payload/blocks/        (empty + .gitkeep)
src/lib/         (empty)  src/styles/globals.css
src/payload.config.ts
```

- [x] `src/payload.config.ts`: `postgresAdapter` (pool from `process.env.DATABASE_URI!`), `secret: process.env.PAYLOAD_SECRET!`, lexical editor, `sharp`, `collections: [Users, Media]`.
- [x] `tsconfig.json`: `"strict": true`; paths `@/*` → `./src/*` and `@payload-config` → `./src/payload.config.ts`.

## 4. Docker + env

- [x] `docker-compose.yml` (root): single service `db`, image `postgres:17-alpine`; `POSTGRES_USER=vetic`, `POSTGRES_PASSWORD=vetic-dev`, `POSTGRES_DB=vetic`; ports `5432:5432`; named volume `pgdata`; healthcheck `pg_isready -U vetic -d vetic`. No other services.
- [x] `.env.example`:

  ```dotenv
  DATABASE_URI=postgres://vetic:vetic-dev@localhost:5432/vetic
  PAYLOAD_SECRET=
  NEXT_PUBLIC_SERVER_URL=http://localhost:3000
  ```

- [x] Copy to `.env`; set `PAYLOAD_SECRET` to a random 32-byte base64 string. Never commit `.env`.

## 5. Media collection + migration

- [x] `src/payload/collections/Media.ts`: slug `media`; `upload: { staticDir: 'media' }` (repo-root `media/`); one field `alt` (text, required). Local disk only — no storage adapter.
- [x] `npx payload migrate:create initial`; commit the generated migration folder.

## 6. Tailwind 4 + shadcn/ui + placeholder page

- [x] If the template lacks Tailwind: `npm install tailwindcss @tailwindcss/postcss`; put `@import "tailwindcss";` in `src/styles/globals.css`; import it in `src/app/(frontend)/layout.tsx`. If the template already ships Tailwind 4, only align the config location to `src/styles/globals.css`.
- [x] `npx shadcn@latest init` — CSS variables on, alias `@/components`. Init only; add **no** components.
- [x] `src/app/(frontend)/page.tsx`: server component rendering a single bare heading with the project name and no other copy.

## 7. Lint / format / scripts

- [x] `npm install -D prettier eslint-config-prettier`; add `.prettierrc` matching the template's existing style; add `eslint-config-prettier` last in the ESLint config.
- [x] `package.json` scripts (add or verify): `dev`, `build`, `start`, `lint`, `format` = `prettier --write .`, `generate:types` = `payload generate:types`.
- [x] `package.json`: add `"engines": { "node": ">=20.9.0" }`.

## 8. Dockerfile + CI + README

- [x] `next.config`: enable `output: 'standalone'`, keeping the `withPayload` wrapper intact.
- [x] Root `Dockerfile`: multi-stage on `node:22-alpine` — deps stage (`npm ci`), build stage (`npm run build`; build-time `ARG`s `DATABASE_URI`, `PAYLOAD_SECRET`, `NEXT_PUBLIC_SERVER_URL`), runner stage copying standalone output + `.next/static` + `public`. `EXPOSE 3000`, `CMD ["node", "server.js"]`.
- [x] `.dockerignore`: `node_modules`, `.next`, `.env`, `media`, `docs`, `.git`.
- [x] `.github/workflows/ci.yml`: on push/PR — ubuntu-latest, Node 22, `npm ci`, `npx payload generate:types`, `npm run lint`, `npx tsc --noEmit`. No DB service.
- [x] `README.md`: prerequisites (Node 20.9+, Docker); `docker compose up -d`; copy `.env.example` → `.env` and how to generate `PAYLOAD_SECRET`; `npm install`; `npm run dev`; create first admin at `http://localhost:3000/admin`; env var table; migration commands (`payload migrate:create`, `payload migrate`); Docker build/run notes; structure overview.

## 9. Commit

- [x] Single initial commit containing everything above (git init was authorized during planning).

## Validation (all must pass before done)

- [x] `docker compose up -d` → Postgres container healthy
- [x] `npm run dev` → boots; `http://localhost:3000/admin` loads
- [x] Create first user via `/admin`, log out, log back in
- [x] Upload an image via Media collection → file appears under `media/`
- [x] `npx tsc --noEmit` → 0 errors
- [x] `npm run lint` → clean
- [x] `npx prettier --check .` → clean
- [x] `npm run build` → succeeds
- [x] `docker build .` → succeeds
- [x] Collections = Users + Media only; no marketing content anywhere

## Do NOT build

Blocks, Pages/Services/Team/Testimonials/Blog collections, globals, homepage, marketing copy or styling, AWS resources, S3, live preview, anything Vercel.
