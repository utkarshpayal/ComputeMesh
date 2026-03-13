#!/bin/bash
echo "Starting backend"
cd /home/ubuntu/computemesh-backend
pm2 start dist/server.js --name computemesh-be || pm2 restart computemesh-be
pm2 save