# Copilot Repo

GitHub Copilot instructions and development guardrails enforced across all
projects.

**Repo**: https://github.com/vanchasrujankumar/copilot-repo

## Purpose

Centralized AI coding instructions that define how Copilot behaves across
repositories. Enforces architecture patterns, test standards, and security
policies at the IDE level.

## What It Contains

| File                       | Purpose                                   |
| -------------------------- | ----------------------------------------- |
| `.copilot-instructions.md` | Global instructions for Copilot behavior  |
| `.copilot-config.json`     | Copilot configuration settings            |
| `.copilot-code-review.md`  | Code review standards enforced by Copilot |
| `.architect-guidelines.md` | Architecture decision guidelines          |
| `.eslintrc.json`           | ESLint configuration                      |
| `.prettierrc.json`         | Code formatting rules                     |
| `.commitlintrc.json`       | Conventional commit enforcement           |
| `.pre-commit-config.yaml`  | Pre-commit hooks                          |
| `.mcp-config.json`         | MCP server configuration                  |
| `.husky/`                  | Git hooks                                 |

## Key Standards

- **TDD required**: Red-Green-Refactor cycle, 100% coverage
- **Security**: no secrets in code, env-based config
- **CI must pass**: lint, typecheck, test before merge
- **Conventional commits**: `feat:`, `fix:`, `docs:`, etc.
