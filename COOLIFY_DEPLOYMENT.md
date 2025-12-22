# Coolify Deployment Rehberi

Bu rehber, ionet-web uygulamasının Coolify üzerinde nasıl deploy edileceğini adım adım anlatmaktadır.

## Ön Gereksinimler

- Coolify instance'ınız hazır ve çalışır durumda
- Git repository (GitHub, GitLab, vb.)
- Domain adlarınız hazır (stage.ionet.com.tr, www.ionet.com.tr)

## 1. Coolify'da Yeni Proje Oluşturma

### 1.1. Resource Ekle

1. Coolify dashboard'a gidin
2. **"+ New"** > **"Resource"** seçin
3. **"Docker Compose"** seçeneğini seçin

### 1.2. Git Repository Bağlantısı

1. Git Source seçin (GitHub, GitLab, vb.)
2. Repository URL'inizi girin
3. Branch seçin (örn: `main`, `master`, veya `develop`)

> [!NOTE]
> Coolify tek bir `docker-compose.yml` dosyası kullanır. Environment variable'lar Coolify UI'dan eklenir, `.env` dosyası gerekmez.

## 2. Environment Configuration

> [!IMPORTANT]
> Coolify'da tüm environment variable'lar UI üzerinden eklenir. Container içinde `.env` dosyası aranmaz. Aşağıdaki değişkenleri **Coolify Environment Variables** bölümüne ekleyin.

### 2.1. Staging Environment Variables

> [!IMPORTANT]
> **Coolify UI'da ekleyin** - `.env` dosyası kullanılmaz!
> 
> Aşağıdaki tüm değişkenleri Coolify'da **Environment Variables** bölümüne ekleyin. `your-staging-domain.com` yerine kendi domain'inizi yazın.

```bash
# Server Configuration
PORT=3001
NODE_ENV=staging

# Database
DB_PATH=server/db/stage.db

# Site URL (for SEO sitemap/robots.txt)
# ⚠️ KENDİ DOMAIN'İNİZİ GİRİN
SITE_URL=https://your-staging-domain.com

# Security - ÖNEMLİ: Bu değerleri değiştirin!
JWT_SECRET=<güvenli-64-karakterlik-hex-secret>
ADMIN_PASSWORD_HASH=<bcrypt-hash>

# CORS Configuration
# ⚠️ KENDİ DOMAIN'İNİZİ GİRİN
ALLOWED_ORIGINS=https://your-staging-domain.com

# Frontend Configuration
VITE_BASE_PATH=/ionet-web
# ⚠️ KENDİ DOMAIN'İNİZİ GİRİN
VITE_API_URL=https://your-staging-domain.com
VITE_APP_ENV=staging

# File Upload
UPLOAD_DIR=server/uploads/stage
MAX_FILE_SIZE=52428800

# Email Configuration (Opsiyonel)
SMTP_HOST=smtp.example.com
SMTP_PORT=587
SMTP_SECURE=false
# ⚠️ KENDİ DOMAIN'İNİZİ GİRİN
SMTP_USER=staging@your-domain.com
SMTP_PASS=<smtp-password>
MAIL_FROM=noreply@your-domain.com
MAIL_TO=admin@your-domain.com
```

### 2.2. Production Environment Variables

> [!WARNING]
> **Production Kritik!** - Tüm güvenlik ayarlarını mutlaka güncelleyin.
>
> Bu değişkenleri Coolify'da **Environment Variables** bölümüne ekleyin. `your-domain.com` yerine kendi domain'inizi yazın.

```bash
# Server Configuration
PORT=3001
NODE_ENV=production

# Database
DB_PATH=server/db/prod.db

# Site URL (for SEO sitemap/robots.txt)
# ⚠️ KENDİ PRODUCTION DOMAIN'İNİZİ GİRİN
SITE_URL=https://your-domain.com

# Security - KRİTİK: Güvenli değerler kullanın!
JWT_SECRET=<güvenli-64-karakterlik-hex-secret>
ADMIN_PASSWORD_HASH=<bcrypt-hash>

# CORS Configuration
# ⚠️ KENDİ PRODUCTION DOMAIN'İNİZİ GİRİN
# Birden fazla domain için virgül ile ayırın
ALLOWED_ORIGINS=https://your-domain.com,https://www.your-domain.com

# Frontend Configuration
VITE_BASE_PATH=/ionet-web
# ⚠️ KENDİ PRODUCTION DOMAIN'İNİZİ GİRİN
VITE_API_URL=https://your-domain.com
VITE_APP_ENV=production

# File Upload
UPLOAD_DIR=server/uploads/prod
MAX_FILE_SIZE=52428800

# Email Configuration
SMTP_HOST=smtp.example.com
SMTP_PORT=587
SMTP_SECURE=true
# ⚠️ KENDİ DOMAIN'İNİZİ GİRİN
SMTP_USER=noreply@your-domain.com
SMTP_PASS=<smtp-password>
MAIL_FROM=noreply@your-domain.com
MAIL_TO=admin@your-domain.com
```

## 3. Volume Configuration

> [!NOTE]
> Volume'ler `docker-compose.yml` dosyasında tanımlıdır. Coolify otomatik olarak bu tanımları kullanacaktır.

**Persistent Volumes**:
- `app-db` → `/app/server/db` (Database dosyaları)
- `app-uploads` → `/app/server/uploads` (Upload edilen dosyalar)

Bu volume'ler container yeniden başlatıldığında veya update edildiğinde verilerinizi korur.

## 4. Domain ve SSL Yapılandırması

> [!IMPORTANT]
> Aşağıdaki örneklerde `your-staging-domain.com` ve `your-domain.com` placeholder'ları kullanılmıştır. Bunları kendi gerçek domain adlarınızla değiştirin.

### 4.1. Domain Ekleme

1. Coolify'da projenize gidin
2. **"Domains"** sekmesine tıklayın
3. Domain ekleyin:
   - **Staging**: `your-staging-domain.com` (örn: `stage.myapp.com`)
   - **Production**: `your-domain.com` (örn: `www.myapp.com` veya `myapp.com`)

### 4.2. SSL Sertifikası

Coolify otomatik olarak Let's Encrypt SSL sertifikası oluşturacaktır:

1. Domain eklendikten sonra **"Generate SSL"** butonuna tıklayın
2. SSL sertifikası otomatik olarak oluşturulacak ve yenilenecektir

### 4.3. DNS Ayarları

Domain'inizin DNS kayıtlarını Coolify sunucunuzu işaret edecek şekilde güncelleyin:

**Örnek DNS Kayıtları**:
```
A Record:
your-staging-domain.com    →    <coolify-server-ip>
your-domain.com            →    <coolify-server-ip>
www.your-domain.com        →    <coolify-server-ip>
```

> [!NOTE]
> DNS değişikliklerinin propagasyonu 24-48 saat sürebilir. SSL sertifikası oluşturmadan önce DNS propagasyonunun tamamlandığından emin olun.

## 5. Build ve Deployment

### 5.1. Build Environment Variables

> [!CRITICAL]
> **ÇOK ÖNEMLİ**: Aşağıdaki environment variable'lar **build sürecinden ÖNCE** eklenmelidir!
> 
> Vite build sırasında bu değerleri kullanır. Eğer build'den sonra eklerseniz, frontend bu değerleri göremez!

**Build için Gerekli Variables**:
```bash
# Build konfigürasyonu
BUILD_ENV=stage  # veya production

# Vite için (build sırasında gerekli)
VITE_BASE_PATH=/
VITE_API_URL=https://your-staging-domain.com
VITE_APP_ENV=staging
```

> [!WARNING]
> Bu değişkenleri ekledikten sonra **yeniden build** almanız gerekir. Sadece restart yeterli değildir!

### 5.2. İlk Deployment

1. Tüm environment variable'ları ekledikten sonra **"Deploy"** butonuna tıklayın
2. Coolify şunları yapacaktır:
   - Git repository'yi clone edecek
   - Docker image'ı build edecek (BUILD_ENV'e göre)
   - Container'ı başlatacak
   - Health check yapacak

### 5.3. Build Loglarını İzleme

- **"Logs"** sekmesinden build ve deployment sürecini izleyebilirsiniz
- Hata durumunda logları kontrol edin
- `.env file not found` mesajı normaldir - environment variables inject edilir

### 5.4. Otomatik Deployment

Coolify, Git repository'deki değişiklikleri otomatik olarak deploy edebilir:

1. **"Settings"** > **"Auto Deploy"** seçeneğini aktif edin
2. Webhook URL'i alın
3. Git repository'nizde webhook ekleyin

## 6. Güvenlik Ayarları

### 6.1. JWT Secret Oluşturma

```bash
# Güvenli JWT secret oluşturma
node -e "console.log(require('crypto').randomBytes(32).toString('hex'))"
```

### 6.2. Admin Password Hash Oluşturma

Projenizde mevcut script'i kullanın:

```bash
node server/generate-password-hash.cjs <your-secure-password>
```

Çıktıdaki hash'i `ADMIN_PASSWORD_HASH` environment variable'ına ekleyin.

## 7. Health Check ve Monitoring

### 7.1. Health Endpoint

Uygulama sağlık kontrolü için endpoint:

```
GET /api/health
```

### 7.2. Coolify Monitoring

Coolify otomatik olarak container health check'i yapar:
- **Interval**: 30 saniye
- **Timeout**: 10 saniye
- **Retries**: 3
- **Start Period**: 40 saniye

### 7.3. Container Logları

Coolify dashboard'dan container loglarını izleyebilirsiniz:
- **"Logs"** > **"Container Logs"**

## 8. Backup ve Restore

### 8.1. Database Backup

Volume'ler persistent olduğu için verileriniz korunur. Yine de düzenli backup önerilir:

```bash
# Coolify sunucusunda
docker exec ionet-web-prod sh -c 'cat /app/server/db/prod.db' > backup-$(date +%Y%m%d).db
```

### 8.2. Upload Files Backup

```bash
# Volume backup
docker run --rm -v prod-uploads:/data -v $(pwd):/backup alpine tar czf /backup/uploads-backup-$(date +%Y%m%d).tar.gz -C /data .
```

## 9. Troubleshooting

### Container Başlamıyor

1. **Logları kontrol edin**:
   - Coolify dashboard'da "Logs" sekmesi
   - Environment variables doğru mu?
   - Port çakışması var mı?

2. **Health check başarısız**:
   ```bash
   # Container içinde test
   docker exec ionet-web-prod node -e "require('http').get('http://localhost:3001/api/health')"
   ```

### Database Bağlantı Hatası

- Volume mount'ları kontrol edin
- DB_PATH environment variable doğru mu?
- Yazma izinleri var mı?

### CORS Hataları

- `ALLOWED_ORIGINS` environment variable'ınızı kontrol edin
- Domain adınız doğru mu?
- HTTPS kullanıyor musunuz?

### Build Hataları

1. `.dockerignore` dosyası doğru mu?
2. `package.json` dependencies güncel mi?
3. Build argümanları doğru mu?

### SSL Sertifikası Sorunları

- DNS kayıtları doğru mu? (propagasyon 24-48 saat sürebilir)
- Port 80 ve 443 açık mı?
- Coolify Let's Encrypt rate limit'e takılmış olabilir (1 hafta bekleyin)

## 10. Rollback

Bir deployment başarısız olursa:

1. Coolify'da **"Deployments"** sekmesine gidin
2. Önceki başarılı deployment'ı seçin
3. **"Redeploy"** butonuna tıklayın

## 11. Scaling (Opsiyonel)

Coolify ile uygulamanızı ölçeklendirebilirsiniz:

1. **"Settings"** > **"Resources"** sekmesine gidin
2. CPU ve Memory limitlerini ayarlayın
3. Gerekirse multiple replicas oluşturun

## 12. Faydalı Komutlar

### Container'a Bağlanma

```bash
docker exec -it ionet-web-prod sh
```

### Database Kontrol

```bash
docker exec -it ionet-web-prod ls -la /app/server/db
```

### Restart Container

Coolify dashboard'dan **"Restart"** butonu veya:

```bash
docker restart ionet-web-prod
```

## Destek

Sorunlarla karşılaşırsanız:

1. Coolify documentation: https://coolify.io/docs
2. Coolify Discord: https://discord.gg/coolify
3. GitHub Issues: https://github.com/coollabsio/coolify

---

**Not**: Her environment için farklı güvenlik bilgileri (JWT_SECRET, ADMIN_PASSWORD_HASH) kullanmayı unutmayın!
