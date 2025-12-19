#!/bin/bash

# --- RENKLER ---
RED='\033[0;31m'
GREEN='\033[0;32m'
YELLOW='\033[1;33m'
BLUE='\033[0;34m'
NC='\033[0m'

# Root Kontrol
if [ "$EUID" -ne 0 ]; then 
  echo -e "${RED}Lütfen root (sudo) ile çalıştırın.${NC}"
  exit
fi

echo -e "${GREEN}>>> I/ONET Web Server Kurulum Sihirbazı${NC}"
echo "----------------------------------------------------------------"

# Input Helper
ask_input() {
    local prompt="$1"
    local default="$2"
    local var_name="$3"
    
    read -p "$(echo -e "${YELLOW}$prompt${NC} [$default]: ")" input
    input="${input:-$default}"
    eval $var_name="'$input'"
}

# --- 1. AYARLAR ---
# Mevcut dizini varsayılan olarak al
CURRENT_DIR=$(pwd)
ask_input "Proje Klasörü" "$CURRENT_DIR" PROJECT_PATH
ask_input "URL Yolu (örn: /ionet-web)" "/ionet-web" URL_PATH
ask_input "Backend Port" "3001" BACKEND_PORT

echo "----------------------------------------------------------------"
echo -e "${GREEN}Ayarlar doğrulandı. Kurulum başlıyor...${NC}"
echo "----------------------------------------------------------------"

# ==========================================
# 2. ÖN HAZIRLIKLAR & APACHE
# ==========================================
echo -e "${BLUE}[1/4] Apache Modülleri Aktif Ediliyor...${NC}"
if command -v a2enmod &> /dev/null; then
    a2enmod proxy proxy_http rewrite headers &> /dev/null
    echo -e "      > Modüller aktif edildi."
else
    echo -e "${YELLOW}      > Apache komutları bulunamadı (a2enmod), atlanıyor.${NC}"
fi

# ==========================================
# 3. PROJE KURULUMU (Node/PM2)
# ==========================================
echo -e "${BLUE}[2/4] Proje Bağımlılıkları ve Build...${NC}"

if [ ! -d "$PROJECT_PATH" ]; then
    echo -e "${RED}Hata: Proje klasörü bulunamadı: $PROJECT_PATH${NC}"
    exit 1
fi

cd "$PROJECT_PATH"

# İzinler
echo -e "      > Dosya izinleri ayarlanıyor..."
chown -R www-data:www-data "$PROJECT_PATH"
# Mevcut kullanıcıya da yazma izni ver (deploy.sh çalıştırabilmesi için)
chmod -R 775 "$PROJECT_PATH"

# Install & Build
echo -e "      > npm install..."
# npm komutunu çalıştırmak için sudo kullanıcısını kullanmak yerine mevcut kullanıcıyı korumaya çalışalım
# ama root olduğumuz için --unsafe-perm gerekebilir veya direkt çalıştırırız.
npm install --silent

echo -e "      > npm run build..."
npm run build --silent

# PM2 Setup
echo -e "      > PM2 Konfigürasyonu..."
# Ecosystem dosyasını güncelle (Port dinamik ise)
sed -i "s/PORT: [0-9]*/PORT: $BACKEND_PORT/g" ecosystem.config.cjs

# PM2 Başlat
if npx pm2 list | grep -q "ionet-web"; then
    npx pm2 reload ionet-web
else
    npx pm2 start ecosystem.config.cjs
fi
npx pm2 save --force

# ==========================================
# 4. APACHE YAPILANDIRMASI
# ==========================================
echo -e "${BLUE}[3/4] Apache VirtualHost Ayarlanıyor...${NC}"
TARGET_CONF="/etc/apache2/sites-available/000-default.conf"

if [ -f "$TARGET_CONF" ]; then
    echo -e "      > Config dosyası yedekleniyor..."
    cp "$TARGET_CONF" "$TARGET_CONF.bak_$(date +%F_%H%M)"
    
    # URL_PATH slashes escape for sed
    SAFE_URL_PATH=$(echo $URL_PATH | sed 's/\//\\\//g')
    
    # Check if config exists
    if grep -q "ProxyPass $URL_PATH" "$TARGET_CONF"; then
        echo -e "${YELLOW}      > Ayarlar zaten dosyada mevcut.${NC}"
    else
        echo -e "      > Yeni Reverse Proxy ayarları ekleniyor..."
        
        echo -e "      > Yeni Reverse Proxy ayarları ekleniyor..."
        
        # Use safe line-by-line insertion to avoid sed multiline/delimiter issues
        # Using | as delimiter since URL path contains /
        
        # Insert from bottom up (since 'i' inserts before the match) OR just do one by one in order 
        # But 'i' inserts before current line. If we do:
        # 1. Insert START
        # 2. Insert Location (it will be inserted before </VirtualHost>, so AFTER START? No. 
        # sed -i '/match/i A' -> A \n match
        # sed -i '/match/i B' -> A \n B \n match
        # So sequential execution works naturally to build the block order.

        sed -i "\|</VirtualHost>|i # --- IONET WEB START ---" "$TARGET_CONF"
        sed -i "\|</VirtualHost>|i <Location $URL_PATH>" "$TARGET_CONF"
        sed -i "\|</VirtualHost>|i \    ProxyPreserveHost On" "$TARGET_CONF"
        sed -i "\|</VirtualHost>|i \    ProxyPass http://localhost:$BACKEND_PORT$URL_PATH" "$TARGET_CONF"
        sed -i "\|</VirtualHost>|i \    ProxyPassReverse http://localhost:$BACKEND_PORT$URL_PATH" "$TARGET_CONF"
        sed -i "\|</VirtualHost>|i </Location>" "$TARGET_CONF"
        sed -i "\|</VirtualHost>|i # --- IONET WEB END ---" "$TARGET_CONF"
    fi
else
    echo -e "${RED}Hata: Apache config dosyası bulunamadı ($TARGET_CONF). Apache kurulu mu?${NC}"
fi

# ==========================================
# 5. BİTİŞ
# ==========================================
echo -e "${BLUE}[4/4] Servisler Yeniden Başlatılıyor...${NC}"

if command -v apache2ctl &> /dev/null; then
    if apache2ctl configtest; then
        systemctl reload apache2
        echo -e "${GREEN}==========================================${NC}"
        echo -e "${GREEN}    KURULUM BAŞARIYLA TAMAMLANDI!${NC}"
        echo -e "${GREEN}==========================================${NC}"
        echo -e "Erişim Adresi: http://SUNUCU_IP$URL_PATH"
    else
        echo -e "${RED}Apache config hatası! Yedeği geri yükleyin.${NC}"
    fi
else
    echo -e "${YELLOW}Apache servisi kontrol edilemedi.${NC}"
fi
