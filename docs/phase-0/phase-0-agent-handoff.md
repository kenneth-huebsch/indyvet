# Phase 0 Agent Handoff - Technical Foundation

## Objective

Create the initial production-ready foundation for a reusable marketing website platform.

This phase intentionally excludes implementation of the marketing website itself.

## Tech Stack

- Next.js 16 (App Router)
- Payload CMS 3
- PostgreSQL
- Docker Compose
- Tailwind CSS 4
- shadcn/ui
- TypeScript (strict)
- ESLint
- Prettier

## Scope

### Build

- Initialize Next.js project.
- Integrate Payload CMS.
- Configure PostgreSQL.
- Configure Docker Compose.
- Configure Tailwind CSS.
- Configure shadcn/ui.
- Enable strict TypeScript.
- Create Media collection.
- Configure Payload authentication.
- Configure environment variables.
- Configure GitHub Actions for lint and typecheck.
- Create a production Dockerfile.

### Do Not Build

- Marketing pages
- Payload blocks
- Collections other than Media
- Homepage
- Styling beyond the design foundation
- Custom business logic

## Suggested Directory Structure

```text
src/
  app/
  components/
  payload/
    collections/
    globals/
    blocks/
  lib/
  styles/

public/
```

## Deliverables

- Running local development environment
- Working Payload admin
- Media uploads functioning
- Successful production build
- Production Dockerfile builds successfully
- Clean project structure
- README with setup instructions

## Acceptance Criteria

- `docker compose up` starts PostgreSQL.
- `npm run dev` launches both Next.js and Payload.
- Admin login works.
- Image upload succeeds.
- TypeScript has zero errors.
- ESLint passes.
- Production build succeeds.
- No placeholder marketing content exists.

## Coding Standards

- Prefer Server Components.
- Avoid `any`.
- Use generated Payload types.
- Keep files focused.
- Use absolute imports where practical.
- No hard-coded secrets.
- Document non-obvious decisions with concise comments.
