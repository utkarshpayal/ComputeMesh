#!/bin/bash

echo "Stopping existing app"

pm2 stop computemesh || true
pm2 delete computemesh || true