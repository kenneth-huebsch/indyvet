---
name: indyvet-content-sync
description: Explains which IndyVet local work deploys to new.indyvetcare.com versus CMS copy/media that stays local. Use when the user asks what carries over from dev, how to migrate content or media to production, copy local admin data, or whether to re-enter copy by hand.
---

# IndyVet content vs code (local → prod)

Human cheat sheet: `docs/content-environments.md`. This skill is the agent procedure. There is **no** committed copy script; write a throwaway Local API helper under `scripts/` if a bulk copy is requested, then delete it.

Local and production are separate Payload sites. Git deploy ships **code and schema**. It does not ship admin documents, `media/` files, or users.

## Classify the request

| User work | Carries over? | Action |
| --- | --- | --- |
| Code, styles, routes, tests | Yes, on `main` deploy | Implement and push (unless they asked not to) |
| Payload schema + migration | Yes (empty fields on prod) | Migrate locally, commit migration + types |
| Copy/images saved in local `/admin` | No | Prod admin by hand, or Local API copy if they asked |
| Local `media/` uploads | No (gitignored) | Re-upload in prod admin, or Payload `filePath` create so S3 gets the object |
| Admin users | Never | Create on `https://new.indyvetcare.com/admin` |

If they only asked “will this carry over?”, answer from the table. Do not copy to production unless they explicitly want local content on the live site.

## Prefer by-hand when small

For a few fields or a few images, tell them to edit **production** `/admin`. That is safer than a bulk import (no duplicate slugs, no `cat-1.png` suffix, no risk of pointing tools at prod Postgres incorrectly).

Do not recommend re-uploading media as a fix for **broken display** if S3 already has the objects and Media rows exist — that is usually `next/image` rejecting absolute Payload URLs. Check `getMediaUrl` and GET `/api/media/file/<filename>` (not HEAD).

## Bulk copy (only when asked)

Use Payload Local API. Do **not** `pg_dump`, `aws s3 sync` without Media documents, or copy `users`.

### Process isolation

Run **two processes**. One Payload instance per process; do not dump and import in the same Node process.

1. **Dump** against Compose only: `DATABASE_URI=postgres://vetic:vetic-dev@localhost:5432/vetic`, `DATABASE_SSL=false`, `S3_BUCKET` / S3 keys unset, `NEXT_PUBLIC_SERVER_URL=http://localhost:3000`. Confirm `docker compose ps` is healthy and every Media `filename` exists under `media/`.
2. Write JSON to a temp file (not the repo). Include local numeric ids so relationships can be remapped.
3. **Import** with `NODE_ENV=production` and `PAYLOAD_MIGRATING=true`. Never import with `NODE_ENV` unset (Payload `pushDevSchema` writes `payload_migrations` `dev` / `batch=-1` and Lightsail migrate hangs).
4. Load prod `DATABASE_URI`, `DATABASE_SSL=true`, and `S3_*` into the import env **without printing them**. Write Lightsail/GitHub values to a temp dotenv; do not `cat` it and do not dump `get-container-service-deployments` JSON (it contains secrets). Clear shell `S3_ACCESS_KEY_ID=placeholder` left over from `generate:importmap`.
5. `npx cross-env NODE_OPTIONS=--no-deprecation tsx -r dotenv/config scripts/<temp>.ts`. Call `process.exit(0)` when each mode finishes so Payload does not hang.
6. Delete the throwaway script and temp dump/env files. Do not commit them.

### What to copy

Collections (published only, `draft: false`, `depth: 0`): `services`, `team-members`, `posts`, `testimonials`, `faqs`, `emergency-referrals`.

Globals: `site-settings`, `header`, `footer`, `home-page`, `about-page`, `contact-page`, `emergency-page`.

Skip `users`. Strip `id`, `createdAt`, `updatedAt`, `deletedAt`, and media file metadata (`url`, `filename`, `sizes`, …) from payloads. Default `_status` to `published`. Use `overrideAccess: true`.

### IDs and media

Order: **media → collections → globals**.

- Media: if prod already has the same `filename`, reuse that id. Else `payload.create({ collection: 'media', data: { alt }, filePath: media/<filename> })` so the S3 plugin uploads. Missing local file is a hard stop.
- Remap relationship ids with a local→prod map. Media-ish fields: `image`, `featuredImage`, `photo`, `avatar`, `logo`, `ogImage`. Has-many: `featuredServices` → `services`, `posts` → `posts`, `members` → `team-members`, `items` → `testimonials`, `referrals` → `emergency-referrals`. Walk Lexical nodes and remap `{ type: 'upload', value }`.
- Collections with `slug`: `find` by slug first. If it exists, map the local id to the existing prod id and skip create (unless the user asked to replace). Do not blindly `create` and duplicate. Globals: `updateGlobal` only.
- Unique-constraint errors: stop and ask. Do not loop create.

### Verify

- `aws s3 ls s3://indyvet-media-382125965554/ --profile indyvet`
- GET (not HEAD) `https://new.indyvetcare.com/api/media/file/<filename>` → `200` + image bytes
- Homepage HTML: `next/image` should see **paths** `/api/media/file/...` (absolute `https://new.indyvetcare.com/...` URLs 400 unless `remotePatterns` allow them; `getMediaUrl` rewrites)

## Safety

- Never point local `npm run dev` or `payload migrate` at Lightsail Postgres.
- Never destroy Lightsail DB or Compose `-v` without explicit approval.
- Never touch WordPress apex/`www` DNS.
- Keep `.env` secrets out of commits, logs, and chat.
