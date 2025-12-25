#!/bin/bash

# =============================================================================
# I/ONET Web Multi-Environment Setup Script
# =============================================================================
# This script sets up the application for Development, Staging, or Production
# environments with complete isolation between environments.
# =============================================================================

# --- RENKLER ---
RED='\033[0;31m'
GREEN='\033[0;32m'
YELLOW='\033[1;33m'
BLUE='\033[0;34m'
CYAN='\033[0;36m'
NC='\033[0m'

# Root Kontrol
if [ "$EUID" -ne 0 ]; then 
  echo -e "${RED}Lütfen root (sudo) ile çalıştırın.${NC}"
  exit
fi

echo -e "${GREEN}╔════════════════════════════════════════════════════════════╗${NC}"
echo -e "${GREEN}║   I/ONET Web Multi-Environment Kurulum Sihirbazı          ║${NC}"
echo -e "${GREEN}╚════════════════════════════════════════════════════════════╝${NC}"
echo ""

# Input Helper
ask_input() {
    local prompt="$1"
    local default="$2"
    local var_name="$3"
    
    read -p "$(echo -e "${YELLOW}$prompt${NC} [$default]: ")" input
    input="${input:-$default}"
    eval $var_name="'$input'"
}

# Ask for environment
echo -e "${CYAN}Hangi ortam için kurulum yapılacak?${NC}"
echo "  1) Development (Local geliştirme)"
echo "  2) Staging (Test ortamı)"
echo "  3) Production (Canlı ortam)"
echo ""
ask_input "Ortam Seçimi (1/2/3)" "1" ENV_CHOICE

case $ENV_CHOICE in
    1)
        ENVIRONMENT="development"
        ENV_FILE_NAME=".env.development"
        DEFAULT_PORT="3001"
        DEFAULT_URL_PATH="/"
        DEFAULT_DOMAIN="http://localhost:3000"
        ;;
    2)
        ENVIRONMENT="staging"
        ENV_FILE_NAME=".env.stage"
        DEFAULT_PORT="3001"
        DEFAULT_URL_PATH="/"
        DEFAULT_DOMAIN="https://stage.ionet.com.tr"
        ;;
    3)
        ENVIRONMENT="production"
        ENV_FILE_NAME=".env.production"
        DEFAULT_PORT="3001"
        DEFAULT_URL_PATH="/"
        DEFAULT_DOMAIN="https://www.ionet.com.tr"
        ;;
    *)
        echo -e "${RED}Geçersiz seçim!${NC}"
        exit 1
        ;;
esac

echo ""
echo -e "${GREEN}✓ Seçilen Ortam: ${ENVIRONMENT}${NC}"
echo ""

# --- 1. AYARLAR ---
CURRENT_DIR=$(pwd)
ask_input "Proje Klasörü" "$CURRENT_DIR" PROJECT_PATH
ask_input "URL Yolu (örn: $DEFAULT_URL_PATH)" "$DEFAULT_URL_PATH" URL_PATH
ask_input "Backend Port" "$DEFAULT_PORT" BACKEND_PORT
ask_input "Domain/URL" "$DEFAULT_DOMAIN" DOMAIN_URL

echo ""
echo -e "${GREEN}════════════════════════════════════════════════════════════${NC}"
echo -e "${GREEN}Ayarlar Özeti:${NC}"
echo -e "${GREEN}════════════════════════════════════════════════════════════${NC}"
echo -e "  Ortam:          ${CYAN}$ENVIRONMENT${NC}"
echo -e "  Config Dosyası: ${CYAN}$ENV_FILE_NAME${NC}"
echo -e "  Proje Klasörü:  ${CYAN}$PROJECT_PATH${NC}"
echo -e "  URL Yolu:       ${CYAN}$URL_PATH${NC}"
echo -e "  Backend Port:   ${CYAN}$BACKEND_PORT${NC}"
echo -e "  Domain:         ${CYAN}$DOMAIN_URL${NC}"
echo -e "${GREEN}════════════════════════════════════════════════════════════${NC}"
echo ""

read -p "$(echo -e "${YELLOW}Devam edilsin mi? (y/n)${NC} [y]: ")" confirm
confirm="${confirm:-y}"
if [ "$confirm" != "y" ]; then
    echo -e "${RED}Kurulum iptal edildi.${NC}"
    exit 0
fi

echo ""
echo -e "${GREEN}Kurulum başlıyor...${NC}"
echo ""

# ==========================================
# 0. DİZİN YAPISI OLUŞTURMA
# ==========================================
echo -e "${BLUE}[0/6] Dizin Yapısı Oluşturuluyor...${NC}"

# Database dizinleri
mkdir -p "$PROJECT_PATH/server/db"
echo -e "      ✓ Database dizini: server/db/"

# Upload dizinleri (her ortam için)
mkdir -p "$PROJECT_PATH/server/uploads/dev"
mkdir -p "$PROJECT_PATH/server/uploads/stage"
mkdir -p "$PROJECT_PATH/server/uploads/prod"
echo -e "      ✓ Upload dizinleri: server/uploads/{dev,stage,prod}/"

# ==========================================
# 1. ENV DOSYASI OLUŞTURMA
# ==========================================
echo -e "${BLUE}[1/6] Çevre Değişkenleri ($ENV_FILE_NAME) Oluşturuluyor...${NC}"

ENV_FILE="$PROJECT_PATH/$ENV_FILE_NAME"

# Check if file exists AND contains valid content
if [ -f "$ENV_FILE" ]; then
    if grep -q "JWT_SECRET=" "$ENV_FILE" && grep -q "ADMIN_PASSWORD_HASH=" "$ENV_FILE"; then
         echo -e "${YELLOW}      ! $ENV_FILE_NAME dosyası zaten mevcut.${NC}"
         ask_input "Yeniden oluşturulsun mu? (y/n)" "n" RECREATE_ENV
         if [ "$RECREATE_ENV" != "y" ]; then
             NEED_ENV_GENERATION=false
             echo -e "      ✓ Mevcut $ENV_FILE_NAME dosyası korunuyor."
         else
             NEED_ENV_GENERATION=true
         fi
    else
         echo -e "${YELLOW}      ! $ENV_FILE_NAME dosyası var ama eksik. Yeniden oluşturuluyor...${NC}"
         NEED_ENV_GENERATION=true
    fi
else
    echo -e "      • $ENV_FILE_NAME dosyası bulunamadı. Oluşturuluyor..."
    NEED_ENV_GENERATION=true
fi

if [ "$NEED_ENV_GENERATION" = true ]; then
    # JWT Secret Üret
    if command -v openssl &> /dev/null; then
        JWT_SECRET=$(openssl rand -hex 32)
        echo -e "      ✓ JWT Secret oluşturuldu (OpenSSL)"
    else
        JWT_SECRET="secret_$(date +%s%N)"
        echo -e "${YELLOW}      ! JWT Secret oluşturuldu (fallback - OpenSSL bulunamadı)${NC}"
    fi
    
    # Admin Şifresi İste
    echo ""
    ask_input "Admin Paneli Şifresi Belirleyin" "admin123" ADMIN_PASS
    
    # Pre-check Node for hashing
    if ! command -v node &> /dev/null; then
         echo -e "${YELLOW}      ! Node.js bulunamadı. Hashleme kurulum sonrasına erteleniyor.${NC}"
    fi
fi

# ==========================================
# 2. APACHE MODÜLLERİ
# ==========================================
echo -e "${BLUE}[2/6] Apache Modülleri Aktif Ediliyor...${NC}"
if command -v a2enmod &> /dev/null; then
    a2enmod proxy proxy_http rewrite headers &> /dev/null
    echo -e "      ✓ Apache modülleri aktif edildi"
else
    echo -e "${YELLOW}      ! Apache komutları bulunamadı (a2enmod), atlanıyor${NC}"
fi

# ==========================================
# 3. PROJE KURULUMU (Node/PM2)
# ==========================================
echo -e "${BLUE}[3/6] Proje Bağımlılıkları ve Build...${NC}"

if [ ! -d "$PROJECT_PATH" ]; then
    echo -e "${RED}Hata: Proje klasörü bulunamadı: $PROJECT_PATH${NC}"
    exit 1
fi

cd "$PROJECT_PATH"

# İzinler
echo -e "      • Dosya izinleri ayarlanıyor..."
chown -R www-data:www-data "$PROJECT_PATH"
chmod -R 775 "$PROJECT_PATH"
echo -e "      ✓ Dosya izinleri ayarlandı"

# Install & Build
echo -e "      • npm install çalıştırılıyor..."
npm install --silent
echo -e "      ✓ npm install tamamlandı"

echo -e "      • npm run build:$ENVIRONMENT çalıştırılıyor..."
case $ENVIRONMENT in
    "development")
        npm run build:dev --silent
        ;;
    "staging")
        npm run build:stage --silent
        ;;
    "production")
        npm run build:prod --silent
        ;;
esac
echo -e "      ✓ Build tamamlandı"

# ==========================================
# 4. ENV DOSYASI YAZMA
# ==========================================
echo -e "${BLUE}[4/6] Environment Dosyası Yazılıyor...${NC}"

if [ "$NEED_ENV_GENERATION" = true ]; then
    echo -e "      • $ENV_FILE_NAME içeriği oluşturuluyor..."
    
    # Generate Hash
    ADMIN_HASH=$(node -e "try { console.log(require('bcryptjs').hashSync('$ADMIN_PASS', 10)); } catch(e) { console.log('HASH_ERROR'); }")
    
    if [ "$ADMIN_HASH" = "HASH_ERROR" ] || [ -z "$ADMIN_HASH" ]; then
        echo -e "${RED}      ! Hata: Şifre hashlenemedi! Varsayılan şifre atanıyor.${NC}"
        # Fallback hash for 'admin123'
        ADMIN_HASH='$2a$10$vI8aWBnW3fID.ZQ4/zo1G.q1lRps.9cGLcZEiGDMVr5yUP1KUOYTa' 
    fi

    # Ortama göre database ve upload yolları
    case $ENVIRONMENT in
        "development")
            DB_PATH="server/db/dev.db"
            UPLOAD_DIR="server/uploads/dev"
            ALLOWED_ORIGINS="http://localhost:3000,http://localhost:5173,http://localhost:$BACKEND_PORT"
            ;;
        "staging")
            DB_PATH="server/db/stage.db"
            UPLOAD_DIR="server/uploads/stage"
            ALLOWED_ORIGINS="$DOMAIN_URL"
            ;;
        "production")
            DB_PATH="server/db/prod.db"
            UPLOAD_DIR="server/uploads/prod"
            ALLOWED_ORIGINS="$DOMAIN_URL,https://ionet.com.tr"
            ;;
    esac

    # SMTP ayarları için kullanıcıdan bilgi al
    echo ""
    echo -e "${CYAN}Email/SMTP ayarları (opsiyonel - Enter ile geç):${NC}"
    ask_input "SMTP Host" "smtp.example.com" SMTP_HOST
    ask_input "SMTP Port" "587" SMTP_PORT
    ask_input "SMTP Secure (true/false)" "false" SMTP_SECURE
    ask_input "SMTP User" "noreply@ionet.com.tr" SMTP_USER
    ask_input "SMTP Pass" "" SMTP_PASS
    ask_input "Mail From" "contact@ionet.com.tr" MAIL_FROM
    ask_input "Mail To" "admin@ionet.com.tr" MAIL_TO

    cat > "$ENV_FILE" <<EOF
# $ENVIRONMENT Environment Configuration
# Generated by setup.sh on $(date)

# Server Configuration
PORT=$BACKEND_PORT
NODE_ENV=$ENVIRONMENT

# Database
DB_PATH=$DB_PATH

# Security
JWT_SECRET=$JWT_SECRET
ADMIN_PASSWORD_HASH=$ADMIN_HASH

# CORS Configuration
ALLOWED_ORIGINS=$ALLOWED_ORIGINS

# Frontend Configuration (Vite)
VITE_BASE_PATH=$URL_PATH
VITE_API_URL=$DOMAIN_URL
VITE_APP_ENV=$ENVIRONMENT

# File Upload
UPLOAD_DIR=$UPLOAD_DIR
MAX_FILE_SIZE=52428800

# Email Configuration (Optional)
SMTP_HOST=$SMTP_HOST
SMTP_PORT=$SMTP_PORT
SMTP_SECURE=$SMTP_SECURE
SMTP_USER=$SMTP_USER
SMTP_PASS=$SMTP_PASS
MAIL_FROM=$MAIL_FROM
MAIL_TO=$MAIL_TO
EOF
    echo -e "      ✓ $ENV_FILE_NAME dosyası oluşturuldu"
    echo -e "      ${GREEN}ℹ Admin Şifresi: $ADMIN_PASS${NC}"
fi

# ==========================================
# 5. PM2 YAPILANDIRMA
# ==========================================
echo -e "${BLUE}[5/6] PM2 Konfigürasyonu...${NC}"

# Ecosystem dosyasını güncelle
if [ -f "$PROJECT_PATH/ecosystem.config.cjs" ]; then
    sed -i "s/PORT: [0-9]*/PORT: $BACKEND_PORT/g" ecosystem.config.cjs
    echo -e "      ✓ ecosystem.config.cjs güncellendi"
fi

# PM2 Başlat veya Yeniden Yükle
PM2_APP_NAME="ionet-$ENVIRONMENT"

if npx pm2 list | grep -q "$PM2_APP_NAME"; then
    echo -e "      • $PM2_APP_NAME uygulaması yeniden yükleniyor..."
    NODE_ENV=$ENVIRONMENT npx pm2 reload $PM2_APP_NAME
    echo -e "      ✓ PM2 uygulaması yeniden yüklendi"
else
    echo -e "      • $PM2_APP_NAME uygulaması başlatılıyor..."
    NODE_ENV=$ENVIRONMENT npx pm2 start server/index.cjs --name $PM2_APP_NAME
    echo -e "      ✓ PM2 uygulaması başlatıldı"
fi

npx pm2 save --force
echo -e "      ✓ PM2 konfigürasyonu kaydedildi"

# ==========================================
# 6. SERVİSLER YENİDEN BAŞLATMA
# ==========================================
echo -e "${BLUE}[6/6] Servisler Yeniden Başlatılıyor...${NC}"

if command -v apache2ctl &> /dev/null; then
    if apache2ctl configtest 2>&1 | grep -q "Syntax OK"; then
        systemctl reload apache2
        echo -e "      ✓ Apache servisi yeniden yüklendi"
    else
        echo -e "${RED}      ! Apache config hatası tespit edildi${NC}"
    fi
else
    echo -e "${YELLOW}      ! Apache servisi kontrol edilemedi${NC}"
fi

# ==========================================
# 7. BİTİŞ
# ==========================================
echo ""
echo -e "${GREEN}╔════════════════════════════════════════════════════════════╗${NC}"
echo -e "${GREEN}║         KURULUM BAŞARIYLA TAMAMLANDI! 🎉                   ║${NC}"
echo -e "${GREEN}╚════════════════════════════════════════════════════════════╝${NC}"
echo ""
echo -e "${CYAN}Kurulum Özeti:${NC}"
echo -e "  Ortam:           ${GREEN}$ENVIRONMENT${NC}"
echo -e "  Config Dosyası:  ${GREEN}$ENV_FILE_NAME${NC}"
echo -e "  Database:        ${GREEN}$DB_PATH${NC}"
echo -e "  Upload Dizini:   ${GREEN}$UPLOAD_DIR${NC}"
echo -e "  PM2 App:         ${GREEN}$PM2_APP_NAME${NC}"
echo -e "  Admin Şifresi:   ${GREEN}$ADMIN_PASS${NC}"
echo ""
echo -e "${CYAN}Erişim Bilgileri:${NC}"
case $ENVIRONMENT in
    "development")
        echo -e "  Frontend: ${GREEN}http://localhost:3000${NC}"
        echo -e "  Backend:  ${GREEN}http://localhost:$BACKEND_PORT${NC}"
        ;;
    *)
        echo -e "  URL: ${GREEN}$DOMAIN_URL$URL_PATH${NC}"
        ;;
esac
echo ""
echo -e "${CYAN}Faydalı Komutlar:${NC}"
echo -e "  PM2 Durumu:      ${YELLOW}pm2 list${NC}"
echo -e "  PM2 Logları:     ${YELLOW}pm2 logs $PM2_APP_NAME${NC}"
echo -e "  PM2 Restart:     ${YELLOW}pm2 restart $PM2_APP_NAME${NC}"
echo -e "  Development:     ${YELLOW}npm run dev${NC}"
echo -e "  Build ($ENVIRONMENT): ${YELLOW}npm run build:$ENVIRONMENT${NC}"
echo ""
echo -e "${GREEN}Detaylı bilgi için ENVIRONMENT_SETUP.md dosyasını inceleyin.${NC}"
echo ""
