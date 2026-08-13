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

1. Push to `main`.
2. `.github/workflows/deploy.yml` runs `check` (lint/typecheck), then builds/pushes ECR, then `create-container-service-deployment`.
3. Container entrypoint runs `npx payload migrate` then `node server.js`.

`NEXT_PUBLIC_SERVER_URL` is baked at **image build** time from the GitHub variable (must stay `https://new.indyvetcare.com` unless intentionally changing host and rebuilding).

### GitHub config (names only)

Secrets: `AWS_ACCESS_KEY_ID`, `AWS_SECRET_ACCESS_KEY`, `PAYLOAD_SECRET`, `DATABASE_URI`, `S3_ACCESS_KEY_ID`, `S3_SECRET_ACCESS_KEY`  
Variables: `AWS_REGION`, `ECR_REPOSITORY`, `LIGHTSAIL_SERVICE_NAME`, `NEXT_PUBLIC_SERVER_URL`, `S3_BUCKET`, `S3_REGION`

Never print secret values. Rotate by updating the GitHub secret and redeploying (new push or manual deployment with the same image + new env).

## Day-2 Ops

```bash
aws lightsail get-container-services --service-name indyvet --profile indyvet --region us-east-1
aws lightsail get-container-log --service-name indyvet --container-name app --profile indyvet --region us-east-1
aws lightsail get-container-service-deployments --service-name indyvet --profile indyvet --region us-east-1
aws lightsail get-relational-database --relational-database-name indyvet-db --profile indyvet --region us-east-1
```

- **Rollback:** create a new deployment from a prior version or a known ECR tag (`:sha` or `:latest`).
- **Scale/power:** `update-container-service` (`small` × 1 is the baseline). Prefer bumping power before scale if OOM.
- **Media:** local disk when `S3_BUCKET` unset; S3 when set. Confirm uploads with `aws s3 ls s3://indyvet-media-382125965554/ --profile indyvet`.
- **Migrate failures:** check container logs for Payload migrate errors; fix-forward with a new migration in git, then redeploy. Do not destroy the Lightsail DB without explicit approval.
- **Postgres SSL:** set `DATABASE_SSL=true` and do **not** put `sslmode=require` in `DATABASE_URI`. Modern `node-pg` treats URI `sslmode=require` like `verify-full`, which fails on Lightsail/RDS CA chains. The app enables `pool.ssl.rejectUnauthorized=false` when `DATABASE_SSL=true` or the host looks like RDS.

## Admin blank screen

Unauthenticated `/admin` (login / create-first-user) renders a white page on Next.js 16.2.x + Payload 3.87.1 (Payload #17545): HTML 200, empty Suspense body, RSC payload present, no console errors. Pin `next` to `15.4.11` (inside Payload’s peer range). Keep `patch-package` patches (`patches/payload+3.87.1.patch`, `patches/@payloadcms+next+3.87.1.patch`) for unauthenticated client config. Docker `npm ci` must copy `patches/` before install so postinstall applies them. Do not bump Next to 16 until Payload ships a verified Next 16 admin fix.

## Safety Rails

- Never change apex/`www.indyvetcare.com` DNS or the live WordPress instance (`WordPress-5`).
- Only add/update `new.*` and certificate validation records in the Lightsail DNS zone.
- Never commit, log, or paste `PAYLOAD_SECRET`, `DATABASE_URI`, or S3 keys.
- Never run destructive DB volume deletes or Lightsail DB deletion without explicit user approval.
