# Phase 0 Execution Plan — Technical Foundation

Companion documents:

- `master-project-plan.md` — full project roadmap
- `phase-0-agent-handoff.md` — Phase 0 scope and acceptance criteria
- `phase-0-task-list.md` — step-by-step executable checklist (derived from this plan)

This document records **why** Phase 0 is built the way it is. The task list records **what** to do. An executing agent should only need the task list; this plan exists for review and for resolving ambiguity.

## Goal

Create a production-ready Next.js 16 + Payload CMS 3 + PostgreSQL skeleton at the repo root. Phase 0 delivers no marketing site, no blocks, and no collections beyond Users (auth) and Media.

## Locked Decisions

These were decided during planning and are not open for reconsideration during execution.

| #   | Decision          | Choice                                                                           | Rationale                                                                                 |
| --- | ----------------- | -------------------------------------------------------------------------------- | ----------------------------------------------------------------------------------------- |
| 1   | App location      | Repo root (`src/`, `public/`, `package.json` beside `docs/`)                     | Matches handoff structure; no monorepo need through Phase 3                               |
| 2   | Scaffold method   | `npx create-payload-app` (blank template, Postgres adapter)                      | Official quickstart; generates correct `(payload)` route group and `withPayload` plumbing |
| 3   | Deployment target | Local-first. Vercel removed from scope; AWS likely, services decided in Phase 10 | All Phase 0 acceptance criteria are locally verifiable                                    |
| 4   | AWS prep          | Doc updates + production standalone Dockerfile + `.dockerignore` only            | Unblocks future container deployment (ECS/App Runner) without expanding scope             |
| 5   | Media storage     | Local disk in dev; S3 storage adapter deferred to Phase 10                       | No cloud dependency needed yet                                                            |
| 6   | Package manager   | npm; fall back to `--legacy-peer-deps` on `ERESOLVE`                             | Handoff uses `npm run dev`; npm is supported by Payload                                   |
| 7   | Admin bootstrap   | First-run registration at `/admin`; no seed script                               | Satisfies "admin login works" with zero code                                              |
| 8   | DB schema mode    | Push mode in dev; one committed initial migration                                | Establishes the migration workflow Phase 2+ will depend on                                |
| 9   | CI                | GitHub Actions: lint + typecheck on push/PR                                      | Per handoff; activates whenever a GitHub remote exists                                    |
| 10  | Version pins      | `next >= 16.2.6`, Node `>= 20.9.0`, `postgres:17-alpine`                         | Payload's documented Next 16 compatibility floor                                          |

## Verified Environment (at planning time)

- Node v22.14.0, npm 11.1.0, Docker 27.5.1, git 2.47.1
- Payload 3 supports Next.js `16.2.6+` only — version check after scaffolding is mandatory.

## Target Structure

```text
src/
  app/
    (frontend)/          # minimal placeholder route only
    (payload)/           # generated admin/API routes — never edited
  components/
  lib/
  payload/
    collections/         # Users.ts, Media.ts
    globals/             # empty until Phase 2
    blocks/              # empty until Phase 2+
  styles/globals.css     # Tailwind 4 CSS-first config
  payload.config.ts
public/
docs/
docker-compose.yml       # PostgreSQL only
Dockerfile               # standalone production build
.dockerignore
.env.example             # committed; .env gitignored
.github/workflows/ci.yml
README.md
```

## Risks and Mitigations

| Risk                                                             | Mitigation                                                                                |
| ---------------------------------------------------------------- | ----------------------------------------------------------------------------------------- |
| `create-payload-app` refuses the non-empty root (`docs/` exists) | Scaffold into a temp folder, then move contents into the root                             |
| Template ships `next < 16.2.6`                                   | Upgrade `next`, `react`, `react-dom` immediately after scaffold                           |
| npm peer-dependency failures                                     | Retry installs with `--legacy-peer-deps`                                                  |
| Blank template may or may not ship Tailwind                      | Task list contains a deterministic branch: install only if absent                         |
| Docker build needs env at build time                             | Dockerfile declares `ARG`s for `DATABASE_URI`, `PAYLOAD_SECRET`, `NEXT_PUBLIC_SERVER_URL` |

## Validation Summary

Execution is complete only when every check in the task list's Validation section passes: Postgres healthy via compose, dev server boots, admin login works, image upload works, typecheck/lint/format clean, `npm run build` succeeds, `docker build .` succeeds, and no marketing content exists.

## Out of Scope for Phase 0

Blocks, Pages/Services/Team/Testimonials/Blog collections, globals, homepage, marketing copy or styling, AWS resources, S3, live preview, anything Vercel.

## Deferred to Later Phases

- Phase 1: shadcn component primitives, design tokens
- Phase 2: all remaining collections, globals, blocks
- Phase 10: AWS service selection, S3 media storage, deployment pipeline, monitoring
