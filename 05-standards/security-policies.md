# Security Policies

## Credentials

- Never commit secrets to repositories
- Use environment variables or secrets managers
- Rotate keys every 90 days

## Access Control

- Principle of least privilege
- MFA required for all production access
- Audit access quarterly

## Dependencies

- Scan dependencies with Dependabot (enabled on all repos)
- No known critical vulnerabilities in production
- Pin dependency versions in lockfiles

## Incident Response

- Report security incidents immediately to #security Slack channel
- Follow the Incident Response runbook in
  [Operations](../06-operations/incident-response.md)
