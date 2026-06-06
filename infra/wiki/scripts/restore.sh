#!/usr/bin/env bash
set -euo pipefail

# ─── Wiki.js Restore Script ─────────────────────────────────────
# Usage: ./scripts/restore.sh ./backups/wiki-backup-YYYYMMDD_HHMMSS

RESTORE_FROM="${1:?Usage: $0 <backup-directory>}"

if [ ! -d "${RESTORE_FROM}" ]; then
  echo "Error: directory not found: ${RESTORE_FROM}"
  exit 1
fi

echo "Restoring from: ${RESTORE_FROM}"
echo "This will OVERWRITE existing data."
read -rp "Continue? (y/N) " confirm
[ "${confirm}" != "y" ] && echo "Aborted." && exit 0

# Load .env if present
[ -f .env ] && source .env

echo "Restoring database..."
gunzip -c "${RESTORE_FROM}/database.sql.gz" \
  | docker compose exec -T db psql -U "${DB_POSTGRES_USER:-wikijs}" "${DB_POSTGRES_DB:-wiki}"

echo "Restoring config..."
docker compose exec -T wiki tar xzf - -C /wiki/config \
  < "${RESTORE_FROM}/config.tar.gz"

echo "Restarting Wiki.js..."
docker compose restart wiki

echo "Restore complete."
