#!/bin/bash

# Stop on error
set -e

echo "🚀 Starting Deployment..."

# 1. Pull latest changes
echo "📥 Pulling from git..."
git pull origin main

# 2. Install dependencies
echo "📦 Installing dependencies..."
npm install

# 3. Build React App
echo "🏗️  Building Frontend..."
npm run build

# 4. Restart Server via PM2
echo "🔄 Reloading PM2..."
if pm2 list | grep -q "ionet-web"; then
    pm2 reload ionet-web
else
    pm2 start ecosystem.config.cjs
fi

echo "✅ Deployment Complete!"
