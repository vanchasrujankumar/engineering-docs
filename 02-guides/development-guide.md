# Development Guide

## Local Setup

```bash
# Clone the project
git clone <project-url>
cd <project>

# Install dependencies
npm install
# or
pip install -r requirements.txt

# Run locally
npm run dev
```

## Workflow

1. Create a branch from `main`
2. Make changes with tests
3. Run linting and type checks
4. Open a PR with description
5. Pass CI checks
6. Get approval from at least one reviewer
7. Squash merge to `main`

## Code Review Expectations

- All PRs need at least one approval
- Address all comments before merging
- Keep PRs under 400 lines when possible
