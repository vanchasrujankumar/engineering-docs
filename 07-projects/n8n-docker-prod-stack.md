# n8n Docker Production Stack

Self-hosted production-grade n8n workflow automation platform.

**Repo**: https://github.com/vanchasrujankumar/n8n-docker-prod-stack

## Purpose

Deploy and operate n8n at scale with monitoring, SSL, backups, and CI/CD.
Suitable for team-wide workflow automation.

## Stack

| Component                | Role                                   |
| ------------------------ | -------------------------------------- |
| **n8n**                  | Workflow automation engine             |
| **PostgreSQL 16**        | Database backend                       |
| **Traefik v3.1**         | Reverse proxy + Let's Encrypt auto-SSL |
| **Prometheus + Grafana** | Monitoring & dashboards                |
| **MinIO**                | S3-compatible file storage             |
| **SMTP**                 | Email integration                      |

## Architecture

```
Internet → Traefik (SSL) → n8n → PostgreSQL
                         → Prometheus → Grafana
```

## Quick Start

```bash
git clone https://github.com/vanchasrujankumar/n8n-docker-prod-stack.git
cd n8n-docker-prod-stack
cp .env.example .env
# Edit .env with your domain and secrets
docker compose up -d
```

## Key Features

- **Auto SSL** — Traefik + Let's Encrypt (production) or self-signed (dev)
- **Monitoring** — Prometheus metrics + Grafana dashboards
- **CI/CD** — GitHub Actions pipeline with tests
- **Renovate** — auto dependency updates
- **Mend/WhiteSource** — vulnerability scanning
