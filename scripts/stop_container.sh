#!/bin/bash
# Stop and remove existing container if running
docker stop my-app 2>/dev/null || true
docker rm my-app 2>/dev/null || true
docker rmi my-app:latest 2>/dev/null || true