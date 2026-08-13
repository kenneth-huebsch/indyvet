#!/bin/sh
set -eu

# Docker/Lightsail set HOSTNAME to the container id. Next.js standalone
# binds to that value; health checks then fail. Always listen on all interfaces.
export HOSTNAME=0.0.0.0
export PORT=3000

echo "Running Payload migrations..."
npx payload migrate

echo "Starting Next.js server on ${HOSTNAME}:${PORT}..."
exec node server.js
