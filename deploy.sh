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

# 5. Apache Configuration (Optional)
if command -v a2enmod &> /dev/null; then
    echo "🔧 Checking Apache Modules..."
    # Enable required modules for proxying
    a2enmod rewrite proxy proxy_http headers &> /dev/null || true
    # Reload Apache to apply changes (only if config is valid)
    if apache2ctl configtest &> /dev/null; then
        echo "🔄 Reloading Apache..."
        systemctl reload apache2 || true
    fi
fi



echo "✅ Deployment Complete!"
