#!/bin/bash

cd /home/ubuntu/computemesh

echo "Starting application"

pm2 start index.js --name computemesh
pm2 save