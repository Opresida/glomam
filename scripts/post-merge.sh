#!/bin/bash
set -e

# Install/sync Node.js dependencies after any merge that touches package.json
pnpm install --frozen-lockfile

echo "Post-merge setup complete."
