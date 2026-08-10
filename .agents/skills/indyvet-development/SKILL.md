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
- `src/payload/blocks/` and `src/payload/globals/` are reserved for approved future work.
- `src/styles/globals.css` is the Tailwind 4 and shadcn/ui CSS entrypoint.
- `src/payload-types.ts` is generated and committed. Do not hand-edit it.

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

## Frontend Rules

- Prefer Server Components by default.
- Use `@/` aliases for imports under `src/`.
- Follow the established Tailwind 4 CSS-first setup in `src/styles/globals.css`.
- `components.json` is shadcn/ui configuration only. Do not add components merely because shadcn is initialized.
- Keep new components focused and accessible; avoid marketing or placeholder content unless explicitly requested.

## Required Checks

Run the narrowest relevant check first. Before completion, run all applicable checks:

```bash
npm run lint
npx tsc --noEmit
npx prettier --check .
npm run build
```

If the schema changed, also run `npm run generate:types` and apply the migration to a local database before validating the affected Payload workflow.
