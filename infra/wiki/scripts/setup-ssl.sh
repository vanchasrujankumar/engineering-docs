#!/usr/bin/env bash
set -euo pipefail

# ─── Initial SSL Certificate Setup (run once) ───────────────────
# Usage: ./scripts/setup-ssl.sh
# Requires: .env with DOMAIN and LETSENCRYPT_EMAIL

[ -f .env ] && source .env

DOMAIN="${WIKI_DOMAIN:?Set WIKI_DOMAIN in .env}"
EMAIL="${LETSENCRYPT_EMAIL:?Set LETSENCRYPT_EMAIL in .env}"

echo "Requesting SSL certificate for ${DOMAIN}..."

docker compose -f docker-compose.yml -f nginx/docker-compose.nginx.yml run --rm certbot \
  certonly --webroot \
  --webroot-path /var/www/certbot \
  --email "${EMAIL}" \
  --agree-tos \
  --no-eff-email \
  -d "${DOMAIN}"

echo ""
echo "Certificate obtained. Restarting nginx..."
docker compose -f docker-compose.yml -f nginx/docker-compose.nginx.yml restart nginx

echo "SSL setup complete for ${DOMAIN}"
