# Incident Response

## Severity Levels

| Level | Definition                 | Response Time     |
| ----- | -------------------------- | ----------------- |
| P0    | Complete outage, data loss | 15 min            |
| P1    | Major feature degraded     | 30 min            |
| P2    | Partial degradation        | 2 hours           |
| P3    | Minor issue, cosmetic      | Next business day |

## Lifecycle

1. **Detect** — Alert fires or user reports issue
2. **Acknowledge** — Responder claims incident in Slack
3. **Assess** — Determine severity and impact
4. **Mitigate** — Apply fix or workaround
5. **Resolve** — Confirm recovery
6. **Review** — Post-mortem within 5 business days

## Communication

- Use the `#incident` Slack channel for P0/P1
- Post updates every 30 minutes during active incidents
- Do not delete Slack messages during an incident

## Post-Mortem Template

See [templates/runbook-template.md](../templates/runbook-template.md) for the
standard format.
