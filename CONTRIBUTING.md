# Contributing to Engineering Docs

Anyone can contribute — no git experience required.

## Quick Guide (Product / Non-Technical)

1. **Open GitBook** (link in README)
2. **Find the page** you want to edit
3. **Click "Edit"** — the visual editor opens
4. **Make your changes** — formatting toolbar works like Word/Google Docs
5. **Click "Save"** — GitBook automatically creates a pull request on GitHub
6. **Tag an engineer** for review if needed

That's it. No terminal, no Markdown knowledge required.

## Quick Guide (Technical)

### Fork & Pull Request

1. Fork the repository
2. Create a branch: `git checkout -b docs/my-change`
3. Make edits in Markdown
4. Commit: `git commit -m "docs: add deployment guide"`
5. Push: `git push origin docs/my-change`
6. Open a Pull Request

### Branch Naming

| Branch pattern         | Purpose                       |
| ---------------------- | ----------------------------- |
| `docs/describe-change` | New docs or major updates     |
| `fix/describe-fix`     | Typo, broken link, formatting |
| `adr/topic`            | Architecture Decision Record  |

### PR Guidelines

- Keep PRs focused — one topic per PR
- Use the PR template
- Preview your changes locally or in the PR diff

## Review Process

1. PR is created (automatically by GitBook or manually)
2. CI runs linting + link checks
3. At least one maintainer reviews
4. PR is merged → GitBook auto-deploys

## Formatting Tips (Markdown)

```markdown
# Heading 1 (page title)

## Heading 2 (section)

### Heading 3 (subsection)

**Bold text** for emphasis `code` for commands or file names [link text](url)
for hyperlinks
```

## Need Help?

Open a GitHub Issue or ping `#engineering-docs` Slack channel.
