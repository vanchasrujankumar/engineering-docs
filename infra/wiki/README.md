# Wiki.js Self-Hosted Documentation

Production-grade Wiki.js setup with PostgreSQL, HTTPS, and GitHub sync.

## Quick Start

```bash
# 1. Clone (on your server)
git clone https://github.com/vanchasrujankumar/engineering-docs.git
cd engineering-docs/infra/wiki

# 2. Configure
cp .env.example .env
# Edit .env with your domain, passwords, and GitHub token

# 3. Start
docker compose up -d

# 4. Open http://localhost:3000 and complete setup
```

## Production Deploy

```bash
# With HTTPS (requires domain pointing to server)
docker compose -f docker-compose.yml -f nginx/docker-compose.nginx.yml up -d
./scripts/setup-ssl.sh
```

## Architecture

```
infra/wiki/
├── docker-compose.yml          # Wiki.js + PostgreSQL
├── docker-compose.nginx.yml    # NGINX + Certbot (optional, for HTTPS)
├── .env.example                # All configuration
├── config/                     # Wiki.js runtime config (auto-created)
├── data/                       # Wiki.js data (auto-created)
├── scripts/
│   ├── backup.sh               # Database + config dump
│   ├── restore.sh              # Restore from backup
│   └── setup-ssl.sh            # Initial Let's Encrypt setup
├── nginx/
│   └── wiki.conf               # Reverse proxy + WebSocket support
├── backups/                    # Backup output directory
└── GITHUB_SYNC.md              # GitHub bidirectional sync guide
```

## Backup & Restore

```bash
# Backup
./scripts/backup.sh

# Restore from a backup
./scripts/restore.sh ./backups/wiki-backup-20260606_120000
```

## Requirements

- Docker & Docker Compose
- 2 GB RAM, 10 GB disk (minimum)
- Domain pointing to the server (for HTTPS)

## Sync with GitHub

Wiki.js syncs content bidirectionally with the GitHub repo.
See [GITHUB_SYNC.md](GITHUB_SYNC.md) for setup.
