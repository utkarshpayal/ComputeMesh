#!/bin/bash
set -e

echo "Stopping old container if exists..."

docker stop my-app 2>/dev/null || true
docker rm my-app 2>/dev/null || true
docker rmi my-app:latest 2>/dev/null || true

echo "Old container removed"