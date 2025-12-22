#!/bin/bash

# =============================================================================
# Environment Variables Validation Script
# =============================================================================
# This script validates that all required environment variables are properly
# configured for the specified environment.
# Usage: ./validate-env.sh [environment]
# =============================================================================

# Colors
RED='\033[0;31m'
GREEN='\033[0;32m'
YELLOW='\033[1;33m'
BLUE='\033[0;34m'
NC='\033[0m'

# Determine environment
ENVIRONMENT=${1:-development}
ENV_FILE=".env.$ENVIRONMENT"

echo -e "${BLUE}╔════════════════════════════════════════════════════════════╗${NC}"
echo -e "${BLUE}║   Environment Variables Validation - $ENVIRONMENT${NC}"
echo -e "${BLUE}╚════════════════════════════════════════════════════════════╝${NC}"
echo ""

# Check if environment file exists
if [ ! -f "$ENV_FILE" ]; then
    echo -e "${RED}❌ Error: $ENV_FILE not found!${NC}"
    echo -e "${YELLOW}Available environment files:${NC}"
    ls -1 .env.* 2>/dev/null || echo "  None found"
    exit 1
fi

echo -e "${GREEN}✓ Found: $ENV_FILE${NC}"
echo ""

# Required variables for all environments
REQUIRED_VARS=(
    "NODE_ENV"
    "PORT"
    "DB_PATH"
    "JWT_SECRET"
    "ADMIN_PASSWORD_HASH"
    "ALLOWED_ORIGINS"
    "VITE_BASE_PATH"
    "VITE_API_URL"
    "UPLOAD_DIR"
)

# Optional but recommended variables
OPTIONAL_VARS=(
    "VITE_APP_ENV"
    "MAX_FILE_SIZE"
    "SMTP_HOST"
    "SMTP_PORT"
    "SMTP_USER"
    "SMTP_PASS"
    "MAIL_FROM"
    "MAIL_TO"
)

# Load environment file
set -a
source "$ENV_FILE"
set +a

# Validation counters
ERRORS=0
WARNINGS=0

echo -e "${BLUE}Checking Required Variables:${NC}"
echo "━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━"

for var in "${REQUIRED_VARS[@]}"; do
    value="${!var}"
    if [ -z "$value" ]; then
        echo -e "  ${RED}✗ $var${NC} - Missing or empty"
        ((ERRORS++))
    else
        # Additional validation based on variable
        case $var in
            "JWT_SECRET")
                if [ ${#value} -lt 32 ]; then
                    echo -e "  ${YELLOW}⚠ $var${NC} - Too short (should be 32+ chars)"
                    ((WARNINGS++))
                else
                    echo -e "  ${GREEN}✓ $var${NC} - OK (${#value} chars)"
                fi
                ;;
            "PORT")
                if ! [[ "$value" =~ ^[0-9]+$ ]]; then
                    echo -e "  ${RED}✗ $var${NC} - Not a valid port number"
                    ((ERRORS++))
                else
                    echo -e "  ${GREEN}✓ $var${NC} - $value"
                fi
                ;;
            "NODE_ENV")
                if [[ ! "$value" =~ ^(development|staging|production)$ ]]; then
                    echo -e "  ${YELLOW}⚠ $var${NC} - Unexpected value: $value"
                    ((WARNINGS++))
                else
                    echo -e "  ${GREEN}✓ $var${NC} - $value"
                fi
                ;;
            "VITE_BASE_PATH")
                if [[ "$ENVIRONMENT" == "development" && "$value" != "/" ]]; then
                    echo -e "  ${YELLOW}⚠ $var${NC} - Development should use '/' (got: $value)"
                    ((WARNINGS++))
                elif [[ "$ENVIRONMENT" != "development" && "$value" == "/" ]]; then
                    echo -e "  ${YELLOW}⚠ $var${NC} - Non-dev should use subdirectory (got: $value)"
                    ((WARNINGS++))
                else
                    echo -e "  ${GREEN}✓ $var${NC} - $value"
                fi
                ;;
            "ADMIN_PASSWORD_HASH")
                if [[ ! "$value" =~ ^\$2[aby]\$ ]]; then
                    echo -e "  ${RED}✗ $var${NC} - Not a valid bcrypt hash"
                    ((ERRORS++))
                else
                    echo -e "  ${GREEN}✓ $var${NC} - Valid bcrypt hash"
                fi
                ;;
            "DB_PATH")
                expected_path="server/db/${ENVIRONMENT%ing}.db"
                if [[ ! "$value" =~ $ENVIRONMENT ]] && [[ "$value" != *"${expected_path}"* ]]; then
                    echo -e "  ${YELLOW}⚠ $var${NC} - Path doesn't match environment"
                    ((WARNINGS++))
                else
                    echo -e "  ${GREEN}✓ $var${NC} - $value"
                fi
                ;;
            *)
                echo -e "  ${GREEN}✓ $var${NC} - Set"
                ;;
        esac
    fi
done

echo ""
echo -e "${BLUE}Checking Optional Variables:${NC}"
echo "━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━"

for var in "${OPTIONAL_VARS[@]}"; do
    value="${!var}"
    if [ -z "$value" ]; then
        echo -e "  ${YELLOW}○ $var${NC} - Not set (optional)"
    else
        echo -e "  ${GREEN}✓ $var${NC} - Set"
    fi
done

echo ""
echo "━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━"

# Final summary
if [ $ERRORS -eq 0 ] && [ $WARNINGS -eq 0 ]; then
    echo -e "${GREEN}✅ Validation PASSED${NC}"
    echo -e "   All required variables are properly configured!"
    exit 0
elif [ $ERRORS -eq 0 ]; then
    echo -e "${YELLOW}⚠ Validation PASSED with warnings${NC}"
    echo -e "   Errors: ${RED}$ERRORS${NC}"
    echo -e "   Warnings: ${YELLOW}$WARNINGS${NC}"
    echo ""
    echo -e "${YELLOW}Please review the warnings above.${NC}"
    exit 0
else
    echo -e "${RED}❌ Validation FAILED${NC}"
    echo -e "   Errors: ${RED}$ERRORS${NC}"
    echo -e "   Warnings: ${YELLOW}$WARNINGS${NC}"
    echo ""
    echo -e "${RED}Please fix the errors before deploying.${NC}"
    exit 1
fi
