#!/bin/sh
set -eu

echo "Running Payload migrations..."
npx payload migrate

echo "Starting Next.js server..."
exec node server.js
