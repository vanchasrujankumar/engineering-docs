# Data Medallion

Production-grade real-time ELT pipeline implementing the
medallion architecture (Bronze → Silver → Gold).

**Repo**: https://github.com/vanchasrujankumar/data-medallion

## Purpose

Ingest streaming data, land it raw in Bronze, clean and
transform through Silver, and serve analytics-ready data
from Gold — all running locally via Docker Compose.

## Stack

| Component | Role |
|-----------|------|
| **Redpanda** | Kafka-compatible streaming ingestion |
| **DuckDB + Iceberg** | Storage & SQL transformations |
| **dbt** | Data transformations with version control |
| **Polars** | Complex analytics (Python) |
| **FastAPI** | REST API for serving Gold-layer data |
| **Airflow** | Orchestration & scheduling |
| **MinIO** | S3-compatible object storage |
| **PostgreSQL** | Metadata & Airflow backend |

## Architecture

```
Source → Redpanda → Bronze (raw) → dbt → Silver (cleaned) → dbt → Gold (aggregated) → FastAPI
```

## Quick Start

```bash
git clone https://github.com/vanchasrujankumar/data-medallion.git
cd data-medallion
cp .env.example .env
docker compose up -d
```
