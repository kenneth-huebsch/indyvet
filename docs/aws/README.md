# IndyVet AWS (Lightsail) runbook

Region: `us-east-1`  
Account: `382125965554`  
CLI profile for agents: `indyvet`

## Resources

| Resource | Name |
| --- | --- |
| Lightsail container service | `indyvet` |
| Default domain | `https://indyvet.7vxrx6m61pzn8.us-east-1.cs.amazonlightsail.com/` |
| Custom domain | `https://new.indyvetcare.com` |
| Certificate | `indyvet-new` (domain `new.indyvetcare.com`) |
| Lightsail PostgreSQL | `indyvet-db` (blueprint `postgres_17`, bundle `micro_2_0`) |
| ECR repository | `indyvet` → `382125965554.dkr.ecr.us-east-1.amazonaws.com/indyvet` |
| S3 media bucket | `indyvet-media-382125965554` |
| S3 app IAM user | `indyvet-s3-media` |
| CI deploy IAM user | `indyvet-github-deploy` (access keys in GitHub secrets) |
| CI OIDC role (optional later) | `indyvet-github-deploy` role + GitHub OIDC provider (thumbprint must be fixed before use) |
| DNS zone | Lightsail domain `indyvetcare.com` |

## Do not touch

- Apex / `www.indyvetcare.com` A and CNAME records (live WordPress on `WordPress-5`)
- WordPress instance `WordPress-5` and static IP `StaticIp-1`
- MX / SPF / SES DKIM records on `indyvetcare.com`

## GitHub Actions configuration

Workflow: `.github/workflows/deploy.yml` (push to `main`).

Doc-only pushes (`docs/`, `.agents/`, `AGENTS.md`, `*.md`) do not run Deploy. To skip Lightsail when other files change, put `[skip deploy]` or `[no-deploy]` in the commit message. GitHub labels cannot gate a direct push to `main`. Do not use `[skip ci]` unless you also want the CI workflow skipped.

**Secrets (names only):** `AWS_ACCESS_KEY_ID`, `AWS_SECRET_ACCESS_KEY`, `PAYLOAD_SECRET`, `DATABASE_URI`, `S3_ACCESS_KEY_ID`, `S3_SECRET_ACCESS_KEY`  
(Optional unused until OIDC thumbprints are fixed: `AWS_ROLE_TO_ASSUME`)

**Variables:** `AWS_REGION`, `ECR_REPOSITORY`, `LIGHTSAIL_SERVICE_NAME`, `NEXT_PUBLIC_SERVER_URL`, `S3_BUCKET`, `S3_REGION`

## Common CLI

```bash
aws lightsail get-container-services --service-name indyvet --profile indyvet --region us-east-1
aws lightsail get-container-log --service-name indyvet --container-name app --profile indyvet --region us-east-1
aws lightsail get-container-service-deployments --service-name indyvet --profile indyvet --region us-east-1 --query "deployments[].{version:version,state:state,image:containers.app.image}"
aws lightsail get-relational-database --relational-database-name indyvet-db --profile indyvet --region us-east-1
```

## Rollback

Use a previous deployment version from `get-container-service-deployments`, then `create-container-service-deployment` with that version’s containers/public endpoint, or redeploy a known-good image tag from ECR via a new deployment.

## Agent IAM policy JSON

See sibling files in this directory (`indyvet-lightsail-agent-policy.json`, `indyvet-ecr-optional-policy.json`, and the compact IAM bootstrap policy used for `indyvet-coding-agent`).

## Note

Production Postgres requires TLS. Set runtime env `DATABASE_SSL=true` and keep `DATABASE_URI` **without** `sslmode=require` (modern node-pg treats URI `sslmode=require` like verify-full and fails on Lightsail/RDS CA chains). The app enables `pool.ssl.rejectUnauthorized=false` when `DATABASE_SSL=true`.

Do not dump `get-container-service-deployments` JSON (it includes secrets). Query `state` / `version` / image only. A failed new deploy leaves the service RUNNING on the previous ACTIVE image — CI waits for `deployments[0]` ACTIVE with the pushed tag.

`/admin` HTTP 200 can still be a white page. Stay on Next `15.4.11` (Payload #17545). Keep S3 in the committed admin `importMap.js` and pass `S3_BUCKET` / `S3_REGION` as Docker build-args. Container boot must bind `HOSTNAME=0.0.0.0` and not hang on Payload’s migrate TTY prompt (`payload_migrations` batch `-1`). Docker builder uses `NODE_ENV=production` so `next build` cannot `pushDevSchema` into prod. Full troubleshooting: `.agents/skills/indyvet-aws/SKILL.md`.

