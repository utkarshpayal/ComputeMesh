#!/bin/bash
echo "Installing dependencies"
cd /home/ubuntu/computemesh-backend
npm install
echo "Building TypeScript"
npm run build