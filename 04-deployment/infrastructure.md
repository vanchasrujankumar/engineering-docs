# Infrastructure

## Environments

| Environment | URL | Region | CI/CD |
|-------------|-----|--------|-------|
| Development | dev.example.com | us-east-1 | Auto on PR |
| Staging | staging.example.com | us-east-1 | Auto on merge to main |
| Production | example.com | us-east-1, eu-west-1 | Manual approval |

## Services

- **Compute**: ECS Fargate / Kubernetes
- **Database**: PostgreSQL (RDS)
- **Cache**: Redis (ElastiCache)
- **CDN**: CloudFront
- **DNS**: Route53

## Access

- VPN required for staging/production
- IAM roles for service-to-service auth
- Secrets in AWS Secrets Manager (not env files)
