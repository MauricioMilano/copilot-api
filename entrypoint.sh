#!/bin/sh
if [ "$1" = "--auth" ]; then
  # Run auth command
  exec bun run dist/main.js auth
else
  # Default command
  # Refresh VSCode version first (best-effort)
  if [ -f ./scripts/refresh-vscode-version.ts ]; then
    bun ./scripts/refresh-vscode-version.ts || echo "Warning: refresh script failed"
  fi

  exec bun run dist/main.js start -g "$GH_TOKEN" "$@" --verbose
fi

