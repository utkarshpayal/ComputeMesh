#!/bin/bash
echo "Stopping existing backend"
pm2 delete computemesh-be || true