#!/bin/bash

echo "🔍 Coolify Deployment Diagnostics"
echo "=================================="
echo ""

echo "📁 Checking if dist folder exists..."
if [ -d "/app/dist" ]; then
    echo "✅ /app/dist exists"
    echo "📊 Contents:"
    ls -lah /app/dist | head -20
    echo ""
    echo "📄 File count:"
    find /app/dist -type f | wc -l
    echo ""
    echo "📂 Directory structure:"
    tree /app/dist -L 2 2>/dev/null || find /app/dist -maxdepth 2 -type d
else
    echo "❌ /app/dist NOT FOUND!"
    echo "This is why you're getting 401 - no frontend files to serve!"
fi

echo ""
echo "🔐 Checking permissions..."
ls -la /app/ | grep dist

echo ""
echo "🌐 Checking server process..."
ps aux | grep node

echo ""
echo "📦 Environment variables (filtered):"
env | grep -E "(NODE_ENV|BUILD_ENV|VITE_|BASE_PATH)" | sort

echo ""
echo "🚀 Testing endpoints..."
echo "Health check:"
curl -s http://localhost:3001/v1/health || echo "Health check failed"

echo ""
echo "Root path:"
curl -s -o /dev/null -w "%{http_code}" http://localhost:3001/

echo ""
echo "=================================="
echo "Diagnostic complete!"
