#!/bin/sh
set -eu

# Docker/Lightsail set HOSTNAME to the container id. Next.js standalone
# binds to that value; health checks then fail. Always listen on all interfaces.
export HOSTNAME=0.0.0.0
export PORT=3000

echo "Running Payload migrations..."
# A batch=-1 "dev" row makes Payload prompt for TTY confirmation and hang
# headless Lightsail. Answer yes: already-applied files are skipped.
printf 'y\n' | npx payload migrate

echo "Starting Next.js server on ${HOSTNAME}:${PORT}..."
exec node server.js
