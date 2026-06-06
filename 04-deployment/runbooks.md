# Deployment Runbooks

## Standard Deployment

```bash
# 1. Ensure main is green on CI
# 2. Tag release
git tag v1.2.3
git push origin v1.2.3

# 3. CI builds and deploys to staging
# 4. Run smoke tests on staging
# 5. Approve production deploy in GitHub Actions
```

## Rollback

```bash
# Revert to previous tag
git revert HEAD
git push origin main
# CI will auto-deploy the revert
```

## Emergency Deploy

For hotfixes, create a branch from the last known good tag, cherry-pick fixes,
and open a PR targeting `main` directly.
