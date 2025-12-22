#!/bin/bash

# =============================================================================
# I/ONET Web Multi-Environment Deployment Script
# =============================================================================
# This script handles deployment for different environments
# Usage: ./deploy.sh [environment]
# Example: ./deploy.sh staging
# =============================================================================

set -e  # Stop on error

# Colors
RED='\033[0;31m'
GREEN='\033[0;32m'
YELLOW='\033[1;33m'
BLUE='\033[0;34m'
CYAN='\033[0;36m'
NC='\033[0m'

# Determine environment
ENVIRONMENT=${1:-production}

# Validate environment
if [[ ! "$ENVIRONMENT" =~ ^(development|staging|production)$ ]]; then
    echo -e "${RED}❌ Invalid environment: $ENVIRONMENT${NC}"
    echo -e "${YELLOW}Usage: ./deploy.sh [development|staging|production]${NC}"
    exit 1
fi

echo -e "${GREEN}╔════════════════════════════════════════════════════════════╗${NC}"
echo -e "${GREEN}║   I/ONET Web Deployment - ${ENVIRONMENT^^} Environment${NC}"
echo -e "${GREEN}╚════════════════════════════════════════════════════════════╝${NC}"
echo ""

# Check if environment file exists
ENV_FILE=".env.$ENVIRONMENT"
if [ ! -f "$ENV_FILE" ]; then
    echo -e "${RED}❌ Environment file not found: $ENV_FILE${NC}"
    echo -e "${YELLOW}Please create $ENV_FILE before deploying.${NC}"
    exit 1
fi

echo -e "${CYAN}Environment: ${YELLOW}$ENVIRONMENT${NC}"
echo -e "${CYAN}Config File: ${YELLOW}$ENV_FILE${NC}"
echo ""

# 1. Pull latest changes from git
echo -e "${BLUE}[1/6] 📥 Pulling from git...${NC}"
if git pull origin main; then
    echo -e "      ${GREEN}✓ Git pull successful${NC}"
else
    echo -e "${YELLOW}      ! Git pull failed or no changes${NC}"
fi

# 2. Install dependencies
echo -e "${BLUE}[2/6] 📦 Installing dependencies...${NC}"
npm install --silent
echo -e "      ${GREEN}✓ Dependencies installed${NC}"

# 3. Build React App for the specific environment
echo -e "${BLUE}[3/6] 🏗️  Building Frontend for $ENVIRONMENT...${NC}"
case $ENVIRONMENT in
    "development")
        npm run build:dev
        ;;
    "staging")
        npm run build:stage
        ;;
    "production")
        npm run build:prod
        ;;
esac
echo -e "      ${GREEN}✓ Build completed${NC}"

# 4. Backup current database (if exists)
echo -e "${BLUE}[4/6] 💾 Backing up database...${NC}"
case $ENVIRONMENT in
    "development")
        DB_PATH="server/db/dev.db"
        ;;
    "staging")
        DB_PATH="server/db/stage.db"
        ;;
    "production")
        DB_PATH="server/db/prod.db"
        ;;
esac

if [ -f "$DB_PATH" ]; then
    BACKUP_PATH="${DB_PATH}.backup.$(date +%Y%m%d_%H%M%S)"
    cp "$DB_PATH" "$BACKUP_PATH"
    echo -e "      ${GREEN}✓ Database backed up to: $BACKUP_PATH${NC}"
else
    echo -e "      ${YELLOW}! No database to backup${NC}"
fi

# 5. Restart Server via PM2
echo -e "${BLUE}[5/6] 🔄 Reloading PM2...${NC}"
PM2_APP_NAME="ionet-$ENVIRONMENT"

if npx pm2 list | grep -q "$PM2_APP_NAME"; then
    # App exists, reload it
    NODE_ENV=$ENVIRONMENT npx pm2 reload $PM2_APP_NAME
    echo -e "      ${GREEN}✓ PM2 app '$PM2_APP_NAME' reloaded${NC}"
else
    # App doesn't exist, start it
    NODE_ENV=$ENVIRONMENT npx pm2 start server/index.cjs --name $PM2_APP_NAME
    npx pm2 save
    echo -e "      ${GREEN}✓ PM2 app '$PM2_APP_NAME' started${NC}"
fi

# 6. Apache Configuration (Optional)
echo -e "${BLUE}[6/6] 🔧 Checking Apache...${NC}"
if command -v a2enmod &> /dev/null; then
    # Enable required modules for proxying
    a2enmod rewrite proxy proxy_http headers &> /dev/null || true
    echo -e "      ${GREEN}✓ Apache modules checked${NC}"
    
    # Reload Apache to apply changes (only if config is valid)
    if apache2ctl configtest &> /dev/null; then
        systemctl reload apache2 || true
        echo -e "      ${GREEN}✓ Apache reloaded${NC}"
    else
        echo -e "${YELLOW}      ! Apache config test failed${NC}"
    fi
else
    echo -e "${YELLOW}      ! Apache not found, skipping${NC}"
fi

echo ""
echo -e "${GREEN}╔════════════════════════════════════════════════════════════╗${NC}"
echo -e "${GREEN}║             ✅ DEPLOYMENT COMPLETE! 🎉                     ║${NC}"
echo -e "${GREEN}╚════════════════════════════════════════════════════════════╝${NC}"
echo ""
echo -e "${CYAN}Deployment Summary:${NC}"
echo -e "  Environment:  ${GREEN}$ENVIRONMENT${NC}"
echo -e "  PM2 App:      ${GREEN}$PM2_APP_NAME${NC}"
echo -e "  Database:     ${GREEN}$DB_PATH${NC}"
echo ""
echo -e "${CYAN}Useful Commands:${NC}"
echo -e "  PM2 Status:   ${YELLOW}pm2 list${NC}"
echo -e "  PM2 Logs:     ${YELLOW}pm2 logs $PM2_APP_NAME${NC}"
echo -e "  PM2 Restart:  ${YELLOW}pm2 restart $PM2_APP_NAME${NC}"
echo -e "  PM2 Stop:     ${YELLOW}pm2 stop $PM2_APP_NAME${NC}"
echo ""
