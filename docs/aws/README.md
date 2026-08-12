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

**Secrets (names only):** `AWS_ACCESS_KEY_ID`, `AWS_SECRET_ACCESS_KEY`, `PAYLOAD_SECRET`, `DATABASE_URI`, `S3_ACCESS_KEY_ID`, `S3_SECRET_ACCESS_KEY`  
(Optional unused until OIDC thumbprints are fixed: `AWS_ROLE_TO_ASSUME`)

**Variables:** `AWS_REGION`, `ECR_REPOSITORY`, `LIGHTSAIL_SERVICE_NAME`, `NEXT_PUBLIC_SERVER_URL`, `S3_BUCKET`, `S3_REGION`

## Common CLI

```bash
aws lightsail get-container-services --service-name indyvet --profile indyvet --region us-east-1
aws lightsail get-container-log --service-name indyvet --container-name app --profile indyvet --region us-east-1
aws lightsail get-container-service-deployments --service-name indyvet --profile indyvet --region us-east-1
aws lightsail get-relational-database --relational-database-name indyvet-db --profile indyvet --region us-east-1
```

## Rollback

Use a previous deployment version from `get-container-service-deployments`, then `create-container-service-deployment` with that version’s containers/public endpoint, or redeploy a known-good image tag from ECR via a new deployment.

## Agent IAM policy JSON

See sibling files in this directory (`indyvet-lightsail-agent-policy.json`, `indyvet-ecr-optional-policy.json`, and the compact IAM bootstrap policy used for `indyvet-coding-agent`).

## Note

Production Postgres requires sslmode=require on DATABASE_URI.

