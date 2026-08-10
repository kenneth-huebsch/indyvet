---
name: indyvet-operations
description: Use when starting, stopping, validating, troubleshooting, or running the IndyVet application, PostgreSQL Compose service, Payload admin, migrations, or production Docker image.
---

# IndyVet Operations

## Local Stack

The application runs in two processes:

- PostgreSQL 17 in Docker Compose, service name `db`, port `5432`.
- Next.js and Payload through `npm run dev`, port `3000`.

The required `.env` values are:

```dotenv
DATABASE_URI=postgres://vetic:vetic-dev@localhost:5432/vetic
PAYLOAD_SECRET=<random-32-byte-base64-value>
NEXT_PUBLIC_SERVER_URL=http://localhost:3000
```

Never print, commit, or copy the actual `PAYLOAD_SECRET` into source files, logs, or task output.

## Start And Stop

Start PostgreSQL and wait for it to become healthy:

```bash
docker compose up -d
docker compose ps
```

Apply pending database migrations before starting application work that needs the schema:

```bash
npx payload migrate
```

If Payload warns that the database was previously updated via dev “push” and that running migrations may cause data loss, stop and confirm with the user before answering `yes`. Prefer migrations for committed schema changes; do not casually accept destructive prompts.

Start the application:

```bash
npm run dev
```

Check the public route at `http://localhost:3000/` and the Payload admin at `http://localhost:3000/admin`.

Admin accounts are created interactively at `/admin` (first-user flow) or managed through Payload. Never commit, document, or print admin passwords. Reset a forgotten local password only with explicit user approval, via the Payload Local API (hashed update), not by writing plaintext into Postgres.

Stop only the database service when appropriate:

```bash
docker compose down
```

Do not add `-v` unless explicit approval is given. It deletes the local PostgreSQL volume and all local data.

## Troubleshooting Order

1. Confirm Docker Desktop is running: `docker version`.
2. Confirm Compose service state: `docker compose ps`.
3. Inspect database output: `docker compose logs db`.
4. Confirm `.env` contains all required variable names without exposing their values.
5. Apply pending migrations: `npx payload migrate`.
6. Inspect the `npm run dev` output for database connection failures, then check `/admin`.

`ECONNREFUSED` on port `5432` means PostgreSQL is not running or has not become healthy yet. Do not change Payload configuration before checking Compose state and `DATABASE_URI`.

## Runtime Acceptance Checks

For an admin or schema-affecting change, verify the following against the running application:

1. `/admin` loads with HTTP 200.
2. An administrator can authenticate.
3. The changed collection or global is visible and behaves as expected.
4. A Media upload writes into repository-root `media/`.
5. A logged-in user can log out and log back in when auth changes are involved.

For Phase 2-style schema work, also confirm Content collections, Pages globals, and Settings globals appear in the admin nav, and that `home-page` exposes Featured Posts (not Products). Prefer `npm test` (Vitest unit + Local API integration) over one-off scripts.

Optional Local API helpers may live under `scripts/` (excluded from `tsconfig`); they do not replace Vitest.

Use browser automation for UI behavior where available. Do not treat a static build as proof that database-backed admin behavior works.

## Production Image

Build the standalone Docker image only after static checks pass:

```bash
docker build \
  --build-arg DATABASE_URI=postgres://vetic:vetic-dev@host.docker.internal:5432/vetic \
  --build-arg PAYLOAD_SECRET=<non-production-build-value> \
  --build-arg NEXT_PUBLIC_SERVER_URL=http://localhost:3000 \
  -t indyvet .
```

The current Dockerfile accepts build-time variables because that is the approved Phase 0 contract. Use non-production values for local image validation and supply actual runtime variables with `docker run -e ...` or the deployment platform's secret manager.
