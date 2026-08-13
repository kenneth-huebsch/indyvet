# IndyVet

Technical foundation for the IndyVet marketing website platform. Phase 0 includes Next.js, Payload CMS, PostgreSQL, Tailwind CSS, and shadcn/ui configuration without marketing content.

## Prerequisites

- Node.js 20.9 or newer
- Docker with Docker Compose

## Local Development

1. Start PostgreSQL:

   ```bash
   docker compose up -d
   ```

2. Copy the environment template:

   ```bash
   cp .env.example .env
   ```

3. Generate a 32-byte base64 Payload secret and set it in `.env`:

   ```bash
   node -e "console.log(require('crypto').randomBytes(32).toString('base64'))"
   ```

4. Install dependencies:

   ```bash
   npm install
   ```

5. Start the development server:

   ```bash
   npm run dev
   ```

6. Open `http://localhost:3000/admin` and create the first administrator.

## Local vs production content

Local admin and [new.indyvetcare.com](https://new.indyvetcare.com) are **separate Payload sites**. Pushing `main` deploys **code and schema** only.

| You do this locally | On the live site |
| --- | --- |
| Code, styles, new fields + migrations | Deploys with `main` (new fields are empty until filled) |
| Copy, pages, services, team, posts in `/admin` | Stays local until you re-enter it in prod admin or ask an agent to copy |
| Upload images | Stays in gitignored `media/` until you re-upload in prod (S3) or ask an agent |
| Admin users | Never copied — create accounts on prod `/admin` |

Small live edits: use production `/admin`. Full content passes: ask an agent to copy (not `pg_dump`). Details: [docs/content-environments.md](docs/content-environments.md).

## Environment Variables

| Variable                 | Description                                           | Local value                                       |
| ------------------------ | ----------------------------------------------------- | ------------------------------------------------- |
| `DATABASE_URI`           | PostgreSQL connection string                          | `postgres://vetic:vetic-dev@localhost:5432/vetic` |
| `PAYLOAD_SECRET`         | Secret used by Payload for authentication and signing | A random 32-byte base64 string                    |
| `NEXT_PUBLIC_SERVER_URL` | Public URL used by the application                    | `http://localhost:3000`                           |

Never commit `.env`.

## Migrations

Create a migration after a schema change:

```bash
npx payload migrate:create <name>
```

Apply pending migrations:

```bash
npx payload migrate
```

Generate TypeScript types from the Payload config:

```bash
npm run generate:types
```

## Production Docker Image

Build the standalone image with the required build-time variables:

```bash
docker build \
  --build-arg DATABASE_URI=postgres://vetic:vetic-dev@host.docker.internal:5432/vetic \
  --build-arg PAYLOAD_SECRET=<base64-secret> \
  --build-arg NEXT_PUBLIC_SERVER_URL=http://localhost:3000 \
  -t indyvet .
```

Run the image:

```bash
docker run --rm -p 3000:3000 \
  -e DATABASE_URI=postgres://vetic:vetic-dev@host.docker.internal:5432/vetic \
  -e PAYLOAD_SECRET=<base64-secret> \
  -e NEXT_PUBLIC_SERVER_URL=http://localhost:3000 \
  indyvet
```

## Project Structure

```text
src/
  app/
    (frontend)/       Minimal placeholder frontend route
    (payload)/        Generated Payload admin and API routes
  components/         Empty until components are added
  lib/                Empty until shared utilities are added
  payload/
    blocks/           Empty until blocks are added
    collections/      Users and Media
    globals/           Empty until globals are added
  styles/globals.css  Tailwind 4 and shadcn/ui styles
  payload.config.ts   Payload configuration
public/
docker-compose.yml    PostgreSQL service for local development
Dockerfile             Standalone production image
```
