#!/bin/bash

# =============================================================================
# Apache Debug Script - ionet-web API routing issue
# =============================================================================

echo "======================================"
echo "Apache Configuration Debug"
echo "======================================"
echo ""

# 1. Check if proxy modules are enabled
echo "[1] Checking Apache Proxy Modules..."
if command -v apache2ctl &> /dev/null; then
    MODULES=$(apache2ctl -M 2>/dev/null)
    
    if echo "$MODULES" | grep -q "proxy_module"; then
        echo "  ✓ proxy_module: ENABLED"
    else
        echo "  ✗ proxy_module: DISABLED"
        echo "    Fix: sudo a2enmod proxy"
    fi
    
    if echo "$MODULES" | grep -q "proxy_http_module"; then
        echo "  ✓ proxy_http_module: ENABLED"
    else
        echo "  ✗ proxy_http_module: DISABLED"
        echo "    Fix: sudo a2enmod proxy_http"
    fi
    
    if echo "$MODULES" | grep -q "rewrite_module"; then
        echo "  ✓ rewrite_module: ENABLED"
    else
        echo "  ✗ rewrite_module: DISABLED"
        echo "    Fix: sudo a2enmod rewrite"
    fi
else
    echo "  ! Apache not found"
fi
echo ""

# 2. Check backend status
echo "[2] Checking Backend (Port 3001)..."
if lsof -i :3001 &> /dev/null || netstat -tuln 2>/dev/null | grep -q ":3001"; then
    echo "  ✓ Port 3001 is listening"
    lsof -i :3001 2>/dev/null || netstat -tuln 2>/dev/null | grep ":3001"
else
    echo "  ✗ Port 3001 is NOT listening"
    echo "    Backend might not be running!"
    echo "    Fix: pm2 start server/index.cjs --name ionet-backend"
fi
echo ""

# 3. Test backend directly
echo "[3] Testing Backend Direct Access..."
RESPONSE=$(curl -s -w "\n%{http_code}" http://localhost:3001/ionet-web/api/health 2>&1)
HTTP_CODE=$(echo "$RESPONSE" | tail -n1)
BODY=$(echo "$RESPONSE" | head -n-1)

if [ "$HTTP_CODE" = "200" ]; then
    echo "  ✓ Backend responds: $HTTP_CODE"
    echo "  Response: $BODY" | head -c 200
else
    echo "  ✗ Backend NOT responding correctly: $HTTP_CODE"
    echo "  Response: $BODY" | head -c 200
fi
echo ""

# 4. Test API via Apache
echo "[4] Testing API via Apache..."
API_RESPONSE=$(curl -s -w "\n%{http_code}" http://localhost/ionet-web/api/health 2>&1)
API_CODE=$(echo "$API_RESPONSE" | tail -n1)
API_BODY=$(echo "$API_RESPONSE" | head -n-1)

if [ "$API_CODE" = "200" ]; then
    echo "  ✓ Apache proxy working: $API_CODE"
    echo "  Response: $API_BODY" | head -c 200
else
    echo "  ✗ Apache proxy NOT working: $API_CODE"
    
    # Check if it's returning HTML
    if echo "$API_BODY" | grep -q "<!DOCTYPE\|<html"; then
        echo "  ! Returning HTML (should be JSON)"
        echo "  This means ProxyPass is NOT working!"
        echo "  First 100 chars: ${API_BODY:0:100}"
    else
        echo "  Response: $API_BODY" | head -c 200
    fi
fi
echo ""

# 5. Check Apache config syntax
echo "[5] Apache Config Syntax Check..."
if command -v apache2ctl &> /dev/null; then
    if apache2ctl configtest 2>&1 | tail -n1 | grep -q "Syntax OK"; then
        echo "  ✓ Config syntax is OK"
    else
        echo "  ✗ Config has errors:"
        apache2ctl configtest 2>&1 | tail -n 5
    fi
fi
echo ""

# 6. Check ProxyPass directives in config
echo "[6] Checking ProxyPass Directives..."
if [ -f "/etc/apache2/sites-enabled/000-default.conf" ]; then
    echo "  Config file: /etc/apache2/sites-enabled/000-default.conf"
    
    if grep -q "ProxyPass.*ionet-web/api" /etc/apache2/sites-enabled/000-default.conf; then
        echo "  ✓ ProxyPass for /ionet-web/api found:"
        grep "ProxyPass.*ionet-web/api" /etc/apache2/sites-enabled/000-default.conf
    else
        echo "  ✗ ProxyPass for /ionet-web/api NOT found!"
        echo "    Config needs to be updated!"
    fi
else
    echo "  ! Config file not found"
fi
echo ""

echo "======================================"
echo "Debug Complete"
echo "======================================"
echo ""

echo "Quick Fixes:"
echo "  1. Enable modules:  sudo a2enmod proxy proxy_http rewrite"
echo "  2. Apply config:    sudo cp .apache/000-default.conf /etc/apache2/sites-available/"
echo "  3. Restart Apache:  sudo systemctl restart apache2"
echo "  4. Start backend:   pm2 start server/index.cjs --name ionet-backend"
echo ""
