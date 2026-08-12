#!/usr/bin/env bash
set -Eeuo pipefail

# Secure local publisher for cyber-zhouyi-official.
# It relies on GitHub CLI's existing credential store or SSH, never a token
# embedded in this file, a remote URL, shell history, or CI logs.

REMOTE_NAME="${1:-origin}"
BRANCH_NAME="${2:-main}"
COMMIT_MESSAGE="${COMMIT_MESSAGE:-chore: publish Cyber Zhouyi}"

if ! command -v gh >/dev/null 2>&1; then
  echo "GitHub CLI (gh) is required. Install it, then run: gh auth login" >&2
  exit 1
fi

if ! git rev-parse --is-inside-work-tree >/dev/null 2>&1; then
  echo "Run this script from inside the project repository." >&2
  exit 1
fi

if ! gh auth status >/dev/null 2>&1; then
  echo "No active GitHub CLI session found. Run: gh auth login" >&2
  exit 1
fi

if ! git remote get-url "$REMOTE_NAME" >/dev/null 2>&1; then
  echo "Git remote '$REMOTE_NAME' is missing. Add it with an SSH URL, for example:" >&2
  echo "  git remote add $REMOTE_NAME git@github.com:OWNER/REPOSITORY.git" >&2
  exit 1
fi

echo "Checking the production build..."
pnpm check
pnpm build

git add -A
if git diff --cached --quiet; then
  echo "No new changes to commit."
else
  git commit -m "$COMMIT_MESSAGE"
fi

echo "Pushing '$BRANCH_NAME' through the configured Git credential/SSH helper..."
git push "$REMOTE_NAME" "$BRANCH_NAME"
echo "Done. GitHub Actions will build and publish GitHub Pages without a repository token."
