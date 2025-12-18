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
# Use npx to run local pm2 or install/run temporary if needed, avoiding global install issues
if npx pm2 list | grep -q "ionet-web"; then
    npx pm2 reload ionet-web
else
    npx pm2 start ecosystem.config.cjs
fi


echo "✅ Deployment Complete!"
