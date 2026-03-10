#!/bin/bash

cd /home/ec2-user/app

docker build -t my-app:latest .

docker run -d \
  --name my-app \
  --restart unless-stopped \
  -p 5000:5000 \
  --env-file /home/ec2-user/app/.env \
  my-app:latest

echo "Container started successfully"

docker ps