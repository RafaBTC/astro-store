#!/bin/sh
# Approve all builds for pnpm
pnpm install "$@" 2>&1 | tee /tmp/install.log

# Check for ERR_PNPM_IGNORED_BUILDS
if grep -q "ERR_PNPM_IGNORED_BUILDS" /tmp/install.log; then
  echo "Found ignored builds, retrying with build scripts enabled..."
  # Use environment variable to bypass the check
  PNPM_IGNORE_SCRIPTS=false pnpm install "$@"
else
  exit 0
fi
