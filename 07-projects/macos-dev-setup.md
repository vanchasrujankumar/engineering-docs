# macOS Dev Setup

Automated bootstrapping of a macOS development machine from scratch.

**Repo**: <https://github.com/vanchasrujankumar/macos-dev-setup>

## Purpose

One-command setup to provision a new macOS machine with all developer tools,
languages, and configurations. No manual steps.

## Stack

- **Shell scripts** (`install.sh`) — orchestrates the full setup
- **Homebrew** — package management
- **Config files** — dotfiles, shell config, git config
- **Renovate** — auto-updates for dependencies

## Quick Start

```bash
git clone https://github.com/vanchasrujankumar/macos-dev-setup.git
cd macos-dev-setup
chmod +x install.sh
./install.sh
```

## Key Features

- Installs languages (Node.js, Python, Go, Rust, Java)
- Configures shell (zsh + plugins)
- Sets up git, SSH, and GPG
- Installs CLI tools (jq, yq, fzf, ripgrep, etc.)
- Configures macOS defaults (Dock, Finder, trackpad)
