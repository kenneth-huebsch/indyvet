---
name: indyvet-aws
description: Use when deploying, operating, or troubleshooting IndyVet on AWS Lightsail/ECR/S3, production URL new.indyvetcare.com, GitHub Actions deploy, container logs, rollbacks, or prod database/media.
---

# IndyVet AWS Operations

## When To Use

- Production deploys, Lightsail container service, ECR images, S3 media, Lightsail PostgreSQL
- DNS/TLS for `new.indyvetcare.com`
- GitHub Actions deploy workflow or AWS secrets/variables
- Prod troubleshooting (logs, failed deployments, migrate-on-boot)

For local Postgres/Compose/dev server work, use `indyvet-operations` instead. Source of truth for resource names and CLI snippets: `docs/aws/README.md`.

## Inventory (us-east-1)

| Kind | Name |
| --- | --- |
| Container service | `indyvet` |
| Public site | `https://new.indyvetcare.com` |
| Default Lightsail URL | `https://indyvet.7vxrx6m61pzn8.us-east-1.cs.amazonlightsail.com/` |
| Certificate | `indyvet-new` |
| Database | `indyvet-db` (Postgres 17) |
| ECR | `indyvet` (`382125965554.dkr.ecr.us-east-1.amazonaws.com/indyvet`) |
| Media bucket | `indyvet-media-382125965554` |
| CI role | Prefer IAM user `indyvet-github-deploy` access keys today; OIDC role `indyvet-github-deploy` exists but needs real GitHub thumbprints before use |
| Local AWS profile | `indyvet` |

## Deploy Path

1. Push to `main` (unless skipped — see below).
2. `.github/workflows/deploy.yml` runs `check` (lint/typecheck), then builds/pushes ECR, then `create-container-service-deployment`.
3. Container entrypoint sets `HOSTNAME=0.0.0.0`, runs `npx payload migrate` (answers the TTY prompt), then `node server.js`.

### Skip a Lightsail deploy

Deploy is **not** gated by a GitHub label: this repo deploys on `push` to `main`, and labels only exist on PRs/issues.

Skip Lightsail when:

- The push only touches `docs/`, `.agents/`, `AGENTS.md`, or `*.md` (`paths-ignore` — the Deploy workflow does not run).
- The commit message contains `[skip deploy]` or `[no-deploy]` (the `deploy` job is skipped; `check` still runs if the workflow runs). Use this when the commit also changes `.github/workflows/` or other non-doc files.

A docs-only commit that also edits `deploy.yml` still starts the workflow (the yaml is not ignored). Put `[skip deploy]` in that message.

Do not use GitHub’s `[skip ci]` unless you also want `ci.yml` skipped.

`NEXT_PUBLIC_SERVER_URL` is baked at **image build** time from the GitHub variable (must stay `https://new.indyvetcare.com` unless intentionally changing host and rebuilding). `S3_BUCKET` / `S3_REGION` are also Docker build-args so the S3 plugin is in the Payload config when Next bundles the admin import map.

### Lightsail wait is not “service RUNNING”

A failed new deployment leaves the service `RUNNING` with the **previous** `currentDeployment` still `ACTIVE`. CI must wait until `deployments[0]` is `ACTIVE` **and** its image equals the image just pushed. Do not treat `containerServices[0].state=RUNNING` as success.

`get-container-service-deployments` returns container env, including `DATABASE_URI` and keys. Never dump that JSON. Query `state`, `version`, and `containers.app.image` only.

### GitHub config (names only)

Secrets: `AWS_ACCESS_KEY_ID`, `AWS_SECRET_ACCESS_KEY`, `PAYLOAD_SECRET`, `DATABASE_URI`, `S3_ACCESS_KEY_ID`, `S3_SECRET_ACCESS_KEY`  
Variables: `AWS_REGION`, `ECR_REPOSITORY`, `LIGHTSAIL_SERVICE_NAME`, `NEXT_PUBLIC_SERVER_URL`, `S3_BUCKET`, `S3_REGION`

Never print secret values. Rotate by updating the GitHub secret and redeploying (new push or manual deployment with the same image + new env).

## Day-2 Ops

```bash
aws lightsail get-container-services --service-name indyvet --profile indyvet --region us-east-1
aws lightsail get-container-log --service-name indyvet --container-name app --profile indyvet --region us-east-1
aws lightsail get-container-service-deployments --service-name indyvet --profile indyvet --region us-east-1 --query "deployments[].{version:version,state:state,image:containers.app.image}"
aws lightsail get-relational-database --relational-database-name indyvet-db --profile indyvet --region us-east-1
```

- **Rollback:** create a new deployment from a prior version or a known ECR tag (`:sha` or `:latest`).
- **Scale/power:** `update-container-service` (`small` × 1 is the baseline). Prefer bumping power before scale if OOM.
- **Media:** local disk when `S3_BUCKET` unset; S3 when set. Confirm uploads with `aws s3 ls s3://indyvet-media-382125965554/ --profile indyvet`. Local `/admin` uploads do not appear in prod until copied or re-uploaded; see `docs/content-environments.md`.
- **Migrate failures:** check container logs. A hang at “dynamically pushed changes to your database” means `payload_migrations` has `name=dev` / `batch=-1` (Payload `pushDevSchema`). That happens if anything connects to this DB with `NODE_ENV` not `production` (including a Docker builder). The entrypoint answers `y` so already-applied files are skipped; do not drop the Lightsail DB. Docker builder **must** set `NODE_ENV=production` so `next build` cannot push a dev schema into prod.
- **Health checks fail, image never goes ACTIVE:** Next standalone binds to `HOSTNAME` (Lightsail sets this to the container id). Entrypoint must export `HOSTNAME=0.0.0.0` and `PORT=3000`. Confirm with `get-container-log` that migrate finished and `Ready` appears.
- **Postgres SSL:** set `DATABASE_SSL=true` and do **not** put `sslmode=require` in `DATABASE_URI`. Modern `node-pg` treats URI `sslmode=require` like `verify-full`, which fails on Lightsail/RDS CA chains. The app enables `pool.ssl.rejectUnauthorized=false` when `DATABASE_SSL=true` or the host looks like RDS.

## Admin blank screen

HTTP 200 on `/admin` is not proof it works. A white page with no console errors is the usual failure: empty Suspense (`<!--$--><!--/$-->`), RSC payload still in the HTML.

Causes we have hit, in order:

1. **Next.js 16.2.x + Payload 3.87.1** (Payload #17545). Pin `next` to `15.4.11`. Do not bump Next to 16 until Payload ships a verified admin fix. Keep `patch-package` patches (`patches/payload+3.87.1.patch`, `patches/@payloadcms+next+3.87.1.patch`). Docker `npm ci` must `COPY patches` before install.
2. **Missing S3 client in the admin import map.** Container log: `getFromImportMap: PayloadComponent not found in importMap` for `@payloadcms/storage-s3/client#S3ClientUploadHandler`. Frontend `/` can still work. Fix: regenerate and commit `src/app/(payload)/admin/importMap.js` with `S3_BUCKET` set, and pass `S3_BUCKET` / `S3_REGION` as image build-args.
3. **New Lightsail deployment never became ACTIVE** (migrate TTY hang or bind address). The public URL still serves the previous image. Check `deployments[0].state` and image tag, not only the site.

Verify with a real browser (or Playwright waiting for `input`/`form`), not curl status. Hard-refresh after a successful ACTIVE deploy.

## Safety Rails

- Never change apex/`www.indyvetcare.com` DNS or the live WordPress instance (`WordPress-5`).
- Only add/update `new.*` and certificate validation records in the Lightsail DNS zone.
- Never commit, log, or paste `PAYLOAD_SECRET`, `DATABASE_URI`, or S3 keys.
- Never run destructive DB volume deletes or Lightsail DB deletion without explicit user approval.
