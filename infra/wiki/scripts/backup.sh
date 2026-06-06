#!/usr/bin/env bash
set -euo pipefail

# ─── Wiki.js Backup Script ──────────────────────────────────────
# Creates a timestamped DB dump + config backup
# Usage: ./scripts/backup.sh [output-dir]
# Default output: ./backups/

BACKUP_DIR="${1:-./backups}"
TIMESTAMP=$(date +%Y%m%d_%H%M%S)
BACKUP_PATH="${BACKUP_DIR}/wiki-backup-${TIMESTAMP}"

mkdir -p "${BACKUP_PATH}"

# Load .env if present
[ -f .env ] && source .env

echo "Backing up database..."
docker compose exec -T db pg_dump -U "${DB_POSTGRES_USER:-wikijs}" "${DB_POSTGRES_DB:-wiki}" \
  | gzip > "${BACKUP_PATH}/database.sql.gz"

echo "Backing up config..."
docker compose exec -T wiki tar czf - -C /wiki/config . \
  > "${BACKUP_PATH}/config.tar.gz"

echo "Backup complete: ${BACKUP_PATH}"
echo "Total size: $(du -sh "${BACKUP_PATH}" | cut -f1)"
