#!/bin/bash

# =============================================================================
# I/ONET Web Staging Diagnostic Script
# =============================================================================
# This script helps diagnose staging environment issues
# Usage: ./diagnose-staging.sh
# =============================================================================

set +e  # Don't stop on error (we want to see all diagnostics)

# Colors
RED='\033[0;31m'
GREEN='\033[0;32m'
YELLOW='\033[1;33m'
BLUE='\033[0;34m'
CYAN='\033[0;36m'
NC='\033[0m'

echo -e "${GREEN}╔════════════════════════════════════════════════════════════╗${NC}"
echo -e "${GREEN}║         I/ONET Web Staging Diagnostics                    ║${NC}"
echo -e "${GREEN}╚════════════════════════════════════════════════════════════╝${NC}"
echo ""

# 1. Backend Status
echo -e "${BLUE}[1] Backend Status Check${NC}"
if pm2 list | grep -q "ionet-staging"; then
    echo -e "  ${GREEN}✓ Backend is running (PM2)${NC}"
    pm2 info ionet-staging | grep -E "status|uptime|restarts"
else
    echo -e "  ${RED}✗ Backend is NOT running${NC}"
    echo -e "  ${YELLOW}  Start with: pm2 start server/index.cjs --name ionet-staging${NC}"
fi
echo ""

# 2. Port Check
echo -e "${BLUE}[2] Port 3001 Status${NC}"
if netstat -tulpn 2>/dev/null | grep -q ":3001"; then
    echo -e "  ${GREEN}✓ Port 3001 is listening${NC}"
    netstat -tulpn 2>/dev/null | grep ":3001"
elif lsof -i :3001 2>/dev/null; then
    echo -e "  ${GREEN}✓ Port 3001 is in use${NC}"
    lsof -i :3001 2>/dev/null
else
    echo -e "  ${RED}✗ Port 3001 is NOT listening${NC}"
    echo -e "  ${YELLOW}  Backend might not be running${NC}"
fi
echo ""

# 3. Backend Health Check
echo -e "${BLUE}[3] Backend Health Check${NC}"
HEALTH_RESPONSE=$(curl -s http://localhost:3001//api/health 2>&1)
if echo "$HEALTH_RESPONSE" | grep -q "healthy"; then
    echo -e "  ${GREEN}✓ Backend is healthy${NC}"
    echo "$HEALTH_RESPONSE" | jq '.' 2>/dev/null || echo "$HEALTH_RESPONSE"
else
    echo -e "  ${RED}✗ Backend health check failed${NC}"
    echo -e "  Response: $HEALTH_RESPONSE"
fi
echo ""

# 4. API Endpoint Test
echo -e "${BLUE}[4] API Endpoint Test${NC}"
API_RESPONSE=$(curl -s http://localhost:3001//api/blog_posts 2>&1)
if echo "$API_RESPONSE" | grep -q "<!DOCTYPE\|<html"; then
    echo -e "  ${RED}✗ API returning HTML (should be JSON)${NC}"
    echo -e "  ${YELLOW}  This indicates proxy misconfiguration${NC}"
    echo -e "  First 200 chars: ${API_RESPONSE:0:200}"
elif echo "$API_RESPONSE" | grep -q "\["; then
    echo -e "  ${GREEN}✓ API returning JSON${NC}"
    echo "  Sample: $(echo "$API_RESPONSE" | jq '.[0].title' 2>/dev/null || echo "$API_RESPONSE" | head -c 100)"
else
    echo -e "  ${YELLOW}! Unexpected response${NC}"
    echo "  Response: $API_RESPONSE"
fi
echo ""

# 5. Database Check
echo -e "${BLUE}[5] Database Check${NC}"
if [ -f "server/db/stage.db" ]; then
    echo -e "  ${GREEN}✓ Database file exists${NC}"
    echo "  Size: $(du -h server/db/stage.db | cut -f1)"
    
    # Count records
    BLOG_COUNT=$(sqlite3 server/db/stage.db "SELECT COUNT(*) FROM blog_posts;" 2>/dev/null || echo "Error")
    MENU_COUNT=$(sqlite3 server/db/stage.db "SELECT COUNT(*) FROM menu_items;" 2>/dev/null || echo "Error")
    
    echo "  Blog posts: $BLOG_COUNT"
    echo "  Menu items: $MENU_COUNT"
    
    if [ "$BLOG_COUNT" = "0" ] || [ "$BLOG_COUNT" = "Error" ]; then
        echo -e "  ${YELLOW}  ! Database might be empty. Run: node server/seed.cjs staging${NC}"
    fi
else
    echo -e "  ${RED}✗ Database file not found${NC}"
    echo -e "  ${YELLOW}  Run: node server/seed.cjs staging${NC}"
fi
echo ""

# 6. Apache/Nginx Status
echo -e "${BLUE}[6] Web Server Status${NC}"
if command -v apache2ctl &> /dev/null; then
    if systemctl is-active --quiet apache2; then
        echo -e "  ${GREEN}✓ Apache is running${NC}"
        
        # Check if proxy modules are enabled
        if apache2ctl -M 2>/dev/null | grep -q "proxy_module"; then
            echo -e "  ${GREEN}✓ Proxy module enabled${NC}"
        else
            echo -e "  ${RED}✗ Proxy module NOT enabled${NC}"
            echo -e "  ${YELLOW}  Run: sudo a2enmod proxy proxy_http${NC}"
        fi
        
        # Config test
        if apache2ctl configtest 2>&1 | grep -q "Syntax OK"; then
            echo -e "  ${GREEN}✓ Apache config is valid${NC}"
        else
            echo -e "  ${YELLOW}! Apache config has warnings${NC}"
        fi
    else
        echo -e "  ${RED}✗ Apache is NOT running${NC}"
    fi
elif command -v nginx &> /dev/null; then
    if systemctl is-active --quiet nginx; then
        echo -e "  ${GREEN}✓ Nginx is running${NC}"
        
        if nginx -t 2>&1 | grep -q "successful"; then
            echo -e "  ${GREEN}✓ Nginx config is valid${NC}"
        else
            echo -e "  ${YELLOW}! Nginx config has issues${NC}"
        fi
    else
        echo -e "  ${RED}✗ Nginx is NOT running${NC}"
    fi
else
    echo -e "  ${YELLOW}! No web server detected${NC}"
fi
echo ""

# 7. Environment Variables
echo -e "${BLUE}[7] Environment Configuration${NC}"
if [ -f ".env.stage" ]; then
    echo -e "  ${GREEN}✓ .env.stage exists${NC}"
    
    # Check critical variables (without showing values)
    if grep -q "JWT_SECRET=REPLACE" .env.stage; then
        echo -e "  ${RED}✗ JWT_SECRET not configured${NC}"
    else
        echo -e "  ${GREEN}✓ JWT_SECRET configured${NC}"
    fi
    
    if grep -q "ADMIN_PASSWORD_HASH=REPLACE" .env.stage; then
        echo -e "  ${RED}✗ ADMIN_PASSWORD_HASH not configured${NC}"
    else
        echo -e "  ${GREEN}✓ ADMIN_PASSWORD_HASH configured${NC}"
    fi
    
    echo "  ALLOWED_ORIGINS: $(grep ALLOWED_ORIGINS .env.stage | cut -d= -f2)"
else
    echo -e "  ${RED}✗ .env.stage not found${NC}"
fi
echo ""

# 8. Frontend Files
echo -e "${BLUE}[8] Frontend Build Check${NC}"
if [ -d "dist" ]; then
    echo -e "  ${GREEN}✓ dist/ folder exists${NC}"
    echo "  Files: $(find dist -type f | wc -l)"
    echo "  Size: $(du -sh dist | cut -f1)"
    
    if [ -f "dist/index.html" ]; then
        echo -e "  ${GREEN}✓ index.html exists${NC}"
    else
        echo -e "  ${RED}✗ index.html missing${NC}"
    fi
else
    echo -e "  ${RED}✗ dist/ folder not found${NC}"
    echo -e "  ${YELLOW}  Run: npm run build:stage${NC}"
fi
echo ""

# 9. PM2 Logs (last 10 lines)
echo -e "${BLUE}[9] Recent Backend Logs${NC}"
if pm2 list | grep -q "ionet-staging"; then
    echo -e "${CYAN}--- Last 10 lines ---${NC}"
    pm2 logs ionet-staging --lines 10 --nostream 2>/dev/null || echo "  Could not fetch logs"
else
    echo -e "  ${YELLOW}! Backend not running in PM2${NC}"
fi
echo ""

# Summary
echo -e "${GREEN}╔════════════════════════════════════════════════════════════╗${NC}"
echo -e "${GREEN}║                     DIAGNOSIS COMPLETE                     ║${NC}"
echo -e "${GREEN}╚════════════════════════════════════════════════════════════╝${NC}"
echo ""

echo -e "${CYAN}Quick Fix Commands:${NC}"
echo -e "  Start Backend:    ${YELLOW}NODE_ENV=staging pm2 start server/index.cjs --name ionet-staging${NC}"
echo -e "  Restart Backend:  ${YELLOW}pm2 restart ionet-staging${NC}"
echo -e "  View Logs:        ${YELLOW}pm2 logs ionet-staging${NC}"
echo -e "  Seed Database:    ${YELLOW}node server/seed.cjs staging${NC}"
echo -e "  Test API:         ${YELLOW}curl http://localhost:3001//api/health${NC}"
echo ""
