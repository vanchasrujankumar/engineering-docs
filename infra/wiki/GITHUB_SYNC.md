# GitHub Sync Setup

Wiki.js syncs bidirectionally with your GitHub repo:
- **Non-IT edits** in Wiki.js visual editor → commit to GitHub (`main`)
- **Developer PRs** merged on GitHub → Wiki.js pulls changes

## Step 1: Create a GitHub Personal Access Token

1. Go to https://github.com/settings/tokens
2. Click **Generate new token (classic)**
3. Scopes: `repo` (full control) or `public_repo` (if repo is public)
4. Copy the token

## Step 2: Configure Sync in Wiki.js

1. Start Wiki.js and log in as admin
2. Go to **Administration → Storage → Git**
3. Fill in:

| Field | Value |
|-------|-------|
| **Storage Type** | Git |
| **Git Repository URL** | `https://github.com/vanchasrujankumar/engineering-docs.git` |
| **Branch** | `main` |
| **Auth Type** | Basic HTTP |
| **Username** | `vanchasrujankumar` |
| **Password** | `<your-personal-access-token>` |
| **Local Path** | `/wiki/data/repo` |
| **Sync Direction** | Bidirectional |

4. Click **Save & Run Now**
5. Check the **Activity Log** tab for sync status

## Step 3: Set Up Automatic Sync

In Wiki.js under **Cron Jobs**, create:

- **Pull from GitHub**: every 5 minutes → `*/5 * * * *`
- **Push to GitHub**: every 5 minutes → `*/5 * * * *`

## File Mapping

```
engineering-docs/           ← GitHub repo
├── 01-getting-started/     ← Wiki.js pages
├── 02-guides/
├── 03-architecture/
├── 04-deployment/
├── 05-standards/
├── 06-operations/
├── SUMMARY.md              ← Wiki.js navigation
└── README.md               ← Wiki.js homepage
```

> **Note**: The `infra/` directory is excluded from Wiki.js. It lives only on GitHub.
