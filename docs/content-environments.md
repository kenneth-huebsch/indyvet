# Local vs production: what carries over

Local (`http://localhost:3000`) and production (`https://new.indyvetcare.com`) are **two separate Payload sites**. They share the same *code* after a `main` deploy. They do **not** share database rows, uploaded files, or admin users.

| | Local | Production (`new.indyvetcare.com`) |
| --- | --- | --- |
| App code | Your working tree | Last successful Lightsail image from `main` |
| Database | Docker Compose Postgres (`indyvet_pgdata`) | Lightsail `indyvet-db` |
| Media files | Gitignored `media/` on disk | S3 `indyvet-media-382125965554` |
| Admin users | Local `/admin` accounts | Prod `/admin` accounts |

Apex / `www.indyvetcare.com` is still WordPress. This document is only about the new site.

## Carries over automatically

Anything committed and pushed to `main` (unless the commit is docs-only or marked `[skip deploy]`):

- Components, routes, styles, Tailwind, tests
- Payload **schema** (collections, fields, globals, blocks) and SQL **migrations**
- Generated `src/payload-types.ts` and admin `importMap.js` when you commit them
- Seed **scripts** under `scripts/` (the files, not their effect on a database)

After deploy, production has the new UI and fields. It does **not** magically get the copy or images you saved in local admin.

## Does not carry over (CMS data)

Anything you save in local `/admin` stays in the local Postgres volume and `media/` folder until you copy it on purpose:

| In local admin | What it is | How it reaches production |
| --- | --- | --- |
| Site Settings, Header, Footer | Globals (NAP, booking, pharmacy, nav, logo) | Re-enter in prod admin, or ask an agent to copy |
| Home / About / Contact / Emergency pages | Page globals + relationships | Same |
| Services, team, posts, testimonials, FAQs, referrals | Collection documents | Same |
| Media uploads | Files on disk + Media rows | Re-upload in prod admin (lands in S3), or ask an agent |
| Admin users / passwords | `users` collection | **Never copy.** Create accounts on prod `/admin` |

`media/` is gitignored. Committing code never ships photos.

## What to do where

**Draft in local admin** when you are iterating on layout with code, or writing a batch of copy/images you are not ready to publish.

**Edit in production admin** (`https://new.indyvetcare.com/admin`) when you want the live site to change *today* and the edit is small (a headline, hours, one photo). That is the safest path for a handful of fields or files.

**Ask the agent to copy local → prod** when you have a full content pass (many documents + media) and do not want to re-type it. Say so explicitly. There is no committed copy script; the agent follows `.agents/skills/indyvet-content-sync/SKILL.md` (Payload Local API, not `pg_dump`). That procedure:

- Copies collections and globals, not users
- Uploads local `media/` files through Payload so they land in S3 (not a bare `aws s3 sync`)
- Runs the import with `NODE_ENV=production` (never point a casual local `npm run dev` at the prod database)
- Reuses existing prod slugs/filenames instead of duplicating unless you asked to replace

**Do in git only:** new sections, schema fields, bugfixes. Push `main`. Then fill the new fields in whichever admin you care about (local for draft, prod for live).

## Practical examples

| You do this in local | Live site after `git push` |
| --- | --- |
| Fix CSS / add a homepage section in code | New UI appears; CMS fields stay empty until filled or copied |
| Add a Payload field + migration | Field appears in prod admin; existing prod documents have no value yet |
| Rewrite the hero headline in local admin | **No change** on `new.indyvetcare.com` |
| Upload `dog.png` in local admin | **No change** (file is only on your disk) |
| Create a local admin user | **No change** (and should not be copied) |
| Change Site Settings phone in **prod** admin | Live immediately; local admin is unchanged |

## Media notes

- Local uploads write to `media/`. Production uploads write to S3.
- Payload stores URLs like `/api/media/file/<filename>`. The frontend must pass a **path** (not a full `https://new.indyvetcare.com/...` URL) into `next/image`, or the optimizer returns 400. `getMediaUrl` already rewrites those.
- `curl -I` (HEAD) on `/api/media/file/...` can 404 even when GET returns the image. Use GET to verify.
- Re-uploading the same file in prod can get a suffix (`cat-1.png`). Prefer matching existing Media rows, or replace the relationship in the document that uses it.

## Do not

- Point local `.env` `DATABASE_URI` at Lightsail Postgres (Payload can `pushDevSchema` and hang migrate-on-boot).
- `pg_dump` local over production (clobbers prod users and `payload_migrations`).
- Copy the `users` collection.
- Expect `docker compose down -v` recovery — that deletes local CMS data only, not production.
- Touch WordPress DNS or the apex site.
