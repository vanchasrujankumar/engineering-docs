---
title: ADR-001 - Documentation Platform Selection
description: Choosing GitBook with GitHub as the documentation platform
status: accepted
deciders: [engineering-team]
date: 2026-06-06
---

# ADR-001: Documentation Platform Selection

## Context

The team needed a centralized documentation platform that:
- Allows non-technical contributors (product, operations) to edit easily
- Integrates with existing GitHub workflows
- Supports versioning and review processes
- Is scalable across multiple teams

## Decision

Use GitBook with GitHub as the Git backend.

## Consequences

### Positive

- Non-technical team members can contribute via GitBook's visual editor
- All content is backed by a GitHub repo — no vendor lock-in
- PR-based review workflow for technical changes
- Built-in search, navigation, and site hosting

### Negative

- GitBook paid tier required for private repos (within free tier limits for public)
- Two interfaces to maintain (GitHub + GitBook) can occasionally cause sync confusion

## Alternatives Considered

| Alternative | Pros | Cons |
|-------------|------|------|
| Docusaurus | Fully free, customizable | No visual editor for non-IT; requires build step |
| Notion | Great UX, easy editing | No version control, no git integration |
| Confluence | Enterprise SSO, WYSIWYG | Slow, expensive, poor developer experience |
