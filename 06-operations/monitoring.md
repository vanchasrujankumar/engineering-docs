# Monitoring

## Dashboards

| Dashboard        | Tool              | Covers                                |
| ---------------- | ----------------- | ------------------------------------- |
| System Health    | Datadog / Grafana | CPU, memory, request rate, error rate |
| Business Metrics | Metabase          | Active users, transactions, revenue   |
| Cost             | AWS Cost Explorer | per-service spend                     |

## Alerts

| Alert               | Threshold | Channel           |
| ------------------- | --------- | ----------------- |
| 5xx error rate > 1% | Critical  | PagerDuty + Slack |
| Latency p99 > 500ms | Warning   | Slack             |
| Disk usage > 85%    | Critical  | PagerDuty         |

## SLIs / SLOs

| Metric            | Target  | Window  |
| ----------------- | ------- | ------- |
| Uptime            | 99.9%   | 30 days |
| API latency (p95) | < 300ms | 30 days |
| Error rate        | < 0.5%  | 30 days |
