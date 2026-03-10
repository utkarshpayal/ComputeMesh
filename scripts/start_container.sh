#!/bin/bash
set -e

cd /home/ubuntu/app

echo "Building docker image..."
docker build -t my-app:latest .

echo "Starting container..."

docker run -d \
  --name my-app \
  --restart unless-stopped \
  -p 5000:5000 \
  --env-file /home/ubuntu/app/.env \
  my-app:latest

echo "Container started successfully"

docker ps