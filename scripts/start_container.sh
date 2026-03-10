#!/bin/bash
cd /home/ec2-user/app

# Build the Docker image from source
docker build -t my-app:latest .

# Run the container
docker run -d \
  --name my-app \
  --restart unless-stopped \
  -p 5000:5000 \
  my-app:latest

echo "Container started successfully"
docker ps