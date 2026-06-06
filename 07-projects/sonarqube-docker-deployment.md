# SonarQube Docker Deployment

Production-grade SonarQube Community Build deployment for continuous code
quality inspection.

**Repo**: <https://github.com/vanchasrujankumar/sonarqube-docker-deployment>

## Purpose

Self-hosted SonarQube instance to enforce code quality gates across all
projects. Scans for bugs, vulnerabilities, code smells, and technical debt.

## Stack

| Component                             | Role                            |
| ------------------------------------- | ------------------------------- |
| **SonarQube Community Build v26.5.0** | Code quality platform           |
| **PostgreSQL 17 Alpine**              | Database backend                |
| **NGINX**                             | Reverse proxy with SSL          |
| **Docker Compose**                    | Multi-environment orchestration |

## Environments

```text
dev:  docker compose -f docker-compose.dev.yml up -d
prod: docker compose -f docker-compose.prod.yml up -d
```

## Quick Start

```bash
git clone https://github.com/vanchasrujankumar/sonarqube-docker-deployment.git
cd sonarqube-docker-deployment
cp .env.example .env
# Edit .env with admin password and db credentials
docker compose up -d
# Open http://localhost:9000
```

## Key Features

- **Multi-env** — separate compose files for dev and production
- **Plugins** — extensible via `plugins/` directory
- **Custom Dockerfile** — for pre-installed plugins & configs
- **NGINX** — reverse proxy with optional SSL
- **Renovate** — auto dependency updates
