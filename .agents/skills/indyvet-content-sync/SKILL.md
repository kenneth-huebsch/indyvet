---
name: indyvet-content-sync
description: Explains which IndyVet local work deploys to new.indyvetcare.com versus CMS copy/media that stays local. Use when the user asks what carries over from dev, how to migrate content or media to production, copy local admin data, or whether to re-enter copy by hand.
---

# IndyVet content vs code (local → prod)

Human cheat sheet: `docs/content-environments.md`. Read that with the user-facing question. This skill is the agent procedure.

Local and production are separate Payload sites. Git deploy ships **code and schema**. It does not ship admin documents, `media/` files, or users.

## Classify the request

| User work | Carries over? | Action |
| --- | --- | --- |
| Code, styles, routes, tests | Yes, on `main` deploy | Implement and push (unless they asked not to) |
| Payload schema + migration | Yes (empty fields on prod) | Migrate locally, commit migration + types |
| Copy/images saved in local `/admin` | No | Prod admin by hand, or Local API copy if they asked |
| Local `media/` uploads | No (gitignored) | Re-upload in prod admin, or Payload `filePath` create so S3 gets the object |
| Admin users | Never | Create on `https://new.indyvetcare.com/admin` |

If they only asked “will this carry over?”, answer from the table. Do not copy production data unless they explicitly want local content on the live site.

## Prefer by-hand when small

For a few fields or a few images, tell them to edit **production** `/admin`. That is safer than a bulk import (no duplicate slugs, no `cat-1.png` suffix, no risk of pointing tools at prod Postgres incorrectly).

Do not recommend re-uploading media as a fix for **broken display** if S3 already has the objects and Media rows exist — that is usually `next/image` rejecting absolute Payload URLs. Check `getMediaUrl` and GET `/api/media/file/<filename>` (not HEAD).

## Bulk copy (only when asked)

Use Payload Local API. Do **not** `pg_dump`, `aws s3 sync` without Media documents, or copy `users`.

Existing helper: `scripts/copy-local-content-to-prod.ts` (dump local Compose → import prod). If you run it:

1. Confirm Compose local DB is up and `media/` files exist for every Media filename.
2. Dump against **local** URI only (`postgres://vetic:vetic-dev@localhost:5432/vetic`), `S3_BUCKET` unset.
3. Import with `NODE_ENV=production` and `PAYLOAD_MIGRATING=true`. Never import with `NODE_ENV` unset (Payload `pushDevSchema` / `batch=-1` on prod).
4. Load prod `DATABASE_URI` / S3 keys from the environment without printing them. Do not leave `S3_ACCESS_KEY_ID=placeholder` in the shell (importmap generation does that).
5. Skip users. Remap media and relationship IDs. Unique slug conflicts: stop and ask; do not blindly duplicate.
6. Verify with GET on `/api/media/file/<prod filename>` and `aws s3 ls s3://indyvet-media-382125965554/ --profile indyvet`. Confirm homepage HTML uses paths that `next/image` allows.

Do not dump `get-container-service-deployments` JSON (contains secrets).

## Safety

- Never point local `npm run dev` or `payload migrate` at Lightsail Postgres.
- Never destroy Lightsail DB or Compose `-v` without explicit approval.
- Never touch WordPress apex/`www` DNS.
- Keep `.env` secrets out of commits, logs, and chat.
